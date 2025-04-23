"use client";

import React from "react";



const DatePicker1 = ({ children, className = "btn-primary", ...rest }) => {
    const baseClasses = "btn btn-lg";
    const Classes = `${baseClasses} ${className}`.trim();
    return <DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} />
};

export default DatePicker1;