/* Z

This component is maintained by Zhi, if you need more complicated functionality, he'd be happy to build it for you.

to try it out:
  1. import this file:
    import README from '......./src/components/GridCardContainer/README.js';
  2. render it:
    return (
      <README />
    );

*/

import React, { PureComponent } from 'react';
import GridCardContainer from './GridCardContainer.js';
import GridCard from './GridCard/GridCard.js';
import { faUserMd } from 'fa5-pro-light';

export default class README extends PureComponent {
  render() {
    return (
      <GridCardContainer>
        <GridCard icon={faUserMd} title='Degree' body ='MD'/>
        <GridCard icon={faUserMd} title='Degree' body ='MD'/>
        <GridCard icon={faUserMd} title='Degree' body ='MD'/>
        <GridCard icon={faUserMd} title='Degree' body ='MD'/>
        <GridCard icon={faUserMd} title='Degree' body ='MD'/>
        <GridCard icon={faUserMd} title='Degree' body ='MD'/>
        <GridCard icon={faUserMd} title='Degree' body ='This guy has a very very very long degree'/>
        <GridCard icon={faUserMd} title='Degree' body ='MD'/>
        <GridCard icon={faUserMd} title='Degree' body ='MD'/>
        <GridCard icon={faUserMd} title='Degree' body ='MD'/>
        <GridCard icon={faUserMd} title='Degree' body ='MD'/>
      </GridCardContainer>
    );
  }
}
