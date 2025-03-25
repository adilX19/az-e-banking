import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '@fontsource/roboto/300.css';
import Typography from '@mui/material/Typography';
import api from './api';
import isTokenValid from './api';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {

	const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
	const navigate = useNavigate();

	const token = localStorage.getItem('accessToken')

	if (token && isTokenValid(token)) {
		navigate('/dashboard');
	}

	const handleLogin = async (e) => {
		console.log("Login called")
        e.preventDefault();
        try {
            const response = await api.post('/authentication/token/', { username, password });
            const { access, refresh } = response.data;
            localStorage.setItem('accessToken', access);
            localStorage.setItem('refreshToken', refresh);
			navigate('/dashboard');
        } catch (err) {
			console.log(err)
            setError('Invalid credentials');
        }
    };

	return <div style={{ 'marginTop': '60px'}}>
		<Typography variant="h6" gutterBottom>
        	Login to your account
        </Typography>
		<Box
	      component="form"
	      sx={{ '& .MuiTextField-root': { m: 1, width: '35ch' } }}
	      noValidate
	      autoComplete="off"
		  onSubmit={handleLogin}
	    >
			<TextField 
				type='text' 
				id="username" 
				label="Username" 
				variant="outlined"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>

			<TextField 
				type='password' 
				id="password" 
				label="Password" 
				variant="outlined" 
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			
			<br />
			
			<Button style={{ 'marginLeft': '10px'}} type='submit' variant="contained" color="success">
		        Login
		    </Button>

			{error && <p>{error}</p>}

	    </Box>
	</div>
}