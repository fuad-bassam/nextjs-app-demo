"use client";

import React from "react";
import { Button, ButtonProps } from "@mui/material";



const Button1 = ({ children, className = "btn-primary", ...rest }: ButtonProps) => {
    const baseClasses = "btn btn-lg";
    const Classes = `${baseClasses} ${className}`.trim();
    return <>
        <Button type="button" className={Classes} {...rest}>{children}</Button>
    </>;
};

export default Button1;