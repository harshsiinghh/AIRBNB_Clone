import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext.jsx";


export default function LoginPage(){
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [redirect,setRedirect]=useState(false);
    const {setUser}=useContext(UserContext);

    async function handleLogin(ev){
        ev.preventDefault();
        try{
            const {data}=await axios.post('/login',{email,password});
            setUser(data);
            alert("login Succesful");
            setRedirect(true);

        } catch(e){
            alert("Login Failed");
        }
    }

    if(redirect){
        return <Navigate to={'/'}/>
    }
    return(<div className="mt-6 grow flex items-center justify-around">
        <div className="mb-60">        
            <h1 className="text-4xl text-center mb-6 mt-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLogin}>
            <input type="email" placeholder="yourid@email.com" 
            value={email} 
            onChange={ev=> setEmail(ev.target.value)}/>
            <input type="password" placeholder="Password" 
            value={password} 
            onChange={ev=> setPassword(ev.target.value)} />
            <button className="primary mt-1 py-4 text-xl">Login</button>
            <div className="text-center p-2">Dont have an account yet?
            <Link className="underline text-gray-800 font-bold" to={"/register"}>Register Now</Link></div>
        </form></div>

    </div>)
}