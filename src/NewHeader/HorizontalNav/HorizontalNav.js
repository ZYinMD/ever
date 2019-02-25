import React, { PureComponent } from 'react';
import styles from './HorizontalNav.css';

export default class HorizontalNav extends PureComponent {
  render() {
    const { tabs } = this.props;
    return (
      <nav className={styles.nav}>
        {this.props.children}
      </nav>
    )
  }
}
