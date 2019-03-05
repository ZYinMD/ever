import * as Helper from './ProfileHelper';
import * as DateUtil from '../../../utils/DateUtil';

export default function prepareTable(data) {
  const res = {};
  if ((data.providerDetailTypeName === 'Professional' || data.providerDetailTypeName === 'Supplier Individual')) {
    res.header = ['Specialty', 'Board', 'Board Status', 'Board Date', 'Board Expiration Date', 'Board Specialty', 'Board Subspecialty'];
    if (data.activeSpecialty) {
      res.body = data.activeSpecialty.map((i) => {
        const row = {};
        row.specialty = Helper.checkIfNotAvailable(i.providerSpecialtyText);
        row.board = Helper.checkIfNotAvailable(i.boardCertificationOrganizationName);
        row.boardStatus = Helper.checkIfNotAvailable(i.boardCertificationStatusName);
        row.boardDate = DateUtil.convertDateToMMDDYYYY(i.boardCertificationDate);
        row.boardExpirationDate = DateUtil.convertDateToMMDDYYYYBlank(i.boardCertificationExpirationDate);
        row.boardSpecialty = Helper.checkIfNotAvailable(i.providerGeneralSpecialtyName);
        row.boardSubspecialty = Helper.checkIfNotAvailable(i.providerSubspecialtyName);
        return row;
      });
    }
  } else {
    res.header = ['Specialty'];
    if (data.activeSpecialty) {
      res.body = data.activeSpecialty.map(i => ({ specialty: i.providerSpecialtyText }));
    }
  }
  return res;
}
