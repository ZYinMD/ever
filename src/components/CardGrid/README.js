/* Z
Warning: if you mutate a prop, this component may not re-render (to reflect the change), because the creator is a fan of overkill.

To test it out:
  1. import this file:
    import README from '......./src/components/CardGrid/README.js';
  2. render it:
    return (
      <README />
    );

To use:
  Props of <Table />:
    numCol(optional):
      How many columns you want the grid to have, e.g. <Table numCol={3}/>
      If omitted, default to reponsive and wraps around
  Props of <Card />
    title:
      String, the title displayed on the card
    body:
      String, the text underneath the title.
      Also supports array of strings. If you data is an array of strings, just pass in the array.
      If (!body), the whole card will not be displayed. If you want to display a card with empty body, pass in ' '
    noAutoCap (optional):
      Boolean, default to false if omitted.
      Normally, the card title will be automatically rendered in all upper case. If false, will render what you pass in as is.
  The icon on the card:
    Each card will display an icon, which is determined by the title you provide.
    See '.Card/iconLookup.js' for details. Icon will be empty if it's not there.

    Example code below.
*/

import React, { PureComponent } from 'react';
import { CardGrid, Card } from '.';

export default class README extends PureComponent {
  render() {
    return (
      <div style={{ paddingTop: '20px' }}>
        <CardGrid>
          <Card title="Degree" body="MD" />
          <Card title="Gender" body="Male" />
          <Card title="Eat" body="A lot of things" />
          <Card title="Get Up At" body="5AM" />
          <Card title="Allergies" body="None" />
          <Card title="Degree" body="This guy has a very very  long degree" />
          <Card title="Gender" body="Male" />
          <Card title="Eat" body="A lot of things" />
          <Card title="Get Up At" body="5AM" />
          <Card title="Allergies" body="None" />
          <Card title="Charging" body="Yes!" />
        </CardGrid>
      </div>
    );
  }
}
