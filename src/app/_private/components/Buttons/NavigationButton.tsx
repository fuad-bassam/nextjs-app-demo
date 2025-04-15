"use client";

import React from "react";
import { Button, ButtonProps } from "@mui/material";
import { useRouter } from "next/navigation";

interface NavigationButtonProp extends ButtonProps {
    urlPath: string
    children: React.ReactNode;
}

const NavigationButton = ({ urlPath, children, ...rest }: NavigationButtonProp) => {

    const router = useRouter()
    const handleClick = () => {
        router.push(urlPath);
    };

    return <>
        <Button type="button" {...rest} onClick={() => handleClick()} >{children}</Button>
    </>;
};

export default NavigationButton;