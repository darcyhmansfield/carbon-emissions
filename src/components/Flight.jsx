import { useState } from "react";
import axios from "axios";


function Flight() {

    const [passengers, setPassengers] = useState()
    const [departure, setDeparture] = useState('')
    const [destination, setDestination] = useState('')

    const flightCalc = (e) => {

        e.preventDefault();
    
        const requestData = {
            type: 'flight',
            passengers: passengers,
            legs: [
                {departure_airport: departure, 
                destination_airport: destination}
            ]
        };
    
        // Calculate the carbon emissions using Carbon Interface
    
        const endpoint = 'https://www.carboninterface.com/api/v1/estimates';
        const apiKey = '1YtZgVx0AlwIiuk9pw9wA';

        axios.post(endpoint, requestData, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className="text-center justify-center mt-10">
            <h1>Flights</h1>
            <form className="mx-auto" onSubmit={flightCalc}>
                <label className="mb-2 font-medium text-gray-900">Passengers</label>
                <div className="flex py-3 mx-auto mb-4 w-50 overflow-hidden rounded-md bg-white shadow shadow-black/20">
                    <input required className="block text-center font-medium text-xl w-full flex-1 py-2 px-3 focus:outline-none" type="integer" placeholder="2" onChange={(e) => setPassengers(e.target.value)} />
                </div>


                <label className="mb-2 font-medium text-gray-900">Departure Airport Code</label>
                <div className="flex py-3 mx-auto mb-4 w-50 overflow-hidden rounded-md bg-white shadow shadow-black/20">
                    <input required className="block text-center font-medium text-xl w-full flex-1 py-2 px-3 focus:outline-none" id="departure" type="text" placeholder="MEL" onChange={(e) => setDeparture(e.target.value)} />
                </div>

                <label className="mb-2 font-medium text-gray-900">Desitnation Airport Code</label>
                <div className="flex py-3 mx-auto mb-4 w-50 overflow-hidden rounded-md bg-white shadow shadow-black/20">
                    <input required className="block text-center font-medium text-xl w-full flex-1 py-2 px-3 focus:outline-none" id="destination" type="text" placeholder="DPS" onChange={(e) => setDestination(e.target.value)} />
                </div>

                <button className="text-white w-50 font-bold text-xl mt-3 shadow bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 rounded-lg px-5 py-2.5 text-center mr-2 mb-2" type="submit" id="fetch">Calculate</button>
            </form>
        </div>
    )
}

export default Flight;