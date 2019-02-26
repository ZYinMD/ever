/*Z
To test it out:
  1. import this file:
    import README from '......./src/components/NodeHeader/README.js';
  2. render it:
    return (
      <README />
    );

To use:
  Props of <NodeHeader>:
    name:
      string, provider's name on the top left corner
    category:
      string, the subtitle underneath the name
    topBorderColor(optional):
      the color of the top header of the horizontal blue bar (it's different on each node), default to #6FC391
    button1(optional):
      boolean, if true, render a information button to the right of the dropdown
    button2(optional):
      boolean, if true, render a contact button to the right of the dropdown

  Props of <Tab/>:
    text:
      string, the text showing on the tab
    payload(optional):
      a redux payload, when this tab is clicked, will dispatch the payload, with action.type being 'CHANGE_CURRENT_TAB'.
      If omitted, will default to {
        payload: this.props.text
      }
    onClick(optional):
      function, what happens when this tab is clicked. If this props.onClick and props.payload are provided together, payload will be ignored
    active(optional):
      boolean, whether this tab is currently active. Default to false

  See example below.
*/

import React, { PureComponent } from 'react';
import { NodeHeader, HorizontalNav, Tab } from './index.js';
import { faInfoCircle, faAddressBook } from 'fa5-pro-light';

export default class README extends PureComponent {
  render() {
    return (
      <NodeHeader
        name={'Crystal J. Ankney'}
        category={'Supplier Individual'}
        topBorderColor={'#f17677'}
        onClickDropdown={() => {console.log('You clicked the dropdown')}}
        button1={faInfoCircle}
        button2={faAddressBook}
        onClickButton1={() => {console.log('You clicked info button')}}
        onClickButton2={() => {console.log('You clicked address book')}}
      >
        <HorizontalNav>
          <Tab text={'Professional Info'} />
          <Tab text={'License / Cert & Other Identifiers'} active/>
          <Tab text={'Education Info'} onClick={() => {console.log('You clicked Education Info')}}/>
          <Tab text={'Quality Program'} payload={{tab: 'Quality Program'}} />
          <Tab text={'Additional Info'} />
        </HorizontalNav>
      </NodeHeader>
    )
  }
}
