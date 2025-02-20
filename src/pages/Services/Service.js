import React from 'react';
import NavBar from '../../components/NavBar';
import ServiceCard from '../../components/Home/Admin/Services/ServiceCard';
import useAuth from '../../hooks/useAuth';

const Service = () => {

    const {categories, services} = useAuth()

    return (
        <div>
            <NavBar />
            <div className='container mx-auto p-2'>
                <h1 className='text-3xl mt-5 font-bold'>All Services</h1>
                {categories.map(category => (
                    <div key={category._id} className='my-20'>
                        <h2 className='text-2xl font-bold mb-4'>{category.name}</h2>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                            {services.filter(service => service.category === category.name).map(service => (
                                <ServiceCard key ={service._id} service={service} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Service;
