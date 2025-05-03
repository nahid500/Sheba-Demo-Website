import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Login = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
    const{user, setUser} = useAuth()

    useEffect(() => {
        user?.email && navigate(from, {replace: true})
    },[from,navigate,user?.email])

    const [loginError, setLoginError] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [btnText, setBtnText] = useState('Login');

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        setIsProcessing(true);
        setBtnText('Processing Login..');
        setLoginError('');

        const formData = {
            email: data.email,
            password: data.password,
        };

        try {
            const response = await fetch('https://shebaxyz-backend.onrender.com/login', {
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
                setLoginError('');
                result.user.role === 'user' && navigate('/dashboard')
                result.user.role === 'admin' && navigate('/admin')
                result.user.role === 'staff' && navigate('/staff')

                document.getElementById('login_form').reset();
                // You might want to redirect the user or handle the login success case here
            } else {
                setLoginError(result.message);
            }
        } catch (err) {
            console.error('Error:', err);
            setLoginError('An error occurred while processing your request.');
        } finally {
            setBtnText('Login');
            setIsProcessing(false);
        }
    };

    return (
        <div>
            <NavBar />
            <form
                id='login_form'
                onSubmit={handleSubmit(onSubmit)}
                className='mx-auto content-center items-center lg:w-1/3 xl:w-1/2 2-full h-96 px-5'
            >
                <div className='w-full'>
                    <h1 className='text-center text-xl my-5'>Sign In</h1>
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
                    <p className='my-5 text-rose-500 font-bold'>{loginError}</p>
                    <p className='my-5 text-sky-950'>
                        Don't have an Account? <Link to='/sign-up' className='underline'>Register as user</Link>
                    </p>
                    <button
                        id='login_btn'
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

export default Login;
