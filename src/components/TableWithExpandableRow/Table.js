import React, { PureComponent } from 'react';
import styles from './Table.css';
export default class TableWithExpandableRow extends PureComponent {
  render() {
    const { proportion } = this.props;
    // adding a <colgroup> before <thead> can let you style columns, google <colgroup> and <col> for more info.
    const colgroup = proportion ?
      <colgroup>
        {proportion.map((item, index) => <col key={index} style={{width: item + '%'}}></col>)}
      </colgroup>
      : null;
    return (
      <div className={styles.centerChild}>
        <table className={styles.table}>
          {colgroup}
          {this.props.children}
        </table>
      </div>
    );
  }
}
