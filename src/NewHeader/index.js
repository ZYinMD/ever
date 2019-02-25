import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd, faChevronCircleDown } from 'fa5-pro-light';
import styles from './NewHeader.css';

const Header = ({ name, category, topBorderColor, children, button1, button2, onClickButton1, onClickButton2}) => {
  return (
    <header className={styles.blueBar} style={{borderColor: topBorderColor}}>
      <div className={styles.icon}>
        <FontAwesomeIcon icon={faUserMd} />
      </div>
      <div className={styles.text}>
        <div className={styles.name}>{name}</div>
        <div className={styles.category}>{category}</div>
      </div>
      <div className={styles.dropdown}>
        <FontAwesomeIcon icon={faChevronCircleDown} />
      </div>
      <div className={styles.button1}>
        <FontAwesomeIcon icon={button1} onclick={onClickButton1} />
      </div>
      <div className={styles.button2}>
        <FontAwesomeIcon icon={button2} onclick={onClickButton2} />
      </div>
      <div className={styles.nav}>
        {children}
      </div>
    </header>
  );
}

export default Header;
