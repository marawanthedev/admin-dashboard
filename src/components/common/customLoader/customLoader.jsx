import React from 'react';
import './customLoader.scss';
import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';

export const CustomLoader = ({ targetReduxFeature }) => {
  const { isLoading } = useSelector((state) => (targetReduxFeature ? state[targetReduxFeature] : state));

  function handleLoaderRendering() {
    if (isLoading === true) {
      return (
        <div className="loader-container">
          <CircularProgress className="loader-container__loader" />
          <div className="loader-container__blur-effect" />
        </div>
      );
    }
    return null;
  }
  return <>{handleLoaderRendering()}</>;
};
