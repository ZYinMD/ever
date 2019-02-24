/* Z
to try it out:
  1. import this file:
    import README from '......./src/components/GridCardContainer/README.js';
  2. render it:
    return (
      <README />
    );

Known issues:
  The whole grid may or may not be perfectly centered to the screen due to the floating black bar on the left. Fix it yourself.
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
        <GridCard icon={faUserMd} title='Degree' body ='loreml loreml loreml loreml loreml loreml loreml loreml loreml loreml '/>
        <GridCard icon={faUserMd} title='Degree' body ='MD'/>
        <GridCard icon={faUserMd} title='Degree' body ='MD'/>
        <GridCard icon={faUserMd} title='Degree' body ='MD'/>
        <GridCard icon={faUserMd} title='Degree' body ='MD'/>
        <GridCard icon={faUserMd} title='Degree' body ='MD'/>
        <GridCard icon={faUserMd} title='Degree' body ='MD'/>
        <GridCard icon={faUserMd} title='Degree' body ='MD'/>
        <GridCard icon={faUserMd} title='Degree' body ='MD'/>
        <GridCard icon={faUserMd} title='Degree' body ='MD'/>
      </GridCardContainer>
    );
  }
}
