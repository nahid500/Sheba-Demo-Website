import React from 'react';
import { toast } from 'react-toastify';
import useAuth from '../../../../hooks/useAuth';

const ViewSlots = () => {
    const { slots, setSlots } = useAuth();

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SHEBA_BACKEND_API}/slot/${id}`, {
                method: 'DELETE'
            });

            const result = await response.json();

            if (response.ok) {
                toast.success(result.message); // Notify success
                await fetchUpdatedSlots(); // Fetch updated slots
            } else {
                toast.error(result.message || 'Failed to delete slot.'); // Notify failure
            }
        } catch (err) {
            toast.error('An error occurred while deleting the slot.');
            console.error('Delete Error:', err);
        }
    };

    const fetchUpdatedSlots = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SHEBA_BACKEND_API}/slots`);
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

    return (
        <div className='overflow-auto my-5 max-h-screen p-2'>
            <table className='min-w-full border relative'>
                <thead className='bg-white border-b sticky top-0'>
                    <tr>
                        <th className='text-sm font-medium text-gray-500 text-left p-2'>#</th>
                        <th className='text-sm font-medium text-gray-500 text-left p-2'>Label</th>
                        <th className='text-sm font-medium text-gray-500 text-left p-2'>Slot Duration</th>
                        <th className='text-sm font-medium text-gray-500 text-left p-2'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {slots.length > 0 ? (
                        slots.map((slot, index) => (
                            <tr key={slot._id} className='odd:bg-gray-100 even:bg-white border-b'>
                                <td className='text-sm text-gray-600 font-light p-3 whitespace-nowrap'>{index + 1}</td>
                                <td className='text-sm text-gray-600 font-light p-3 whitespace-nowrap'>{slot.label}</td>
                                <td className='text-sm text-gray-600 font-light p-3 whitespace-nowrap'>
                                    {slot.start_time} - {slot.end_time} {/* Improved slot duration display */}
                                </td>
                                <td className='text-sm text-gray-600 font-light p-3 whitespace-nowrap'>
                                    <button
                                        onClick={() => handleDelete(slot._id)}
                                        className='text-red-500 hover:text-red-700'
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className='text-center text-gray-600 font-light p-3'>No slots available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ViewSlots;
