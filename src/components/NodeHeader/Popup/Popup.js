import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd, faChevronCircleUp } from 'fa5-pro-light';
import { faInfoCircle, faAddressBook } from 'fa5-pro-light';

import styles from './Popup.css';

export default class PopUp extends PureComponent {
  render() {
    return (
      <aside className={styles.popup}>
        <div className={styles.top}>
          <div className={styles.icon}>
            <div>
              <FontAwesomeIcon icon={faUserMd} />
            </div>
          </div>

          <div className={styles.text}>
            <h4 className={styles.title}>Ctystal J. Ankney</h4>
            <h5 className={styles.category}>Supplier Individual</h5>
          </div>
          <div className={styles.buttons}>
            <FontAwesomeIcon icon={faInfoCircle} />
            <FontAwesomeIcon className={styles.addressBook} icon={faAddressBook} />
          </div>
        </div>

        <svg className={styles.bar} viewBox="0 0 100 1" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="0" x2="100" y2="0" stroke="#bbb6" />
        </svg>

        <dl className={styles.bottom}>
          <div className="entry">
            <span className="dt">FB #:&nbsp;</span>
            <span className="dd">5000</span>
          </div>
          <div className="entry">
            <span className="dt">Tax ID:&nbsp;</span>
            <span className="dd">***_**_9864</span>
          </div>
          <div className="entry">
            <span className="dt">NPI&nbsp;#:&nbsp;</span>
            <span className="dd">871234687126</span>
          </div>
          <div className="entry">
            <span className="dt">PIMS ID:</span>
            <span className="dd">129384723</span>
          </div>
          <div className="entry">
            <span className="dt">License #</span>
            <span className="dd">OP3888</span>
          </div>
        </dl>
        <div onClick={this.props.onCollapse} className={styles.buttons + ' ' + styles.collapse}>
          <FontAwesomeIcon icon={faChevronCircleUp} />
        </div>
      </aside>
    );
  }
}
