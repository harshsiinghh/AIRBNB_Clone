import axios from "axios";
import { differenceInCalendarDays, format } from "date-fns";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import PlaceImg from "../PlaceImg";

export default function BookingsPage(){
    const[bookings,setBookings]=useState([]);
    useEffect(()=>{
axios.get('/bookings').then(response =>{
setBookings(response.data);
})
    },[]);
    return(
        <div>
            <AccountNav/>
            <div>
                {bookings?.length > 0 && bookings.map(booking=>(
                    <Link to={ `/account/bookings/${booking._id}`} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden mt-4">
                        <div className="w-48 object-cover">
                            <PlaceImg place={booking.place}/>
                        </div>
                        <div className="py-3 pr-3 grow ml-4">
                            <h2 className="text-xl"> {booking.place.title} </h2>
                            <div className="flex gap-2 mt-2 border-t border-gray-300 pt-2 text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                            </svg>
                            {format(new Date (booking.checkIn), 'dd-MM-yyyy')}  
                            &rarr;
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                            </svg>
                            {format(new Date (booking.checkOut), 'dd-MM-yyyy')}
                            </div>
                            <div className="text-xl pt-2">
                            {differenceInCalendarDays(new Date(booking.checkOut),new Date(booking.checkIn))} NIGHTS || 
                            Amount Paid : ₹{booking.price}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}