import {child, getDatabase, get, ref} from 'firebase/database'
import { FirebaseApp } from 'firebase/app';
import { getFirebaseApp } from '../firebase'


export const sensorContent = ( email, password) => {
  return async (dispatch) => {
    const app= getFirebaseApp()
    const auth = getAuth(app)

    try{
      const result = await signInWithEmailAndPassword(
        auth, email, password
      );
      console.log(result.user)
      const { uid, stsTokenManager } = result.user;
      const { accessToken, expirationTime } = stsTokenManager;
      const expiryDate = new Date(expirationTime);

      const userData = await getUserData(uid);

      dispatch(authenticate({token: accessToken, userData}));

      saveToStorage(accessToken, uid, expiryDate)

    } catch(error) {
      console.log(error)
      const error_code = error.code;
      let message = 'Something went wrong'

      if(error_code === 'auth/invalid-email'){
        message = 'Please check your email or password'
      }

      if (error_code === 'auth/wrong-password' || error_code === 'auth/user-not-found'){
        message = 'Wrong email or password'
      }
      
      throw new Error(message);


    }
  }
}
const getSensorData = async (userId) => {
  try {
    const app = getFirebaseApp();
    const dbRef = ref(getDatabase());
    const sensorContentRef = child(dbRef,`MLIoT_SIS/temperature`)
    
    const snapshot = await get(userRef)

    return snapshot.val()


  }catch(error){
    console.log(error)
  }
}