/* Z
  This file determines what icon to display given the card title. Add your glyphs here.
  Use quotes if your title contains spaces.
*/

import {
  faUserGraduate,
  faUtensilFork,
  faAlarmClock,
  faAllergies,
  faBolt,
} from 'fa5-pro-light';

import {
  faUser,
  faVenusMars,
  faGraduationCap,
  faUsers,
  faIdCard,
  faHashtag,
  faMapMarkerAlt,
  faCalendarAlt,
  faAward,
  faUserCrown,
  faIdBadge,
  faHospitalAlt,
  faBirthdayCake,
  faUserMd,
  faLanguage,
  faQuestion,
  faBuilding,
} from 'fa5-pro-solids';

const lookUpTable = {
  NAME: faUser,
  'BUSINESS ENTITY NAME': faBuilding,
  DEGREE: faGraduationCap,
  Gender: faVenusMars,
  GENDER: faVenusMars,
  DOB: faBirthdayCake,
  CATEGORY: faUserMd,
  Eat: faUtensilFork,
  'Get Up At': faAlarmClock,
  Allergies: faAllergies,
  Charging: faBolt,
  'Payee Name': faIdCard,
  'Payee FB #': faHashtag,
  'TAX ID': faHashtag,
  TIN: faHashtag,
  'ACTIVE NPI(s)': faHashtag,
  'FB #': faHashtag,
  'FB # START DATE': faCalendarAlt,
  'FB # END DATE': faCalendarAlt,
  'FB # INACTIVE REASON': faQuestion,
  'Payee Address': faMapMarkerAlt,
  'Payee Start Date': faCalendarAlt,
  'Payee End Date': faCalendarAlt,
  'Start Date': faCalendarAlt,
  'Value Choice Provider': faAward,
  'Associated Corporate Entity': faHospitalAlt,
  Category: faUserCrown,
  "Facility's Role": faIdBadge,
  "Facility's Specialty": faAward,
  'Group Name': faUsers,
  'Group Specialty': faHospitalAlt,
  'Group Role': faUsers,
  'Supplier Business Name': faUsers,
  'Supplier Business Specialty': faHospitalAlt,
  'Supplier Business Role': faUsers,
  "Group's Role": faIdBadge,
  "Group's Specialty": faAward,
  'LANGUAGE(s) OTHER THAN ENGLISH': faLanguage,
};

export default lookUpTable;
