import { Typography } from "@mui/material";
import React from "react";

import CategoriesTable from "./CategoriesTable";



const CategoryPage = () => {

    return (
        <div style={{ padding: 20 }}>
            <Typography variant="h4" gutterBottom>
                Categories Page</Typography>
            <CategoriesTable />
        </div>
    );
};
export default CategoryPage;