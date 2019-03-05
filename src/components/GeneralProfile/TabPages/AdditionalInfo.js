import React, { PureComponent } from 'react';
import AccordionBar from '../../AccordionBar';
import { Table, Tr } from '../../TableWithExpandableRow';
import prepareTable from '../helpers/prepareTable';

export default class AdditionalInfo extends PureComponent {
  render() {
    const contactTableData = prepareTable.contact(this.props.data);
    const additionalAddressTableData = prepareTable.additionalAddress(this.props.data);
    return (
      <>
        <AccordionBar plain text="Contact Information" />
        <Table proportion={[15, 25, 15, 15, 30]}>
          <thead>
            <Tr data={contactTableData.header} />
          </thead>
          <tbody>
            {contactTableData.body.map((row, index) => <Tr key={index} data={row} />)}
          </tbody>
        </Table>

        <AccordionBar plain text="Additional Address" />
        <Table proportion={[40, 60]}>
          <thead>
            <Tr data={additionalAddressTableData.header} />
          </thead>
          <tbody>
            {additionalAddressTableData.body.map((row, index) => <Tr key={index} data={row} />)}
          </tbody>
        </Table>
      </>
    );
  }
}
