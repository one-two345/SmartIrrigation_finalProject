import React, { useState } from 'react';
import { Card, RadioButton } from "react-native-paper";
import { View, ScrollView, Text, Button, TextInput } from 'react-native';
import { styles } from '../styles/scheduleManagment';
import DateTimePicker from '@react-native-community/datetimepicker';

const ScheduleManagment = () => {
    const [checked, setChecked] = useState("Daily");
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [duration, setDuration] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios'); // Hide the picker on iOS
        setDate(currentDate);
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const handleSave = () => {
        // Implement logic to save the schedule data
    };

    return (
        <View style={styles.main}>
            <ScrollView>
                <Text style={styles.text1}>Schedule Form</Text>
                <Text style={styles.text3}>Water Frequence</Text>
                <View style={styles.main1}>
                    <View style={styles.radio1}>
                        <RadioButton
                            value="Daily"
                            status={checked === "Daily" ? "checked" : "unchecked"}
                            onPress={() => setChecked("Daily")}
                        />
                    </View>
                    <Text style={styles.text2}>Daily</Text>
                    <View style={styles.radio1}>
                        <RadioButton
                            value="Weekly"
                            status={checked === "Weekly" ? "checked" : "unchecked"}
                            onPress={() => setChecked("Weekly")}
                        />
                    </View>
                    <Text style={styles.text2}>Weekly</Text>
                    <View style={styles.radio1}>
                        <RadioButton
                            value="Monthly"
                            status={checked === "Monthly" ? "checked" : "unchecked"}
                            onPress={() => setChecked("Monthly")}
                        />
                    </View>
                    <Text style={styles.text2}>Monthly</Text>
                </View>
                <View>
                    <Text style={styles.text3}>Watering Duration</Text>
                    <TextInput
                        style={styles.imputs}
                        value={duration}
                        onChangeText={setDuration}
                        placeholder="Enter duration in minutes"
                    />
                    <Text style={styles.text3}>Time of Day</Text>
                  
                   <View style={styles.main4}>
                   <View style={styles.main3}>
                    <View style={{flexDirection:'row'}}>
                        <View style={styles.main3}>
                            <Button onPress={showDatepicker} title="Date picker!" />
                        </View>
                        <View style={styles.main3}>
                            <Button onPress={showTimepicker} title="Time picker!" />
                        </View>
                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                            />
                        )}
                    </View>
                    </View>
                   </View>
                 <View style={{width:'50%', marginStart:70,borderRadius:15}}>
                    <Button title="Save" onPress={handleSave}  />
               
                    </View>
                </View>

                <Text style={styles.text1}>Existing Schedules</Text>
                <Card style={styles.card1}>

                    <Text style={styles.text4}>Morning Watering</Text>
                    <Text style={styles.text5}>Frequence:Daily</Text>
                    <Text style={styles.text5}>Duration:405min</Text>
                    <Text style={styles.text5}>Time:7:30</Text>
                   <View style={styles.main2}>
                   <View style={styles.buttons}><Button title="Edit" onPress={handleSave} /></View>
                  <View  style={styles.buttons}><Button  title="Delete" onPress={handleSave} /></View>
                   </View>
               
            </Card> 
            <Card style={styles.card1}>

                    <Text style={styles.text4}>Morning Watering</Text>
                    <Text style={styles.text5}>Frequence</Text>
                    <Text style={styles.text5}>Duration</Text>
                    <Text style={styles.text5}>Time</Text>
                    <View style={styles.main2}>
                   <View style={styles.buttons}><Button title="Edit" onPress={handleSave} /></View>
                  <View  style={styles.buttons}><Button  title="Delete" onPress={handleSave} /></View>
                   </View>
               
            </Card> 
            </ScrollView>
           
        </View>
    );
}

export default ScheduleManagment;
