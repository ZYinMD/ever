import React, { PureComponent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd, faChevronCircleDown } from 'fa5-pro-light';
import styles from './NodeHeader.css';
import { faInfoCircle, faAddressBook } from 'fa5-pro-light';

export default class NodeHeader extends PureComponent {
  render() {
    const { name, category, topBorderColor, button1, button2, children} = this.props;
    return (
      <header className={styles.nodeHeader} style={{borderColor: topBorderColor}}>
        <div className={styles.icon}>
          <FontAwesomeIcon icon={faUserMd} />
        </div>
        <div className={styles.text}>
          <div className={styles.name}>{name}</div>
          <div className={styles.category}>{category}</div>
        </div>
        <div className={styles.dropdown} onClick={() => {alert('You clicked the provider dropdown!')}}>
          <FontAwesomeIcon icon={faChevronCircleDown} />
        </div>
        <div className={styles.button1} onClick={() => {alert('You clicked the info button!')}}>
          <FontAwesomeIcon icon={button1 ? faInfoCircle : null} />
        </div>
        <div className={styles.button2} onClick={() => {alert('You clicked the contact button!')}}>
          <FontAwesomeIcon icon={button2 ? faAddressBook : null} />
        </div>
        <div className={styles.nav}>
          {children}
        </div>
      </header>
    )
  }
}
