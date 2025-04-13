"use client"
import React, { useEffect, useState } from "react";
import { Button, TextField, useMediaQuery } from "@mui/material";
import { InitialStateCategory } from "../../_store/ProductStoreModule";
import Category from "@/app/_private/models/Product/Category";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ISearchAndPaginationInfoKeysNames } from "@/app/_private/models/Common/Pagination";
import { getJsonServerQuerySearchPart } from "@/app/_private/helpers/getJsonServerSearchQuery";

interface CategorySearchFormProps {
    actions?: React.ReactNode;
}

const CategorySearchFormNew: React.FC<CategorySearchFormProps> = ({ actions }) => {
    const [formData, setFormData] = useState<Category>(InitialStateCategory);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    useEffect(() => {
        const delayInputTimeoutId = setTimeout(() => {
            handleFormSubmit()
        }, 500);
        return () => clearTimeout(delayInputTimeoutId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    const handleFormSubmit = (e?: React.FormEvent) => {
        if (e)
            e.preventDefault();
        const params = new URLSearchParams(searchParams)

        const stringQuery = getJsonServerQuerySearchPart(formData)
        if (stringQuery)
            params.set(ISearchAndPaginationInfoKeysNames.query, stringQuery)
        else
            params.delete(ISearchAndPaginationInfoKeysNames.query)

        router.push(`${pathname}?${params.toString()}`)
    };

    const handleReset = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams);
        params.delete(ISearchAndPaginationInfoKeysNames.query);
        setFormData(InitialStateCategory);
        router.push(`${pathname}? ${params.toString()}`)
    };

    const isXs = useMediaQuery('(max-width:600px)');

    return (
        <form
            onSubmit={handleFormSubmit}

            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                margin: '16px',
            }}
        >
            <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={{ flex: isXs ? '1 1 100%' : '1 1 45%' }}
                margin="normal"
            />
            <TextField
                label="Description"
                type="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                style={{ flex: isXs ? '1 1 100%' : '1 1 45%' }}
                margin="normal"
            />

            <div style={{ width: '100%', display: 'flex', gap: '16px', flexDirection: isXs ? 'column' : 'row' }}>
                {actions}
                <Button type="submit" variant="contained" color="primary">
                    Search
                </Button>
                <Button type="button" variant="outlined" color="secondary" onClick={handleReset}>
                    Clear Data
                </Button>
            </div>
        </form>
    );
};

export default CategorySearchFormNew;