import { filter } from 'lodash';
import { useState } from 'react';
// material
import {
  Card,
  Table,
  Stack,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Grid,
} from '@mui/material';

import PropTypes from 'prop-types';
// components
import Page from './Page';
import Scrollbar from './Scrollbar';
import Iconify from './Iconify';
import SearchNotFound from './SearchNotFound';
import { UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import TableListHead from '../sections/@dashboard/user/TableListHead';
// todo update to actual image
import sampleProduct from '../assets/airpdos.jfif';

// ----------------------------------------------------------------------

CustomTable.propTypes = {
  title: PropTypes.string,
  searchAttribute: PropTypes.string,
  topButtons: PropTypes.array,
  sideButtons: PropTypes.array,
  items: PropTypes.array,
  showId: PropTypes.bool,
  head: PropTypes.string,
  searchPlaceHolder: PropTypes.string,
  filterButtonCallBack: PropTypes.func,
  page: PropTypes.number,
  pageCallBack: PropTypes.func,
  searchAllSubmitCallback: PropTypes.func,
  imageThumbnailCallBack: PropTypes.func,
};

export default function CustomTable({
  title,
  searchAttribute,
  topButtons,
  sideButtons,
  head,
  items,
  showId,
  searchPlaceHolder,
  filterButtonCallBack,
  page,
  pageCallBack,
  searchAllSubmitCallback,
  imageThumbnailCallBack,
}) {
  // const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('name');

  const [filterAttribute, setFilterAttribute] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleFilterCallBackPassing = () => {
    if (filterButtonCallBack) {
      return () => {
        setFilterAttribute('');
        filterButtonCallBack();
      };
    }
    return undefined;
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    pageCallBack(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    pageCallBack(0);
  };

  const handleFilterByAttribute = (event) => {
    setFilterAttribute(event.target.value);
  };

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
      return filter(array, (_user) => _user[searchAttribute].toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
  }

  const handleTopButtonsRendering = () => {
    if (topButtons && topButtons.length > 0) {
      return topButtons.map((button) => {
        if ((button.text.includes('export') && items.length > 0) || !button.text.includes('export')) {
          return (
            <Grid item xs={8} lg={topButtons.length > 2 ? 7 : 7} mb={1}>
              <form>
                <Button
                  variant="contained"
                  component="label"
                  to="#"
                  onClick={(e) => (!button.text.toLowerCase().includes('import') ? button?.callback(e) : null)}
                  startIcon={<Iconify icon="eva:file-add-outline" />}
                >
                  {button.text.toLowerCase().includes('import') ? (
                    <input type={'file'} accept={'.csv'} hidden onChange={(e) => button.callback(e)} />
                  ) : null}

                  {button.text}
                </Button>
              </form>
            </Grid>
          );
        }
        return null;
      });
    }
    return null;
  };

  const handleTableRendering = (row) =>
    Object.keys(row).map((key, index) => {
      if (!key.includes('image') && !key.includes('photo')) {
        return (
          <TableCell key={index} align="center">
            {row[key]}
          </TableCell>
        );
      }

      const imagesThumbnail = row[key][0].thumbnail ? row[key][0].thumbnail : row[key][0].full;

      // image thumbnail
      return (
        <TableCell
          key={index}
          align="left"
          onClick={() => {
            window.scrollTo(0, 0);
            if (imageThumbnailCallBack) imageThumbnailCallBack(row);
          }}
        >
          <div
            style={{
              width: '4rem',
              height: '4rem',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              cursor: 'pointer',
              caretColor: 'transparent',
              backgroundImage: `url(${imagesThumbnail})`,
            }}
          />
        </TableCell>
      );
    });
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - items.length) : 0;

  const filteredItems = items?.length > 1 ? applySortFilter(items, getComparator(order, orderBy), filterAttribute) : [];

  const isItemNotFound = filteredItems.length === 0;

  return (
    <Page title={title}>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {title || 'Null'}
          </Typography>
          <Grid container item xs={8} lg={3.5} justifyContent="flex-end" alignItems={'center'}>
            {handleTopButtonsRendering()}
          </Grid>
        </Stack>

        <Card>
          <UserListToolbar
            onFilterClick={handleFilterCallBackPassing()}
            filterAttribute={filterAttribute}
            onFilterAttribute={(e) => {
              const sampleItem = items[0];

              // eslint-disable-next-line no-prototype-builtins
              if (sampleItem.hasOwnProperty(searchAttribute)) {
                handleFilterByAttribute(e);
              } else {
                alert('Search Attribute is not valid, please choose attribute that exists in items');
              }
            }}
            placeHolder={`Search  ${searchPlaceHolder ? `by ${searchPlaceHolder}` : title}`}
            searchAllSubmitCallback={() => {
              setFilterAttribute('');
              searchAllSubmitCallback();
            }}
          />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableListHead order={order} orderBy={orderBy} headLabel={head} onRequestSort={handleRequestSort} />
                <TableBody>
                  {filteredItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id } = row;
                    const rowDisplayInfo = JSON.parse(JSON.stringify(row));
                    if (!showId) {
                      delete rowDisplayInfo.id;
                    }

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox">
                        {handleTableRendering(rowDisplayInfo)}
                        <TableCell align="right">
                          <UserMoreMenu currentItem={row} menuItems={sideButtons} />
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

                {isItemNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterAttribute} />
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
            count={items.length}
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
