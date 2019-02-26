/*Z
Warning: if you mutate a prop, this component may not re-render (to reflect the change), because the creator is a fan of overkill.

To test it out:
  1. import this file:
    import README from '......./src/components/TableWithExpandableRow/README.js';
  2. render it:
    return (
      <README />
    );

To use:
  Props of <Table>:
    props.propotion (optional):
      An array of fractions describing how you want column widths to be devided, for instance <Table proportion={[3, 1, 1, 5]}.
      Default to automatic if omitted.
  Props of <Tr />:
    props.data:
      An object or an array, containing your text for this row.
      Key names will be ignored if it's an object.
  See example below.
*/

import React, { PureComponent } from 'react';
import { Table, Tr } from '../TableWithExpandableRow';
import { mockHeader, mockData } from './mockData.js';

export default class README extends PureComponent {
  render() {
    return (
      <Table proportion={[3, 1, 1, 5]}>
        <thead>
          <Tr data={mockHeader}/>
        </thead>
        <tbody>
          <Tr data={mockData[0]}/>
          <Tr data={mockData[1]}/>
          <Tr data={mockData[2]}/>
          <Tr data={mockData[3]}/>
        </tbody>
      </Table>
    );
  }
}
