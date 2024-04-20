import React from "react";
import { View, Text, TouchableOpacity, TextInput,ScrollView } from "react-native";
import { styles } from "../styles/controlSystem";

import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
//logic to on and off the system
function onToOff() {
  console.log("the system is on please click to turn of ");
}
function offToOn() {
  console.log("the sytem is off click to turn on ");
}

const ControlSystem = () => {
  const navigation = useNavigation();
  const [turnSystemOn, setTurnSystemOn] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [frequency, setFrequency] = useState("");

  const handleToggleTurnSystem = () => {
    setTurnSystemOn(!turnSystemOn);
  };
  const handleAdjustWateringSchedule = () => {
    navigation.navigate("AdjustWateringScheduleScreen"); // replace with the actual name of your screen
  };

  return (
    <View style={styles.main}>
      <ScrollView>
      <Text style={styles.text1}>Turn System On/Off</Text>
      <View style={styles.main1}>
        <TouchableOpacity
          onPress={() => {
            offToOn();
          }}
        >
          <Text style={styles.text2}>Turn System Off</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onToOff();
          }}
        >
          <Text style={styles.text2}>Turn System On</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.text1}>Adjust Water schedule</Text>
      <View style={styles.main2}>
        <TextInput
          value={startTime}
          onChangeText={setStartTime}
          placeholder="Start Time"
          keyboardType="numeric"
          style={styles.textInput}
        />
        <TextInput
          value={endTime}
          onChangeText={setEndTime}
          placeholder="End Time"
          keyboardType="numeric"
          style={styles.textInput}
        />
        <TextInput
          value={frequency}
          onChangeText={setFrequency}
          placeholder="Frequency"
          keyboardType="numeric"//this is string changed later
          style={styles.textInput}
        />
      </View>
      <Text style={styles.text1}>Set Specific Zone</Text>
      <View style={styles.main2}>
        <View style={styles.main3}>
          <Text style={styles.text3}>Zone A</Text>
          <TextInput  style={styles.input1} placeholder="Watering duration"></TextInput>
          
          </View>
        <View  style={styles.main3}>
          <Text style={styles.text3}>Zone B</Text>
          <TextInput  style={styles.input1} placeholder="Watering duration"></TextInput>
          </View>
          
        <View style={styles.main3}>
          <Text style={styles.text3}>Zone C</Text>
          <TextInput  style={styles.input1} placeholder="Watering duration"></TextInput>
          </View>    
      </View>
      <Text style={styles.text1}>Others</Text>
      <TouchableOpacity 
      style={styles.touch2}
       onPress={()=>{navigation.navigate('setting')}} 
        >
        <Text style={styles.text4}>Additional settings</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ControlSystem;
