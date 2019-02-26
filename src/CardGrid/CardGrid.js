/*Z
  Every card has a left grey border, but the leftmost cards don't need it. The wrap div "hackBorder" has a white left border, and the whold grid has a z-index of -1 and a margin-left of -1, thus covering the left border
 */

import React, { PureComponent } from 'react';
import styles from './CardGrid.css';

export default class CardGrid extends PureComponent {
  render() {
    const numCol = this.props.numCol;
    const forceNumCol = {};
    if (numCol) {
      forceNumCol.gridTemplateColumns = `repeat(${numCol}, 1fr)`;
    }

    return (
      <div className={styles.centerChild}>
        <div className={styles.hackBorder}>
          <div className={styles.cardGrid} style={forceNumCol}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
