// redux
import { useDispatch, useSelector } from 'react-redux';
import { filter } from 'lodash';
import { useState, useEffect } from 'react';
import { Link as RouterLink, Route, useNavigate } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Grid,
} from '@mui/material';

import csvService from '../utils/csv';

// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import { getProducts, deleteProduct } from '../redux/features/product/productSlice';

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'title', label: 'Title', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'images', label: 'Images ', alignRight: false },
  { id: 'price', label: 'Price', alignRight: false },
  { id: 'quantity', label: 'Quantity', alignRight: false },
  { id: 'category', label: 'Category', alignRight: false },
  { id: 'shopHandle', label: 'Shop Handle', alignRight: false },
  { id: 'availability', label: 'Availability', alignRight: false },
  { id: 'shippingDetails', label: 'Shipping Details', alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_item) => _item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Product() {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const rowMenuButtonItems = [
    {
      text: 'Delete',
      callback: (product) => handleItemDelete(product),
    },
    {
      text: 'Edit Product',
      callback: (product) => handleItemEdit(product),
    },
  ];

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = products.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleItemEdit = (product) => {
    navigate('/manage-product', { state: { mode: 'edit', product } });
    // dispatch(editShopInfo({ shopId: currentItemID }));
  };
  const handleProductAddition = () => {
    navigate('/manage-product', { state: { mode: 'add' } });
  };
  const handleItemDelete = (product) => {
    dispatch(deleteProduct(product.id));
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

  const filteredProducts = applySortFilter(products, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredProducts.length === 0;

  const handleFileUpload = async (e) => {
    const filePath = e.target.value;
    const data = await csvService.importCSV(filePath);

    // dispatch to redux
  };

  return (
    <Page title="Product">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>

          <Grid container item xs={9} lg={6} justifyContent="flex-end" alignItems={'center'}>
            <Grid item xs={7} lg={3.5} mb={1}>
              <Button onClick={handleProductAddition} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                Add Product
              </Button>
            </Grid>
            <Grid item xs={7} lg={3.5} mb={1} mr={1}>
              <Button
                variant="contained"
                component="label"
                to="#"
                startIcon={<Iconify icon="eva:download-outline" />}
                onClick={() => csvService.exportToCsv({ fileName: 'products', data: products })}
              >
                Export products
              </Button>
            </Grid>

            <Grid item xs={7} lg={3.5} mb={1}>
              <form>
                <Button
                  variant="contained"
                  component="label"
                  to="#"
                  startIcon={<Iconify icon="eva:file-add-outline" />}
                >
                  <input type={'file'} accept={'.csv'} hidden onChange={handleFileUpload} />
                  Import products
                </Button>
              </form>
            </Grid>
          </Grid>
        </Stack>

        <Card>
          <UserListToolbar
            placeHolder={'Search Products ..'}
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={products.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                    const {
                      id,
                      title,
                      description,
                      images,
                      price,
                      quantity,
                      category,
                      shopHandle,
                      availability,
                      shippingDetails,
                    } = row;
                    const isItemSelected = selected.indexOf(title) !== -1;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, title)} />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {title}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{description}</TableCell>
                        <TableCell align="left">{images}</TableCell>
                        <TableCell align="left">{price}</TableCell>
                        <TableCell align="left">{quantity}</TableCell>
                        <TableCell align="left">{category}</TableCell>
                        <TableCell align="left">{shopHandle}</TableCell>
                        <TableCell align="left">{availability}</TableCell>
                        <TableCell align="left">{shippingDetails}</TableCell>

                        {/* <TableCell align="left">
                          <Label variant="ghost" color={(status === 'banned' && 'error') || 'success'}>
                            {sentenceCase(status)}
                          </Label>
                        </TableCell> */}

                        <TableCell align="right">
                          <UserMoreMenu currentItem={row} menuItems={rowMenuButtonItems} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
