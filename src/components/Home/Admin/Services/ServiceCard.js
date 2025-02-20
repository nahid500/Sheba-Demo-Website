import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';

const ServiceCard = ({ service }) => {
    const { _id, name, image } = service;
    const {setService} = useAuth()

    return (
        <Link to={`/service-details/${_id}`} onClick={() => setService(service)} className='border rounded-lg overflow-hidden shadow-lg'>
            <img src={image} alt={name} className='w-full h-40 object-cover' />
            <div className='p-4'>
                <h3 className='text-xl font-semibold mb-2'>{name}</h3>
            </div>
        </Link>
    );
};

export default ServiceCard;
