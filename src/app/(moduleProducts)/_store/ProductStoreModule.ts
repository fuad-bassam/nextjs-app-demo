import Category from "@/app/_private/models/Product/Category";
import Product from "@/app/_private/models/Product/Product";
import Variants from "@/app/_private/models/Product/Variants";



export const InitialStateProduct: Product = { name: '', categoryId: "0", description: '', notes: "", createdAt: '', };

export const InitialStateCategory: Category = { name: '', description: '', };

export const InitialStateVariant: Variants = { name: '', productId: "0", price: 0, stock: 0, };










export const InitialStateProductFrom1Validation = { name: undefined, categoryId: undefined };
export const InitialStateProductFrom2Validation = { description: undefined };


export const InitialStateCategoryFrom1Validation = { name: undefined, };
export const InitialStateCategoryFrom2Validation = { description: undefined };


export const InitialStateVariantFrom1Validation = { name: undefined, productId: undefined };
export const InitialStateVariantFrom2Validation = { price: undefined, stock: undefined };

