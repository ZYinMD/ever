import React, { PureComponent } from 'react';
import AccordionBar from '../../AccordionBar';
import { Table, Tr } from '../../TableWithExpandableRow';
import prepareTable from '../helpers/prepareTable';

export default class License extends PureComponent {
  render() {
    const licenseTableData = prepareTable.license(this.props.data);
    const otherIdentifiersTableData = prepareTable.otherIdentifiers(this.props.data);
    const MMInfoTableData = prepareTable.MMInfo(this.props.data);
    return (
      <>
        <AccordionBar plain text="License / Certification Information" />
        <Table proportion={[20, 13, 12, 8, 21, 13, 13]}>
          <thead>
            <Tr data={licenseTableData.header} />
          </thead>
          <tbody>
            {licenseTableData.body.map((row, index) => <Tr key={index} data={row} />)}
          </tbody>
        </Table>

        <AccordionBar plain text="Other Identifiers" />
        <Table proportion={[33, 20, 21, 26]}>
          <thead>
            <Tr data={otherIdentifiersTableData.header} />
          </thead>
          <tbody>
            {otherIdentifiersTableData.body.map((row, index) => <Tr key={index} data={row} />)}
          </tbody>
        </Table>


        <AccordionBar plain text="Medicare & Medicaid Information" />
        <Table proportion={[33, 20, 47]}>
          <thead>
            <Tr data={MMInfoTableData.header} />
          </thead>
          <tbody>
            {MMInfoTableData.body.map((row, index) => <Tr key={index} data={row} />)}
          </tbody>
        </Table>

      </>
    );
  }
}
