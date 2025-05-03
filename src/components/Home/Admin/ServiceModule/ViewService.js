import React from 'react';
import useAuth from '../../../../hooks/useAuth';
import { toast } from 'react-toastify';

const ViewService = () => {
    const { services, setServices } = useAuth();

    // Function to fetch the updated list of services
    const fetchServices = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SHEBA_BACKEND_API}/services`);
            const result = await response.json();

            if (result.status) {
                setServices(result.services || []); 
            } else {
                toast.error(result.message || 'Failed to fetch services.');
            }
        } catch (err) {
            toast.error('An error occurred while fetching services.');
            console.error(err);
        }
    };

    // Function to handle service deletion
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SHEBA_BACKEND_API}/service/${id}`, {
                method: 'DELETE'
            });

            const result = await response.json();

            if (result.status) {
                toast.success(result.message); // Notify success
                fetchServices(); // Fetch updated services list
            } else {
                toast.error(result.message || 'Failed to delete service.'); // Notify failure
            }
        } catch (err) {
            toast.error('An error occurred while deleting the service.');
            console.error(err);
        }
    };

    return (
        <div className='overflow-auto my-5 max-h-screen p-2'>
            <table className='min-w-full border border-gray-300'>
                <thead className='bg-gray-50 border-b'>
                    <tr>
                        <th className='text-sm font-medium text-gray-500 text-left p-2'>#</th>
                        <th className='text-sm font-medium text-gray-500 text-left p-2'>Image</th>
                        <th className='text-sm font-medium text-gray-500 text-left p-2'>Category</th>
                        <th className='text-sm font-medium text-gray-500 text-left p-2'> Service Name</th>
                        <th className='text-sm font-medium text-gray-500 text-left p-2'>Action</th>
                    </tr>
                </thead>
                <tbody className='overflow-y-auto'>
                    {Array.isArray(services) && services.length > 0 ? (
                        services.map((service, index) => (
                            <tr key={service._id} className='odd:bg-gray-100 even:bg-white border-b'>
                                <td className='text-sm text-gray-600 font-light p-3 whitespace-nowrap'>{index + 1}</td>
                                <td className='text-sm text-gray-600 font-light p-3 whitespace-nowrap'>
                                    <img className='w-10 h-10 rounded-full' src={service.image} alt={service.name} />
                                </td>
                                <td className='text-sm text-gray-600 font-light p-3 whitespace-nowrap'>{service.category}</td>
                                <td className='text-sm text-gray-600 font-light p-3 whitespace-nowrap'>{service.name}</td>
                                <td className='text-sm text-gray-600 font-light p-3'>
                                    <button
                                        onClick={() => handleDelete(service._id)}
                                        className='text-red-500 hover:text-red-700'
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className='text-center text-gray-600 font-light p-3'>No service available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ViewService;
