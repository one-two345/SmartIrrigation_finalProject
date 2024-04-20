import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const CircularProgressBar = ({ radius, strokeWidth, progress, color, title }) => {
//     radius=Number(radius);
//   strokeWidth=Number(radius);
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    setProgressValue(progress);
  }, [progress]);
  const isValidNumber = (num) => typeof num === 'number' && !isNaN(num);

  // Check if radius and strokeWidth are valid numbers
  if (!isValidNumber(radius) || !isValidNumber(strokeWidth)) {
    console.error('Invalid radius or strokeWidth');
    return null;
  }
  // Ensure progress value is between 0 and 100
  const normalizedProgress = Math.min(Math.max(progressValue, 0), 100);

  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (normalizedProgress / 100) * circumference;

  return (
    <View style={styles.container}>
      <Svg width={radius * 2} height={radius * 2}>
        {/* Background Circle */}
        <Circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          stroke="#E2E2E2"
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={0}
          fill="transparent"
        />
        {/* Progress Circle */}
        <Circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          fill="transparent"
        />
      </Svg>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.progressValue}>{normalizedProgress}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressValue: {
    marginTop: 5,
    fontSize: 14,
  },
});

export default CircularProgressBar;
