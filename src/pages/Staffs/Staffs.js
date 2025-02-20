import React from 'react'
import NavBar from '../../components/NavBar';
import StaffCard from '../../components/Staffs/StaffCard';
import useAuth from '../../hooks/useAuth';


const Staffs = () =>{

    const {staffs} = useAuth()


    return (
        <div>
            <NavBar />
            <div className='container mx-auto p-2 '>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-5'>
            {staffs.map(staff => 
                <StaffCard key={staff._id} staff={staff}/>

                )}
            </div>
                 

        </div>
            
    </div>
    )
}

export default Staffs