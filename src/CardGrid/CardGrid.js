/*Z
  Every card has a left grey border, but the leftmost cards don't need it. The wrap div "hackBorder" has a white left border, and the whold grid has a z-index of -1 and a margin-left of -1, thus covering the left border
 */

import React, { PureComponent } from 'react';
import styles from './CardGrid.css';

export default class CardGrid extends PureComponent {
  render() {
    return (
      <div className={styles.centerChild}>
        <div className={styles.hackBorder}>
          <div className={styles.cardGrid}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
