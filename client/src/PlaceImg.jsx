export default function PlaceImg({place,index=0}){
    if(!place.photos?.length){
        return'GHello';
    }
    return (
        <img className="object-cover" src={'http://localhost:4000/Uploads/'+place.photos[index]} alt="" />
    );
}