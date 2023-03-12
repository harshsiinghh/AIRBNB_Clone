
import {Link,Navigate,redirect,useParams} from "react-router-dom"
import AccountNav from "../AccountNav";
import axios from "axios";
import { useEffect, useState } from "react";

export default function PlacesPage(){
const[places,setPlaces]=useState([]);
useEffect(() => {
    axios.get("/places").then(({data})=>{
setPlaces(data);
    });
},[]);

    return(
<div>
    <AccountNav/>
    <div className="w-full flex justify-center mt-8 mb-8 gap-2">
    <Link className="inline-flex bg-primary py-2 px-4 text-white rounded-full  gap-2">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>

    Add New Places 
    </Link>
</div>
<div className="mt-4">
    {places.length > 0 && places.map(place=>(
        <Link to={'/account/places/'+place._id}className="flex gap-4 cursor-pointer bg-gray-200 rounded-2xl p-5">
            <div className="w-32 h-32 bg-gray-300 grow shrink-0">
                <img src={place.photos[0]} alt="" />
            </div>
            <div className="grow-0 shrink">
            <h2 className="text-xl "> {place.title}</h2>
            <p className="text-sm mt-2"> {place.description} </p>
            </div>

        </Link>
    ))}
</div>

</div>
    );
}