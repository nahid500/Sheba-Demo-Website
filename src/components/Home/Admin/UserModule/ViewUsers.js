import React from 'react';
import { toast } from 'react-toastify';
import useAuth from '../../../../hooks/useAuth';

const ViewUsers = () => {
    const { users, setUsers } = useAuth();

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SHEBA_BACKEND_API}/user/${id}`, {
                method: 'DELETE'
            });

            const result = await response.json();

            if (result.status) {
                toast.success(result.message); // Notify success
                // Fetch updated user list
                const fetchUsers = async () => {
                    try {
                        const response = await fetch(`${process.env.REACT_APP_SHEBA_BACKEND_API}/users`);
                        const result = await response.json();

                        if (result.status) {
                            setUsers(result.users); // Update context or state
                        } else {
                            toast.error(result.message); // Notify error
                        }
                    } catch (err) {
                        toast.error('An error occurred while fetching users.');
                    }
                };
                fetchUsers();
            } else {
                toast.error(result.message); // Notify failure
            }
        } catch (err) {
            toast.error('An error occurred while deleting the user.');
        }
    };

    return (
        <div className='overflow-auto my-5 max-h-screen p-2'>
            <table className='min-w-full border relative'>
                <thead className='bg-white border-b sticky top-0'>
                    <tr>
                        <th className='text-sm font-medium text-gray-500 text-left p-2'>#</th>
                        <th className='text-sm font-medium text-gray-500 text-left p-2'>Name</th>
                        <th className='text-sm font-medium text-gray-500 text-left p-2'>Email</th>
                        <th className='text-sm font-medium text-gray-500 text-left p-2'>Role</th>
                        <th className='text-sm font-medium text-gray-500 text-left p-2'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user, index) => (
                            <tr key={user._id} className='odd:bg-gray-100 even:bg-white border-b'>
                                <td className='text-sm text-gray-600 font-light p-3 whitespace-nowrap'>{index + 1}</td>
                                <td className='text-sm text-gray-600 font-light p-3 whitespace-nowrap'>{user.name}</td>
                                <td className='text-sm text-gray-600 font-light p-3 whitespace-nowrap'>{user.email}</td>
                                <td className='text-sm text-gray-600 font-light p-3 whitespace-nowrap capitalize'>{user.role}</td>
                                <td className='text-sm text-gray-600 font-light p-3 whitespace-nowrap'>
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className='text-red-500 hover:text-red-700'
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className='text-center text-gray-600 font-light p-3'>No users available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ViewUsers;
