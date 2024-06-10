import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getSensorData, setControl } from "../utils/actions/sensorsContentActions.js";
import PieChart from "../components/PieChart";
import CircularProgressBar from "../components/CircularProgressBar.js";
import { styles } from "../styles/ViewContent.js";
import { ScrollView } from "react-native-web";

const ViewContent = () => {
  const navigation = useNavigation();
  const [temp, setTemp] = useState(0);
  const [humid, setHumid] = useState(0);
  const [moist, setMoist] = useState(0);
  const [duration, setDuration] = useState(0);
  const [status, setStatus] = useState("");
  const [isOn, setIsOn] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const tempData = await getSensorData("temperature");
        const humidData = await getSensorData("humidity");
        const moistData = await getSensorData("moisture");
        const durationData = await getSensorData("duration");
        const statusData = await getSensorData("status");
        
        
        // Set the fetched data to state variables
        setTemp(tempData);
        setHumid(humidData);
        setMoist(moistData);
        setDuration(durationData);
        setStatus(statusData);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []); // Empty dependency array ensures useEffect runs only once
 
  const newControlValue = isOn ? 'ON' : 'OFF';

  const handleControlPress = () => {
    setIsOn(!isOn)
    setControl(newControlValue)
  }
  const handleAutoPress = () => {
    
    setControl('NORMAL')
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={{ flex: 1, marginHorizontal: 22 }}>
        {/* Display Weather Condition */}
        <Text style={styles.text1}>Weather Condition</Text>
        <View style={{ marginBottom: 15 }}>
          {/* Temperature and Humidity */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <PieChart progress={temp} unit= '°C ' title="Temperature" progressColor="#FF6666" />
            <PieChart progress={humid} unit= '%' title="Humidity" progressColor="#6666FF" />
          </View>
          {/* Moisture */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <PieChart progress={moist} unit= '%' title="Moisture" progressColor="#66FF66" />
            <View style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 30, fontWeight: "400", marginBottom: 5, marginTop: 5 }}>Water Pump</Text>
              <TouchableOpacity 
                onPress={handleControlPress}
                style={{
                  fontSize: 40, 
                  fontWeight: "500", 
                  height: 70, 
                  width: 180, 
                  borderRadius: 30, 
                  backgroundColor: "#ffffff", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  shadowColor: '#000000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.5,
                  shadowRadius: 4,
                  elevation: 5 // For Android
                }}
              >
                <Text style={{ fontSize: 20 }}>{isOn ? "ON" : "OFF"}</Text>
              </TouchableOpacity>

              {/*Auto */}
              <TouchableOpacity 
                onPress={handleAutoPress}
                style={{
                  marginTop: 10,
                  fontSize: 40, 
                  fontWeight: "500", 
                  height: 70, 
                  width: 180, 
                  borderRadius: 30, 
                  backgroundColor: "#ffffff", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  shadowColor: '#000000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.5,
                  shadowRadius: 4,
                  elevation: 5 // For Android
                }}
              >
                <Text style={{ fontSize: 20 }}>AUTO</Text>
              </TouchableOpacity>


              </View>
            </View>
          </View>

          {/* Display Irrigation Status */}
          <Text style={styles.text1}>Irrigation Status</Text>
          <View style={{ marginTop: 10 }}>
          <View style={{
              backgroundColor: "#d8bfd8",
              padding: 15,
              borderRadius: 10, // Increase the border radius for smoother corners
              shadowColor: '#000', // Add shadow
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
              <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#ddFF6c' }}>Irrigation: <Text style={{ fontSize: 18,fontWeight: '400', color: '#666' }}> {status}</Text></Text>
            </View>
              
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#ddFF6c' }}>Water Pump on For:  <span style={{ fontSize: 18, color: '#666' }}> {(duration/60000).toFixed(2)} min</span></Text>
            </View>
          </View>

          <TouchableOpacity 
            style={{
              ...styles.touch1,
              backgroundColor: '#3498db', // Background color
              borderRadius: 10, // Border radius
              paddingTop: 2, // Vertical padding
              paddingHorizontal: 20, // Horizontal padding
              shadowColor: '#000', // Shadow color
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25, // Shadow opacity
              shadowRadius: 3.84, // Shadow radius
              elevation: 5, // Elevation for Android
              justifyContent: 'center', // Center the content vertically
              alignItems: 'center', // Center the content horizontally
            }} 
            onPress={() => navigation.navigate("controlSystem")}
          >
            <Text style={styles.text5}>Manual Control</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{
              ...styles.touch1,
              backgroundColor: '#3498db', // Background color
              borderRadius: 10, // Border radius
              paddingTop: 2, // Vertical padding
              paddingHorizontal: 20, // Horizontal padding
              shadowColor: '#000', // Shadow color
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25, // Shadow opacity
              shadowRadius: 3.84, // Shadow radius
              elevation: 5, // Elevation for Android
              justifyContent: 'center', // Center the content vertically
              alignItems: 'center', // Center the content horizontally
            }} 
            onPress={() => navigation.navigate("Manual")}
          >
            <Text style={styles.text5}>Manual Control2</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewContent;
