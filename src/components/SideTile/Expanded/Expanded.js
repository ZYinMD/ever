import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from 'fa5-pro-light';
import styles from './Expanded.css';

export default class Expanded extends PureComponent {
  renderLower() {
    const { lowerTitle, lowerBody } = this.props;
    if (!lowerTitle) return null;
    return (
      <div className={styles.lower}>
        <dt>{lowerTitle}</dt>
        <dd>{lowerBody === ' ' ? <span>&nbsp;</span> : lowerBody}</dd>
      </div>
    );
  }

  renderFooter() {
    const { leftFooterTitle, leftFooterBody, rightFooterTitle, rightFooterBody } = this.props;
    if (!leftFooterTitle && !rightFooterTitle) return null;
    return (
      <footer className={styles.footer}>
        <div className={styles.leftFooter}>
          <dt>{leftFooterTitle}</dt>
          <dd>{leftFooterBody === ' ' ? <span>&nbsp;</span> : leftFooterBody}</dd>
        </div>
        <div className={styles.rightFooter}>
          <dt>{rightFooterTitle}</dt>
          <dd>{rightFooterBody === ' ' ? <span>&nbsp;</span> : rightFooterBody}</dd>
        </div>
      </footer>
    );
  }

  render() {
    const { onToggle, width, icon, upperTitle, upperBody } = this.props;
    return (
      <aside className={styles.expanded} style={{ width }}>
        <dl>
          <FontAwesomeIcon onClick={onToggle} className={styles.collapseButton} icon={faChevronLeft} />
          <header className={styles.icon}>
            <FontAwesomeIcon icon={icon} />
          </header>
          <dt>{upperTitle}</dt>
          <dd>{upperBody}</dd>

          <svg className={styles.horizontalLine} viewBox="0 0 100 1" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="0" x2="100" y2="0" stroke="#bbb6" />
          </svg>

          {this.renderLower()}
          {this.renderFooter()}
        </dl>
      </aside>
    );
  }
}
