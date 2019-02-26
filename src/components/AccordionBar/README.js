/* Z
Warning: if you mutate a prop, this component may not re-render (to reflect the change), because the creator is a fan of overkill.

To test it out:
  1. import this file:
    import README from '......./src/components/AccordionBar/README.js';
  2. render it:
    return (
      <README />
    );

Due to people's complain, this component is now stateful.

To use:
  Props of <AccordionBar/>:
    text:
      string, the text on the bar
    plain (optional):
      boolean, if true, will not be able to expand or collapse
      default to false if omitted
    onClickPlusButton (optional):
      callback function, what happens when you click on the (+) sign
      if omitted, will not show a (+) button

  See example below.
*/

import React, { PureComponent } from 'react';
import AccordionBar from '../AccordionBar';

export default class README extends PureComponent {
  render() {
    return (
      <>

        <AccordionBar plain text='I am a plain bar'/>

        <AccordionBar plain text='I am a plain bar 2 ' onClickPlusButton={() => {alert('You clicked the plus button!')}}/>

        <AccordionBar text='I am a real accordion bar'>
          <h1>Hello World!</h1>
        </AccordionBar>

        <AccordionBar text='I am a real accordion bar 2' onClickPlusButton={() => {alert('You clicked the plus button!')}}>
          <h1>Good Night!</h1>
        </AccordionBar>

      </>
    );
  }
}
