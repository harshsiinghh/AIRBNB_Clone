import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../AddressLink";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";

export default function PlacePage(){
    const {id}=useParams();
    const[place,setPlace]=useState(null);
    useEffect(()=> {
    if(!id){
    return;
    }
    axios.get(`/places/${id}`).then(response=>{
    setPlace(response.data);
    });
    } ,[id]);

    if(!place) return '';

    return (
        <div className="mt-4 -mx-8 px-8 py-10 my-8 bg-gray-100">
            <h1 className="text-2xl">{place.title}</h1>
                <AddressLink>{place.address}</AddressLink>
                <PlaceGallery place={place} />
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