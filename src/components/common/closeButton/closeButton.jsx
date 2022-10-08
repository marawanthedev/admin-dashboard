import './closeButton.scss';
import PropTypes from 'prop-types';
import closeButton from '../../../assets/close.png';

CloseButton.propTypes = {
  closeBtnCallback: PropTypes.func,
};

export default function CloseButton({ closeBtnCallback }) {
  return (
    <>
      {/* eslint-disable */}
      <img
        className="close-btn"
        type="button"
        onClick={() => closeBtnCallback()}
        src={closeButton}
        alt={'close button'}
      />
      {/* eslint-enable */}
    </>
  );
}
