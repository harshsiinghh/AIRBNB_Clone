import PerksLabel from "../PerksLabels";
import PhotoUploader from "../PhotoUploader";
import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

export default function PlacesFormPage(){
    const {id}=useParams();
    const[title,setTitle]=useState('');
    const[address,setAddress]=useState('');
    const[addedPhotos,setAddedPhotos]=useState([]);
    const[description,setDescription]=useState('');
    const[perks,setPerks]=useState([]);
    const[extraInfo,setExtraInfo]=useState('');
    const[checkIn,setCheckIn]=useState('');
    const[checkOut,setcheckOut]=useState('');
    const[maxGuest,setMaxGuest]=useState(1);
    const[redirect,setRedirect]=useState(false);

    useEffect(()=>{
        if(!id){
    return;
        }
    axios.get("/places/"+id)
    .then(response=>{
const{data}=response;
setTitle(data.title);
setAddress(data.address);
setAddedPhotos(data.photos);
setDescription(data.description);
setPerks(data.perks);
setExtraInfo(data.extraInfo);
setCheckIn(data.checkIn);
setcheckOut(data.checkOut);
setMaxGuest(data.maxGuest);
    });
    },[id]);

    async function savePlace(ev){
        const placeData={title,address,addedPhotos,description,perks,extraInfo,checkIn,checkOut,maxGuest};
        if(id){
            //update
            ev.preventDefault();
            await axios.put('/places',{id,...placeData});
            setRedirect(true);
        }else{
            //new
            ev.preventDefault();
            await axios.post('/places',placeData);
            setRedirect(true);
        }

    }

    if(redirect){
        return <Navigate to={'/account/places'} />
    }

    return(
        <div>
            <AccountNav/>
        <form onSubmit={savePlace}>
            <h2 className="text-2xl mt-4">My Place</h2>
            <input type="text" placeholder="Title" value={title} onChange={ev=>setTitle(ev.target.value)}/>
            <h2 className="text-2xl mt-4">My Address</h2>
            <input type="text" placeholder="Address" value={address} onChange={ev=>setAddress(ev.target.value)}/>
            <h2 className="text-2xl mt-4">Photos</h2>
            <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
            <h2 className="text-2xl mt-4">Description</h2>
            <input type="text" placeholder="Describe My Place" />
            <textarea value={description} onChange={ev=>setDescription(ev.target.value)}/>
            <h2 className="text-2xl mt-4">Perks</h2>
            <input type="text" placeholder="Describe Your Facilities" />
            <PerksLabel selected={perks} onChange={setPerks}/>
            <h2 className="text-2xl mt-4">Extra Information</h2>
            <input placeholder="Provide any existing extra info" />
            <textarea value={extraInfo} onChange={ev=>setExtraInfo(ev.target.value)}/>
            <h2 className="text-2xl mt-4 gap-2">Check-In Time & Check-Out Time </h2>
            <div className="grid grid-cols-3">
                <div>
                <h3 className="mt-2 -mb-2">Check-In Time</h3>
                <input type="text" placeholder="12:00PM" value={checkIn} onChange={ev=>setCheckIn(ev.target.value)} />
                </div>
                <div>
                <h3 className="mt-2 -mb-2">Check-Out Time</h3>
                <input type="text" placeholder="10:00AM" value={checkOut} onChange={ev=>setcheckOut(ev.target.value)}/>
                </div>
                <div>
                <h3 className="mt-2 -mb-2">Max Guests Allowed</h3>
                <input type="number" placeholder="2" value={maxGuest} onChange={ev=>setMaxGuest(ev.target.value)}/>
                </div>
            </div>
            <div>
                <button className="primary my-4">POST</button>
            </div>
        </form>
    </div>
    );
}