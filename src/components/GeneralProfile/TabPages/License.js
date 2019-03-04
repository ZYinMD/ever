import React, { PureComponent } from 'react';

export default class License extends PureComponent {
  render() {
    return (
      <h1>{this.props.data.providerIdentifier}</h1>
    );
  }
}
