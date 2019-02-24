/* Z
This component is maintained by Zhi, if you need more complicated functionality, he'd be happy to build it for you.

To try it out:
  1. import this file:
    import README from '......./src/components/CardGrid/README.js';
  2. render it:
    return (
      <README />
    );

To use:
  Just do something similar as the example code below.
  Card takes 2 props, title and body, both strings.
  Each card will display an icon, which is determined by the title you provide. Please refer to '.Card/iconLookup.js' . Icon will be empty if it's not there.
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
