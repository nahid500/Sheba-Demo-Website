import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import axios from "axios";
import { toast } from "react-toastify";

const CreateStaff = () => {
    const { users, services, setStaffs } = useAuth();
    const [selectedServices, setSelectedServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => processingCreatingStaff(data);

    const processingCreatingStaff = async (data) => {
        setLoading(true);

        try {
            const imageURL = await handleImageUpload(data.image[0]);

            const formData = {
                name: data.staffName,
                bio: data.bio,
                location: data.location,
                rate: data.rate,
                details: data.details,
                services: selectedServices,
                image: imageURL,
            };

            const response = await fetch('https://sheba-backend.onrender.com/staff', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            if (result.status) {
                toast.success('Staff created successfully!');
                fetchStaffs();
                reset();
                setSelectedServices([]);
            } else {
                toast.error(result.message || 'Failed to create staff.');
            }
        } catch (err) {
            toast.error('An error occurred while creating staff.');
            console.error(err);
        } finally {
            setLoading(false);
            document.getElementById('create_staff_form_admin').reset()

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

    const handleServiceAdd = (value) => {
        setSelectedServices(prev =>
            prev.includes(value) ? prev.filter(service => service !== value) : [...prev, value]
        );
    };

    const handleServiceRemove = (value) => {
        setSelectedServices(prev => prev.filter(service => service !== value));
    };

    const fetchStaffs = async () => {
        try {
            const response = await fetch('https://sheba-backend.onrender.com/staffs');
            const result = await response.json();
            if (result.status) {
                setStaffs(result.staffs); // Ensure correct key `staffs`
            } else {
                toast.error(result.message || 'Failed to fetch staffs.');
            }
        } catch (err) {
            toast.error('An error occurred while fetching staffs.');
            console.error(err);
        }
    };

    return (
        <div>
            <div>
                {selectedServices.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        <span>Selected Services:</span>
                        <ul className="flex flex-wrap gap-1">
                            {selectedServices.map(service => (
                                <li key={service} onClick={() => handleServiceRemove(service)} className="bg-gray-700 text-white text-xs p-2 rounded truncate cursor-pointer flex items-center">
                                    {service}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <form id='create_staff_form_admin' onSubmit={handleSubmit(onSubmit)} className="mx-auto xl:w-2/3 w-full px-5 my-5">
                <div className='my-2'>
                    <select 
                        {...register("category", { required: true })}
                        onChange={(e) => handleServiceAdd(e.target.value)}
                        defaultValue="" 
                        className="p-2 border border-sky-600 focus:outline-sky-800 rounded mt-2 w-full"
                    >
                        <option value="" disabled>Select Services</option>
                        {services.map(service => (
                            <option key={service._id} value={service.name}>{service.name}</option>
                        ))}
                    </select>
                    {errors.category && <span className='text-rose-500'>Service Type is required</span>}
                </div>

                <div className='my-2'>
                    <select 
                        {...register("staffName", { required: true })} 
                        defaultValue="" 
                        className="p-2 border border-sky-600 focus:outline-sky-800 rounded mt-2 w-full"
                    >
                        <option value="" disabled>Select Staff Name</option>
                        {users.filter(user => user.role === 'staff').map(staff => (
                            <option key={staff._id} value={staff.name}>{staff.name}</option>
                        ))}
                    </select>
                    {errors.staffName && <span className='text-rose-500'>Staff Name is required</span>}
                </div>

                <div className='my-2'>
                    <input
                        type='text'
                        className='w-full p-2 border-2 rounded-none border-sky-600 focus:outline-sky-800'
                        {...register('bio', { required: 'Bio is required' })}
                        placeholder='Enter Bio'
                    />
                    {errors.bio && <span className='text-rose-500'>{errors.bio.message}</span>}
                </div>

                <div className='my-2'>
                    <input
                        type='text'
                        className='w-full p-2 border-2 rounded-none border-sky-600 focus:outline-sky-800'
                        {...register('location', { required: 'Location is required' })}
                        placeholder='Enter Location'
                    />
                    {errors.location && <span className='text-rose-500'>{errors.location.message}</span>}
                </div>

                <div className='my-2'>
                    <input
                        type='number'
                        className='w-full p-2 border-2 rounded-none border-sky-600 focus:outline-sky-800'
                        {...register('rate', { required: 'Rate is required' })}
                        placeholder='Enter Rate'
                    />
                    {errors.rate && <span className='text-rose-500'>{errors.rate.message}</span>}
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
                    id='create_staff_btn_admin'
                    className='p-2 bg-sky-600 text-white rounded w-full'
                    disabled={loading}
                >
                    {loading ? 'Creating Staff...' : 'Create Staff'}
                </button>
            </form>
        </div>
    );
};

export default CreateStaff;
