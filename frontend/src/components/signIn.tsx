import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';



import type { LoginFormData } from '../types/auth';
import { authAPI } from '../services/api';
import { useAuthStore } from '../store/authStore';
import axios from 'axios';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, setUser } = useAuthStore();

  const [formData, setFormData] = useState<LoginFormData>({
    phone_number: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated ) {
      
      navigate('/');
    } else if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, user, navigate, location]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await authAPI.login(formData);

      console.log(response);

      const { user, accessToken } = response.data.data;


      // Store tokens
      localStorage.setItem('accessToken', accessToken);

      // Update auth store
      setUser(user);

      // Redirect to admin dashboard
      const from = location.state?.from?.pathname || '/admin';
      console.log("=====>>>>>>", from)
      navigate(from, { replace: true });
    } catch (error: any) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  const handletest = async () => {
    try {
      const resp = await axios.get('http://localhost:4000')
      console.log(resp);


    } catch (Error: any) {
      console.log(Error);

    }
  }

  useEffect(() => {
    handletest()
  }, [])

  return (
    <Container component="main" maxWidth="sm" sx={{ py: 8 }}>
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <LoginIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
          <Typography component="h1" variant="h4">
            Login
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Sign in to access the admin dashboard
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="phone_number"
            label="phone_number"
            name="phone_number"
            autoComplete="phone_number"
            autoFocus
            value={formData.phone_number}
            onChange={handleInputChange}
            disabled={loading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleInputChange}
            disabled={loading}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <LoginIcon />}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </Box>

        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{' '}
            <MuiLink
              component={Link}
              to="/register"
              sx={{
                color: 'primary.main',
                fontWeight: '600',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Sign up here
            </MuiLink>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default AdminLogin;
