const React = require('react-native')
const {
  TabBarIOS,
} = React

import Players from './components/Players'

export default () => {
  return (
    <TabBarIOS>
      <TabBarIOS.Item title="Players" selected={true}>
        <Players />
      </TabBarIOS.Item>
    </TabBarIOS>
  )
}
