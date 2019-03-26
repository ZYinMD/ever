import React, { PureComponent, Fragment } from 'react';
import styles from './Popup.css';

export default class Popup extends PureComponent {
  state={
    cardMaxHeight: 2000,
    popupLocation: 'right',
  }

  card = React.createRef();

  componentDidMount = () => {
    this.checkBorder();
  }

  componentDidUpdate = () => {
    this.checkBorder();
  }

  checkBorder() {
    const card = this.card.current;
    let rect = card.getBoundingClientRect();
    // if the right side is touching the right border of viewport, relocate the card to underneath the button. This happens when the NPI happens to be in the last column
    if (rect.right === window.innerWidth) {
      this.setState({ popupLocation: 'bottom' });
    }

    // if the black card is taller than the viewport, make it shorter
    if (rect.bottom > window.innerHeight) {
      this.setState({ cardMaxHeight: window.innerHeight - rect.top - 40 });
    }
  }

  renderCard() {
    let { x, y } = this.props.coord;
    let cardCSS;
    if (this.state.popupLocation === 'right') {
      cardCSS = {
        position: 'fixed',
        left: x + 22 + 'px',
        top: y - 50 + 'px',
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
        <div className={styles.backdrop} onClick={this.props.onCollapse} />
        {this.renderCard()}
        {this.renderTriangle()}
      </Fragment>
    );
  }
}
