import React from 'react-native'

const {
  ActivityIndicatorIOS,
  StyleSheet,
  View,
} = React

export default () => {
  return (
    <View style={style.container}>
      <ActivityIndicatorIOS size="large" />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})
