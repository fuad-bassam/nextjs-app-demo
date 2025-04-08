"use client"
import React, { useState } from 'react';
import { TextField, Button, Container, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/_private/Context/AuthContext';
import { ILoginUser, IRegistrationUser, IUser } from '@/app/_private/models/User/IUser';
import { InitialStateCreateUser, InitialStateCreateUserValidation } from '@/app/_private/store/user/UserStoreModule';
import { useValidation } from '@/app/_private/hooks/useValidation';
import UserApiModule from '@/app/_private/services/User/UserApiModule';
import { useSnackbar } from '@/app/_private/Context/SnackbarContext';
import { UserRegistrationValidationSchema } from '@/app/_private/store/user/UserValidation';
import { SnackbarSeverityEnum } from '@/app/_private/store/CommonEnums';
import { NavRoutesEnum } from '@/app/_private/store/NavRoutesEnum';

const RegistrationPage: React.FC = () => {
    const { setLoginUserInformation } = useAuth();
    const router = useRouter()
    const [formData, setFormData] = useState<IRegistrationUser>(InitialStateCreateUser);
    const { errors, validateField, isDataValid } = useValidation(UserRegistrationValidationSchema, InitialStateCreateUserValidation);
    const UserApi = UserApiModule.UserApi();
    const { showSnackbar } = useSnackbar();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        validateField(name, value);
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const userData: IUser = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
        };
        try {
            const user = await UserApi.create(userData);
            if (!user) {
                showSnackbar('User creation failed', SnackbarSeverityEnum.Error);
            }
            const loginUser: ILoginUser = {
                email: user.email,
                password: user.password,
            };
            setLoginUserInformation(loginUser);
            router.push(NavRoutesEnum.Home);

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
            showSnackbar(errorMessage, SnackbarSeverityEnum.Error);
        }
    };

    return (
        <Container>
            <Box my={4}>
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        name="name"
                        type="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name}
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email}
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors.password}
                        helperText={errors.password}
                        margin="normal"
                    />
                    <TextField
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        fullWidth
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" disabled={!isDataValid} fullWidth>
                        Register
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default RegistrationPage;
