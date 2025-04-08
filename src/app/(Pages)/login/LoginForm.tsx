"use client";

import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/_private/Context/AuthContext';
import useAuthService from '@/app/_private/helpers/AuthService';
import { ILoginUser } from '@/app/_private/models/User/IUser';
import { useValidation } from '@/app/_private/hooks/useValidation';
import { NavRoutesEnum } from '@/app/_private/store/NavRoutesEnum';
import { LoginValidationSchema } from '@/app/_private/store/user/UserValidation';
import { InitialStateLoginUser } from '@/app/_private/store/user/UserStoreModule';

const LoginForm = () => {
    const { setLoginUserInformation } = useAuth();
    const AuthService = useAuthService();
    const router = useRouter()
    const [formData, setFormData] = useState<ILoginUser>(InitialStateLoginUser);
    const { errors, validateField, validateForm } = useValidation(LoginValidationSchema, {});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        validateField(name, value);
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        const formErrors = validateForm(formData);
        if (formErrors) return;

        const user = await AuthService.login(formData);
        if (user) {
            setLoginUserInformation(user);
            router.push(NavRoutesEnum.Home)
        } else {
            alert('Login failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
                error={!!errors.email}
                helperText={errors.email}
            />
            <TextField
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                margin="normal"
                error={!!errors.password}
                helperText={errors.password}
            />
            <Box display="flex" gap={2} mt={2}>

                <Button type="submit" variant="contained" fullWidth disabled={!!errors.email || !!errors.password}>
                    Login
                </Button>
                <Button
                    variant="outlined"
                    fullWidth
                    href={`${NavRoutesEnum.Register}`}>
                    Register
                </Button>
            </Box>
        </form>
    );
};

export default LoginForm;