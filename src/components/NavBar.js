import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import logo from '../images/logo.svg'
import useAuth from '../hooks/useAuth';

const NavBar = () =>{
    const {user} = useAuth()
    return (
        <div className='bg-white h-20 md:h-16 sticky top-0 shadow-md z-10'>
            <div className='container mx-auto flex content-between item-centre p-2'>
                <Link to='/'><img src={logo} alt='logo'></img></Link>

                <div className='ms-auto'>
                    <NavLink to ='/services' className={({isActive})=> (
                        isActive ? 'px-3 py-1 mx-2 text-white border border-sky-800 bg-sky-800 rounded-md' : 'px-3 py-1 mx-2 text-black border rounded-md hover:bg-sky-800 hover:text-white'
                    )}>Services</NavLink>

                    <NavLink to ='/staffs' className={({isActive})=> (
                        isActive ? 'px-3 py-1 mx-2 text-white border border-sky-800 bg-sky-800 rounded-md' : 'px-3 py-1 mx-2 text-black border rounded-md hover:bg-sky-800 hover:text-white'
                    )}>Staffs</NavLink>

                    

                    {user.email ? 
                    <>
                    
                      {user.role ==='user' &&
                            <NavLink to ='/dashboard'  className={({isActive})=> (
                                isActive ? 'px-3 py-1 mx-2 text-white border border-sky-800 bg-sky-800 rounded-md' : 'px-3 py-1 mx-2 text-black border rounded-md hover:bg-sky-800 hover:text-white'
                            )}>Dashboard</NavLink>}

                        {
                             user.role ==='admin' &&
                             <NavLink to ='/admin'  className={({isActive})=> (
                                 isActive ? 'px-3 py-1 mx-2 text-white border border-sky-800 bg-sky-800 rounded-md' : 'px-3 py-1 mx-2 text-black border rounded-md hover:bg-sky-800 hover:text-white'
                             )}>Admin</NavLink>
                        }
                   
                            {user.role === 'staff' &&
                            <NavLink to ='/staff'  className={({isActive})=> (
                                isActive ? 'px-3 py-1 mx-2 text-white border border-sky-800 bg-sky-800 rounded-md' : 'px-3 py-1 mx-2 text-black border rounded-md hover:bg-sky-800 hover:text-white'
                            )}>Staff</NavLink>}
                        
                    </>
                    :
                    <NavLink to ='/login' className={({isActive})=> (
                        isActive ? 'px-3 py-1 mx-2 text-white border border-sky-800 bg-sky-800 rounded-b-md' : 'px-3 py-1 mx-2 text-black border rounded-md hover:bg-sky-800 hover:text-white'
                    )}>Login</NavLink>}
                   






                </div>
            </div>
        </div>
    )
};

export default NavBar