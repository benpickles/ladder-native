const React = require('react-native')
const {
  ActivityIndicatorIOS,
  StyleSheet,
  View,
} = React

export default () => {
  return (
    <View style={style.container}>
      <ActivityIndicatorIOS />
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
