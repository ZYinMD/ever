import React, { PureComponent } from 'react';
import AccordionBar from '../../AccordionBar';
import { Table, Tr } from '../../TableWithExpandableRow';
import prepareTable from '../helpers/prepareTable';

export default class EducationInfo extends PureComponent {
  render() {
    const graduationTableData = prepareTable.graduation(this.props.data);
    const internshipTableData = prepareTable.internship(this.props.data);
    const residencyTableData = prepareTable.residency(this.props.data);
    return (
      <>
        <AccordionBar plain text="Graduation Information" />
        <Table proportion={[35, 65]}>
          <thead>
            <Tr data={graduationTableData.header} />
          </thead>
          <tbody>
            <Tr data={graduationTableData.body} />
          </tbody>
        </Table>

        <AccordionBar plain text="Internship Information" />
        <Table proportion={[35, 65]}>
          <thead>
            <Tr data={internshipTableData.header} />
          </thead>
          <tbody>
            <Tr data={internshipTableData.body} />
          </tbody>
        </Table>

        <AccordionBar plain text="Residency Information" />
        <Table proportion={[35, 65]}>
          <thead>
            <Tr data={residencyTableData.header} />
          </thead>
          <tbody>
            <Tr data={residencyTableData.body} />
          </tbody>
        </Table>

      </>
    );
  }
}
