// redux
import { useDispatch, useSelector } from 'react-redux';
import { filter } from 'lodash';
import { useState, useEffect } from 'react';
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

import FilterDropDown from '../components/filterByButtonGroup';

import csvService from '../utils/csv';

// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import { getOrders } from '../redux/features/order/orderSlice';

// export to csv

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'Id', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'user', label: 'User', alignRight: false },
  { id: 'shop', label: 'shop', alignRight: false },
  { id: 'recipientsName', label: 'recipients name ', alignRight: false },
  { id: 'recipientsAddress', label: 'recipients address', alignRight: false },
  { id: 'recipientsType', label: 'recipients type', alignRight: false },
  { id: 'quantity', label: 'quantity ', alignRight: false },
  { id: 'totalPrice', label: 'total price', alignRight: false },
  { id: 'paid', label: 'paid', alignRight: false },
  { id: 'orderNo', label: 'order no', alignRight: false },
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
    return filter(array, (_item) => _item.status.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Orders() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterValue, setFilterValue] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  // file reader setup

  const [file, setFile] = useState();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = orders.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
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

  const handleFilter = (event) => {
    setFilterValue(event.target.value);
  };

  const handleFileUpload = async (e) => {
    const filePath = e.target.value;
    const data = await csvService.importCSV(filePath);
    // dispatch(addUsersCSV(data));
  };

  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orders.length) : 0;

  const filteredOrders = applySortFilter(orders, getComparator(order, orderBy), filterValue);

  const isOrderNotFound = filteredOrders.length === 0;

  return (
    <Page title="Orders">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Grid container item xs={8} lg={3.5} justifyContent="flex-end" alignItems={'center'}>
            <Grid item xs={8} lg={6} mb={1}>
              <form>
                <Button
                  variant="contained"
                  component="label"
                  to="#"
                  startIcon={<Iconify icon="eva:file-add-outline" />}
                >
                  <input type={'file'} accept={'.csv'} hidden onChange={handleFileUpload} />
                  Import Orders
                </Button>
              </form>
            </Grid>
            {orders.length !== 0 ? (
              <Grid item xs={8} lg={6} mb={1}>
                <Button
                  variant="contained"
                  component="label"
                  to="#"
                  startIcon={<Iconify icon="eva:download-outline" />}
                  onClick={() => csvService.exportToCsv({ fileName: 'orders', data: orders })}
                >
                  Export Orders
                </Button>
              </Grid>
            ) : null}
          </Grid>
        </Stack>

        <Card>
          <UserListToolbar
            onFilterList={() => console.log('hi')}
            numSelected={selected.length}
            filterName={filterValue}
            onFilterName={handleFilter}
            placeHolder={'Search By order Status'}
          />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={orders.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                    const {
                      id,
                      status,
                      user,
                      shop,
                      recipientsName,
                      recipientsAddress,
                      recipientsType,
                      quantity,
                      totalPrice,
                      paid,
                      orderNo,
                    } = row;
                    const isItemSelected = selected.indexOf(status) !== -1;

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
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, status)} />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {id}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{status}</TableCell>
                        <TableCell align="left">{user}</TableCell>
                        <TableCell align="left">{shop}</TableCell>
                        <TableCell align="left">{recipientsName}</TableCell>
                        <TableCell align="left">{recipientsAddress}</TableCell>
                        <TableCell align="left">{recipientsType}</TableCell>
                        <TableCell align="left">{quantity}</TableCell>
                        <TableCell align="left">{totalPrice}</TableCell> <TableCell align="left">{paid}</TableCell>
                        <TableCell align="left">{orderNo}</TableCell>
                        {/* <TableCell align="left">
                          <Label variant="ghost" color={(status === 'banned' && 'error') || 'success'}>
                            {sentenceCase(status)}
                          </Label>
                        </TableCell> */}
                        <TableCell align="right">
                          {/* <UserMoreMenu currentItemID={id} menuItems={rowMenuButtonItems} /> */}
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

                {isOrderNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterValue} />
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
            count={orders.length}
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
