/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { InitialStateProduct } from "../../_store/ProductStoreModule";
import Product from "@/app/_private/models/Product/Product";


interface ProductSearchFormProps {
    onSubmit: (formData: Product) => void;
    onReset: (formData: Product) => void;
    actions?: React.ReactNode;
}

const ProductSearchForm: React.FC<ProductSearchFormProps> = ({ onSubmit, onReset, actions }) => {
    const [formData, setFormData] = useState<Product>(InitialStateProduct);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleReset = (e: React.FormEvent) => {
        e.preventDefault();
        setFormData(InitialStateProduct);
        onReset(InitialStateProduct);
    };
    useEffect(() => {
        const delayInputTimeoutId = setTimeout(() => {
            onSubmit(formData)
        }, 500);
        return () => clearTimeout(delayInputTimeoutId);
    }, [formData]);

    return (
        <Box
            component="form"
            onSubmit={handleFormSubmit}
            sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
                margin: "16px",
                flexDirection: { xs: "column", sm: "row" },
            }}
        >
            <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                sx={{ flex: { xs: '1 1 100%', sm: '1 1 45%' } }}
                margin="normal"
            />
            <TextField
                label="Description"
                type="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                sx={{ flex: { xs: '1 1 100%', sm: '1 1 45%' } }}
                margin="normal"
            />

            <Box style={{ width: '100%', display: 'flex', gap: '16px', }} sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
                {actions}
                <Button type="submit" variant="outlined" color="primary">
                    Search
                </Button>
                <Button type="button" variant="outlined" color="secondary" onClick={handleReset}>
                    Clear Data
                </Button>
            </Box>
        </Box>
    );
};

export default ProductSearchForm;