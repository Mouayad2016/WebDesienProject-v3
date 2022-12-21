
import '../../style/Login.css';

import { useState } from "react";
import { useHistory } from "react-router-dom";
import api from  '../../api';
import { useToken } from './useToken';

export const LogInPage =()=>{
    const [token,setToken]=useToken();
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');

const history = useHistory();


const onLoginCllicked=async()=>{
        const response = await api.post('http://localhost:5000/auth/login'   ,{
      email:email,
      password:password
    }
    );
    const {token} = response.data;
    // console.log(response.data)
    setToken(token);
    console.log(token)
    history.push('/');
}

return (
    <div className="content-container">
    <h1>Log In</h1>
    {errorMessage && <div className="fail">{errorMessage}</div>}
    <input 
    value={email}
    onChange={e=>setEmail(e.target.value)}
    placeholder="Email@email.com">
    </input>
    <input
    value={password}
    onChange={e=>setPassword(e.target.value)}
    placeholder="password "></input>
    <hr></hr>
    <button 
    disabled={!email || !password}
    onClick={onLoginCllicked} >Log in </button>
    <button onClick={()=> history.push('/forgot-password')}>Forgot password </button>
    <button onClick={()=> history.push('/signup')}> Dont have a account</button>
    </div>
)

}