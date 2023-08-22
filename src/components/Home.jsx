import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  return (
    <div className="w-screen transition-all">
      <div className="bg-gradient-to-tr from-gray-950 to-gray-700 h-screen w-full relative">
        <img src="https://images.pexels.com/photos/19670/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="clouds" className="fixed w-full h-full object-cover mix-blend-overlay" />
        <div className="p-24 w-4/6">
          <h1 className="text-gray-100 text-6xl font-bold">For the environmentally conscious mind.</h1>
          <h2 className="text-blue-100 text-3xl font-light mt-5">Take control of your carbon footprint and make a positive impact on the planet with CarbonTrack.</h2>
          <button onClick={() => navigate('/signup')} className="relative mt-5 mr-10 py-2 px-8 text-lg font-bold text-gray-700 bg-gray-100 rounded-full border border-gray-200 hover:bg-gray-900 hover:text-gray-100">GET STARTED</button>
          <button onClick={() => navigate('/about')} className="relative mt-5 py-2 px-8 m-2 text-lg font-bold text-gray-700 bg-gray-100 rounded-full border border-gray-200 hover:bg-gray-900 hover:text-gray-100">LEARN MORE</button>
        </div>
      </div>
    </div>
  )

}

export default Home;