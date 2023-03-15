export default function BookingWidget({place}){
    return(
        <div className="bg-white shadow shadow-black rounded-2xl p-5">
                        <div className="text-xl font-bold text-center">
                         ₹ {place.price} Per Night
                        </div>
                        <div className="rounded-2xl border">
                            <div className="grid grid-cols-2">
                            <div className="py-4 px-2">
                                <label>Check-In </label>
                                <input type="date" />
                            </div>
                            <div className="py-4 px-2 border-l">
                                <label>Check-Out </label>
                                <input type="date"/>
                            </div>
                            </div>
                            <div>
                            <div className="py-4 px-2 border-t">
                                <label>Number of Guests </label>
                                <input type="number" value={1}/>
                            </div>
                            </div>
                        </div>
                        <button className="primary mt-5">
                            BOOK NOW
                        </button>
                    </div>
    )
}