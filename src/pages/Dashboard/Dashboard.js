import React, { useEffect } from 'react'
import NavBar from '../../components/NavBar'
import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Dashboard = () =>
   {
    const navigate = useNavigate()
    const {logOut,user} = useAuth()
    useEffect(() => {
        user.role === 'user' && navigate('/dashboard')
        user.role === 'admin' && navigate('/admin')
        user.role === 'staff' && navigate('/staff')
    },[user.role, navigate])


    return (        
      <div>

        <NavBar/>

        <div className='container mx-auto p-2'>
            <div>
                <h1>Welcome <span className='text-sky-500 capitalize '>{user.name}</span></h1>
                <button onClick={logOut} className='bg-rose-700 hover:bg-rose-800 border rounded-md p-2 text-white'>Logout</button>

            </div>
        </div>


      </div>
    )
}


export default Dashboard