import React from 'react';
import { View } from 'react-native';
import { Svg, Circle, Text as SvgText } from 'react-native-svg';

const CircularProgressBar = ({ progress, title, progressColor, unit }) => {
  // Ensure progress is between 0 and 100
  const validProgress = Math.min(Math.max(progress, 0), 100);
  const progressFraction = validProgress / 100;

  const radius = 65;
  const strokeWidth = 20;
  const circumference = 2 * Math.PI * radius;
  const progressValue = progressFraction * circumference;

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{fontSize: '30px', fontWeight: '400', marginBottom: '5px'}}>{title}</h1>
      <Svg width={radius * 2} height={radius * 2}>
        {/* Gray circle representing the whole progress */}
        <Circle
          stroke="#ccc"
          fill="transparent"
          strokeWidth={strokeWidth}
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
        />
        {/* Progress arc */}
        <Circle
          stroke={progressColor || '#00f'} // Use provided progress color or default to blue
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={`${progressValue}, ${circumference}`}
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
        />
        {/* Text labels */}
       
        {/* Progress text */}
        <SvgText
          x={radius}
          y={radius + 10}
          textAnchor="middle"
          stroke={progressColor}
          fontSize="30"
         
        >
          {`${validProgress}${unit}`}
        </SvgText>
        {/* Title */}
        {/* {title && (
          <SvgText
            x={radius}
            y={-30} // Adjust the position for the title
            textAnchor="middle"
            stroke="black"
            fontSize="30"
            fontWeight="500"
            
          >
            {title}
          </SvgText>
        )} */}
      </Svg>
    </View>
  );
};

export default CircularProgressBar;
