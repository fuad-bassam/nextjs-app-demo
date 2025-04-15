"use server";
import { TableColumnFormat } from "@/app/_private/models/Common/TableColumnFormat";
import Category from "@/app/_private/models/Product/Category";
import categoryApi from "@/app/_private/services/Product/categoryApi";
// import { setOrGetCache } from "@/app/_private/helpers/CachingSessionService";
import { getJsonServerQueryBuildWithStringQuery } from "@/app/_private/helpers/getJsonServerSearchQuery";
import PaginatedTableNew from "@/app/_private/components/reusableComponent/TableParts/PaginatedTableNew";
import { ISearchAndPaginationInfo } from "@/app/_private/models/Common/Pagination";
import CategorySearchFormNew from "./CategorySearchFormNew";
import CategoryActionsCell from "@/app/(moduleProducts)/_areas/CategoriesTableNew/CategoryActionsCell";
import { NavRoutesEnum } from "@/app/_private/store/NavRoutesEnum";

import NavigationButton from "@/app/_private/components/Buttons/NavigationButton";

const columns: TableColumnFormat<Category>[] = [
    { id: "name", label: "Name" },
    { id: "description", label: "Description" },
];

const CategoriesTableNew = async (props: {
    searchParams?: ISearchAndPaginationInfo;
}) => {

    const {
        query = '',
        currentPage = 0,
        rowsPerPage = 10,
        sortOrder = null,
        sortBy = ""
    } = props.searchParams || {};


    // try {
    const urlQuery = getJsonServerQueryBuildWithStringQuery({
        currentPage,
        rowsPerPage,
        sortBy,
        sortOrder
    }, query);

    const data1 = await categoryApi().getByQuery(urlQuery);
    // } catch {

    //     notFound();
    // }

    const timestamp = new Date().toISOString();
    return (
        <div style={{ padding: 20 }}>

            <p>Server-rendered at: {timestamp}</p>

            <CategorySearchFormNew
                actions={
                    <NavigationButton urlPath={`${NavRoutesEnum.CategoryCreateUpdate.replace(':urlId?', '')}`} variant="contained" color="primary" >Create Category</NavigationButton>
                }
            />

            < PaginatedTableNew
                data={data1.data}
                columns={columns}
                totalCount={data1.totalCount}
                actions={(row) => (
                    <CategoryActionsCell row={row} />
                )}
            />
        </div >
    );
};
export default CategoriesTableNew;