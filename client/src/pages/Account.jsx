import { useContext, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import axios from 'axios';
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

export default function Account(){
    const {ready,user,setUser} = useContext(UserContext);
    const [toHomePage,setHomePage]=useState(null);
    let {subpage} =useParams();
    if(subpage===undefined){
        subpage='profile';
    }
async function logout(){
    await axios.post('/logout');
    setHomePage('/');
    setUser(null);
}

if(!ready){
    return 'Loading...'
}



    if(ready && !user && !toHomePage){
        return (<Navigate to ={'/login'} />);
    }


    if(toHomePage){
        return(<Navigate to ={toHomePage}/>)
    }
    return(    
    <div>
        <AccountNav/>
        {subpage === 'profile' && (
            <div className="text-center max-w-lg mx-auto mt-6"> Logged in as {user.name} ({user.email}) <br/>
            <button onClick={logout} className="primary max-w-sm mt-4">LOG OUT</button>
            </div>
        )}

        {subpage==='places' && (
            <PlacesPage/>
        )}
    </div>);

}
