import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import Form from '../components/form/form';
import { addCategory, editCategory } from '../redux/features/category/categorySlice';

const textInputs = [
  {
    name: 'name',
    label: 'Name',
  },
  {
    name: 'parent',
    label: 'Parent',
  },
  {
    name: 'tree',
    label: 'Tree',
  },
  {
    name: 'subCategory',
    label: 'Sub Categories (separate each one with a comma eg: burger,chicken )',
  },
];

export default function CategoryForm() {
  const location = useLocation();
  const mode = location?.state?.mode ? location?.state?.mode : 'add';
  const categoryInfo = mode === 'edit' ? location.state.category : null;

  const formHeader = mode && mode === 'edit' ? 'Category update' : 'Category Addition';
  const formButton = {
    text: mode && mode === 'edit' ? 'Update Category' : 'Add Category',
    onClick: () => console.log('clicked'),
  };

  const dispatch = useDispatch();

  console.log(mode);

  const menuItems = [];

  /* eslint-disable */
  useEffect(() => {
    if (mode === 'edit') {
    }
  }, []);
  /* eslint-enable */

  const addCategorySchema = Yup.object().shape({
    name: Yup.string().required('Name is Required').min(4),
    parent: Yup.string().required('Parent is Required').min(4),
    tree: Yup.string().required('tree is Required').min(4),
    subCategory: Yup.string().required('At least 1 sub-category is required').min(4),
  });
  const editCategorySchema = Yup.object().shape({
    name: Yup.string().required('Name is Required').min(4),
    parent: Yup.string().required('Parent is Required').min(4),
    tree: Yup.string().required('tree is Required').min(4),
    subCategory: Yup.string().required('At least 1 sub=category is required').min(4),
  });

  const defaultValues = {
    name: mode === 'edit' && categoryInfo ? categoryInfo.name : '',
    parent: mode === 'edit' && categoryInfo ? categoryInfo.parent : '',
    tree: mode === 'edit' && categoryInfo ? categoryInfo.tree : '',
    subCategory: mode === 'edit' && categoryInfo ? categoryInfo.subCategory : '',
  };

  const handleCategorySubmission = (formValues) => {
    // separating each category with ,
    const subCategoryArray = formValues?.subCategory ? formValues.subCategory.split(',') : [];
    delete formValues?.subCategory;
    const valuesToBeSubmitted = { ...formValues, subCategoryArray };

    switch (mode) {
      case 'add':
        dispatch(addCategory(valuesToBeSubmitted));
        break;
      case 'edit':
        dispatch(editCategory(valuesToBeSubmitted));
        break;
      default:
    }
  };

  const handleBaseRendering = () => {
    if (mode === 'edit')
      return (
        <Form
          schema={mode === 'edit' ? addCategorySchema : editCategorySchema}
          textInputs={textInputs}
          formButton={formButton}
          formHeader={formHeader}
          menuItems={mode === 'edit' && menuItems.length > 1 ? menuItems : null}
          defaultValues={defaultValues}
          onFormSubmission={handleCategorySubmission}
        />
      );

    console.log(mode === 'add' && menuItems);
    return (
      <Form
        schema={mode === 'add' ? addCategorySchema : editCategorySchema}
        textInputs={textInputs}
        formButton={formButton}
        formHeader={formHeader}
        menuItems={(mode === undefined || mode === 'add') && menuItems.length > 1 ? menuItems : null}
        defaultValues={defaultValues}
        onFormSubmission={handleCategorySubmission}
      />
    );
  };
  return <>{handleBaseRendering()}</>;
}
