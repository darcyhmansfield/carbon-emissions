import { useEffect, useState } from "react";
import axios from "axios";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

function Vehicle(props) {

    const navigate = useNavigate()

    const user = props.user;
    let date = '';

    const [chosenDate, setChosenDate] = useState('');
    const [makes, setMakes] = useState([]);
    const [make, setMake] = useState('');
    const [dropdown, setDropdown] = useState('');
    const [makeId, setMakeId] = useState('');
    const [models, setModels] = useState([]);
    const [model, setModel] = useState('');
    const [filteredModels, setFilteredModels] = useState([]);
    const [year, setYear] = useState('');
    const [filteredYears, setFilteredYears] = useState([]);
    const [distance, setDistance] = useState('');
    
    const endpoint = 'https://www.carboninterface.com/api/v1/estimates';
    const apiKey = '1YtZgVx0AlwIiuk9pw9wA';

    // Obtain the available makes of vehicles to be used for model search
    useEffect(() => {
        axios.get('https://www.carboninterface.com/api/v1/vehicle_makes', {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }})
            .then((response) => {
              // Set the makes state with the received data
              setMakes(response.data);
            })
            .catch((error) => {
              console.error(error);
            }
        );
    }, []);

    // use the make state to obtain vehicle models
    useEffect(() => {
        if (makeId !== '') {
            axios.get(`https://www.carboninterface.com/api/v1/vehicle_makes/${makeId}/vehicle_models`, {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }})
                .then((response) => {
                // Set the models state with the received data
                setModels(response.data);
                })
                .catch((error) => {
                console.error(error);
                }
            );
        }
        
    }, [makeId])

    useEffect(() => {
        if (models !== []) {
            console.log(models);
            // Map and filter models to remove duplicate names for dropdown
            const names = models.map((item) => item.data.attributes.name);
            const namesFiltered = names.filter((item, index) => !names.includes(item, index + 1));
            setFilteredModels(namesFiltered);
        }
    }, [models])

    useEffect(() => {
        if (model !== '') {
            // Filter models to find available years of chosen model 
            const modelArray = models.filter((item, index) => {
                if (item.data.attributes.name === model) {
                    return item.data.attributes.year
                }
            });
            const allYears = modelArray.map((item) => item.data.attributes.year)
            const yearsFiltered = allYears.filter((item, index) => !allYears.includes(item, index + 1));
            const yearsSorted = yearsFiltered.sort((a, b) => a - b)
            console.log('Years:', yearsSorted);
            setFilteredYears(yearsSorted);
        }
    }, [model])

    const findVehicleId = () => {
        console.log(model, year);
        const foundVehicle = models.find((item) => {
            return item.data.attributes.name == model & item.data.attributes.year == String(year)
        })
        return foundVehicle
    }

    // Final calc of the emissions
    const vehicleCalc = async function (e) {

        e.preventDefault();

        // If no date specified then set date to today, otherwise change chosen date to timestamp
        if (chosenDate === '') {
            date = new Date();
        } else {
            let dateParts = chosenDate.split('/');
            date = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
        }

        const vehicle = await findVehicleId();

        console.log('Vehicle ID:', vehicle)
    
        const requestData = {
            type: 'vehicle',
            distance_unit: 'km',
            distance_value: distance,
            vehicle_model_id: vehicle.data.id
        };
    
        // Calculate the carbon emissions using Carbon Interface

        axios.post(endpoint, requestData, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            addToFirestore(response.data);
            navigate('/dashboard');
        }).catch((error) => {
            console.log(error);
        })
    }

    const addToFirestore = async (data) => {
        console.log(date)
        // Add data to Firestore
        try {
            const docRef = await addDoc(collection(db, `userDetails/${user.uid}/vehicleEmissions`), {
                user: user.uid,
                date: date,
                emissions: data.data.attributes.carbon_kg,
                distance: distance,
                vehicle_make: data.data.attributes.vehicle_make,
                vehicle_model: data.data.attributes.vehicle_model,
                vehicle_year: data.data.attributes.vehicle_year
            })
            navigate('/dashboard')
            console.log(data)
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="text-center justify-center mt-10">
            <h1 className="mb-4 font-thin">VEHICLE EMISSIONS</h1>
            <form className="relative" onSubmit={vehicleCalc}>

                <label className="mb-2 font-medium text-gray-900">Date</label>
                <div className="flex py-3 mx-auto mb-4 w-50 overflow-hidden rounded-md bg-white shadow shadow-black/20">
                    <input className="block text-center font-medium text-xl w-full flex-1 py-2 px-3 focus:outline-none" type="text" placeholder="dd/mm/yyyy" value={chosenDate} onChange={(e) => setChosenDate(e.target.value)} />
                </div>

                <label className="mb-2 font-medium text-gray-900">Vehicle Make</label>
                <div className="flex py-3 mx-auto mb-4 w-50 overflow-hidden rounded-md bg-white shadow shadow-black/20">
                    <input id="multiLevelDropdownButton" data-dropdown-toggle="dropdown" className="block text-center font-medium text-xl w-full flex-1 py-2 px-3 focus:outline-none" type="text" placeholder="Toyota" value={make} onChange={(e)=>{
                        setMake(e.target.value);
                        setDropdown('make');
                        }} />
                </div>
                { dropdown === 'make' && make !== '' &&
                    <div id="dropdown" className="absolute inset-x-0 flex justify-center mx-auto font-medium text-lg py-3 mb-4 w-50 max-h-60 overflow-y-scroll z-10 bg-gray-100 divide-y divide-gray-200 rounded-lg shadow">
                        <ul className=" py-2 w-full text-lg text-gray-800 justify-center">
                            { makes.filter((item) => {
                                const searchTerm = make.toLowerCase();
                                const makeName = item.data.attributes.name.toLowerCase();
                                // Include makes names only if there is a search term and the search term does not equal the make name
                                return searchTerm && makeName.includes(searchTerm);
                            })
                            .map((item, index) => <li className="text-center w-full hover:bg-gray-200" key={index} onClick={()=>{
                                setMake(item.data.attributes.name);
                                setMakeId(item.data.id);
                                setDropdown('');
                            }}><button>{item.data.attributes.name}</button></li>) }
                        </ul>
                    </div>
                }

                <label className="mb-2 font-medium text-gray-900">Vehicle Model</label>
                <div className="flex py-3 mx-auto mb-4 w-50 overflow-hidden rounded-md bg-white shadow shadow-black/20">
                    <input id="multiLevelDropdownButton" className="block text-center font-medium text-xl w-full flex-1 py-2 px-3 focus:outline-none" type="text" placeholder="Camry" value={model} onChange={(e)=>{
                        setModel(e.target.value);
                        setDropdown('model');
                        }} />
                </div>
                { dropdown === 'model' && model !== '' &&
                    <div id="dropdown" className="absolute inset-x-0 flex justify-center font-medium text-lg py-3 mx-auto mb-4 w-50 max-h-60 overflow-y-scroll z-10 bg-gray-100 divide-y divide-gray-200 rounded-lg shadow">
                        <ul className="py-2 w-full text-lg text-gray-800 justify-center">
                            { filteredModels.filter((item) => {

                                const searchTerm = model.toLowerCase();
                                const modelName = item.toLowerCase();
                                // Include models names only if there is a search term and the search term does not equal the model name
                                return searchTerm && modelName.includes(searchTerm);
                            })
                            .map((item, index) => <li className="text-center w-full hover:bg-gray-200" key={index} onClick={()=>{
                                setModel(item);
                                setDropdown('');
                            }}><button>{item}</button></li>) }
                        </ul>
                    </div>
                }

                <label className="mb-2 font-medium text-gray-900">Vehicle Year</label>
                <div className="flex py-3 mx-auto mb-4 w-50 overflow-hidden rounded-md bg-white shadow shadow-black/20">
                    <input id="multiLevelDropdownButton" className="block text-center font-medium text-xl w-full flex-1 py-2 px-3 focus:outline-none" type="integer" placeholder="1993" value={year} onChange={(e)=>{
                        setYear(e.target.value);
                        setDropdown('year');
                        }} />
                </div>
                { dropdown === 'year' && year !== '' &&
                    <div id="dropdown" className="absolute inset-x-0 flex  justify-center font-medium text-lg py-3 mx-auto mb-4 w-50 max-h-60 overflow-y-scroll z-10 bg-gray-100 divide-y divide-gray-200 rounded-lg shadow">
                        <ul className="py-2 w-full text-lg text-gray-800 justify-center">
                            { filteredYears.filter((item) => {
                                const searchYear = String(year);
                                const arrayYear = String(item);
                                // Include years only if there is a search term and the year includes the search term
                                return searchYear && arrayYear.includes(searchYear);
                            })
                            .map((item, index) => <li className="text-center w-full hover:bg-gray-200" key={index} onClick={()=>{
                                setYear(String(item));
                                setDropdown('');
                            }}><button>{item}</button></li>) }
                        </ul>
                    </div>
                }

                <label className="mb-2 font-medium text-gray-900">Distance Travelled (km)</label>
                <div className="flex py-3 mx-auto mb-4 w-50 overflow-hidden rounded-md bg-white shadow shadow-black/20">
                    <input id="multiLevelDropdownButton" className="block text-center font-medium text-xl w-full flex-1 py-2 px-3 focus:outline-none" type="integer" placeholder="100" value={distance} onChange={(e)=>{
                        setDistance(e.target.value);
                        }} />
                </div>

                <button className="text-white w-50 font-bold text-xl mt-3 shadow bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 rounded-lg px-5 py-2.5 text-center mr-2 mb-2" type="submit" id="fetch">Calculate</button>
            </form>
        </div>
    )
}

export default Vehicle;