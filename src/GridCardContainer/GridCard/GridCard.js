import React, { PureComponent } from 'react';
import style from './GridCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class GridCard extends PureComponent {
  render() {
    const {icon, title, body} = this.props;
    return (
        <div className={style.gridCard}>
          <div className={style.left}>
            <figure>
              <div className={style.icon}>
                <FontAwesomeIcon icon={icon}/>
              </div>
            </figure>
          </div>
          <div className={style.right}>
            <p className={style.title}>{title}</p>
            <p className={style.body}>{body}</p>
          </div>
        </div>
    );
  }
}
