import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import { differenceInCalendarDays, format } from "date-fns";
export default function BookingPage(){
    const {id}=useParams();
    const [booking,setBooking]=useState(null);
    useEffect(()=>{
        if(id){
            axios.get('/bookings').then(response => {
                const foundBooking=response.data.find( ({_id})=>_id===id )
                if(foundBooking){
                setBooking(foundBooking);
                }
            })
        }
    },[id])

    if(!booking){
        return '';
    }
    return(
        <div className="mt-6"> 
            <h1 className=" text-3xl">{booking.place.title}</h1>
            <AddressLink className="my-2 block">{booking.place.address} </AddressLink>
            <div className="bg-gray-200 p-4 rounded-2xl mt-4 mb-10">
            <h2 className="text-xl">Your Booking Information</h2>
            <div className="flex gap-2 mt-2 border-t mb-2 border-gray-300 pt-2  text-gray-700">
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
                            {differenceInCalendarDays(new Date(booking.checkOut),new Date(booking.checkIn))} NIGHTS
                            <h2 className="w-48 bg-primary rounded-2xl p-2 items-center mt-4 text-center text-white">Booking Confirmed</h2>
            </div>
            <PlaceGallery place={booking.place}/>
        </div>
    )
}