"use server";
import { TableColumnFormat } from "@/app/_private/models/Common/TableColumnFormat";
import Category from "@/app/_private/models/Product/Category";
import categoryApi from "@/app/_private/services/Product/categoryApi";
// import { setOrGetCache } from "@/app/_private/helpers/CachingSessionService";
import { getJsonServerQueryBuildWithStringQuery } from "@/app/_private/helpers/getJsonServerSearchQuery";
import PaginatedTableNew from "@/app/_private/components/reusableComponent/TableParts/PaginatedTableNew";
import { ISearchAndPaginationInfo } from "@/app/_private/models/Common/Pagination";
import CategorySearchFormNew from "./CategorySearchFormNew";

const columns: TableColumnFormat<Category>[] = [
    { id: "name", label: "Name" },
    { id: "description", label: "Description" },
];

const CategoriesTableNew = async (props: {
    searchParams?: ISearchAndPaginationInfo;
}) => {

    console.log(props.searchParams);

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
    console.log(data1.data);
    // } catch {

    //     notFound();
    // }

    const timestamp = new Date().toISOString();
    return (
        <div style={{ padding: 20 }}>

            <p>Server-rendered at: {timestamp}</p>

            <CategorySearchFormNew
            // actions={
            //     <Button onClick={() => handleCreate()} variant="contained" color="primary" style={{ marginRight: 8 }}>
            //         Create
            //     </Button>
            // }
            />

            <PaginatedTableNew
                data={data1.data}
                columns={columns}
                totalCount={data1.totalCount}
            />
        </div>
    );
};
export default CategoriesTableNew;