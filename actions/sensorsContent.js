import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes.js';
//import * as api from '../api/index.js';
import {child, getDatabase, get, ref} from 'firebase/database'
import { getFirebaseApp } from '../utils/firebase.js'

export const getSensorsContent = () => async (dispatch) => {
  try {

    const getSensorData = async () => {
      try {
        const app = getFirebaseApp();
        const dbRef = ref(getDatabase());
        const temSensorContentRef = child(dbRef, `MLIoT_SIS/temperature`);
        const moistureSensorContentRef = child(dbRef, `MLIoT_SIS/moisture`);
        const humiditySensorContentRef = child(dbRef, `MLIoT_SIS/humidity`);

        // Fetch data for all three sensors concurrently
        const [temSnapshot, moistureSnapshot, humiditySnapshot] = await Promise.all([
          get(temSensorContentRef),
          get(moistureSensorContentRef),
          get(humiditySensorContentRef)
        ]);

        const temperatureData = temSnapshot.val();
        const moistureData = moistureSnapshot.val();
        const humidityData = humiditySnapshot.val();

        return { temperatureData, moistureData, humidityData };
      } catch (error) {
        console.log(error);
        throw error; // Re-throw the error to be caught by the caller
      }
    };

    const sensorData = await getSensorData(); // Fetch sensor data
    console.log(sensorData); // Log the fetched data

    dispatch({ type: FETCH_ALL, payload: sensorData });
  } catch (error) {
    console.log(error);
  }
};



