/* Z
Warning: if you mutate a prop, this component may not re-render (to reflect the change), because the creator is a fan of overkill.

To see how it looks:
  1. import this file:
    import README from '......./src/components/SideTile/README.js';
  2. render it:
    return (
      <README />
    );

Props:
  isCollapsed:
    Boolean. This is a stateless component, the prop dictates whether it's rendered as collapsed.
  width(optional):
    String, any css width, e.g. '200px', '10em', '30vw', etc
    Default to '100%' if omitted, you can use your own wrapper to control the width.
  icon:
    Variable, an fa icon, e.g. icon={faUser}
  onToggle:
    Callback, what happens when you toggle.
  upperTitle & upperBody:
    Strings, the text above the horizontal line
  lowerTitle & lowerBody (optional):
    Strings, the text above the horizontal line.
    If (!lowerBody), lowerBody will not render. To render as empty placeholder, please pass in ' '.
    If (!lowerTitle), both will not render.
  leftFooterTitle & leftFooterBody (optional)
    Strings, the text on the lower left corner.
    If (!leftFooterBody), leftFooterBody will not render. To render as empty placeholder, please pass in ' '.
    If (!leftFooterTitle), both will not render.
  rightFooterTitle & rightFooterBody (optional)
    Similar as leftFooter.

See example below.
*/

import React, { PureComponent } from 'react';
import { faUsers, faUser } from 'fa5-pro-solids';
import SideTile from '.';

export default class README extends PureComponent {
  state = { areSideTilesCollapsed: false }

  toggle = () => {
    this.setState({ areSideTilesCollapsed: !this.state.areSideTilesCollapsed });
  }

  render() {
    return (
      <>
        <SideTile
          onToggle={this.toggle}
          width="215px"
          isCollapsed={this.state.areSideTilesCollapsed}
          icon={faUsers}
          upperTitle="Contractee's Legal Name"
          upperBody="COASTAL ORTHOPEDICS AND SPORTS MEDICINE OF SW FL"
          lowerTitle="Crystal J. Ankney's Role"
          lowerBody="SPECIALIST"
          leftFooterTitle="TIN"
          leftFooterBody="59-1466615"
          rightFooterTitle="Payee FB#"
          rightFooterBody="00712"
        />

        <br />

        <SideTile
          onToggle={this.toggle}
          width="15vw"
          isCollapsed={this.state.areSideTilesCollapsed}
          icon={faUser}
          upperTitle="Contractee's Legal Name"
          upperBody="COASTAL ORTHOPEDICS AND SPORTS MEDICINE OF SW FL"
          lowerTitle="Crystal J. Ankney's Role"
          lowerBody="SPECIALIST"
        />
      </>
    );
  }
}
