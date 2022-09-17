import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomTable from '../components/CustomTable';
import { getCategories, deleteCategory } from '../redux/features/category/categorySlice';
import fileService from '../utils/files';
import tableHeadService from '../utils/tableHead';

export default function Category() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const TABLE_HEAD = tableHeadService.generateTableHead(['id', 'name', 'parent', 'tree', 'subCategories']);
  const [page, setPage] = useState(0);

  /* eslint-disable */
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  /* eslint-enable */

  const sideMenuButtonItems = [
    {
      text: 'Delete',
      callback: (currentItem) => dispatch(deleteCategory(currentItem.id)),
    },
    {
      text: 'Edit Category',
      callback: (currentItem) => {
        console.log(currentItem);
        navigate('/manage-category', { state: { mode: 'edit', category: currentItem } });
      },
    },
  ];

  const topButtons = [
    {
      text: 'Add Category',
      callback: () => navigate('/manage-category', { state: { mode: 'add' } }),
    },
    {
      text: 'Import Categories',
      callback: (e) =>
        fileService.handleFileUpload(e, (data) => {
          console.log(data);
        }),
    },
    {
      text: 'Export Categories',
      callback: () => fileService.handleFileExport('Users', categories),
    },
  ];

  const { categories } = useSelector((state) => state.category);

  return (
    <CustomTable
      title={'Categories'}
      searchAttribute={'name'}
      searchPlaceHolder={'name'}
      head={TABLE_HEAD}
      items={categories}
      sideButtons={sideMenuButtonItems}
      topButtons={topButtons}
      showId
      page={page}
      pageCallBack={(value) => setPage(value)}
    />
  );
}
