import React, { PureComponent } from 'react';
import style from './GridCardContainer.module.css';

export default class GridCardContainer extends PureComponent {
  render() {
    return (
      <div className={style.hackBorder}>
        <div className={style.gridCardContainer}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
