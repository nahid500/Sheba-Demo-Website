import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingModal from '../Booking/BookingModal';
import useAuth from '../../hooks/useAuth';

const StaffMiniCard = ({ staff }) => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {setStaff} = useAuth()

    const openModal = () => {
        setIsModalOpen(true);
        setStaff(staff)
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setStaff({})
    };

    return (
        <div className='bg-gray-50 border hover:border-sky-500 rounded-md shadow-md p-2'>
            <div className='items-center'>
                <img
                    src={staff.image}
                    alt={staff.name}
                    className='w-16 mx-auto rounded-full'
                />
                <div className='mt-3'>
                    <h2 className='text-center font-bold'>{staff.name}</h2>
                    <p className='text-center text-xs py-1 line-clamp-1'>{staff.bio}</p>
                    <p className='text-center text-sm text-gray-600'>
                        ${Number(staff.rate).toLocaleString()}
                    </p>
                </div>
                <div className='flex lg:block xl:flex justify-between mt-3'>
                    <button
                        onClick={openModal}
                        className='bg-green-700 hover:bg-green-900 text-white rounded-full text-xs flex items-center py-2 px-3 my-2'
                        aria-label={`Book ${staff.name}`}
                    >
                        Book Now
                    </button>
                    <button
                        onClick={() => navigate(`/staff-details/${staff._id}`)}
                        className='bg-sky-700 hover:bg-sky-900 text-white rounded-full text-xs flex items-center py-2 px-3 my-2'
                        aria-label={`View full profile of ${staff.name}`}
                    >
                        View Full Profile
                    </button>
                </div>
            </div>

            <BookingModal isOpen={isModalOpen} onClose={closeModal}>
                <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t'>
                    <h3 className='text-lg font-semibold text-gray-900'>Available Service Slots</h3>
                    <button
                        onClick={closeModal}
                        className='text-gray-500 hover:text-gray-700 font-bold  rounded ms-auto w-8 h-8  items-center justify-center inline-flex'
                        // aria-label='Close booking modal'
                    >
                        X
                    </button>
                </div>
            </BookingModal>
        </div>
    );
};

export default StaffMiniCard;
