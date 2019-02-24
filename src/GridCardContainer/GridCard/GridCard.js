import React, { PureComponent } from 'react';
import styles from './GridCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class GridCard extends PureComponent {
  render() {
    const {icon, title, body} = this.props;
    return (
        <div className={styles.gridCard}>
          <div className={styles.left}>
            <figure>
              <div className={styles.icon}>
                <FontAwesomeIcon icon={icon}/>
              </div>
            </figure>
          </div>
          <div className={styles.right}>
            <p className={styles.title}>{title}</p>
            <p className={styles.body}>{body}</p>
          </div>
        </div>
    );
  }
}
