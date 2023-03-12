
import {Link,Navigate,redirect,useParams} from "react-router-dom"
import AccountNav from "../AccountNav";
import axios from "axios";

export default function PlacesPage(){
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

</div>
    );
}