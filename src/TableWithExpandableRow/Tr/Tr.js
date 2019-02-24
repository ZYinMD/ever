import React, { PureComponent } from 'react';
export default class Tr extends PureComponent {
  render() {
    var { data, header } = this.props;
    if (!Array.isArray(data))
      data = Object.values(data);
    const renderCell = header ?
      (item, index) => <th key={index}>{item}</th> :
      (item, index) => <td key={index}>{item}</td>
    return <tr>{data.map(renderCell)}</tr>
  }
}
