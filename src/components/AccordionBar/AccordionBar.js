import React, { PureComponent } from 'react'
import styles from './AccordionBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faChevronDown, faChevronUp } from 'fa5-pro-light';

class AccordionBar extends PureComponent {

  state = {
    isCollapsed: false
  };

  toggleCollapse = () => {
    this.setState({isCollapsed: !this.state.isCollapsed});
  };

  render() {
    const { text, plain, onClickPlusButton, children }= this.props;
    const down = <FontAwesomeIcon icon={faChevronDown} className={styles.chevron} onClick={this.toggleCollapse}/>;
    const up = <FontAwesomeIcon icon={faChevronUp} className={styles.chevron} onClick={this.toggleCollapse}/>;
    const plus = <FontAwesomeIcon icon={faPlusCircle} className={styles.plusbutton} onClick={onClickPlusButton}/>;

    if (plain) {
      return (
        <div className={styles.accordionBar}>
          <h3 className={styles.text}>{text}{onClickPlusButton ? plus : null }</h3>
        </div>
      )
    } else return (
      <div className={styles.container}>
        <div className={styles.accordionBar}>
          <h3 className={styles.text}>{text}{onClickPlusButton ? plus : null }</h3>  {this.state.isCollapsed ? up : down}
        </div>
          {this.state.isCollapsed ?
          <hr /> : children
          }
      </div>
    )
  }
}

export default AccordionBar;
