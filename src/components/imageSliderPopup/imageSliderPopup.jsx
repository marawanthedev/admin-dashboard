import './imageSliderPopup.scss';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import CloseButton from '../closeButton/closeButton';

ImageSliderPopUp.propTypes = {
  images: PropTypes.node,
  closeBtnCallback: PropTypes.func,
  header: PropTypes.string,
};

function handleOwnerShipApstrophe(header) {
  if (header[header.length - 1] === 's') return "'";
  return "'s";
}

export default function ImageSliderPopUp({ images, closeBtnCallback, header }) {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 750,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <> </>,
    prevArrow: <> </>,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          nextArrow: <> </>,
          prevArrow: <> </>,
        },
      },
    ],
  };

  return (
    <div className="image-slider-popup">
      <div className="image-slider-popup__header">
        <div className="image-slider-popup__header__text">
          {`${header}${handleOwnerShipApstrophe(header)} Images` || 'Images'}
        </div>
        <CloseButton closeBtnCallback={closeBtnCallback} />
      </div>
      <div className="image-slider-popup__image-container">
        <Slider {...sliderSettings}>
          {images.map((image, index) => {
            // console.log(url(${image}))
            return <img key={index} className="image-slider-popup__image-container__item" src={image} alt="product" />;
          })}
        </Slider>
      </div>
    </div>
  );
}
