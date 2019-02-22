import React, { PureComponent } from 'react';
import style from './GridCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class GridCard extends PureComponent {
  render() {
    const {icon, title, text} = this.props;
    return (
        <div className={style.gridCard}>
          <figure className={style.icon}>
            <FontAwesomeIcon icon={icon}/>
          </figure>
          <span className={style.title}>{title}</span>
          <span className={style.text}>{text}</span>
        </div>
    )
  }
}
