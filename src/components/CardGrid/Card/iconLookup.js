/*Z
  This file determines what icon to display given the card title. Add your glyphs here.
  Use quotes if your title contains spaces.
*/

import {
  faUserGraduate,
  faVenusMars,
  faUtensilFork,
  faAlarmClock,
  faAllergies,
  faBolt,
} from 'fa5-pro-light';

const lookUpTable = {
  Degree: faUserGraduate,
  Gender: faVenusMars,
  Eat: faUtensilFork,
  'Get Up At': faAlarmClock,
  Allergies: faAllergies,
  Charging: faBolt,
}

export default lookUpTable;
