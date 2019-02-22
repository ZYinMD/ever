/* Z
How to use:
  Just do something similar to example code below.

  <GridCard />:
    this component takes 3 props: icon, title, text

  <GridCardContainer/>:
    this component should have a parent which has {display: flex;  flex-direction: column;} in order for the whole grid to be centered

to test the effect:
    1. go to src/Container/xxxxx, line 444, comment out line xxx, replace it with  to src/Component/GridCardContainer/README.js
    2. Run local server, search something, then click the "General Profile" node.
*/

import React, { PureComponent } from 'react';
import './App.css';
import GridCardContainer from './GridCardContainer/GridCardContainer.js';
import GridCard from './GridCardContainer/GridCard/GridCard.js';
import { faCat } from '@fortawesome/free-solid-svg-icons';

export default class README extends PureComponent {
  render() {
    return (
      <div className="App">
        <GridCardContainer>
          <GridCard icon={faCat} title='Degree' text ='MD'/>
          <GridCard icon={faCat} title='Degree' text ='MD'/>
          <GridCard icon={faCat} title='Degree' text ='MD'/>
          <GridCard icon={faCat} title='Degree' text ='MD'/>
          <GridCard icon={faCat} title='Degree' text ='MD'/>
          <GridCard icon={faCat} title='Degree' text ='MD'/>
          <GridCard icon={faCat} title='Degree' text ='MD'/>
          <GridCard icon={faCat} title='Degree' text ='MD'/>
          <GridCard icon={faCat} title='Degree' text ='MD'/>
          <GridCard icon={faCat} title='Degree' text ='MD'/>
          <GridCard icon={faCat} title='Degree' text ='MD'/>
        </GridCardContainer>
      </div>
    );
  }
}
