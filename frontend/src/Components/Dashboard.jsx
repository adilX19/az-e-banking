import React, { useEffect, useState } from 'react';
import api from './api';

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get('/authentication/info/');
                setUserData(response.data);
            } catch (err) {
                setError('Failed to fetch user data.');
            }
        };

        fetchUserData();
    }, []); // Runs only on component mount

    if (error) {
        return <p>{error}</p>;
    }

    if (!userData) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Welcome, {userData.username}</h1>
            <p>Email: {userData.email}</p>
        </div>
    );
};

export default Dashboard;
