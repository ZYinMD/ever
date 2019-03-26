/* Z
  Every card has a left grey border, but the leftmost cards don't need it. The wrap div .hackBorder covers the left border of .cardGrid with overflow: hidden
 */

import React, { Component } from 'react';
import styles from './CardGrid.css';

export default class CardGrid extends Component {
  render() {
    return (
      <div className={styles.hackBorder}>
        <div className={styles.cardGrid}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
