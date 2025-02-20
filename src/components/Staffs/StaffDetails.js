import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import NavBar from '../NavBar'
import StaffAbout from './StaffAbout'

const StaffDetails =() => {

    const {id} = useParams()
    const {staff, setStaff} = useAuth()


    useEffect(() => {
        if(!staff.name){
            const fetchData = async () => {
                try{
                    const response = await fetch(``)
                    const result = response.json()
                    if(result.status){
                        setStaff(result.staff)
                    }
                    else{
                        console.log(result);
                        
                    }
                }
                    catch(err){
                        console.log(err);
                        
                    }
                
            }
            fetchData()
        }
    },[staff.name, id, setStaff])



    const [toogle, setToogle] = useState(false)
    const [tab, setTab] = useState("About")

    const handleTabChange = (tabName) => {
        if (tab !== tabName)
        {setToogle(curr => !curr)
            setTab(tabName)
        }
    }

    return (

        <div>
            <NavBar/>
            <div className='container mx-auto p-2'>
                <div className='md:flex items-center mt-5 h-44 '>
                    <div className=''>
                        <img src={staff.image} alt={staff.name} className='w-24 rounded-full shadow'/>
                    </div>
                    <div className='md:pl-5 md:m-0 mt-10'>
                        <h2 className='text-xl font-bold'>{staff.name}</h2>
                        <h3 className='text-sm text-gray-800'>{staff.bio}</h3>
                        <h4 className='text-sm text-gray-800'>$ {Number(staff.rate).toLocaleString()}</h4>
                    </div>
                </div>

                <div className='mt-5 pt-5 md:pt-0'>
                    <button onClick={() => handleTabChange('About')} className={`text-lg font-bold tracking-wide border-b-2 p-2 
                        ${toogle? 'text-sky-950':'text-sky-800'}${toogle? 'hover:border-sky-800': 'border-sky-600'}`}>About</button>

                        <button onClick={() => handleTabChange('About')} className={`text-lg font-bold tracking-wide border-b-2 p-2 
                        ${toogle? 'text-sky-950':'text-sky-800'}${toogle ? 'hover:border-sky-800': 'border-sky-600'}`}>Ratings & Reviews</button>
                </div>
            </div>
            {
                tab === 'About' && <StaffAbout staff={staff} />
            }
            {
                tab === 'Review' && <></>
            }




        </div>

    )
  }


export default StaffDetails