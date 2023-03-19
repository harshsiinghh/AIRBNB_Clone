import { useContext, useEffect, useState } from "react";
import {differenceInCalendarDays} from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./userContext";

export default function BookingWidget({place}){
    const[checkIn,setCheckIn]=useState('');
    const[checkOut,setCheckOut]=useState('');
    const[name,setName]=useState('');
    const[mobile,setMobile]=useState('');
    const[redirect,setRedirect]=useState('');
    const[maxGuest,setMaxGuest]=useState(1);
    const {user}= useContext(UserContext);

useEffect(()=>{
    if (user){
        setName=(user.name);
    }
},[user]);

    let numberOfDays=0;
    if(checkIn && checkOut){
        numberOfDays=differenceInCalendarDays(new Date(checkOut),new Date(checkIn));
    }
    async function bookThisPlace(){
       const response= await axios.post('/bookings',{checkIn,checkOut,maxGuest,name,mobile,place:place._id,price:numberOfDays*place.price});
       const bookindId=response.data._id;
       setRedirect(`/account/bookings/${bookindId}`)
    }
if(redirect){
    return <Navigate to={redirect}/>
}

    return(
        <div className="bg-white shadow shadow-black rounded-2xl p-5">
                        <div className="text-xl font-bold text-center">
                         ₹ {place.price} Per Night
                        </div>
                        <div className="rounded-2xl border">
                            <div className="grid grid-cols-2">
                            <div className="py-4 px-2">
                                <label>Check-In </label>
                                <input type="date" value={checkIn} onChange={ev =>setCheckIn(ev.target.value)}/>
                            </div>
                            <div className="py-4 px-2 border-l">
                                <label>Check-Out </label>
                                <input type="date" value={checkOut} onChange={ev =>setCheckOut(ev.target.value)}/>
                            </div>
                            </div>
                            <div>
                            <div className="py-4 px-2 border-t">
                                <label>Number of Guests </label>
                                <input type="number" value={maxGuest} onChange={ev =>setMaxGuest(ev.target.value)}/>
                            </div>
                            </div>
                            {numberOfDays> 0 && (
                                <div>
                                <div className="py-4 px-2 border-t">
                                <label>Enter Your Full Name </label>
                                <input type="text" value={name} placeholder="Your Name" onChange={ev =>setName(ev.target.value)}/>
                                </div>
                                <div className="py-4 px-2 border-t">
                                <label>Enter Mobile Number </label>
                                <input type="tel" value={mobile} placeholder="+91-" onChange={ev =>setMobile(ev.target.value)}/>
                                </div>
                                </div>
                            )}
                        </div>
                        <button onClick={bookThisPlace} className="primary mt-5">
                            PAY 
                            {numberOfDays>0 && (
                                <span> ₹{numberOfDays * place.price}</span>
                            )}

                        </button>
                    </div>
    )
}