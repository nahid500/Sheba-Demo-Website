import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import StaffMiniCard from '../../components/Staffs/StaffMiniCard';
import useAuth from '../../hooks/useAuth';

const ServiceDetails = () => {
    const { id } = useParams();
    const {user, staffs, service, setService} = useAuth()

    useEffect(() => {

        const fetchData = async() => {
            try{
                const response = await fetch(`http://localhost:5000/service/${id}`)
                const result = await response.json()
                if(result.status){
                    setService(result.service)
                }
                else{
                    console.log(result);
                    
                }
            }
            catch(err){
                console.log(err);
                
            }
        }
        fetchData()

    },[id, setService])

    // const service = services.find(service => service._id === id);

    // if (!service) {
    //     return <div>Service not found</div>;
    // }

    return (
        <div>
            <NavBar />
            <div className='container mx-auto p-2 capitalize'>
                <h1 className='text-xl lg:text-3xl my-5 lg:my-10 font-bold'>{service.name}</h1>

                <div className='grid grid-cols-1 lg:grid-cols-2'>
                    <div className='w-full p-5 order-last lg:order-first'>
                        <img src={service.image} alt={service.name} className='max-w-full mx-auto rounded-xl shadow' />
                        <h2 className='font-bold text-xl mt-10 py-2'>{service.name}</h2>
                        <p className='text-justify'>{service.details}</p>
                    </div>

                    {
                        (user.role === 'user' || !user.role) &&
                        <div className=''>
                        <h2 className='font-bold'>Service Providers</h2>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                        {staffs.filter(staff => staff.services.includes(service.name)).map(staff => (
                            <div>
                                <StaffMiniCard key={staff._id} staff={staff}/>
                            </div>
                        ))}
                        </div>
                        </div>
                    }

                </div>
            </div>
        </div>
    );
}

export default ServiceDetails;
