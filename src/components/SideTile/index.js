import React, { PureComponent } from 'react';
import Expanded from './Expanded/Expanded.js';
import Collapsed from './Collapsed/Collapsed.js';

export default class index extends PureComponent {
  render() {
    const { isCollapsed, ...rest } = this.props;
    return (
      this.props.isCollapsed
        ? <Collapsed {...rest} />
        : <Expanded {...rest} />
    );
  }
}
