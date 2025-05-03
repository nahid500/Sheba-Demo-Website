import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import axios from "axios";
import { toast } from "react-toastify";

const CreateService = () => {
    const { categories = [], setServices } = useAuth(); // Default categories to an empty array
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => processingCreatingStaff(data);

    const processingCreatingStaff = async (data) => {
        setLoading(true);

        try {
            const imageURL = await handleImageUpload(data.image[0]);

            const formData = {
                category: data.category,
                name: data.name,
                details: data.details,
                image: imageURL,
            };

            const response = await fetch('https://shebaxyz-backend.onrender.com/service', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            if (result.status) {
                toast.success('Service created successfully!');
                fetchServices();
                reset();
            } else {
                toast.error(result.message || 'Failed to create service.');
            }
        } catch (err) {
            toast.error('An error occurred while creating service.');
            console.error(err);
        } finally {
            setLoading(false);
            reset(); // Reset form state using react-hook-form's reset function
        }
    };

    const handleImageUpload = async (imageFile) => {
        try {
            const imageData = new FormData();
            imageData.set('key', 'aa47c84e2b277ae4792c64582616a931');
            imageData.append('image', imageFile);

            const response = await axios.post('https://api.imgbb.com/1/upload', imageData);
            return response.data.data.display_url;
        } catch (err) {
            toast.error('Image upload failed: ' + err.message);
            throw err; // Re-throw to be caught in the main try-catch
        }
    };

    const fetchServices = async () => {
        try {
            const response = await fetch('https://sheba-backend.onrender.com/services');
            const result = await response.json();
            if (result.status) {
                setServices(result.services || []); // Default to empty array if result.services is undefined
            } else {
                toast.error(result.message || 'Failed to fetch services.');
            }
        } catch (err) {
            toast.error('An error occurred while fetching services.');
            console.error(err);
        }
    };

    console.log('Categories:', categories); // Debugging line

    return (
        <div>
            <form id='create_service_form_admin' onSubmit={handleSubmit(onSubmit)} className="mx-auto xl:w-2/3 w-full px-5 my-5">
                <div className='my-2'>
                    <select 
                        {...register("category", { required: true })}
                        defaultValue="" 
                        className="p-2 border border-sky-600 focus:outline-sky-800 rounded mt-2 w-full"
                    >
                        <option value="" disabled>Select Category</option>
                        {Array.isArray(categories) && 
                            categories.map(category => (
                            <option key={category._id} value={category.name}>{category.name}</option>
                        ))}
                    </select>
                    {errors.category && <span className='text-rose-500'>Category is required</span>}
                </div>

                <div className='my-2'>
                    <input
                        type='text'
                        className='w-full p-2 border-2 rounded-none border-sky-600 focus:outline-sky-800'
                        {...register('name', { required: 'Service Name is required' })}
                        placeholder='Enter Service Name'
                    />
                    {errors.name && <span className='text-rose-500'>{errors.name.message}</span>}
                </div>
                
                <div className='my-2'>
                    <textarea
                        className='w-full p-2 border-2 rounded-none border-sky-600 focus:outline-sky-800'
                        {...register('details', { required: 'Details are required' })}
                        placeholder='Details'
                    />
                    {errors.details && <span className='text-rose-500'>{errors.details.message}</span>}
                </div>

                <div className='my-2'>
                    <input
                        type='file'
                        className='w-full p-2 border-2 rounded-none border-sky-600 focus:outline-sky-800'
                        {...register('image', { required: 'Image is required' })}
                    />
                    {errors.image && <span className='text-rose-500'>{errors.image.message}</span>}
                </div>

                <button
                    type='submit'
                    id='create_service_btn_admin'
                    className='p-2 bg-sky-600 text-white rounded w-full'
                    disabled={loading}
                >
                    {loading ? 'Creating Service...' : 'Create Service'}
                </button>
            </form>
        </div>
    );
};

export default CreateService;
