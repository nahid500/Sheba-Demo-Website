import React from 'react';
import useAuth from '../../hooks/useAuth';

const StaffAbout = ({ staff }) => {
    const { services, slots } = useAuth();

    // Ensure staff and services are defined
    if (!staff || !services) {
        return <div>Loading...</div>;
    }

    // Handle categories, ensuring it defaults to "No Category Found" if undefined
    const categories = staff.services
        .map(staffServiceName => {
            const service = services.find(service => service.name === staffServiceName);
            return service ? service.category : 'No Category Found';
        })
        .filter((category, index, self) => self.indexOf(category) === index); // Remove duplicates

    // Function to format time
    function formatTime(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        const formattedHours = (hours % 12) || 12;
        const period = hours < 12 ? "AM" : "PM";
        return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    }

    return (
        <div className='py-10 bg-[#f9f8f8]'>
            <div className='container mx-auto p-2'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                        <div className='bg-white border rounded-md p-5 w-full md:w-11/12'>
                            <h2 className='text-xl font-bold mb-4'>Policies</h2>
                            <h3 className='text-xs font-semibold mb-2'>Location</h3>
                            <p className='text-gray-600 text-sm mb-4'>{staff.location}</p>
                            <h3 className='text-xs font-semibold mb-2'>Service Rate</h3>
                            <p className='text-gray-600 text-sm mb-4'>${staff.rate.toLocaleString()}</p>
                        </div>

                        <div className='bg-white border rounded-md p-5 w-full md:w-11/12 mt-5'>
                            <h2 className='text-xl font-bold mb-4'>Service Slots</h2>
                            <div className='divide-y divide-slate-200'>
                                {slots.length > 0 ? (
                                    slots.map(slot => (
                                        <div key={slot._id} className='grid grid-cols-2 items-center py-2'>
                                            <div className='text-gray-500 text-sm'>{slot.label}</div>
                                            <div className='text-gray-500 text-sm text-end'>
                                                {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className='text-gray-500 text-sm'>No slots available.</div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className='text-xl font-bold'>Staff Information</h2>
                        <p className='text-justify text-sm leading-6 text-gray-500 mt-3'>{staff.details}</p>

                        <div className='border rounded-md mt-5 p-5 bg-white'>
                            <h2 className='text-xl font-bold'>Categories</h2>
                            <div className='mt-5 flex flex-wrap gap-2'>
                                {categories.length > 0 ? (
                                    categories.map(category => (
                                        <p key={category} className='text-sm mr-2 p-2 rounded-full border border-gray-300'>
                                            {category}
                                        </p>
                                    ))
                                ) : (
                                    <p className='text-gray-500'>No categories available.</p>
                                )}
                            </div>
                        </div>

                        <div className='border rounded-md mt-5 p-5 bg-white'>
                            <h2 className='text-xl font-bold'>Services</h2>
                            <div className='mt-5 flex flex-wrap gap-2'>
                                {staff.services.length > 0 ? (
                                    staff.services.map(service => (
                                        <p key={service} className='text-sm mr-2 p-2 rounded-full border border-gray-300'>
                                            {service}
                                        </p>
                                    ))
                                ) : (
                                    <p className='text-gray-500'>No services listed.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffAbout;
