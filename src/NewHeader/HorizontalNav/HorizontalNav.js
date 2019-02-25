import React, { PureComponent } from 'react';
import styles from './HorizontalNav.css';

export default class HorizontalNav extends PureComponent {
  render() {
    return (
      <nav className={styles.nav}>
        {this.props.children}
      </nav>
    )
  }
}
