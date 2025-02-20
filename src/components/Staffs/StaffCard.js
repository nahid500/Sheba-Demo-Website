import React from 'react'
import { useNavigate } from 'react-router-dom';

const StaffCard =({staff})=>  {

    const navigate = useNavigate()
     
    return (

      <div className='bg-gray-50 border hover:border-sky-800 rounded-md shadow-md p-5'>

        <div className='md:flex items-centre'>
            <div><img src={staff.image} className='w-24 rounded-full mx-auto ' alt={staff.name}/></div>
            <div className='md:pl-5'>
                <h2 className='text-xl font-bold'>{staff.name}</h2>
                <h3 className='text-sm font-bold'>{staff.bio}</h3>
                <h4 className='text-xs text-gray-600'>{staff.location}</h4>
                <h4 className='text-sm text-gray-800'>$ {Number(staff.rate).toLocaleString()}</h4>
            </div>
       
        </div>
                <p className='line-clamp-2 mt-5 text-justify text-sm text-gray-500'>{staff.details}</p>

        <div className='flex flex-wrap gap-2 my-2 text-xs items-center h-32  lg:h-20'>
            {
                staff.services.length > 3 ?
                <>
                    {
                        staff.services.slice(0,3).map(service => 
                            <p className='border rounded-full p-2 mr-2 border-gray-700'>{service}</p>
                        )
                    }
                    <p> and {staff.services.length - 3} more...</p>
                </>
                :
                staff.services.map(service => 
                    <p className='border rounded-full p-2 mr-2 border-gray-700'>{service}</p>
                )
            }

        </div>

            <button onClick={() => {
                navigate(`/staff-details/${staff._id}`)
            }} 
            className='bg-sky-700 hover:bg-sky-900 text-white rounded-full text-md py-2 px-3 my-2 mx-auto'>See Profile</button>


      </div>
    )
  }


export default StaffCard