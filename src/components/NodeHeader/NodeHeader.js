import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd, faChevronCircleDown } from 'fa5-pro-light';
import { faInfoCircle, faAddressBook } from 'fa5-pro-light';
import PopUp from './Popup/Popup.js';
import styles from './NodeHeader.css';

class NodeHeader extends Component {
  state = { isPopupOpen: false }

  togglePopup = () => {
    this.setState({ isPopupOpen: !this.state.isPopupOpen });
  }

  render() {
    const { name, category, topBorderColor, button1, button2, children } = this.props;
    return (
      <header className={styles.nodeHeader} style={{ borderColor: topBorderColor }}>
        <div className={styles.icon}>
          <FontAwesomeIcon icon={faUserMd} />
          {this.state.isPopupOpen ? <PopUp onCollapse={this.togglePopup} /> : null}
        </div>
        <div className={styles.text}>
          <div className={styles.name}>{name}</div>
          <div className={styles.category}>{category}</div>
        </div>
        <div className={styles.dropdown} onClick={this.togglePopup}>
          <FontAwesomeIcon icon={faChevronCircleDown} />
        </div>
        <div className={styles.buttonWrapper}>
          <div className={styles.button1}>
            <FontAwesomeIcon icon={button1 ? faInfoCircle : null} />
          </div>
        </div>
        <div className={styles.buttonWrapper}>
          <div className={styles.button2}>
            <FontAwesomeIcon icon={button2 ? faAddressBook : null} />
          </div>
        </div>
        <div className={styles.nav}>
          {children}
        </div>

      </header>
    );
  }
}

export default NodeHeader;
