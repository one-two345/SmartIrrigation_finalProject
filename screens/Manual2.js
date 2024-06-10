import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Picker, StyleSheet, TouchableOpacity } from 'react-native';
import { getDatabase, ref, child, set, push, remove } from 'firebase/database';
import DatePicker from 'react-native-modern-datepicker';
import TimePicker from 'react-native-modern-datepicker';

const Manual = () => {
  const [isContinuous, setIsContinuous] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [durationInput, setDurationInput] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [scheduleId, setScheduleId] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [isStopDisabled, setIsStopDisabled] = useState(true);

  const handleSubmit = async () => {
    const db = getDatabase();
    const data = {
      continuity: isContinuous,
      duration: durationInput,
      stop: false,
    };

    if (isContinuous) {
      data.startTime = new Date(`1970-01-01T${time}:00`).getTime() / 1000;
      data.frequency = frequency;
    } else {
      data.date = new Date(date).getTime() / 1000;
    }

    if (scheduleId) {
      const childRef = child(ref(db), `MLIoT_SIS/schedule/${scheduleId}`);
      await set(childRef, data);
    } else {
      const newScheduleRef = push(child(ref(db), 'MLIoT_SIS/schedule'));
      await set(newScheduleRef, data);
      setScheduleId(newScheduleRef.key);
    }

    setIsSubmitDisabled(true);
    setIsStopDisabled(false);
  };

  const handleStopSchedule = async () => {
    if (scheduleId) {
      const db = getDatabase();
      const childRef = child(ref(db), `MLIoT_SIS/schedule/${scheduleId}`);
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

      {isContinuous ? (
        <>
          <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.button}>
            <Text>Select Start Time</Text>
          </TouchableOpacity>
          {showTimePicker && (
            <TimePicker
              mode="time"
              onTimeChange={(selectedTime) => {
                setTime(selectedTime);
                setShowTimePicker(false);
              }}
              onCancel={() => setShowTimePicker(false)}
            />
          )}
          <Text style={styles.text}>Selected Start Time: {time}</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter duration (minutes)"
            value={durationInput}
            onChangeText={text => setDurationInput(text)}
            keyboardType="numeric"
          />
          <Picker
            selectedValue={frequency}
            style={styles.picker}
            onValueChange={(itemValue) => setFrequency(itemValue)}
          >
            <Picker.Item label="Daily" value="daily" />
            <Picker.Item label="Weekly" value="weekly" />
            <Picker.Item label="Monthly" value="monthly" />
          </Picker>
        </>
      ) : (
        <>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.button}>
            <Text>Select Date</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DatePicker
              mode="calendar"
              onDateChange={(selectedDate) => {
                setDate(selectedDate);
                setShowDatePicker(false);
              }}
              onCancel={() => setShowDatePicker(false)}
            />
          )}
          <Text style={styles.text}>Selected Date: {date}</Text>
          <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.button}>
            <Text>Select Time</Text>
          </TouchableOpacity>
          {showTimePicker && (
            <TimePicker
              mode="time"
              onTimeChange={(selectedTime) => {
                setTime(selectedTime);
                setShowTimePicker(false);
              }}
              onCancel={() => setShowTimePicker(false)}
            />
          )}
          <Text style={styles.text}>Selected Time: {time}</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter duration (minutes)"
            value={durationInput}
            onChangeText={text => setDurationInput(text)}
            keyboardType="numeric"
          />
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
