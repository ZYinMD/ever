// help functions copied from old code:
import * as Helper from './ProfileHelper';
import * as StringUtil from '../../../utils/StringUtil';
import * as DateUtil from '../../../utils/DateUtil';
import * as DataFormat from '../../../utils/DataFormat';

export default function prepareCards(data) {
  const res = {};

  if (Array.isArray(data)) { // came from 404
    res.NAME = data[0].displayName || data[0].organizationName || null;
    res.CATEGORY = data[0].category || null;
    res['TAX ID'] = data[0].formattedTaxId || data[0].taxId || null;
    return res;
  }

  if (data.individualName)
    res.NAME = StringUtil.psvUpperCase(Helper.getFullName(data.individualName[0]));
  if (data.organizationName)
    res.NAME = StringUtil.psvUpperCase(Helper.getOrgFullName(data.organizationName, 'DBA'));
  if (data.organizationName)
    res['BUSINESS ENTITY NAME'] = StringUtil.psvUpperCase(Helper.getOrgFullName(data.organizationName, 'LGL'));
  if (data.individualName) {
    if (data.individualName[0].degreeName)
      res.DEGREE = data.individualName[0].degreeName;
  }
  if (data.individualGenderCode)
    res.GENDER = (data.individualGenderCode === 'M') ? 'Male' : 'Female';
  if (data.individualBirthDate)
    res.DOB = DateUtil.convertDateToMMDDYYYY(data.individualBirthDate);
  res.CATEGORY = data.providerDetailTypeName || null;
  if (data.fbNumber) {
    res['FB #'] = data.fbNumber.id || null;
    if (data.fbNumber.startDate)
      res['FB # START DATE'] = DateUtil.convertDateToMMDDYYYY(data.fbNumber.startDate);
    if (data.fbNumber.endDate) {
      res['FB # END DATE'] = DateUtil.convertDateToMMDDYYYYBlank(data.fbNumber.endDate) || null;
    }
    res['FB # INACTIVE REASON'] = data.fbNumber.expirationReasonName || null;
  }

  if (data.federalTaxIdentifierNumber) {
    res['TAX ID'] = (data.providerDetailTypeName === 'Professional' || data.providerDetailTypeName === 'Supplier Individual')
      ? data.federalTaxIdentifierNumber
      : DataFormat.maskTaxID(data.taxIdentifierTypeCode, data.federalTaxIdentifierNumber);
  }
  if (data.providerNPI)
    res['ACTIVE NPI(s)'] = data.providerNPI.map(i => i.npi + (i.npiTypeCode ? ` (${i.npiTypeCode})` : ''));
  res['LANGUAGE(s) OTHER THAN ENGLISH'] = data.languages || null;

  return res;
}
