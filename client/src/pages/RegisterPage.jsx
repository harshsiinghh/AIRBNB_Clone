import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function RegisterPage(){
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    async function registerUser(ev){
        ev.preventDefault();
        try{
            await axios.post('/register',{
                name,
                email,
                password,
            });
            alert("Registration Succesful")
        } catch(e){
            alert("Registration Failed. Try Again")
        }

    }
    return(<div className="mt-6 grow flex items-center justify-around">
        <div className="mb-60">        
            <h1 className="text-4xl text-center mb-6 mt-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
            <input type="text" placeholder="Enter your name" value={name} onChange={ev=> setName(ev.target.value)}/>
            <input type="email" placeholder="yourid@email.com" value={email} onChange={ev=> setEmail(ev.target.value)}/>
            <input type="password" placeholder="Password" value={password} onChange={ev=> setPassword(ev.target.value)} />
            <button className="primary mt-1 py-4 text-xl">Register</button>
            <div className="text-center p-2">Already have an account?
            <Link className="underline text-gray-800 font-bold" to={"/login"}>Login</Link></div>
        </form></div>

    </div>);
}