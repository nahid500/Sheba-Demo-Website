import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import NavBar from '../../components/NavBar'
import useAuth from '../../hooks/useAuth'
import StaffAbout from '../../components/Staffs/StaffAbout'

const StaffDetails = () => {
    const { id } = useParams()
    const { staffs } = useAuth()

    // Find the staff member by ID
    const staff = staffs.find(staff => staff._id === id)

    // State for the current tab
    const [tab, setTab] = useState("About")

    // Function to handle tab changes
    const handleTabChange = (tabName) => {
        if (tab !== tabName) {
            setTab(tabName)
        }
    }

    // Render loading or error message if staff is not found
    if (!staff) {
        return (
            <div>
                <NavBar />
                <div className='container mx-auto p-2'>
                    <h2 className='text-xl font-bold'>Staff member not found</h2>
                </div>
            </div>
        )
    }

    return (
        <div>
            <NavBar />
            <div className='container mx-auto p-2'>
                <div className='md:flex items-center mt-5 h-44'>
                    <div className=''>
                        <img src={staff.image} alt={staff.name} className='w-24 rounded-full shadow' />
                    </div>
                    <div className='md:pl-4 md:m-0 mt-10'>
                        <h2 className='text-xl font-bold'>{staff.name}</h2>
                        <h3 className='text-sm text-gray-600'>{staff.bio}</h3>
                        <h4 className='text-sm text-gray-800'>$ {Number(staff.rate).toLocaleString()}</h4>
                    </div>
                </div>
                <div className='mt-5 pt-5 md:pt-0'>
                    <button
                        onClick={() => handleTabChange('About')}
                        className={`text-lg font-bold tracking-wide border-b-2 p-2 ${tab === 'About' ? 'text-sky-950 border-sky-950' : 'text-sky-800 border-transparent'}`}
                    >
                        About
                    </button>
                    <button
                        onClick={() => handleTabChange('Review')}
                        className={`text-lg font-bold tracking-wide border-b-2 p-2 ${tab === 'Review' ? 'text-sky-950 border-sky-950' : 'text-sky-800 border-transparent'}`}
                    >
                        Ratings & Review
                    </button>
                </div>
               
            </div>
            <div className='mt-5'>
                    {tab === 'About' && (
                        
                        <StaffAbout staff = {staff}/>
                    )}
                    {tab === 'Review' && (
                        <div>
                            {/* Content for the "Ratings & Review" tab */}
                            <p>Ratings and reviews of the staff member go here.</p>
                        </div>
            )}
                </div>
        </div>
    )
}

export default StaffDetails
