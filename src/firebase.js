import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyAGaeofETSA4twzRWpaQIuNlScz8oIAfEY",
    authDomain: "mart-sheets.firebaseapp.com",
    databaseURL: "https://mart-sheets.firebaseio.com",
    projectId: "mart-sheets",
    storageBucket: "mart-sheets.appspot.com",
    messagingSenderId: "214542388927",
    appId: "1:214542388927:web:a5278761f3c66db2ea800a",
    measurementId: "G-JGV0QBGGJP"
  };
  firebase.initializeApp(firebaseConfig);

  export default firebase;