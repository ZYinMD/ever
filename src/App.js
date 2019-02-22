import React, { Component } from 'react';
import './App.css';
import GridCardContainer from './GridCardContainer/GridCardContainer.js';
import GridCard from './GridCardContainer/GridCard/GridCard.js';
import { faCat } from '@fortawesome/free-solid-svg-icons';
class App extends Component {
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

export default App;
