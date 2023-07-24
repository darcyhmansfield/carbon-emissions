import { useState } from "react";
import axios from "axios";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

function Electricity (props) {

    const navigate = useNavigate();

    const user = props.user;
    let date = '';

    const ausStates = {
        'ACT': 'Australian Capital Territory',
        'NSW': 'New South Wales',
        'NT': 'Northern Territory',
        'QLD': 'Queensland',
        'SA': 'South Australia',
        'TAS': 'Tasmania',
        'VIC': 'Victoria',
        'WA': 'Western Australia'
    }

    const [date1, setDate1] = useState('');
    const [date2, setDate2] = useState('');
    const [state, setState] = useState('');
    const [energy, setEnergy] = useState('');
    const [stateDropdown, setStateDropdown] = useState(false);

    const electricityCalc = async (e) => {

        e.preventDefault();

        if (date1 === '') {
            date = new Date();
        } else {
            let dateParts = date1.split('/');
            date = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
        }

        const endpoint = 'https://beta4.api.climatiq.io/estimate';
        const apiKey = 'ND7MNVVST3MK8CQZCB4JTJWWPVXE'

        const requestData = {
            "emission_factor": {
                "activity_id": "electricity-supply_grid-source_supplier_mix",
                "source": "DISER",
                "region": `AU-${state}`,
                "year": 2021,
                "source_lca_activity": "electricity_consumption",
                "data_version": "^1"
            },
            "parameters": {
                "energy": Number(energy),
                "energy_unit": "kWh"
            }
        }

        axios.post(endpoint, requestData, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            addToFirestore(response.data);
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        })

        // try {
        //     const response = await axios.post(endpoint, requestData, {
        //         headers: {
        //             'Authorization': `Bearer ${apiKey}`,
        //             'Content-Type': 'application/json'
        //         },
        //     })
        //     console.log('Working', date1, date2)
        //     console.log(response.data);
        // } catch (error) {
        //     console.log(error);
        // }
    }

    const addToFirestore = async (data) => {
        // Add data to Firestore
        try {
            const docRef = await addDoc(collection(db, `userDetails/${user.uid}/electricityEmissions`), {
                user: user.uid,
                date: date,
                emissions: data.co2e,
                region: state,
                energy: Number(energy),
            })
            navigate('/dashboard')
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="text-center justify-center mt-10">
            <h1 className="font-thin">ELECTRICITY EMISSIONS</h1>
            <form className="mx-auto" onSubmit={electricityCalc}>
                <label className="mb-2 font-medium text-gray-900">From</label>
                <div className="flex py-3 mx-auto mb-4 w-50 overflow-hidden rounded-md bg-white shadow shadow-black/20">
                    <input className="block text-center font-medium text-xl w-full flex-1 py-2 px-3 focus:outline-none" type="text" placeholder="dd/mm/yyyy" onChange={(e) => setDate1(e.target.value)} />
                </div>


                <label className="mb-2 font-medium text-gray-900">To</label>
                <div className="flex py-3 mx-auto mb-4 w-50 overflow-hidden rounded-md bg-white shadow shadow-black/20">
                    <input className="block text-center font-medium text-xl w-full flex-1 py-2 px-3 focus:outline-none"  type="text" placeholder="dd/mm/yyyy" onChange={(e) => setDate2(e.target.value)} />
                </div>

                <label className="mb-2 font-medium text-gray-900">State/Territory</label>
                <div className="flex py-3 mx-auto mb-4 w-50 overflow-hidden rounded-md bg-white shadow shadow-black/20">
                    <input className="block text-center font-medium text-xl w-full h-full py-2 flex-1 px-3 focus:outline-none" type="text" placeholder="VIC" value={state} onChange={(e)=>{
                            setState(e.target.value)
                        }} />
                </div>

                <label className="mb-2 font-medium text-gray-900">Energy used (kWh)</label>
                <div className="flex py-3 mx-auto mb-4 w-50 overflow-hidden rounded-md bg-white shadow shadow-black/20">
                    <input className="block text-center font-medium text-xl w-full flex-1 py-2 px-3 focus:outline-none"  type="integer" placeholder="Input here..." onChange={(e) => {
                        setEnergy(e.target.value)
                        console.log(energy)
                    }}/>
                </div>

                <button className="text-white w-50 font-bold text-xl mt-3 shadow bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 rounded-lg px-5 py-2.5 text-center mr-2 mb-2" type="submit" id="fetch">Calculate</button>
            </form>
        </div>
    )
}

export default Electricity;