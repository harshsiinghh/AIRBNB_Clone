import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
            <div className="absolute inset-0 bg-white min-h-screen">
                <div className="p-6 grid gap-6 items-center">
                {place?.photos?.length >0 && place.photos.map(photo=>(
                        <div>
                            <img src={'http://localhost:4000/Uploads/'+photo} alt="" />
                        </div>
                    ))};
                </div>
            </div>
        )
    }
    return (
        <div className="mt-4 -mx-8 px-8 py-10 my-8 bg-gray-100">
            <h1 className="text-2xl">{place.title}</h1>
            <a target="_blank" className="my-2 block font-semibold underline" href={"https://maps.google.com/?q="+place.address}>{place.address}</a>
            <div className="relative">
            <div className="mt-8 grid gap-2 lg:grid-cols-[2fr_1fr_1fr] md:grid-cols-[2fr_1fr]"> 
            <div>
                {place.photos?.[0] && (
                    <div>
                        <img className="aspect-square object-cover" src={'http://localhost:4000/Uploads/'+ place.photos[0]} alt="" />
                    </div>

                )}
            </div>
            <div className="grid">
                {place.photos?.[1] && (
                    <img className="aspect-square object-cover" src={'http://localhost:4000/Uploads/'+ place.photos[1]} alt="" />
                )}
                <div className="overflow-hidden">
                {place.photos?.[2] && (
                    <img className="aspect-square object-cover relative top-2" src={'http://localhost:4000/Uploads/'+ place.photos[2]} alt="" />
                )}

                </div>
            </div>
            <div className="grid lg:visible md:invisible">
                {place.photos?.[3] && (
                    <img className="aspect-square object-cover" src={'http://localhost:4000/Uploads/'+ place.photos[3]} alt="" />
                )}
                <div className="overflow-hidden">
                {place.photos?.[4] && (
                    <img className="aspect-square object-cover relative top-2" src={'http://localhost:4000/Uploads/'+ place.photos[4]} alt="" />
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

        </div>
    )
}