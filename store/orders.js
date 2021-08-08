export function orders(store) {
  store.on('@init', () => ({orders: []}))

  store.on('orders/update', ({ orders }, data) => {
    if (Array.isArray(data)) {
      return {orders: [...orders, ...data]}
    } else {
      return {orders: [...orders, data]}
    }
  })

  store.on('orders/create', ({ orders }, newOrder) => {
    return {orders: [...orders, newOrder]}
  })
}