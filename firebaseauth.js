// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-analytics.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import {getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2X15GYrkCq13mJJxdW74xgeQBRZbRdmk",
  authDomain: "loginform-91319.firebaseapp.com",
  projectId: "loginform-91319",
  storageBucket: "loginform-91319.firebasestorage.app",
  messagingSenderId: "218435663166",
  appId: "1:218435663166:web:cbe6e20c801e3eb2b6e86f",
  measurementId: "G-K6PPSL71EG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const SignUp=document.getElementById('submitSignUp');
SignUp.addEventListener('click',(event)=>{
    event.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const auth=getAuth();
    const db=getFirestore();

    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
        const user=userCredential.user;
        const docRef=doc(db,'users',user.uid);
        setDoc(docRef,{email:user.email})
        .then(() => {
            window.location.href='main.html';
        })
        .catch((error)=>{
            console.error("error writing docuent",error);
        })
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode=='auth/email-already-in-use'){
            showMessage('Email Adress is already in use');
        }
    })
})

const signIN=document.getElementById('submitSignUp');
signIN.addEventListener('click',(event)=>{
    event.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const auth=getAuth();
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
        showMessage('login is successful')
        const user=userCredential.user;
        localStorage.setItem('loggedInUserId',user.uid);
        window.location.href='main.html';
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode=='auth/wrong-password'){
            showMessage('Wrong Password');
        }
        else{
            showMessage('Invalid Email or Password');
        }
    })
})