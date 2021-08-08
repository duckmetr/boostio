import axios from 'axios'
import CryptoJS from 'react-native-crypto-js'

class Instagram {
  constructor({ username, password, cookies }) {
    this.credentials = {username, password}
    
    const baseUrl = 'https://www.instagram.com'

    this.api = axios.create({
      baseURL: baseUrl,
      headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36',
        'Accept-Language': 'en-US',
        'X-Instagram-AJAX': 1,
        'cookie': 'ig_cb=1;',
        'X-Requested-With': 'XMLHttpRequest',
        'Referer': baseUrl
      }
    })

    this.api.defaults.headers.post['content-type'] = 'application/x-www-form-urlencoded'
    
    if (cookies) {
      const csrftoken = this.#getCsrfToken(cookies)
      this.#setCsrfToken(csrftoken)
      this.#setCookies(cookies)
    }
  }

  async login() {
    let { username, password, cookies } = this.credentials
    if (!cookies) {
      await this.#prepareLogin()
    }

    const enc_password = this.#createEncPassword(password)
    const formBody = this.#createFormBody({username, enc_password})

    const res = await this.api.post('/accounts/login/ajax/', formBody)
    const csrftoken = this.#getCsrfToken(res.headers['set-cookie'])

    cookies = this.#getCookies(res.headers['set-cookie'])

    this.#setCsrfToken(csrftoken)
    this.#setCookies(cookies)
  }

  async getProfile() {
    const res = await this.api.get('/accounts/edit/?__a=1')

    return res.data.form_data
  }

  async getProfileInfo() {
    const { username } = await this.getProfile()
    const res = await this.getUserByUsername({ username })

    return res
  }

  async like({ mediaId }) {
    return this.api.post(`/web/likes/${mediaId}/like/`)
  }

  async unlike({ mediaId }) {
    return this.api.post(`/web/likes/${mediaId}/unlike/`)
  }

  async logout() {
    return this.api.post('/accounts/logout/ajax/')
  }

  #createEncPassword(pwd) {
    return `#PWD_INSTAGRAM_BROWSER:0:${Date.now()}:${pwd}`
  }

  #createFormBody(body) {
    return Object
      .entries(body)
      .map(([key, value]) => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      }).join('&')
  }

  #getCsrfToken(cookies) {
    if (!Array.isArray(cookies)) {
      cookies = cookies.split('; ')
    }
    return cookies.find(item => item.startsWith('csrftoken=')).slice(10, 42)
  }

  #getCookies(cookies) {
    const clear = cookies.map(cookie => cookie.split(';')[0])
    const cookiesText = clear.join('; ')

    return cookiesText
  }

  #setCsrfToken(csrftoken) {
    this.api.defaults.headers['X-CSRFToken'] = csrftoken
  }

  #setCookies(cookies) {
    this.api.defaults.headers['cookie'] = cookies
    this.credentials.cookies = cookies
  }

  async #prepareLogin() {
    const res = await this.api.get('/')
    const csrftoken = this.#getCsrfToken(res.headers['set-cookie'])
    this.#setCsrfToken(csrftoken)
  }

  //no tested
  async #getSharedData(url = '/') {
    const res = await this.api.get(url)
    const _sharedData = JSON.parse(res.data.split('window._sharedData = ')[1].split(';</script>')[0])
    
    return _sharedData
  }

  async #getGis(path) {
    const { rhx_gis } = this._sharedData || (await this.#getSharedData(path))

    const words = CryptoJS.MD5(`${rhx_gis}:${path}`)
    const hex = CryptoJS.enc.Hex.stringify(words)
   
    return hex
  }

  async getUserByUsername({ username }) {
    const res = await this.api.get(`/${username}/?__a=1`, {
      headers: {
        referer: `https://www.instagram.com/${username}/`,
        'x-instagram-gis': await this.#getGis(`/${username}/`)
      }
    })

    return res.data.graphql.user
  }

  async getMediaByShortcode({ shortcode }) {
    const res = await this.api.get(`/p/${shortcode}/?__a=1`)

    return res.data.graphql.shortcode_media
  }

  async #getPosts({ id, first = 12, after }) {
    const query_hash = '42323d64886122307be10013ad2dcc44'
    const variables = JSON.stringify({id, first, after})
    const res = await this.api.get(`/graphql/query/?query_hash=${query_hash}&variables=${variables}`)

    return res.data.user
  }

  async getUserIdPhotos({ id, first = 12, after = '' } = {}) {
    const query_hash = '6305d415e36c0a5f0abb6daba312f2dd'
    const variables = JSON.stringify({id, first, after})
    const res = await this.api.get(`/graphql/query/?query_hash=${query_hash}&variables=${variables}`)

    return res.data.data
  }

}

export default Instagram