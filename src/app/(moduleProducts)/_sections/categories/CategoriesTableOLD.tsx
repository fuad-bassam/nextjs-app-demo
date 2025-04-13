// "use client"
// import { TableColumnFormat } from "@/app/_private/models/Common/TableColumnFormat";
// import Category from "@/app/_private/models/Product/Category";
// import categoryApi from "@/app/_private/services/Product/categoryApi";
// import { Button } from "@mui/material";
// import React, { useEffect, useMemo, useState } from "react";
// import PaginatedTable from "@/app/_private/components/reusableComponent/PaginatedTable";
// import { SnackbarSeverityEnum } from "@/app/_private/store/CommonEnums";
// import { removeCachedItemsByPrefix, setOrGetCache } from "@/app/_private/helpers/CachingSessionService";
// import { NavRoutesEnum } from "@/app/_private/store/NavRoutesEnum";
// import { useDialog } from "@/app/_private/Context/DialogContext";
// import { useSnackbar } from "@/app/_private/Context/SnackbarContext";
// import { usePaginationItem } from "@/app/_private/hooks/usePagination";
// import { InitialStateCategory } from "../../_store/ProductStoreModule";
// import { getJsonServerQueryBuild } from "@/app/_private/helpers/getJsonServerSearchQuery";
// import { useRouter } from "next/navigation";



// const columns: TableColumnFormat<Category>[] = [
//     { id: "name", label: "Name" },
//     { id: "description", label: "Description" },
// ];

// const CategoriesTable = () => {
//     const CategoryApi = useMemo(() => categoryApi(), []);
//     const [data, setData] = useState<Category[]>([]);
//     const [totalCount, setTotalCount] = useState(0);
//     const { openDialog } = useDialog();
//     const router = useRouter()

//     const { showSnackbar } = useSnackbar();
//     const { paginationInfo, handlePaginationChange } = usePaginationItem();
//     const [isResetting, setIsResetting] = useState(false);
//     const [SearchFormData,] = useState<Category>(InitialStateCategory);

//     const fetchData = async () => {
//         const query = getJsonServerQueryBuild(paginationInfo, SearchFormData);

//         try {
//             const result: { data: Category[]; totalCount: number } = await setOrGetCache("Category/" + query, () => CategoryApi.getByQuery(query));
//             setData(result.data);
//             setTotalCount(result.totalCount);
//         } catch (error) {
//             if (error instanceof Error) {
//                 showSnackbar(`Error creating Category: ${error.message}`, SnackbarSeverityEnum.Error);
//             } else {
//                 showSnackbar('Unknown error occurred', SnackbarSeverityEnum.Error);
//             }
//             throw error;
//         }
//     };

//     const handleEdit = (id: string | undefined) => {
//         if (id) {
//             router.push(`${NavRoutesEnum.CategoryCreateUpdate.replace(':urlId?', id)}`);
//         } else {
//             showSnackbar('id is missing', SnackbarSeverityEnum.Error);

//         }
//     };

//     const handleDeleteClick = (id: string | undefined) => {
//         if (id) {
//             openDialog('Are you sure you want to delete this item?', () => {
//                 CategoryApi.deleteItem(id);
//                 removeCachedItemsByPrefix("Category/");
//                 setIsResetting(!isResetting);
//             });
//         } else {
//             showSnackbar('id is missing', SnackbarSeverityEnum.Error);
//         }
//     };


//     useEffect(() => {
//         fetchData();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [paginationInfo, isResetting]);
//     const timestamp = new Date().toISOString();
//     return (
//         <div style={{ padding: 20 }}>

//             <p>Server-rendered at: {timestamp}</p>


//             <PaginatedTable
//                 data={data}
//                 columns={columns}
//                 totalCount={totalCount}
//                 paginationInfo={paginationInfo}
//                 handlePaginationChange={handlePaginationChange}
//                 actions={(row) => (
//                     <>
//                         <Button onClick={() => handleEdit(row.id)} variant="outlined" color="primary" style={{ marginRight: 8 }}>
//                             Edit
//                         </Button>
//                         <Button onClick={() => handleDeleteClick(row.id)} variant="outlined" color="secondary">
//                             Delete
//                         </Button>
//                     </>
//                 )}
//             />
//         </div>
//     );
// };
// export default CategoriesTable;