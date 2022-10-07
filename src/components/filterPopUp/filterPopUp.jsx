import './filterPopUp.scss';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import CloseButton from '../closeButton/closeButton';

FilterPopUp.propTypes = {
  children: PropTypes.node,
  filterSubmitCallBack: PropTypes.func,
  closeBtnCallback: PropTypes.func,
};

export default function FilterPopUp({ children, filterSubmitCallBack, closeBtnCallback }) {
  return (
    <div className="filter-popup">
      <div className="filter-popup__header">
        <div className="filter-popup__header__text">Filter</div>
        <CloseButton closeBtnCallback={closeBtnCallback} />
      </div>
      <div className="filter-popup__children-container">{children}</div>

      <Button
        variant="contained"
        component="label"
        to="#"
        className="filter-popup__button"
        style={{ marginLeft: '50%', transform: 'translateX(-50%)', marginTop: '1.5rem' }}
        onClick={() => filterSubmitCallBack()}
      >
        Filter
      </Button>
    </div>
  );
}
