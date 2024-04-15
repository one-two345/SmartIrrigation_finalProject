import React from 'react'

function Home({navigation}) {
  return (
     <Button
      title="Go to Jane's profile"
      onPress={() =>
        navigation.navigate('Login', {name: 'Jane'})
      }
    />
  )
}

export default Home
