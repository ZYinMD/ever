import React from 'react';
// import DemoHeader from './NodeHeader/README.js';
// import DemoCards from './CardGrid/README.js';
// import  DemoTable from './TableWithExpandableRow/README.js';
// import DemoAccordionBar from './AccordionBar/README.js';

import styles from './App.css';
import { NodeHeader, HorizontalNav, Tab } from './NodeHeader';
import AccordionBar from './AccordionBar';
import { CardGrid, Card } from './CardGrid';
import { Table, Tr } from './TableWithExpandableRow';
import { mockHeader, mockData } from './TableWithExpandableRow/mockData';

const App = () => (
  <div className={styles.centerChild}>
    <NodeHeader
        name={'Crystal J. Ankney'}
        category={'Supplier Individual'}
        topBorderColor={'#ff6a6b'}
        button1
        button2
      >
        <HorizontalNav>
          <Tab text={'Professional Info'} active/>
          <Tab text={'License / Cert & Other Identifiers'} onClick={() => {alert('License / Cert & Other Identifiers')}}/>
          <Tab text={'Education Info'} onClick={() => {alert('You clicked Education Info')}}/>
          <Tab text={'Quality Program'} onClick={() => {alert('You clicked Quality Program')}}/>
          <Tab text={'Additional Info'} onClick={() => {alert('You clicked Additional Info')}}/>
        </HorizontalNav>
      </NodeHeader>
      <div className={styles.nonFluidContainer}>
        <AccordionBar text='General Information'/>
        <CardGrid>
          <Card title='Degree' body ='MD'/>
          <Card title='Gender' body ='Male'/>
          <Card title='Eat' body ='A lot of things'/>
          <Card title='Get Up At' body ='5AM'/>
          <Card title='Allergies' body ='None'/>
          <Card title='Degree' body ='This guy has a very very  long degree'/>
          <Card title='Gender' body ='Male'/>
          <Card title='Eat' body ='A lot of things'/>
          <Card title='Get Up At' body ='5AM'/>
          <Card title='Allergies' body ='None'/>
          <Card title='Charging' body ='Yes!'/>
        </CardGrid>
        <AccordionBar text='Specialty Information'/>
        <Table>
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
      </div>
  </div>
);

export default App;
