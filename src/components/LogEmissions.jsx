import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Flight from "./Flight";
import Vehicle from "./Vehicle";
import Shipping from "./Shipping";
import Electricity from "./Electricity";
import Fuel from "./Fuel";
import Diet from "./Diet";


function LogEmissions(props) {

    const navigate = useNavigate();

    const user = props.user;

    useEffect(() => {
        if (user === null) {
            navigate('/signin');
        }
    }, [])

    const [choice, setChoice] = useState('');

    return (
        <div className="h-screen">
            <div className="bg-gradient-to-tr from-gray-200 to-gray-400 h-screen w-full relative">
                <img src="https://image.slidesdocs.com/responsive-images/docs/an-abstract-light-gray-texture-with-mottled-wall-pattern-page-border-background-word-template_16e1a73f2e__1131_1600.jpg" alt="clouds" className="fixed w-full h-full object-cover mix-blend-overlay" />
                <div className="text-center pt-10">
                    <h3 className="text-center relative text-4xl font-thin mb-4">CHOOSE EMISSION TYPE</h3>
                    <button onClick={() => setChoice('Electricity')} className="py-2.5 px-4 m-2 text-lg font-medium relative text-gray-700 bg-gray-300 rounded-full border border-gray-200 hover:bg-gray-200 hover:text-gray-950 focus:z-10 focus:bg-green-600 focus:text-gray-50 focus:ring-2 focus:ring-green-800 focus:border-green-800">ELECTRICITY</button>
                    <button onClick={() => setChoice('Flight')} className="py-2.5 px-4 m-2 text-lg font-medium relative text-gray-700 bg-gray-300 rounded-full border border-gray-200 hover:bg-gray-200 hover:text-gray-950 focus:z-10 focus:bg-green-600 focus:text-gray-50 focus:ring-2 focus:ring-green-800 focus:border-green-800">FLIGHT</button>
                    <button onClick={() => setChoice('Shipping')} className="py-2.5 px-4 m-2 text-lg font-medium relative text-gray-700 bg-gray-300 rounded-full border border-gray-200 hover:bg-gray-200 hover:text-gray-950 focus:z-10 focus:bg-green-600 focus:text-gray-50 focus:ring-2 focus:ring-green-800 focus:border-green-800">SHIPPING</button>
                    <button onClick={() => setChoice('Vehicle')} className="py-2.5 px-4 m-2 text-lg font-medium relative text-gray-700 bg-gray-300 rounded-full border border-gray-200 hover:bg-gray-200 hover:text-gray-950 focus:z-10 active:bg-green-600 focus:bg-green-600 target:bg-green-600 focus:text-gray-50 focus:ring-2 focus:ring-green-800 focus:border-green-800" type="button">VEHICLE</button>
                    <button onClick={() => setChoice('Fuel')} className="py-2.5 px-4 m-2 text-lg font-medium relative text-gray-700 bg-gray-300 rounded-full border border-gray-200 hover:bg-gray-200 hover:text-gray-950 focus:z-10 focus:bg-green-600 focus:text-gray-50 focus:ring-2 focus:ring-green-800 focus:border-green-800">FUEL COMBUSTION</button>
                </div>
                <div id="show-component" className="relative">
                    { ( choice === "Electricity" ) && <Electricity user={user} />}
                    { ( choice === "Flight" ) && <Flight user={user} />}
                    { ( choice === "Shipping" ) && <Shipping user={user} />}
                    { ( choice === "Vehicle" ) && <Vehicle user={user} />}
                    { ( choice === "Fuel" ) && <Fuel user={user} />}
                    { ( choice === "Diet" ) && <Diet user={user} />}
                </div>
            </div>
            
        </div>
    )
}

export default LogEmissions;