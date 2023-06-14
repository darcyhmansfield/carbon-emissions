import { useState } from "react";
import Flight from "./Flight";
import Vehicle from "./Vehicle";
import Shipping from "./Shipping";
import Electricity from "./Electricity";
import Fuel from "./Fuel";
import Diet from "./Diet";


function LogEmissions(props) {

    const [choice, setChoice] = useState('');



    return (
        <div>
            <div className="text-center">
                <h3 className="text-center">Choose Emission Type</h3>
                <button onClick={() => setChoice('Electricity')} className="py-2.5 px-4 m-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full border border-gray-200 hover:bg-gray-200 hover:text-gray-950 focus:z-10 focus:bg-green-600 focus:text-gray-50 focus:ring-2 focus:ring-green-800 focus:border-green-800">ELECTRICITY</button>
                <button onClick={() => setChoice('Flight')} className="py-2.5 px-4 m-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full border border-gray-200 hover:bg-gray-200 hover:text-gray-950 focus:z-10 focus:bg-green-600 focus:text-gray-50 focus:ring-2 focus:ring-green-800 focus:border-green-800">FLIGHT</button>
                <button onClick={() => setChoice('Shipping')} className="py-2.5 px-4 m-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full border border-gray-200 hover:bg-gray-200 hover:text-gray-950 focus:z-10 focus:bg-green-600 focus:text-gray-50 focus:ring-2 focus:ring-green-800 focus:border-green-800">SHIPPING</button>
                <button onClick={() => setChoice('Vehicle')} className="py-2.5 px-4 m-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full border border-gray-200 hover:bg-gray-200 hover:text-gray-950 focus:z-10 active:bg-green-600 focus:bg-green-600 target:bg-green-600 focus:text-gray-50 focus:ring-2 focus:ring-green-800 focus:border-green-800" type="button">VEHICLE</button>
                <button onClick={() => setChoice('Fuel')} className="py-2.5 px-4 m-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full border border-gray-200 hover:bg-gray-200 hover:text-gray-950 focus:z-10 focus:bg-green-600 focus:text-gray-50 focus:ring-2 focus:ring-green-800 focus:border-green-800">FUEL COMBUSTION</button>
                <button onClick={() => setChoice('Diet')} className="py-2.5 px-4 m-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full border border-gray-200 hover:bg-gray-200 hover:text-gray-950 focus:z-10 focus:bg-green-600 focus:text-gray-50 focus:ring-2 focus:ring-green-800 focus:border-green-800">DIET</button>
            </div>
            <div id="show-component">
                { ( choice === "Electricity" ) && <Electricity />}
                { ( choice === "Flight" ) && <Flight />}
                { ( choice === "Shipping" ) && <Shipping />}
                { ( choice === "Vehicle" ) && <Vehicle />}
                { ( choice === "Fuel" ) && <Fuel />}
                { ( choice === "Diet" ) && <Diet />}
            </div>
        </div>
    )
}

export default LogEmissions;