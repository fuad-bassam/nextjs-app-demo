import { Box, Container } from "@mui/material";
import LoginForm from "./LoginForm";

const LoginPage: React.FC = () => {
    const timestamp = new Date().toISOString();
    return (
        <Container>
            <Box my={4}>
                <h2>Login</h2>
                <p>Server-rendered at: {timestamp}</p>

                <LoginForm />
            </Box>
        </Container>
    );
};

export default LoginPage;