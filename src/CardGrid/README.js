/* Z

This component is maintained by Zhi, if you need more complicated functionality, he'd be happy to build it for you.

To try it out:
  1. import this file:
    import README from '......./src/components/CardGrid/README.js';
  2. render it:
    return (
      <README />
    );

*/

import React, { PureComponent } from 'react';
import CardGrid from './CardGrid.js';
import Card from './Card/Card.js';
import { faUserMd } from 'fa5-pro-light';

export default class README extends PureComponent {
  render() {
    return (
      <>
      <br/>
        <CardGrid>
          <Card icon={faUserMd} title='Degree' body ='MD'/>
          <Card icon={faUserMd} title='Degree' body ='MD'/>
          <Card icon={faUserMd} title='Degree' body ='MD'/>
          <Card icon={faUserMd} title='Degree' body ='MD'/>
          <Card icon={faUserMd} title='Degree' body ='MD'/>
          <Card icon={faUserMd} title='Degree' body ='MD'/>
          <Card icon={faUserMd} title='Degree' body ='This guy has a very very very long degree'/>
          <Card icon={faUserMd} title='Degree' body ='MD'/>
          <Card icon={faUserMd} title='Degree' body ='MD'/>
          <Card icon={faUserMd} title='Degree' body ='MD'/>
          <Card icon={faUserMd} title='Degree' body ='MD'/>
        </CardGrid>
      </>
    );
  }
}
