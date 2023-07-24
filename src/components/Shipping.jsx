import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useState } from "react";
import axios from "axios";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

function Shipping(props) {

    const navigate = useNavigate()

    const user = props.user;
    let date = '';

    const [chosenDate, setChosenDate] = useState('');
    const [transport, setTransport] = useState('');
    const [weight, setWeight] = useState(null);
    const [distance, setDistance] = useState(null);

    const shippingCalc = (e) => {

        e.preventDefault();

        // If no date specified then set date to today, otherwise change chosen date to timestamp
        if (chosenDate === '') {
            date = new Date();
        } else {
            let dateParts = chosenDate.split('/');
            date = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
        }

        console.log(transport, Number(weight), distance)

        const requestData = {
            "type": "shipping",
            "weight_value": Number(weight),
            "weight_unit": "g",
            "distance_value": Number(distance),
            "distance_unit": "km",
            "transport_method": transport.toLowerCase()
        };
    
        // Calculate the carbon emissions using Carbon Interface
    
        const endpoint = 'https://www.carboninterface.com/api/v1/estimates';
        const apiKey = '1YtZgVx0AlwIiuk9pw9wA';

        axios.post(endpoint, requestData, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            addToFirestore(response.data);
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    const addToFirestore = async (data) => {
        console.log(date)
        // Add data to Firestore
        try {
            const docRef = await addDoc(collection(db, `userDetails/${user.uid}/shippingEmissions`), {
                user: user.uid,
                date: date,
                emissions: data.data.attributes.carbon_kg,
                method: transport.toLowerCase(),
                weight: Number(weight),
                distance: Number(distance)
            })
            navigate('/dashboard')
        } catch (e) {
            console.log(e);
        }
    }

    return (    
        <div className="text-center justify-center mt-10">
            <h1 className="mb-4 font-thin">SHIPPING EMISSIONS</h1>
            <form className="mx-auto" onSubmit={shippingCalc}>

                <label className="mb-2 font-medium text-gray-900">Date</label>
                <div className="flex py-3 mx-auto mb-4 w-50 overflow-hidden rounded-md bg-white shadow shadow-black/20">
                    <input className="block text-center font-medium text-xl w-full flex-1 py-2 px-3 focus:outline-none" type="text" placeholder="dd/mm/yyyy" value={chosenDate} onChange={(e) => setChosenDate(e.target.value)} />
                </div>

                <label className="mb-2 font-medium text-gray-900">Transport Method (ship, train, truck or plane)</label>
                <div className="flex py-3 mx-auto mb-4 w-50 overflow-hidden rounded-md bg-white shadow shadow-black/20">
                    <input required className="block text-center font-medium text-xl w-full flex-1 py-2 px-3 focus:outline-none" type="integer" placeholder="Truck" onChange={(e) => setTransport(e.target.value)} />
                </div>


                <label className="mb-2 font-medium text-gray-900">Weight (g)</label>
                <div className="flex py-3 mx-auto mb-4 w-50 overflow-hidden rounded-md bg-white shadow shadow-black/20">
                    <input required className="block text-center font-medium text-xl w-full flex-1 py-2 px-3 focus:outline-none" id="departure" type="number" placeholder="200" onChange={(e) => setWeight(e.target.value)} />
                </div>

                <label className="mb-2 font-medium text-gray-900">Distance (km)</label>
                <div className="flex py-3 mx-auto mb-4 w-50 overflow-hidden rounded-md bg-white shadow shadow-black/20">
                    <input required className="block text-center font-medium text-xl w-full flex-1 py-2 px-3 focus:outline-none" id="destination" type="number" placeholder="1000" onChange={(e) => setDistance(e.target.value)} />
                </div>

                <button className="text-white w-50 font-bold text-xl mt-3 shadow bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 rounded-lg px-5 py-2.5 text-center mr-2 mb-2" type="submit" id="fetch">Calculate</button>
            </form>
        </div>
    )
    
}

export default Shipping;