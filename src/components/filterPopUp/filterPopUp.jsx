import './filterPopUp.scss';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';

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
        <button className="filter-popup__header__close-btn" type="button" onClick={closeBtnCallback}>
          X
        </button>
      </div>
      <div className="filter-popup__children-container">{children}</div>

      <Button
        variant="contained"
        component="label"
        to="#"
        className="edit-role-popup__button"
        style={{ marginLeft: '50%', transform: 'translateX(-50%)', marginTop: '1.5rem' }}
        onClick={() => filterSubmitCallBack()}
      >
        Filter
      </Button>
    </div>
  );
}
