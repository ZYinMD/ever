import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Collapsed.css';

export default class Collapsed extends PureComponent {
  render() {
    const { onToggle, icon } = this.props;
    return (
      <aside className={styles.collapsed} onClick={onToggle}>
        <FontAwesomeIcon icon={icon} />
      </aside>
    );
  }
}

input f1, f2, f3

Array.prototype.reduce((accumulator, item) => newAccumulator, initialValueOfAccumulator)

// input([...funcArray])

funcArray.reduce((a, b) => {b(a)}, input)

function pipe(input) {
  return function ([...funcArray]) {
    return funcArray.reduce((a, b) => {b(a)}, input)
  }
}

const pipe = input => ([...funcArray]) => funcArray.reduce((a, b) => {b(a)}, input);
