import React, { PureComponent } from 'react'
import styles from './Tab.css';

export default class Tab extends PureComponent {
  render() {
    let { text, onClick, payload, active } = this.props;
    let bottomBorderColor = active ? '#d3f6fc' : 'transparent';
    if (!onClick) {
      if (!payload)
        payload = {tab: text};
      // onClick = () => {store.dispatch({
      //   type: 'CHANGE_CURRENT_TAB',
      //   payload
      // })};
    }
    return (
      <div className={styles.tab} onClick={onClick} style={{borderColor: bottomBorderColor}}>
        {text}
      </div>
    )
  }
}
