import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../BookingWidget";

export default function PlacePage(){
    const {id}=useParams();
    const[place,setPlace]=useState(null);
    const[showAll,setShowAll]=useState(false);
    useEffect(()=> {
    if(!id){
    return;
    }
    axios.get(`/places/${id}`).then(response=>{
    setPlace(response.data);
    });
    } ,[id]);

    if(!place) return '';
    if(showAll){
        return(
            <div className="absolute inset-0 bg-black min-h">
                <div className=" bg-black p-6 grid gap-6">
                    <div>
                        <h2 className="text-3xl text-white mb-6">Photos of {place.title}</h2>
                        <h2 className="text-xl text-white mb-6">{place.address}</h2>

                        <button onClick={()=>setShowAll(false)} className="bg-white font-semibold flex gap-2 fixed py-2 px-4 right-12 top-8 shaodow shadow-black-500 rounded-2xl ml-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                            Close Photo
                        </button>
                    </div>
                {place?.photos?.length >0 && place.photos.map(photo=>(
                        <div>
                            <img className="rounded-2xl" src={'http://localhost:4000/Uploads/'+photo} alt="" />
                        </div>
                    ))};
                </div>
            </div>
        )
    }
    return (
        <div className="mt-4 -mx-8 px-8 py-10 my-8 bg-gray-100">
            <h1 className="text-2xl">{place.title}</h1>
            <a target="_blank" className="flex gap-1 my-2 block font-semibold underline" href={"https://maps.google.com/?q="+place.address}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
                {place.address}
                </a>
            <div className="relative">
            <div className="mt-8 grid gap-2 lg:grid-cols-[2fr_1fr_1fr] md:grid-cols-[2fr_1fr] rounded-2xl overflow-hidden"> 
            <div>
                {place.photos?.[0] && (
                    <div>
                        <img  onClick={()=>setShowAll(true)}  className="cursor-pointer aspect-square object-cover" src={'http://localhost:4000/Uploads/'+ place.photos[0]} alt="" />
                    </div>

                )}
            </div>
            <div className="grid">
                {place.photos?.[1] && (
                    <img onClick={()=>setShowAll(true)}  className="cursor-pointer aspect-square object-cover" src={'http://localhost:4000/Uploads/'+ place.photos[1]} alt="" />
                )}
                <div className="overflow-hidden">
                {place.photos?.[2] && (
                    <img  onClick={()=>setShowAll(true)} className="cursor-pointer aspect-square object-cover relative top-2" src={'http://localhost:4000/Uploads/'+ place.photos[2]} alt="" />
                )}

                </div>
            </div>
            <div className="grid lg:visible md:invisible">
                {place.photos?.[3] && (
                    <img onClick={()=>setShowAll(true)}  className="cursor-pointer aspect-square object-cover" src={'http://localhost:4000/Uploads/'+ place.photos[3]} alt="" />
                )}
                <div className="overflow-hidden">
                {place.photos?.[4] && (
                    <img onClick={()=>setShowAll(true)}  className="cursor-pointer aspect-square object-cover relative top-2" src={'http://localhost:4000/Uploads/'+ place.photos[4]} alt="" />
                )}

                </div>

            </div>
            </div>

            <button onClick={()=>setShowAll(true)} className="flex gap-2 absolute bottom-2 right-2 bg-white px-4 py-2 shadow shadow-md shadow-gray-500 rounded-2xl" >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
            </svg>
            Show More Photos</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 mt-10 mb-6">
                <div className="text-lg">
                <div>
                <h2 className="font-semibold text-2xl mt-4 mb-4">Description</h2>
                {place.description}
                </div>
                <div className="mt-4 font-semibold " >
                    Check-In: {place.checkIn} <br />
                    Check-Out: {place.checkOut}<br />
                    maxGuest: {place.maxGuest}
                </div>
                </div>
                <div>
                    <BookingWidget place={place}/>
                </div>

            </div>
            <div className="bg-white border-t">
            <div>
            <h2 className="font-semibold text-2xl mt-4 mb-4">Extra Information</h2>
            <div className="text-gray-700 mt-4 text-sm leading-6">
                {place.extraInfo}
            </div>
            </div>
            </div>
            

        </div>
    )
}