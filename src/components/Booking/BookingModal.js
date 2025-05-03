import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const BookingModal = ({ isOpen, onClose, children }) => {
    const { slots, user, service, staff,slot,  setSlot } = useAuth();
    const [bookingError, setBookingError] = useState("");
    const [selectedSlot, setSelectedSlot] = useState('');
    const [buttonText, setButtonText] = useState('Pay Now');
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            document.querySelector('.modal-content')?.focus();
        }
    }, [isOpen]);

    const handleSlotChange = (e) => {
        const selected = slots.find(slot => slot.label === e.target.value);
        setSelectedSlot(e.target.value);
        setSlot(selected);
        setBookingError(''); // Clear booking error when a slot is selected
    };

    const handleBookNow = async () => {
        if (!user.email) {
            navigate('/login');
            return;
        }
    
        if (!selectedSlot) {
            setBookingError("Please select a slot.");
            return;
        }
    
        setIsProcessing(true);
        setButtonText("Processing Payment...");
    
        const trx_id = await generateTransactionId();
    
        const formData = {
            date: new Date().toISOString().split("T")[0],
            email: user.email,
            name: user.name,
            service,
            staff,
            slot,
            trx_id,
            status: 'pending',
        };
    
        console.log("Sending form data:", formData);
        
        try {
            const response = await fetch(`${process.env.REACT_APP_SHEBA_BACKEND_API}/booking`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const result = await response.json();
    
            if (result.status) {
                payNow(staff.rate, trx_id);
            } else {
                setBookingError(result.message || "Booking failed. Please try again.");
            }
        } catch (err) {
            console.error("Fetch error:", err);
            setBookingError("An error occurred. Please try again.");
        } finally {
            setIsProcessing(false);
            setButtonText("Pay Now");
        }
    };
    
    
    
    
    

    if (!isOpen) return null;

    async function generateTransactionId(prefix = "TX") {
        const timeStamp = Date.now();
        const randomNumber = Math.floor(Math.random() * 9000) + 1000;
        return `${prefix}-${timeStamp}-${randomNumber}`;
    }
    

    const payNow = async (amount, trx_id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SHEBA_BACKEND_API}/pay/${amount}/${trx_id}`);
            if (!response.ok) {
                throw new Error("Failed to initiate payment");
            }
    
            const result = await response.json();
            if (result.status && result.payment_link) {
                window.location.replace(result.payment_link);
            } else {
                console.error("Payment Error:", result.message || "Unknown error");
                setBookingError(result.message || "Payment failed.");
                setButtonText("Pay Now");
            }
        } catch (err) {
            console.error("Payment Fetch Error:", err);
            setBookingError("An error occurred while processing payment.");
            setButtonText("Pay Now");
        } finally {
            setIsProcessing(false);
        }
    };
    

    return (
        <div 
            className='fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black bg-opacity-50'
            role="dialog"
            aria-modal="true"
            tabIndex="-1"
        >
            <div 
                className='relative bg-white rounded-lg w-96 max-w-sm mx-4 modal-content'
                tabIndex="0"
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <button
                    onClick={onClose}
                    className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
                    aria-label='Close modal'
                >
                    &times;
                </button>
                <div className='p-4'>
                    {children}
                    <div className='p-4 md:p-5'>
                        <h2 id="modal-title" className='text-lg font-semibold'>Select your desired slot</h2>
                        {bookingError && <p className='text-rose-500 text-sm'>{bookingError}</p>}
                        <ul className='space-y-4 mb-4 max-h-80 overflow-auto'>
                            {slots.length > 0 ? (
                                slots.map(slot => (
                                    <li key={slot._id}>
                                        <input
                                            type='radio'
                                            id={`slot-${slot._id}`}
                                            name='slot'
                                            value={slot.label}
                                            checked={selectedSlot === slot.label}
                                            onChange={handleSlotChange}
                                            className='hidden peer'
                                            required
                                        />
                                        <label
                                            htmlFor={`slot-${slot._id}`}
                                            className='inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        >
                                            <div className='block'>
                                                <div className='w-full text-lg font-semibold'>
                                                    {slot.label}
                                                </div>
                                                <div>
                                                    {slot.start_time} - {slot.end_time}
                                                </div>
                                            </div>
                                        </label>
                                    </li>
                                ))
                            ) : (
                                <p className='text-gray-500'>No available slots.</p>
                            )}
                        </ul>
                        <button 
                            onClick={handleBookNow} 
                            className={`text-white inline-flex w-full justify-center ${isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800'} focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                            disabled={isProcessing}
                        >
                            {buttonText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
