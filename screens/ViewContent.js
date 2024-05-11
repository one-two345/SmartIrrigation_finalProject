import React from "react";
import { useState,useEffect } from "react";
import { View, Text, TouchableOpacity,ScrollView } from "react-native";
// import { styles } from "../styles/ViewContent";
import {styles} from '../styles/viewContent'
import { useNavigation } from "@react-navigation/native";
//import {DB,ref,onValue} from '../firebase'
//import { snapshotEqual } from "firebase/firestore";
//import CircularProgressBar from "./CircularProgressBar";
import CircularProgressBar  from '../components/CircularProgressBar.js'

const ViewContent = () => {

  const navigation = useNavigation();
  const[temp,setTemp]=useState(50)
  const[humid,setHimid]=useState(85)
  const[moist,setPressur]=useState(45)
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress => (prevProgress === 100 ? 0 : prevProgress + 10));
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  // useEffect(()=>{
  //   const data=ref(DB)
  //   onValue(data,(snapshot)=>{
  //     setTemp(snapshot.val().temp)
  //     setPressur(snapshot.val().moist)
  //     setHimid(snapshot.val().humid)
  //   })
  // },[])
  return (
    <ScrollView>
    <View style={styles.main}>
      
      <Text style={styles.text1}>Weather Condition</Text>
  <View style={{  }}>
    {/* Temperature and Humidity */}
    <View style={{ flexDirection:'row',justifyContent:'space-evenly' }}>
      <CircularProgressBar
        radius={50}
        strokeWidth={10}
        progress={temp}
        color="#FF5733"
        title="Temperature"
      />
      <CircularProgressBar
        radius={50}
        strokeWidth={10}
        progress={humid}
        color="#33FF9C"
        title="Humidity"
      />
    </View>
    {/* Moisture */}
    <CircularProgressBar
      radius={50}
      strokeWidth={10}
      progress={moist}
      color="#3385FF"
      title="Moisture"
      style={{ margin: 10 }}
    />
  </View>
    

      {/* <View style={styles.main1}>
        <Text style={styles.text2}> Temprature:{temp}</Text>
        <Text style={styles.text2}>Humidity:{himd}</Text>
        <Text style={styles.text2}>pressure:{moist}</Text>
      </View> */}
      {/* <Text style={styles.text1}>Soil Moisture Levels</Text>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.text3}>Zone A</Text>
         
         
        </View>
        <View style={styles.column}>
          <Text style={styles.text3}>Zone B</Text>
          <Text style={styles.text4}>Moisture Level:{moist}</Text>
        </View>
      </View> */}
      <Text style={styles.text1}>Irrigation Status</Text>
      <View style={styles.main2}>
        <Text style={styles.text2}>Status:{humid}%</Text>
        <Text style={styles.text2}>Duration:{34}min</Text>
      </View>
      <TouchableOpacity
        style={styles.touch1}
        onPress={() => navigation.navigate("controlSystem")}
      >
        <Text style={styles.text5}>Manual Control</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

export default ViewContent;
