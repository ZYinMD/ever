import React, { PureComponent } from 'react';
import AccordionBar from '../../AccordionBar';
import { Table, Tr } from '../../TableWithExpandableRow';
import prepareTable from '../helpers/prepareTable';

export default class License extends PureComponent {
  render() {
    const tableData = prepareTable(this.props.data);
    return (
      <>
        <AccordionBar plain text="License / Certification Information" />
        <AccordionBar plain text="Other Identifiers" />
        <AccordionBar plain text="Medicare & Medicaid Information" />

        <Table>
          <thead>
            <Tr data={tableData.header} />
          </thead>
          <tbody>
            {tableData.body.map(row => <Tr data={row} />)}
          </tbody>
        </Table>
      </>
    );
  }
}