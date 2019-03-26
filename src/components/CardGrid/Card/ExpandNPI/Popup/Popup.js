import React, { PureComponent, Fragment } from 'react';
import styles from './Popup.css';

export default class Popup extends PureComponent {
  state={
    cardMaxHeight: 2000,
    popupLocation: 'right',
    shoulder: 50,
  }

  card = React.createRef();

  componentDidMount = () => {
    this.checkBorder();
  }

  componentDidUpdate = () => {
    this.truncate();
  }

  measure() {
    // measure the current render dimensions of the black card
    const card = this.card.current;
    this.rect = card.getBoundingClientRect();
  }

  checkBorder() {
    this.measure();
    // if the right side is touching the right border of viewport, relocate the card to underneath the button. This happens when the NPI happens to be in the last column
    if (this.rect.right === window.innerWidth) {
      this.setState({ popupLocation: 'bottom' });
    }

    // if the bottom of the black card goes below the viewport, make the top of the black card higher
    if (this.rect.bottom > window.innerHeight) {
      this.setState({ shoulder: 200 });
    }
  }

  truncate() {
    // if the bottom of the black card goes below the viewport, make it shorter and enable scroll
    this.measure();
    if (this.rect.bottom > window.innerHeight) {
      this.setState({ cardMaxHeight: window.innerHeight - this.rect.top - 40 });
    }
  }

  renderCard() {
    let { x, y } = this.props.coord;
    let cardCSS;
    if (this.state.popupLocation === 'right') {
      cardCSS = {
        position: 'fixed',
        left: x + 22 + 'px',
        top: y - this.state.shoulder + 'px',
      };
    } else {
      cardCSS = {
        position: 'fixed',
        left: x - 83 + 'px',
        top: y + 23 + 'px',
      };
    }
    const scrollContainerCSS = { maxHeight: this.state.cardMaxHeight + 'px' };

    return (
      <span className={styles.card} ref={this.card} style={cardCSS}>
        <ul className={styles.scrollContainer} style={scrollContainerCSS}>
          {this.props.data.map((i, index) => <li key={index}>{i}</li>)}
        </ul>
      </span>
    );
  }

  renderTriangle() {
    let { x, y } = this.props.coord;
    let triangleCSS = {};
    if (this.state.popupLocation === 'right') {
      triangleCSS = {
        position: 'fixed',
        left: x + 15 + 'px',
        top: y - 8 + 'px',
        borderTop: '8px solid transparent',
        borderBottom: '8px solid transparent',
        borderRight: '8px solid rgb(60, 61, 70)',
      };
    } else {
      triangleCSS = {
        position: 'fixed',
        left: x - 8 + 'px',
        top: y + 16 + 'px',
        borderLeft: '8px solid transparent',
        borderRight: '8px solid transparent',
        borderBottom: '8px solid rgb(60, 61, 70)',
      };
    }

    return (
      <span className={styles.triangle} style={triangleCSS} />
    );
  }

  render() {
    return (
      <Fragment>
        <div className={styles.backdrop} onClick={this.props.onClose} />
        {this.renderCard()}
        {this.renderTriangle()}
      </Fragment>
    );
  }
}
