import { Typography } from "@mui/material";
import React, { Suspense } from "react";

import CategoriesTableNew from "../../_sections/categories/CategoriesTableNew";
import { ISearchAndPaginationInfo } from "@/app/_private/models/Common/Pagination";
import Loading from "./loading";



const CategoryPage = async (props: { searchParams?: Promise<ISearchAndPaginationInfo> }) => {
    const searchParams = await props.searchParams;
    return (
        <div style={{ padding: 20 }}>
            <Typography variant="h4" gutterBottom>
                Categories Page</Typography>
            <Suspense fallback={<Loading />}>

                <CategoriesTableNew searchParams={searchParams} />
            </Suspense>
        </div>
    );
};
export default CategoryPage;