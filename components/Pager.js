import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import PagerView from 'react-native-pager-view'

const Pager = () => {
  return (
    <PagerView style={styles.pagerView} initialPage={0}>
      <View key="1">
        <Text>First page</Text>
      </View>
      <View key="2">
        <Text>Second page</Text>
      </View>
    </PagerView>
  );
};

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
    padding: 50,
    margin: 50,
    backgroundColor: '#555'
  },
})

export default Pager