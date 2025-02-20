import React from 'react'


const HeroSection = () =>{
    return (
        <div className='flex content-normal items-center bg-hero-bg bg-no-repeat bg-center bg-cover h-[450px] w-full'>
            <div className='w-full'>
                <div className=''>
                    <h1 className='text-white text-center text-6xl font-semibold'>
                        Your Personal Assitant
                    </h1>
                    <h2 className='text-white text-center text-2xl font-bold'>One-stop solution for your services. Order any service, anytime.</h2>
           
                </div>
            <div className='my-2 w-full xl:w-1/3 lg:w-1/2 md:w-2/3 mx-auto'>
                <input type='search' className='p-3 rounded w-full focus:none' placeholder='Find your service here..'></input>

            </div>




            </div>
        </div>
    )
};


export default HeroSection