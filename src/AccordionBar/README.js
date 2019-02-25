/* Z
To test it out:
  1. import this file:
    import README from '......./src/components/AccordionBar/README.js';
  2. render it:
    return (
      <README />
    );

Planned feature:
  The chevron up and chevron down on the far right - I have no idea what they do.

To use:
  This component is stateless and pure, because the creator is a fan of overkill. Please handle your state elsewhere.
  Props of <AccordionBar/>:
    text:
      string, the text on the bar
    button (optional):
      string, must be either '+' or '-', indicating the current button being rendered. All other values are ignored.
      If omitted, will not show a button
    onExpand (optional):
      callback function, what happens when you click on the (+) sign
    onCollapse (optional):
      callback function, what happens when you click on the (-) sign
  See example below.
*/

import React, { PureComponent } from 'react';
import AccordionBar from '../AccordionBar';

export default class README extends PureComponent {
  render() {
    return (
      <>
        <AccordionBar text='I am a non-accordion bar, but please open your console.'/>
        <AccordionBar text='I am a stateless collapsed bar' button={'-'} onCollapse={() => {console.log('You clicked the (-) button')}}/>
        <AccordionBar text='I am a stateless expanded bar' button={'+'} onExpand={() => {console.log('You clicked the (+) button')}}/>
      </>
    );
  }
}
