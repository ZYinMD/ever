import React, { PureComponent } from 'react';
// import styles from './ProfessionalInfo.css';
import AccordionBar from '../../AccordionBar';
import { CardGrid, Card } from '../../CardGrid';
import { Table, Tr } from '../../TableWithExpandableRow';
import { mockHeader, mockData } from '../../TableWithExpandableRow/mockData';

class ProfessionalInfo extends PureComponent {
  render() {
    return (
      <>
          <AccordionBar plain text="General Information" />
          <CardGrid>
            <Card title="Degree" body="MD" />
            <Card title="Gender" body="Male" />
            <Card title="Eat" body="A lot of things" />
            <Card title="Get Up At" body="5AM" />
            <Card title="Allergies" body="None" />
            <Card title="Degree" body="This guy has a very very  long degree" />
            <Card title="Gender" body="Male" />
            <Card title="Eat" body="A lot of things" />
            <Card title="Get Up At" body="5AM" />
            <Card title="Allergies" body="None" />
            <Card title="Charging" body="Yes!" />
          </CardGrid>
          <AccordionBar plain text="Specialty Information">
            <Table>
              <thead>
                <Tr data={mockHeader} />
              </thead>
              <tbody>
                <Tr data={mockData[0]} />
                <Tr data={mockData[1]} />
                <Tr data={mockData[2]} />
                <Tr data={mockData[3]} />
              </tbody>
            </Table>
          </AccordionBar>
          </>
    );
  }
}

export default ProfessionalInfo;
