import { useEffect, useState } from 'react';

const useCredential = () => {
    const id = localStorage.getItem('uId');
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [slots, setSlots] = useState([]);
    const [staffs, setStaffs] = useState([]);
    const [services, setServices] = useState([]);
    const [service, setService] = useState({})
    const [staff, setStaff] = useState({})
    const [slot, setSlot] = useState({})

    // Fetch user data based on user ID
    useEffect(() => {
        const fetchUserData = async () => {
            if (id) {
                try {
                    const response = await fetch(`https://sheba-backend.onrender.com/user/${id}`);
                    const result = await response.json();
                    if (result.user) {
                        setUser(result.user);
                    } else {
                        console.error('User not found');
                    }
                } catch (error) {
                    console.error('Failed to fetch user:', error);
                }
            } else {
                setUser({});
            }
        };

        fetchUserData();
    }, [id]);

    const logOut = () => {
        localStorage.removeItem('uId');
        setUser({});
    };

    // Fetch users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://sheba-backend.onrender.com/users');
                const result = await response.json();
                if (result.status) {
                    setUsers(result.users || []);
                } else {
                    console.log(result.message || 'Failed to fetch users');
                }
            } catch (error) {
                console.log('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://sheba-backend.onrender.com/categories');
                const result = await response.json();
                if (result.status) {
                    setCategories(result.category || []);
                } else {
                    console.log(result.message || 'Failed to fetch categories');
                }
            } catch (error) {
                console.log('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    // Fetch slots
    useEffect(() => {
        const fetchSlots = async () => {
            try {
                const response = await fetch('https://sheba-backend.onrender.com/slots');
                const result = await response.json();
                if (result.status) {
                    setSlots(result.slots || []);
                } else {
                    console.log(result.message || 'Failed to fetch slots');
                }
            } catch (error) {
                console.log('Error fetching slots:', error);
            }
        };

        fetchSlots();
    }, []);

    // Fetch staffs
    useEffect(() => {
        const fetchStaffs = async () => {
            try {
                const response = await fetch('https://sheba-backend.onrender.com/staffs');
                const result = await response.json();
                if (result.status) {
                    setStaffs(result.staffs || []);
                } else {
                    console.log(result.message || 'Failed to fetch staffs');
                }
            } catch (error) {
                console.log('Error fetching staffs:', error);
            }
        };

        fetchStaffs();
    }, []);

    // Fetch services
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('https://sheba-backend.onrender.com/services');
                const result = await response.json();
                if (result.status) {
                    setServices(result.services || []);
                } else {
                    console.log(result.message || 'Failed to fetch services');
                }
            } catch (error) {
                console.log('Error fetching services:', error);
            }
        };

        fetchServices();
    }, []);

    return { user, setUser, users, setUsers, categories, setCategories, slots, setSlots, staffs, setStaffs, services, setSlot, slot, service, setService, staff, setStaff,setServices, logOut };
};

export default useCredential;
