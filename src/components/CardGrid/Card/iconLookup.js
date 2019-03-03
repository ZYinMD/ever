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
import { faUsers, faIdCard, faHashtag, faMapMarkerAlt, faCalendarAlt, faAward, faUserCrown, faIdBadge, faHospitalAlt } from "fa5-pro-solids";

const lookUpTable = {
  Degree: faUserGraduate,
  Gender: faVenusMars,
  Eat: faUtensilFork,
  'Get Up At': faAlarmClock,
  Allergies: faAllergies,
  Charging: faBolt,
  'Payee Name': faIdCard,
  'Payee FB #': faHashtag,
  'Payee Address': faMapMarkerAlt,
  'Payee Start Date': faCalendarAlt,
  'Payee End Date': faCalendarAlt,
  'Start Date': faCalendarAlt,
  'Value Choice Provider': faAward,
  'Associated Corporate Entity': faHospitalAlt,
  'Category': faUserCrown,
  "Facility's Role": faIdBadge,
  "Facility's Specialty": faAward,
  "Group Name": faUsers,
  "Group Specialty": faHospitalAlt,
  "Group Role": faUsers,
  "Supplier Business Name": faUsers,
  "Supplier Business Specialty": faHospitalAlt,
  "Supplier Business Role": faUsers,
  "Group Name": faUsers,
  "Group's Role": faIdBadge,
  "Group's Specialty": faAward,
  'TIN': faHashtag
}

export default lookUpTable;
