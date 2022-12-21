
import '../../style/Login.css';
import { useToken } from './useToken';
import api from  '../../api';
import { useState } from "react";
import { useHistory } from "react-router-dom";

export const SignUpPage=()=>{
 
  const [token,setToken]=useToken();
    const [errorMessage, setErrorMessage] = useState('');
    const [emailValue, setEmailValue]=useState('');
    const [usernameValue, setUserNmaeValue]=useState('');
    const [passwordValue, setPasswordValue]=useState('');
    const [confirmPasswordValue, setConfirmPasswordValue]=useState('');
    const [fnameValue, setFnameValue]=useState('');
    const [lnameValue, setLnameValue]=useState('');
    const [image_urlValue, setImageUrlValue]=useState('');

const history = useHistory();


const onSignUpCllicked=async()=>{
  try{
    const response = await api.post('http://localhost:5000/auth/register'   ,{
      email:emailValue,
      password:passwordValue,
      username:usernameValue,
      fname:fnameValue,
      lname:lnameValue,
      image_url:image_urlValue
    }
    );
    history.push('/');
  }catch(error){
      console.log(error)
    }
}
return (
    <div className="content-container">
    <h1> SignUp </h1>
    {errorMessage && <div className="fail">{errorMessage}</div>}
    <input 
    value={fnameValue}
    onChange={e=>setFnameValue (e.target.value)}
    placeholder="fnameValue">
    </input> 
    <input 
    value={lnameValue}
    onChange={e=>setLnameValue(e.target.value)}
    placeholder="lnameValue">
    </input> 
    <input 
    value={usernameValue}
    onChange={e=>setUserNmaeValue(e.target.value)}
    placeholder="usernameValue">
    </input>
    <input 
    value={emailValue}
    onChange={e=>setEmailValue(e.target.value)}
    placeholder="Email@email.com">
    </input>
    <input
    value={passwordValue}
    onChange={e=>setPasswordValue(e.target.value)}
    placeholder="passwordValue "></input>
    <input 
    value={confirmPasswordValue}
    onChange={e=>setConfirmPasswordValue(e.target.value)}
    placeholder="confirmPasswordValue">
    </input>
     <input
    value={image_urlValue}
    onChange={e=>setImageUrlValue(e.target.value)}
    placeholder="image_urlValue "></input> 
    <hr></hr> 
    <button 
    disabled={
      !emailValue || !passwordValue ||
      passwordValue!==confirmPasswordValue
    }
    onClick={onSignUpCllicked} > Sign Up  </button>
    <button onClick={()=> history.push('/login')}>alrady have account</button> 
    </div>
    
    )
}