import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function IndexPage(){
  const [places,setPlaces]=useState([])
  useEffect(()=>{
  axios.get('/places').then(response=>{
  setPlaces([...response.data,...response.data,...response.data,...response.data]);
  });
  },[])
    return(    
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10 gap-x-6 gap-y-8" >
      {places.length > 0 && places.map((place=>(
        <Link to={'/place/'+place._id}>
          <div className="bg-gray-500 rounded-2xl flex">
          {place.photos?.[0] && (
            <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:4000/Uploads/'+place.photos?.[0]} alt="" />
          )}
          </div>
          <h2 className="font-bold mt-4">{place.address}</h2>
          <h3 className="text-gray-500">{place.title}</h3>
          <div className="mt-2">
            <span className="font-bold">₹ {place.price}</span>/Night</div>
        </Link>
      )))}
  </div>
  );}