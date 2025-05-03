import React from 'react';
import useAuth from '../../../../hooks/useAuth';
import { toast } from 'react-toastify';

const ViewStaffs = () => {
    const { staffs, setStaffs } = useAuth();

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://shebaxyz-backend.onrender.com/staff/${id}`, {
                method: 'DELETE'
            });

            const result = await response.json();

            if (result.status) {
                toast.success(result.message); // Notify success
                // Fetch updated user list
                const fetchStaffs = async () => {
                    try {
                        const response = await fetch('https://shebaxyz-backend.onrender.com/staffs');
                        const result = await response.json();

                        if (result.status) {
                            setStaffs(result.staffs || []); // Default to empty array if result.staffs is undefined
                        } else {
                            toast.error(result.message); // Notify error
                        }
                    } catch (err) {
                        toast.error('An error occurred while fetching staffs.');
                    }
                };
                fetchStaffs();
            } else {
                toast.error(result.message); // Notify failure
            }
        } catch (err) {
            toast.error('An error occurred while deleting the user.');
        }
    };

    return (
        <div className='overflow-auto my-5 max-h-screen p-2'>
            <table className='overflow-y-auto min-w-full border border-gray-300'>
                <thead className='bg-gray-50 border-b'>
                    <tr>
                        <th className='text-sm font-medium text-gray-500 text-left p-2'>#</th>
                        <th className='text-sm font-medium text-gray-500 text-left p-2'>Image</th>
                        <th className='text-sm font-medium text-gray-500 text-left p-2'>Name</th>
                        {/* <th className='text-sm font-medium text-gray-500 text-left p-2'>Services</th> */}
                        <th className='text-sm font-medium text-gray-500 text-left p-2'>Rate</th>
                        <th className='text-sm font-medium text-gray-500 text-left p-2'>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {Array.isArray(staffs) && staffs.length > 0 ? (
                        staffs.map((staff, index) => (
                            <tr key={staff._id} className='odd:bg-gray-100 even:bg-white border-b'>
                                <td className='text-sm text-gray-600 font-light p-3 whitespace-nowrap'>{index + 1}</td>
                                <td className='text-sm text-gray-600 font-light p-3 whitespace-nowrap'><img className='w-10 h-10 rounded-full' src={staff.image} alt={staff.name} /></td>
                                <td className='text-sm text-gray-600 font-light p-3 whitespace-nowrap'>{staff.name}</td>
                                {/* <td className='text-sm text-gray-600 font-light p-3'>{staff.services.join(', ')}</td> */}
                                <td className='text-sm text-gray-600 font-light p-3 whitespace-nowrap'>{staff.rate}</td>

                                <td className='text-sm text-gray-600 font-light p-3'>
                                    <button
                                        onClick={() => handleDelete(staff._id)}
                                        className='text-red-500 hover:text-red-700'
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className='text-center text-gray-600 font-light p-3'>No staff available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ViewStaffs;
