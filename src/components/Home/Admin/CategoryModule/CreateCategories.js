import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useAuth from '../../../../hooks/useAuth';

const CreateCategories = () => {
    const { setCategories } = useAuth();
    const [isProcessing, setIsProcessing] = useState(false);
    const [btnText, setBtnText] = useState('Create Category');

    const { register, handleSubmit, formState: { errors } } = useForm();

    const fetchUpdatedCategories = async () => {
        try {
            const response = await fetch('https://shebaxyz-backend.onrender.com/categories');
            const result = await response.json();

            if (response.ok) {
                setCategories(result.category) 
            } else {
                toast.error(result.message || 'Failed to fetch categories.');
            }
        } catch (err) {
            toast.error('An error occurred while fetching categories.');
            console.error('Fetch Error:', err);
        }
    };

    const onSubmit = async (data) => {
        setIsProcessing(true);
        setBtnText('Processing Registration..');

        const formData = {
            name: data.category_name, // Ensure you use the correct field name here
        };

        try {
            const response = await fetch('https://shebaxyz-backend.onrender.com/category', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                toast.success(result.message || 'Category created successfully!');
                await fetchUpdatedCategories(); // Fetch updated categories after successful creation
            } else {
                toast.error(result.message || 'Failed to create category.');
            }
        } catch (err) {
            toast.error('An error occurred while creating the category.');
            console.error('Submit Error:', err);
        } finally {
            setIsProcessing(false);
            setBtnText('Create Category');
        }
    };

    return (
        <form
            id='category_form_admin'
            onSubmit={handleSubmit(onSubmit)}
            className='w-full mx-auto xl:w-2/3 h-auto px-5 my-5'
        >
            <div className='w-full'>
                <h1 className='text-center text-xl my-5'>Create Category</h1>
                <div className='my-2'>
                    <input
                        type='text'
                        placeholder='Enter Category Name'
                        autoComplete='off'
                        className='w-full p-2 border-2 rounded-none border-sky-600 focus:outline-sky-800'
                        {...register('category_name', { required: 'Category Name is required' })}
                    />
                    {errors.category_name && <span className='text-rose-500'>{errors.category_name.message}</span>}
                </div>
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

export default CreateCategories;
