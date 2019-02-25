import React, { PureComponent } from 'react'
import styles from './AccordionBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from 'fa5-pro-light';

export default class AccordionBar extends PureComponent {

  renderButton() {
    const { button, onExpand, onCollapse }= this.props;
    switch (button) {
      case '+':
        return (
          <div className={styles.button} onClick={onExpand}>
            <FontAwesomeIcon icon={faPlusCircle}/>
          </div>
        );
      case '-':
        return (
          <div className={styles.button} onClick={onCollapse}>
            <FontAwesomeIcon icon={faMinusCircle}/>
          </div>
        );
      default:
        return null;
    }
  }

  render() {
    return (
      <div className={styles.accordionBar}>
        <h3 className={styles.text}>
          {this.props.text}
        </h3>
        {this.renderButton()}
      </div>
    )
  }
}
