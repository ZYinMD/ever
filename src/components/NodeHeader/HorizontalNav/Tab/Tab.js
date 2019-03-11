import React, { PureComponent } from 'react';
import styles from './Tab.css';

export default class Tab extends PureComponent {
  render() {
    let { text, onClick, payload, active } = this.props;
    if (!onClick) {
      if (!payload)
        payload = { tab: text };
      // onClick = () => {store.dispatch({
      //   type: 'CHANGE_CURRENT_TAB',
      //   payload
      // })};
    }
    if (active)
      return (
        <div className={styles.activeTab}>
          <div className={styles.activeTextWrapper}><span>{text}</span></div>
          <div className={styles.tabHighlighter} />
        </div>
      );
    else
      return (
        <div className={styles.inactiveTab} onClick={onClick}>
          <span>{text}</span>
        </div>
      );
  }
}
