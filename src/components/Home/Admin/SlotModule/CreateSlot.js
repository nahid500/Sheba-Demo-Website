import React, { useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const CreateSlot = () => {
    const { setSlots } = useAuth();
    const [isProcessing, setIsProcessing] = useState(false);
    const [btnText, setBtnText] = useState('Create Slot');

    const { register, handleSubmit, formState: { errors } } = useForm();

    const fetchUpdatedSlots = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SHEBA_BACKEND_API}slots`);
            const result = await response.json();

            if (response.ok) {
                setSlots(result.slots || []); // Ensure slots is always an array
            } else {
                toast.error(result.message || 'Failed to fetch slots.');
            }
        } catch (err) {
            toast.error('An error occurred while fetching slots.');
            console.error('Fetch Error:', err);
        }
    };

    const onSubmit = async (data) => {
        setIsProcessing(true);
        setBtnText('Creating Slot..');

        const formData = {
            label: data.label, // Correct key
            start_time: data.start_time,
            end_time: data.end_time 
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_SHEBA_BACKEND_API}/slot`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                toast.success(result.message || 'Slot created successfully!');
                await fetchUpdatedSlots(); // Fetch updated slots after successful creation
            } else {
                toast.error(result.message || 'Failed to create slot.');
            }
        } catch (err) {
            toast.error('An error occurred while creating the slot.');
            console.error('Submit Error:', err);
        } finally {
            setIsProcessing(false);
            setBtnText('Create Slot');
            // Reset form state using react-hook-form method
            document.getElementById('slot_form_admin').reset(); 
        }
    }

    return ( 
        <form
            id='slot_form_admin'
            onSubmit={handleSubmit(onSubmit)}
            className='w-full mx-auto xl:w-2/3 h-auto px-5 my-5'
        >
            <div className='w-full'>
                <h1 className='text-center text-xl my-5'>Create Slot</h1>
                
                <div className='my-2'>
                    <input
                        type='text'
                        placeholder='Enter Label Name'
                        autoComplete='off'
                        className='w-full p-2 border-2 rounded-none border-sky-600 focus:outline-sky-800'
                        {...register('label', { required: 'Label Name is required' })}
                    />
                    {errors.label && <span className='text-rose-500'>{errors.label.message}</span>}
                </div>

                <div className='my-2'>
                    <input
                        type='time'
                        className='w-full p-2 border-2 rounded-none border-sky-600 focus:outline-sky-800'
                        {...register('start_time', { required: 'Start Time is required' })}
                    />
                    {errors.start_time && <span className='text-rose-500'>{errors.start_time.message}</span>}
                </div>

                <div className='my-2'>
                    <input
                        type='time'
                        className='w-full p-2 border-2 rounded-none border-sky-600 focus:outline-sky-800'
                        {...register('end_time', { required: 'End Time is required' })}
                    />
                    {errors.end_time && <span className='text-rose-500'>{errors.end_time.message}</span>}
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
}

export default CreateSlot;
