import React, { Component } from 'react';
import styles from './Loader.module.css';
import { ThreeDots } from 'react-loader-spinner';

class LoaderComponent extends Component {
  render() {
    const { height, width, color, isVisible } = this.props;

    return (
      <div className={styles.LoaderContainer}>
        {isVisible && (
          <ThreeDots
            height={height || '80'}
            width={width || '80'}
            color={color || '#4fa94d'}
            ariaLabel="loading-indicator"
            visible={true}
          />
        )}
      </div>
    );
  }
}

export default LoaderComponent;
