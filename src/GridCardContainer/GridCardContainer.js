import React, { PureComponent } from 'react';
import styles from './GridCardContainer.css';

export default class GridCardContainer extends PureComponent {
  render() {
    return (
      <div className={styles.centerChild}>
        <div className={styles.hackBorder}>
          <div className={styles.gridCardContainer}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
