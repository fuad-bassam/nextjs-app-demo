"use client"
import DynamicForm from '@/app/_private/components/reusableComponent/DynamicForm';
import StepperForm from '@/app/_private/components/reusableComponent/StepperForm';
import React, { useEffect, useMemo, useState } from 'react';
import { CategoryValidationSchemaFrom1, CategoryValidationSchemaFrom2 } from '../../../_store/ProductValidation';
import { InitialStateCategory, InitialStateCategoryFrom1Validation, InitialStateCategoryFrom2Validation } from '../../../_store/ProductStoreModule';
import { fieldTypesEnum, SnackbarSeverityEnum } from '@/app/_private/store/CommonEnums';
import { IDynamicFormStep } from '@/app/_private/models/Common/IDynamicForm';
import { NavRoutesEnum } from '@/app/_private/store/NavRoutesEnum';
import { removeCachedItemsByPrefix } from '@/app/_private/helpers/CachingSessionService';
import Category from "@/app/_private/models/Product/Category";
import categoryApi from '@/app/_private/services/Product/categoryApi';
import { useSnackbar } from '@/app/_private/Context/SnackbarContext';
import { useParams } from 'next/navigation';
import NavigationButton from '@/app/_private/components/Buttons/NavigationButton';



const CategoryCreateUpdate: React.FC = () => {
    //note: urlId is match the name of the header
    const CategoryApi = useMemo(() => categoryApi(), []);
    const { id } = useParams();
    const urlId = id as string
    const { showSnackbar } = useSnackbar();
    const [newCategory, setNewCategory] = useState<Category>(InitialStateCategory);
    const [isStepValid, setIsStepValid] = useState(false);

    const handleCategoryChange = (updatedCategory: Category, isStepValid: boolean) => {
        setNewCategory(updatedCategory);
        setIsStepValid(isStepValid);
    };

    const handleCreateCategory = async (Category: Category) => {
        try {
            let createCategory: Category;
            if (!Category.id) {
                createCategory = await CategoryApi.create(Category);
                setNewCategory({ ...newCategory, id: createCategory?.id });
            } else {
                createCategory = await CategoryApi.update(Category);
            }
            setNewCategory((prev) => ({ ...prev, createdAt: new Date().toISOString() }));
            showSnackbar('Category created successfully', SnackbarSeverityEnum.Success);
        } catch (error) {
            if (error instanceof Error) {
                showSnackbar(`Error creating Category: ${error.message}`, SnackbarSeverityEnum.Error);
            } else {
                showSnackbar('Unknown error occurred', SnackbarSeverityEnum.Error);
            }
            throw error;
        }
    };

    const onReset = () => {
        setNewCategory(InitialStateCategory);
        removeCachedItemsByPrefix("Category/");
    };

    useEffect(() => {
        if (urlId) {
            const fetchCategory = async () => {
                try {
                    const CategoryData = await CategoryApi.getById(urlId);
                    setNewCategory(CategoryData);
                } catch (error) {
                    showSnackbar(`Error fetching Category: ${error}`, SnackbarSeverityEnum.Error);
                }
            };
            fetchCategory();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [urlId]);


    const CategoryFormSteps: IDynamicFormStep[] = [
        {
            step: 1,
            fields: [
                {
                    name: 'name',
                    label: 'Category Name',
                    fieldType: fieldTypesEnum.Text,
                    required: true
                }
            ],
            validationSchema: CategoryValidationSchemaFrom1,
            initialValidationState: InitialStateCategoryFrom1Validation,
        },
        {
            step: 2,
            fields: [
                {
                    name: 'description',
                    label: 'Category Description',
                    fieldType: fieldTypesEnum.Text,
                    required: true
                },

            ],
            validationSchema: CategoryValidationSchemaFrom2,
            initialValidationState: InitialStateCategoryFrom2Validation,
        },
    ];


    return (
        <div>
            <NavigationButton urlPath={`${NavRoutesEnum.Categories}`}>Back</NavigationButton>
            <StepperForm
                steps={['Step 1: Category Name', 'Step 2: Category description']}
                onSubmit={async () => await handleCreateCategory(newCategory)}
                saveOnStep={false}
                isStepValid={isStepValid}
                onReset={() => onReset()}
            >
                {CategoryFormSteps.map((stepConfig) => (
                    <DynamicForm
                        key={stepConfig.step}
                        data={newCategory}
                        onChange={handleCategoryChange}
                        step={stepConfig.step}
                        fields={stepConfig.fields}
                        validationSchema={stepConfig.validationSchema}
                        initialValidationState={stepConfig.initialValidationState}
                    />
                ))}
            </StepperForm>

        </div>
    );
};

export default CategoryCreateUpdate;