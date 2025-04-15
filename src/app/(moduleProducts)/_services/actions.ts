"use server";

import { revalidatePath } from "next/cache";
import categoryApi from "@/app/_private/services/Product/categoryApi";

export const deleteCategory = async (id: string | undefined) => {
    if (!id) throw new Error("ID is required");
    await categoryApi().deleteItem(id);
    revalidatePath("/categories"); // Revalidate the page after deletion
};