import React, { useState } from 'react';
import { View, Text, TextInput, Button, Picker, StyleSheet, TouchableOpacity } from 'react-native';
import { getDatabase, ref, set, push, remove } from 'firebase/database';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

const Manual = () => {
  const [isContinuous, setIsContinuous] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('00:00');
  const [durationInput, setDurationInput] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [scheduleId, setScheduleId] = useState(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [isStopDisabled, setIsStopDisabled] = useState(true);

  const handleSubmit = async () => {
    const db = getDatabase();
    const data = {
      continuity: isContinuous,
      duration: durationInput,
      stop: false,
    };

    // Combine date and time to create a start time
    const selectedDateTime = new Date(date);
    const [hours, minutes] = time.split(':');
    selectedDateTime.setHours(parseInt(hours), parseInt(minutes), 0);

    if (!isNaN(selectedDateTime.getTime())) {
      data.startTime = selectedDateTime.getTime() / 1000;
    } else {
      console.error('Invalid start time:', selectedDateTime);
      return;
    }

    if (isContinuous) {
      data.frequency = frequency;
    } else {
      data.date = new Date(date).getTime() / 1000;
    }

    console.log('Data to be sent to Firebase:', data); // For debugging

    if (scheduleId) {
      const childRef = ref(db, `MLIoT_SIS/schedule/${scheduleId}`);
      await set(childRef, data);
    } else {
      const newScheduleRef = push(ref(db, 'MLIoT_SIS/schedule'));
      await set(newScheduleRef, data);
      setScheduleId(newScheduleRef.key);
    }

    setIsSubmitDisabled(true);
    setIsStopDisabled(false);
  };

  const handleStopSchedule = async () => {
    if (scheduleId) {
      const db = getDatabase();
      const childRef = ref(db, `MLIoT_SIS/schedule/${scheduleId}`);
      await remove(childRef);
      setScheduleId(null);
      setIsSubmitDisabled(false);
      setIsStopDisabled(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manual Scheduling</Text>
      <Picker
        selectedValue={isContinuous}
        style={styles.picker}
        onValueChange={(itemValue) => setIsContinuous(itemValue)}
      >
        <Picker.Item label="Non-Continuous" value={false} />
        <Picker.Item label="Continuous" value={true} />
      </Picker>

      <Text>Select Start Time</Text>
      <TimePicker
        onChange={setTime}
        value={time}
        disableClock={true}
      />
      <Text style={styles.text}>Selected Start Time: {time}</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter duration (minutes)"
        value={durationInput}
        onChangeText={text => setDurationInput(text)}
        keyboardType="numeric"
      />

      {isContinuous && (
        <Picker
          selectedValue={frequency}
          style={styles.picker}
          onValueChange={(itemValue) => setFrequency(itemValue)}
        >
          <Picker.Item label="Daily" value="daily" />
          <Picker.Item label="Weekly" value="weekly" />
          <Picker.Item label="Monthly" value="monthly" />
        </Picker>
      )}

      {!isContinuous && (
        <>
          <Text>Select Date</Text>
          <DatePicker
            selected={date}
            onChange={date => setDate(date)}
            dateFormat="yyyy-MM-dd"
          />
          <Text style={styles.text}>Selected Date: {date.toDateString()}</Text>
        </>
      )}

      <Button title="Submit" onPress={handleSubmit} disabled={isSubmitDisabled} />
      <Button title="Stop Schedule" onPress={handleStopSchedule} disabled={isStopDisabled} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  picker: {
    height: 50,
    width: 150,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 8,
    marginBottom: 10,
    width: '80%',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  text: {
    marginBottom: 10,
  },
  button: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default Manual;
