"use client";

import Category from "@/app/_private/models/Product/Category";
import React from "react";
import { useDialog } from "@/app/_private/Context/DialogContext";
import { useSnackbar } from "@/app/_private/Context/SnackbarContext";
import { SnackbarSeverityEnum } from "@/app/_private/store/CommonEnums";
import { Button, Stack } from "@mui/material";
import { deleteCategory } from "../../_services/actions";
import { NavRoutesEnum } from "@/app/_private/store/NavRoutesEnum";
import { useRouter } from "next/navigation";

const CategoryActionsCell = ({ row }: { row: Category }) => {

    const router = useRouter()
    const { showSnackbar } = useSnackbar();
    const { openDialog } = useDialog();

    const handleDelete = (id: string | undefined) => {
        if (id) {
            openDialog('Are you sure you want to delete this item?', () => {
                deleteCategory(id)
                showSnackbar('deleted successfully', SnackbarSeverityEnum.Success);
            });
        } else {
            showSnackbar('id is missing', SnackbarSeverityEnum.Error);
        }
    };
    const handleEdit = (id: string | undefined) => {
        if (id) {
            router.push(`${NavRoutesEnum.CategoryCreateUpdate.replace(':urlId?', id)}`);
        } else {
            showSnackbar('id is missing', SnackbarSeverityEnum.Error);
        }
    };


    return <Stack direction="row" spacing={1}>
        <Button type="button" variant="dashed" color="error" onClick={() => handleEdit(row?.id)} >Edit</Button>
        <Button type="button" variant="outlined" color="secondary" onClick={() => handleDelete(row?.id)} >Delete</Button>
    </Stack>;
};

export default CategoryActionsCell;