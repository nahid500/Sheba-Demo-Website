import React from 'react';
import { toast } from 'react-toastify';
import useAuth from '../../../../hooks/useAuth';

const ViewCategories = () => {
    const { categories, setCategories } = useAuth();

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://shebaxyz-backend.onrender.com/category/${id}`, {
                method: 'DELETE'
            });

            const result = await response.json();

            if (response.ok) {
                toast.success(result.message); // Notify success
                await fetchUpdatedCategories(); // Fetch updated categories
            } else {
                toast.error(result.message); // Notify failure
            }
        } catch (err) {
            toast.error('An error occurred while deleting the category.');
        }
    };

    const fetchUpdatedCategories = async () => {
        try {
            const response = await fetch('https://shebaxyz-backend.onrender.com/categories');
            const result = await response.json();

            if (response.ok) {
                setCategories(Array.isArray(result.category) ? result.category : []); // Ensure categories is always an array
            } else {
                toast.error(result.message || 'Failed to fetch categories.');
            }
        } catch (err) {
            toast.error('An error occurred while fetching categories.');
        }
    };

    return (
        <div className='overflow-auto my-5 max-h-screen p-2'>
            <table className='min-w-full border relative'>
                <thead className='bg-white border-b sticky top-0'>
                    <tr>
                        <th className='text-sm font-medium text-gray-500 text-left p-2'>#</th>
                        <th className='text-sm font-medium text-gray-500 text-left p-2'>Name</th>
                        <th className='text-sm font-medium text-gray-500 text-left p-2'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(categories) && categories.length > 0 ? (
                        categories.map((category, index) => (
                            <tr key={category._id} className='odd:bg-gray-100 even:bg-white border-b'>
                                <td className='text-sm text-gray-600 font-light p-3 whitespace-nowrap'>{index + 1}</td>
                                <td className='text-sm text-gray-600 font-light p-3 whitespace-nowrap'>{category.name}</td>
                                <td className='text-sm text-gray-600 font-light p-3 whitespace-nowrap'>
                                    <button
                                        onClick={() => handleDelete(category._id)}
                                        className='text-red-500 hover:text-red-700'
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className='text-center text-gray-600 font-light p-3'>No categories available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ViewCategories;
