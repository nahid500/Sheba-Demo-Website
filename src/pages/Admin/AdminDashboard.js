import React, { useEffect } from 'react'
import useAuth from '../../hooks/useAuth'
import NavBar from '../../components/NavBar'
import { useNavigate } from 'react-router-dom'
import CreateUser from '../../components/Home/Admin/UserModule/CreateUser'
import { ToastContainer } from 'react-toastify'
import ViewUsers from '../../components/Home/Admin/UserModule/ViewUsers'
import CreateCategories from '../../components/Home/Admin/CategoryModule/CreateCategories'
import ViewCategories from '../../components/Home/Admin/CategoryModule/ViewCategories'
import CreateSlot from '../../components/Home/Admin/SlotModule/CreateSlot'
import ViewSlots from '../../components/Home/Admin/SlotModule/ViewSlots'
import CreateStaff from '../../components/Home/Admin/StaffModule/CreatesStaff'
import ViewStaffs from '../../components/Home/Admin/StaffModule/ViewStaffs'
import CreateService from '../../components/Home/Admin/ServiceModule/CreateService'
import ViewService from '../../components/Home/Admin/ServiceModule/ViewService'

const  AdminDashboard = () => {

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
                <button onClick={logOut} className='bg-rose-500 hover:bg-rose-800 border rounded-md p-2 text-white'>Logout</button>

            </div>

            <div className='grid lg:grid-cols-2 grid-cols-1 gap-8 my-10'>
                <div className='min-w-full shadow rounded border border-gray-300'>
                    <h2 className='flex items-center justify-center bg-slate-600 text-white p-2'>User Module</h2>
                    <CreateUser/>
                    <ViewUsers/>
                    
                </div>

                <div className='min-w-full shadow rounded border border-gray-300'>
                    <h2 className='flex items-center justify-center bg-slate-600 text-white p-2'>Category Module</h2>
                    <CreateCategories/>
                    <ViewCategories/>

                </div>

                <div className='min-w-full shadow rounded border border-gray-300'>
                    <h2 className='flex items-center justify-center bg-slate-600 text-white p-2'>Slot Module</h2>
                    <CreateSlot/>
                    <ViewSlots/>
                </div>

                <div className='min-w-full shadow rounded border border-gray-300'>
                    <h2 className='flex items-center justify-center bg-slate-600 text-white p-2'>Staff Module</h2>
                    <CreateStaff/>
                   <ViewStaffs/>
                </div>

                <div className='min-w-full shadow rounded border border-gray-300'>
                    <h2 className='flex items-center justify-center bg-slate-600 text-white p-2'>Service Module</h2>
                    <CreateService/>
                   <ViewService/>
                </div>

            </div>


        </div>
        <ToastContainer autoClose={3000}></ToastContainer>
      </div>
    )
}

export default AdminDashboard
