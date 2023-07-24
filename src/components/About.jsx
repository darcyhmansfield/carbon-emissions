import React from 'react'

function About() {
  return (
    <div className="w-screen h-screen">
        <div className="bg-gradient-to-tr from-gray-950 to-gray-700 h-screen w-full relative">
            <img src="https://images.pexels.com/photos/19670/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="clouds" className="fixed w-full h-full object-cover mix-blend-overlay" />
            <div className="p-24 w-4/6 h-screen">
                <h1 className="text-blue-200 text-6xl font-bold mb-5">Welcome to CarbonTrack</h1>
                <p className="text-2xl text-gray-100 opacity-70 font-light leading-normal">This app is a powerful tool designed to help individuals track and reduce their personal carbon emissions. By measuring and monitoring carbon footprints, it empowers users to make more sustainable choices and contribute to the fight against climate change. The app provides real-time data and personalized insights, making it easier for users to understand their environmental impact and take meaningful actions to reduce their carbon footprint.</p>

                <p className="text-2xl text-gray-100 opacity-70 font-light leading-normal">Tracking personal carbon emissions is crucial in the global effort to combat climate change. By monitoring our individual contributions to greenhouse gas emissions, we gain a deeper understanding of our environmental impact and can identify areas where we can make positive changes. Here are a few reasons why tracking personal carbon emissions is important:</p>

                <p className="text-2xl text-gray-100 opacity-70 font-light leading-normal">Tracking carbon emissions raises awareness about our daily activities and their environmental consequences. It helps educate individuals about the carbon intensity of different actions and choices, fostering a culture of environmental responsibility.</p>

                <h2 className="text-blue-100 text-3xl font-light mt-5">Accountability and Goal Setting</h2>
                <p className="text-2xl text-gray-100 opacity-70 font-light leading-normal">When we track our carbon emissions, we become more accountable for our actions. It allows us to set achievable goals and monitor our progress towards reducing our carbon footprint over time. By visualizing the impact of our choices, we are motivated to make sustainable lifestyle changes.</p>

                <h2 className="text-blue-100 text-3xl font-light mt-5">Behavior Modification</h2>
                <p className="text-2xl text-gray-100 opacity-70 font-light leading-normal">Personal carbon tracking encourages behavior modification by highlighting areas where emissions can be reduced. It prompts us to adopt eco-friendly practices such as energy conservation, sustainable transportation, waste reduction, and mindful consumption.</p>

                <h2 className="text-blue-100 text-3xl font-light mt-5">Collective Impact</h2>
                <p className="text-2xl text-gray-100 opacity-70 font-light leading-normal">While individual actions may seem small, the cumulative effect of many people tracking and reducing their carbon emissions can be significant. By joining a community of environmentally conscious individuals, we contribute to a collective effort in combating climate change and creating a more sustainable future.</p>

                <p className="text-2xl text-gray-100 opacity-70 font-light leading-normal">In conclusion, tracking personal carbon emissions through our app promotes environmental consciousness, empowers individuals to make sustainable choices, and fosters a sense of collective responsibility towards mitigating climate change.</p>
            </div>
        </div>
    </div>
  );
}

export default About;