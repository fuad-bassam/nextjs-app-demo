'use client';

import Button1 from "@/app/_private/components/Buttons/Button1";
import LOV from "@/app/_private/components/LOV/LOV";
import { Box } from "@mui/material";

export default function themePage() {

    const handleClick = () => {

    };
    return (

        <>

            <h1>hi from themePage</h1>

            <Box display="flex" flexWrap="wrap" gap={5} maxWidth="500px" marginTop="20px">
                <Button1 onClick={handleClick}>Logout Logout Logout Logout Logout Logout Logout </Button1>
                <Button1 className="btn-secondary" onClick={handleClick}>Logout Logout Logout Logout Logout Logout Logout </Button1>

                <Button1 className="btn-secondary" onClick={handleClick}>Logout Logout Logout Logout Logout Logout Logout </Button1>
                <Button1 className="btn-secondary" onClick={handleClick}>Logout Logout Logout Logout Logout Logout Logout </Button1>
                <Button1 className="btn-secondary" onClick={handleClick}>Logout Logout Logout Logout Logout Logout Logout </Button1>
                <Button1 className="btn-secondary" onClick={handleClick}>Logout Logout Logout Logout Logout Logout Logout </Button1>
            </Box>
            <Box display="flex" flexWrap="wrap" gap={5} maxWidth="500px" marginTop="20px">
                <LOV></LOV>
            </Box>
        </>
    );
}
