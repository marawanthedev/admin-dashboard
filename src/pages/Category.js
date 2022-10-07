import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomTable from '../components/CustomTable';
import { getCategories, deleteCategory } from '../redux/features/category/categorySlice';
import fileService from '../utils/files';
import tableHeadService from '../utils/tableHead';
import Protected from '../utils/protected';

export default function Category() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  // keys for table will only be based on recieved object keys to avoid having column with no value
  const keys = Object.keys(categories[0] || {}).filter((key) => key !== 'id');
  const TABLE_HEAD = tableHeadService.generateTableHead(keys.length > 0 ? keys : []);
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
      text: 'Export Categories',
      callback: () => fileService.handleFileExport('Users', categories),
    },
  ];

  //  todo convert use type into array

  return (
    <Protected allowedRoles={['admin']}>
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
    </Protected>
  );
}
