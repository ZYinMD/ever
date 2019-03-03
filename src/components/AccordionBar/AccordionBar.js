import React, { PureComponent } from 'react';
import styles from './AccordionBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faChevronDown, faChevronRight } from 'fa5-pro-light';

class AccordionBar extends PureComponent {
  state = {
    isCollapsed: false
  };

  onClickPlusButton = e => {
    // here we disable the button click if necessary
    // this happens when editing end date for instance
    if (this.props.disabled) return;

    // stop event from propagating to accordion bar to prevent collpase
    e.stopPropagation();
    this.props.onClickPlusButton();
  }

  toggleCollapse = () => {
    // here we disable the button click if necessary
    // this happens when editing end date for instance
    if (this.props.disabled) return;
    this.setState({isCollapsed: !this.state.isCollapsed});
  };

  render() {
    const { text, plain, onClickPlusButton, children, withPlusCircle }= this.props;
    const down = <FontAwesomeIcon icon={faChevronDown} className={styles.chevron} onClick={this.toggleCollapse}/>;
    const up = <FontAwesomeIcon icon={faChevronRight} className={styles.chevron} onClick={this.toggleCollapse}/>;
    const plus = <FontAwesomeIcon icon={faPlusCircle} className={styles.plusbutton} onClick={e => this.onClickPlusButton(e)}/>;

    if (plain) {
      return (
        <div className={styles.accordionBar}>
          <h3 className={styles.text}>{text}{onClickPlusButton ? plus : null }</h3>
        </div>
      );
    } else return (
      <div className={styles.container}>
        <div className={styles.accordionBar} onClick={this.toggleCollapse}>
          <h3 className={styles.text} style={{cursor: 'pointer'}}>{text}{withPlusCircle ? plus : null }</h3>  {this.state.isCollapsed ? up : down}
        </div>
          {this.state.isCollapsed ?
          <hr /> : children
          }
      </div>
    );
  }
}

export default AccordionBar;
