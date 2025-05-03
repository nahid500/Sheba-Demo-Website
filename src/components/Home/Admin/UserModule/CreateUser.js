import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useAuth from '../../../../hooks/useAuth';

const CreateUser = () => {
    const { setUsers } = useAuth();
    const [isProcessing, setIsProcessing] = useState(false);
    const [btnText, setBtnText] = useState('Register');

    const { register, handleSubmit, formState: { errors } } = useForm();

    const fetchUsers = async () => {
        try {
            const response = await fetch('https://shebaxyz-backend.onrender.com/users');
            const result = await response.json();

            if (result.status) {
                setUsers(result.users); // Ensure this updates your context or state
            } else {
                toast.error(result.message);
            }
        } catch (err) {
            toast.error('An error occurred while fetching users.');
        }
    };

    const onSubmit = async (data) => {
        setIsProcessing(true);
        setBtnText('Processing Registration..');

        const formData = {
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role
        };

        try {
            const response = await fetch('https://shebaxyz-backend.onrender.com/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.status) {
                toast.success(result.message);
                await fetchUsers(); // Fetch users after successful registration
            } else {
                toast.error(result.message);
            }
        } catch (err) {
            toast.error('An error occurred while creating the user.');
        } finally {
            setIsProcessing(false);
            setBtnText('Register');
        }
    };

    
    return (
        <form
            id='signup_form_admin'
            onSubmit={handleSubmit(onSubmit)}
            className='w-full mx-auto xl:w-2/3 h-auto px-5 my-5'
        >
            <div className='w-full'>
                <h1 className='text-center text-xl my-5'>Sign Up</h1>
                <div className='my-2'>
                    <input
                        type='text'
                        placeholder='Enter Name'
                        autoComplete='name'
                        className='w-full p-2 border-2 rounded-none border-sky-600 focus:outline-sky-800'
                        {...register('name', { required: true })}
                    />
                    {errors.name && <span className='text-rose-500'>Name is required</span>}
                </div>
                <div className='my-2'>
                    <input
                        type='email'
                        placeholder='Enter Email'
                        autoComplete='email'
                        className='w-full p-2 border-2 rounded-none border-sky-600 focus:outline-sky-800'
                        {...register('email', { required: true })}
                    />
                    {errors.email && <span className='text-rose-500'>Email is required</span>}
                </div>
                <div className='my-2'>
                    <input
                        type='password'
                        placeholder='Enter Password'
                        autoComplete='current-password'
                        className='w-full p-2 border-2 rounded-none border-sky-600 focus:outline-sky-800'
                        {...register('password', { required: true })}
                    />
                    {errors.password && <span className='text-rose-500'>Password is required</span>}
                </div>
                <div className='my-2'>
                    <select
                        {...register('role', { required: true })}
                        className='p-2 border border-sky-600 focus:outline-sky-800 mt-2 rounded w-full'
                    >
                        <option value="" disabled>Select Role</option>
                        <option value="user">User</option>
                        <option value="staff">Staff</option>
                        <option value="admin">Admin</option>
                    </select>
                    {errors.role && <span className='text-rose-500'>Role is required</span>}
                </div>
                <p className='my-5 text-rose-500 font-bold'></p>
                <button
                    type='submit'
                    className='bg-sky-700 hover:bg-slate-800 text-white w-full rounded py-2'
                    disabled={isProcessing}
                >
                    {btnText}
                </button>
            </div>
        </form>
    );
};

export default CreateUser;
