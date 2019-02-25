/*Z

To test it out:
  1. import this file:
    import README from '......./src/components/NewHeader/README.js';
  2. render it:
    return (
      <README />
    );

To use:
  Props of <NewHeader>:
    name:
      string, provider's name
    category:
      string, the subtitle underneath the name
    topBorderColor(optional):
      the color of the top header of the horizontal blue bar (it's different on each node), default to #6FC391
    button1(optional):
      fa identifier, the first glyph to the right of the dropdown button, default to none
    button2(optional):
      fa identifier, the second glyph to the right of the dropdown button, default to none
    onClickButton1:
      callback function, what happens when button1 is clicked
    onClickButton2:
      callback function, what happens when button1 is clicked

  Props of <Tab/>:
    text:
      string, the text showing on the tab
    payload(optional):
      when this tab is clicked, will dispatch a payload to redux, if omitted, if omitted, will default to {
        type: 'CHANGE_CURRENT_TAB',
        payload: {this.props.text}
      }
    onClick(optional):
      what happens when this tab is clicked. If this props.onClick and props.payload are provided together, payload will be ignored
    active(optional):
      boolean, whether this tab is currently active. Default to false

  See example below.
*/

import React, { PureComponent } from 'react';
import NewHeader from './index.js';
import { HorizontalNav, Tab } from './HorizontalNav';
import { faInfoCircle, faAddressBook } from 'fa5-pro-light';

export default class README extends PureComponent {
  render() {
    return (
      <NewHeader
        name={'Crystal J. Ankney'}
        category={'Supplier Individual'}
        topBorderColor={'#f17677'}
        onClickDropdown={() => {console.log('You clicked the dropdown')}}
        button1={faInfoCircle}
        button2={faAddressBook}
        onClickButton1={() => {console.log('You clicked info button')}}
        onClickButton1={() => {console.log('You clicked address book')}}
      >
        <HorizontalNav>
          <Tab text={'Professional Info'} />
          <Tab text={'License / Cert & Other Identifiers'} active/>
          <Tab text={'Education Info'} onClick={() => {console.log('You clicked Education Info')}}/>
          <Tab text={'Quality Program'} payload={{tab: 'Quality Program'}} />
          <Tab text={'Additional Info'} />
        </HorizontalNav>
      </NewHeader>
    )
  }
}
