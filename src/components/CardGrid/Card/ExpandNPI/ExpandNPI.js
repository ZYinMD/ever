/* Z
This file is the expand button on the card when the text body is an array. This is primarily to handle multiple NPIs. Example  FB#77125.
*/

import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH as threeDots } from 'fa5-pro-regular';
import Popup from './Popup/Popup';
import styles from './ExpandNPI.css';

export default class ExpandNPI extends Component {
  state = { isOpen: false }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  open = (event) => {
    this.toggle();
    let rect = event.target.getBoundingClientRect();
    let { top, bottom, left, right } = rect;
    let x = (left + right) / 2;
    let y = (top + bottom) / 2;
    this.setState({ coord: { x, y } });
  }

  renderClosed() {
    return (
      <span className={styles.closed} onClick={this.open}>
        <FontAwesomeIcon icon={threeDots} />
      </span>
    );
  }

  renderOpen() {
    return (
      <Fragment>
        <span className={styles.open}>
          <FontAwesomeIcon icon={threeDots} />
        </span>
        <Popup coord={this.state.coord} data={this.props.data} onCollapse={this.toggle} />
      </Fragment>
    );
  }

  render() {
    if (this.state.isOpen)
      return (this.renderOpen());
    else
      return (this.renderClosed());
  }
}