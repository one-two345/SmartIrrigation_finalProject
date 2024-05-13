import React, { useState } from "react";
import { View, Text,TouchableOpacity,TextInput,ScrollView } from "react-native";
import { RadioButton,Card } from "react-native-paper"; // Assuming RadioButton is from react-native-paper
import { styles } from "../styles/setting";

const Setting = () => {
  const [checked, setChecked] = useState("first");
  const[notify,setNotify]=useState('weather  alert')
 console.log(checked)
  return (
    <View style={styles.main}>
      <ScrollView>
      <Text style={styles.text1}>Unit Of measurment</Text>
      <View style={styles.main1}>
        <Text style={styles.text2}>Metrics</Text>
        <View style={styles.radio1}>
          <RadioButton
            value="Metrics"
            status={checked === "Metrics" ? "checked" : "unchecked"}
            onPress={() => setChecked("Metrics")}
          />
        </View>

      </View>
      <View style={styles.main1}>
        <Text style={styles.text2}>Imperial</Text>
        <View style={styles.radio1}>
          <RadioButton
            value="Imperial"
            status={checked === "Imperail" ? "checked" : "unchecked"}
            onPress={() => setChecked("Imperail")}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.touch1}>
        <Text style={styles.text3}>Save</Text>
      </TouchableOpacity>
      <Text style={styles.text1}>Languages</Text>
   <View style={styles.label}>
   <TextInput style={styles.inputs}
   placeholder="enter the language for the app"
   ></TextInput>
   </View>

   <TouchableOpacity style={styles.touch1}>
        <Text style={styles.text3}>Save</Text>
      </TouchableOpacity>





      <Text style={styles.text1}>Notification Setting</Text>
      <View style={styles.main1}>
        <Text style={styles.text4}>Weather   Alert</Text>
        <View style={styles.radio2}>
          <RadioButton
            value="Metrics"
            status={checked === "Metrics" ? "checked" : "unchecked"}
            onPress={() => setChecked("Metrics")}
          />
        </View>

      </View>
      <View style={styles.main1}>
        <Text style={styles.text4}>Apdate System</Text>
        <View style={styles.radio2}>
          <RadioButton
            value="Imperial"
            status={checked === "Imperail" ? "checked" : "unchecked"}
            onPress={() => setChecked("Imperail")}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.touch1}>
        <Text style={styles.text3}>Save</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Setting;
