import React, { useState, useEffect, Fragment, useContext } from 'react';
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from '../firebase';
import BarChart from './Charts/BarChart';

function Dashboard(props) {

    // collect user details
    const user = props.user;

    // collect firebase collections
    const electricityRef = collection(db, `userDetails/${user.uid}/electricityEmissions`);
    const vehicleRef = collection(db, `userDetails/${user.uid}/vehicleEmissions`);
    const flightRef = collection(db, `userDetails/${user.uid}/flightEmissions`);
    const shippingRef = collection(db, `userDetails/${user.uid}/shippingEmissions`);

    const currentUserId = user ? user.uid : null;

    const [loading, setLoading] = useState(false);
    const [electricityData, setElectricityData] = useState([]);
    const [vehicleData, setVehicleData] = useState([]);
    const [flightData, setFlightData] = useState([]);
    const [shippingData, setShippingData] = useState([]);

    let date = new Date();
    let dateArray = [];
    let eDateArray = [];
    let vDateArray = [];
    let fDateArray = [];
    let sDateArray = [];
    let eEmissionsArray = [0,0,0,0,0,0,0,0];
    let vEmissionsArray = [0,0,0,0,0,0,0,0];
    let fEmissionsArray = [0,0,0,0,0,0,0,0];
    let sEmissionsArray = [0,0,0,0,0,0,0,0];

    // set date array as previous 7 days (including current day)
    for (let i = 0; i<=6; i++) {
        const day = new Date(date.getTime() - (i * 24 * 60 * 60 * 1000))
        dateArray.push(`${day.getDate()}/${day.getMonth()+1}/${day.getFullYear()}`)
    }

    useEffect(() => {

        setLoading(true);
        
        const unsub = onSnapshot(electricityRef, (querySnapshot) => {
            const electricityItems = [];
            console.log('query:', querySnapshot);
            querySnapshot.forEach((doc) => {
                electricityItems.push(doc.data());
                console.log('elec:', electricityItems)
            });
            setLoading(false);
            setElectricityData(electricityItems);
        });

        return () => {
            unsub();
        };
        
    }, []);

    useEffect(() => {
        if (electricityData.length !== 0) {
            for (let i = 0; i<electricityData.length; i++) {
                const newDate = new Date(electricityData[i].date.seconds * 1000)
                eDateArray.push(`${newDate.getDate()}/${newDate.getMonth()+1}/${newDate.getFullYear()}`)
                const index = dateArray.indexOf(eDateArray[i]);
                eEmissionsArray[index] = electricityData[i].emissions
            }
            console.log('e:',eEmissionsArray)
        }
    }, [electricityData])

    useEffect(() => {

        setLoading(true);
        
        const unsub = onSnapshot(vehicleRef, (querySnapshot) => {
            const vehicleItems = [];
            querySnapshot.forEach((doc) => {
                vehicleItems.push(doc.data());
            });
            setLoading(false);
            setVehicleData(vehicleItems);
        });
        return () => {
            unsub();
        };
    }, []);

    useEffect(() => {
        if (vehicleData.length !== 0) {
            for (let i = 0; i<vehicleData.length; i++) {
                const newDate = new Date(vehicleData[i].date.seconds * 1000)
                eDateArray.push(`${newDate.getDate()}/${newDate.getMonth()+1}/${newDate.getFullYear()}`)
                const index = dateArray.indexOf(eDateArray[i]);
                vEmissionsArray[index] = vehicleData[i].emissions
            }
            console.log(vEmissionsArray)
        }
    }, [vehicleData])

    useEffect(() => {

        setLoading(true);
        
        const unsub = onSnapshot(flightRef, (querySnapshot) => {
            const flightItems = [];
            querySnapshot.forEach((doc) => {
                flightItems.push(doc.data());
            });
            setLoading(false);
            setFlightData(flightItems);
            console.log(flightItems[0])
        });
        return () => {
            unsub();
        };
    }, []);

    useEffect(() => {
        if (flightData.length !== 0) {
            for (let i = 0; i<flightData.length; i++) {
                const newDate = new Date(flightData[i].date.seconds * 1000)
                eDateArray.push(`${newDate.getDate()}/${newDate.getMonth()+1}/${newDate.getFullYear()}`)
                const index = dateArray.indexOf(eDateArray[i]);
                if (index !== -1) {
                    fEmissionsArray[index] = flightData[i].emissions
                }
            }
            console.log(fEmissionsArray)
        }
    }, [flightData])

    useEffect(() => {

        setLoading(true);
        
        const unsub = onSnapshot(shippingRef, (querySnapshot) => {
            const shippingItems = [];
            querySnapshot.forEach((doc) => {
                shippingItems.push(doc.data());
            });
            setLoading(false);
            setShippingData(shippingItems);
        });
        return () => {
            unsub();
        };
    }, []);

    return (
        <div className="w-screen">
            <div className="bg-gradient-to-tr from-gray-200 to-gray-400 h-screen w-full relative">
                <img src="https://image.slidesdocs.com/responsive-images/docs/an-abstract-light-gray-texture-with-mottled-wall-pattern-page-border-background-word-template_16e1a73f2e__1131_1600.jpg" alt="clouds" className="fixed w-full object-cover mix-blend-overlay" />
                <div className="p-24 w-4/6 mx-auto">
                    <h1 className="text-center relative text-6xl font-thin mb-4">DASHBOARD</h1>
                    <h3 className="font-thin text-center relative mt-5">FLIGHT EMISSIONS</h3>
                    <BarChart className="relative p-5" data={fEm} label={"Flight Emissions"} color={"aqua"} />
                    <h3 className="font-thin text-center relative mt-5">SHIPPING EMISSIONS</h3>
                    <BarChart className="relative" data={sEm} label={"Flight Emissions"} color={"blue"} />
                    <h3 className="font-thin text-center relative mt-5">VEHICLE EMISSIONS</h3>
                    <BarChart className="relative" data={vEm} label={"Flight Emissions"} color={"red"} />
                    <h3 className="font-thin text-center relative mt-5">ELECTRICITY EMISSIONS</h3>
                    <BarChart className="relative" data={eEm} label={"Flight Emissions"} color={"green"} />
                </div>
            </div>
        </div>
    ) 
}

export default Dashboard;