import React, { PureComponent } from 'react';
import AccordionBar from '../../AccordionBar';
import { CardGrid, Card } from '../../CardGrid';
import { Table, Tr } from '../../TableWithExpandableRow';
import prepareCards from '../helpers/prepareCards';
import prepareTable from '../helpers/prepareTable';

export default class BasicInfo extends PureComponent {
  render() {
    const cards = prepareCards(this.props.data);
    const tableData = prepareTable(this.props.data);
    return (
      <>
        <AccordionBar plain text="General Information" />
        <CardGrid>
          {Object.keys(cards).map(title => <Card title={title} body={cards[title]} noAutoCap />)}
        </CardGrid>
        <AccordionBar plain text="Specialty Information" />
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
