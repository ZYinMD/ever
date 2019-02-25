/* Z
To test it out:
  1. import this file:
    import README from '......./src/components/CardGrid/README.js';
  2. render it:
    return (
      <README />
    );

To use:
  Props of <Table />:
    numCol(optional)
    How many columns you want the grid to have, e.g. <Table numCol={3}/>
    Default to 4 if omitted
  Props of <Card />
    title:
      string, the title displayed on the card
    body:
      string, the text underneath the title
  The icon on the card:
    Each card will display an icon, which is determined by the title you provide.
    See '.Card/iconLookup.js' for details. Icon will be empty if it's not there.

    Grid example below.
*/

import React, { PureComponent } from 'react';
import { CardGrid, Card } from '../CardGrid';

export default class README extends PureComponent {
  render() {
    return (
      <div style={{paddingTop: '20px'}}>
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
      </div>
    );
  }
}
