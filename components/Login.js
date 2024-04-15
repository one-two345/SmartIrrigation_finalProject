import React from 'react'

function Login ({navigation, route})  {
  return <Text>This is {route.params.name}'s profile</Text>;
};

export default Login