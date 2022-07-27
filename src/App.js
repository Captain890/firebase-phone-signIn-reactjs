import { useState } from 'react'
import { authentication } from './firebase-config';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

import './App.css';

function App() {

const [ phone, setPhone ] = useState('');
const [ otp, setOtp ] = useState('')


const generateRecaptcha = ()=>{
  window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
    'size': 'invisible',
    'callback': (response) => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
    }
  }, authentication);
}  
  
  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(phone);
    generateRecaptcha();
    const phoneNumber = `+91 ${phone}`;
    let appVerifier = window.recaptchaVerifier;
    setPhone('');
    signInWithPhoneNumber(authentication,phoneNumber,appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
    })
    .catch((error) => {
      console.log(error)
  });
  }

  const verifyOtp = (e)=>{
     e.preventDefault();
     const code = `${otp}`;
     let confirmationResult = window.confirmationResult;
    confirmationResult.confirm(code).then((result) => {
      // User signed in successfully.
      const user = result.user;
      alert('Sign In Successfully!')
      setOtp('');
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
    });
     
  }



  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h1>Sign In with Phone</h1>
        <label>Phone Number</label>
        <input type="number" 
        name='phone' 
        placeholder='Enter your number' 
        value={phone} 
        onChange={(e)=>setPhone(e.target.value)}  
        />
        <button type='submit'>Submit</button>
        <div id='sign-in-button'></div>
      </form>
      <form onSubmit={verifyOtp}>
          <h3> OTP will sent to {phone} Number </h3>
          <input type="number" value={otp} onChange={(e)=>setOtp(e.target.value)} />
          <button type='submit' >Verify</button>
      </form>
    </div>
  );
}

export default App;
