import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const SignUp = () => {
    const [signUpError, setSignUpError] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [btnText, setBtnText] = useState('Register');
    const navigate = useNavigate()
    const {setUser} = useAuth()

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        setIsProcessing(true);
        setBtnText('Processing Registration..');
        setSignUpError('');

        const formData = {
            name: data.name,
            email: data.email,
            password: data.password,
            role: 'user'
        };

        try {
            const response = await fetch('https://sheba-backend.onrender.com/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const result = await response.json();

            if (result.status) {
                console.log(result);
                setUser(result.user)
                localStorage.setItem('uId', result.user._id)
                setSignUpError('');
                result.user.role === 'user' && navigate('/dashboard')
                result.user.role === 'admin' && navigate('/admin')
                result.user.role === 'staff' && navigate('/staff')

                document.getElementById('signup_form').reset();
            } else {
                setSignUpError(result.message);
            }
        } catch (err) {
            console.error('Error:', err);
            setSignUpError('An error occurred while processing your request.');
        } finally {
            setBtnText('Register');
            setIsProcessing(false);
        }
    };

    return (
        <div>
            <NavBar />
            <form
                id='signup_form'
                onSubmit={handleSubmit(onSubmit)}
                className='mx-auto content-center items-center lg:w-1/3 xl:w-1/2 2-full h-96 px-5'
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
                    <p className='my-5 text-rose-500 font-bold'>{signUpError}</p>
                    <p className='my-5 text-sky-950'>
                        Already have an Account? <Link to='/login' className='underline'>Login</Link>
                    </p>
                    <button
                        type='submit'
                        className='bg-sky-700 hover:bg-slate-800 text-white w-full rounded py-2'
                        disabled={isProcessing}
                    >
                        {btnText}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
