"use client";

import Category from "@/app/_private/models/Product/Category";
import React from "react";
import { useDialog } from "@/app/_private/Context/DialogContext";
import { useSnackbar } from "@/app/_private/Context/SnackbarContext";
import { SnackbarSeverityEnum } from "@/app/_private/store/CommonEnums";
import { Button } from "@mui/material";
import { deleteCategory } from "../../../(moduleProducts)/_services/actions";
import { useRouter } from "next/router";
import { NavRoutesEnum } from "@/app/_private/store/NavRoutesEnum";

const CategoryCreateButton = ({ row }: { row: Category }) => {

    const router = useRouter()
    const { openDialog } = useDialog();
    const { showSnackbar } = useSnackbar();

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


    return <>
        <Button type="button" variant="outlined" color="secondary" onClick={() => handleDelete(row?.id)} >delete</Button>
        <Button type="button" variant="outlined" color="error" onClick={() => handleEdit(row?.id)} >delete</Button>

    </>;
};

export default CategoryCreateButton;