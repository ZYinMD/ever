import * as Helper from './ProfileHelper';
import * as DateUtil from '../../../utils/DateUtil';
import * as StringUtil from '../../../utils/StringUtil';

function noRecordFound(numCol, isArray = false) {
  const res = Array(numCol).fill('');
  res[0] = 'No Record Found.';
  return isArray ? [res] : res;
}

function specialty(data) {
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
    } else {
      res.body = noRecordFound(7);
    }
  } else {
    res.header = ['Specialty'];
    if (data.activeSpecialty) {
      res.body = data.activeSpecialty.map(i => ({ specialty: i.providerSpecialtyText }));
    } else {
      res.body = noRecordFound(7, true);
    }
  }
  return res;
}

function license(data) {
  const res = {};
  res.header = ['Type', 'Number', 'Status', 'State', 'Body', 'Original Issue Date', 'Expiration Date'];
  if (data.licenseCertification) {
    res.body = data.licenseCertification.map((i) => {
      const row = {};
      row.type = Helper.checkIfNotAvailable(i.licenseTypeName);
      row.number = Helper.checkIfNotAvailable(i.licenseNumber);
      row.status = Helper.checkIfNotAvailable(i.licenseStatusName);
      row.state = Helper.checkIfNotAvailable(i.uspsStateCode);
      row.body = Helper.checkIfNotAvailable(i.licensingOrganizationName);
      row.originalIssueDate = DateUtil.convertDateToMMDDYYYY(i.licenseOriginalIssueDate);
      row.expirationDate = DateUtil.convertDateToMMDDYYYYBlank(i.licenseExpirationDate);
      return row;
    });
  } else {
    res.body = noRecordFound(7, true);
  }
  return res;
}

function otherIdentifiers(data) {
  const res = {};
  res.header = ['Name', 'Id', 'Start Date', 'End Date'];

  if (data.internalIdentifiers && data.internalIdentifiers.length > 0) {
    res.body = data.internalIdentifiers.map((i) => {
      const row = {};
      row.name = i.name;
      row.id = i.id;
      row.startDate = DateUtil.convertDateToMMDDYYYY(i.startDate);
      row.endDate = DateUtil.convertDateToMMDDYYYYBlank(i.endDate);
      return row;
    });
  } else {
    res.body = noRecordFound(4, true);
  }
  return res;
}

function MMInfo(data) {
  const res = {};
  res.header = ['Name', 'Value', 'Start Date'];
  if (data.cmsOptOutIndicator || data.medicareParFlag || data.medicaidParFlag) {
    res.body = [];
    res.body[0] = {
      name: 'Medicare Opt Out',
      value: data.cmsOptOutIndicator ? StringUtil.psvConvertYNIndicator(data.cmsOptOutIndicator) : '',
      startDate: data.cmsOptOutEffectiveDate ? DateUtil.convertDateToMMDDYYYY(data.cmsOptOutEffectiveDate) : '',
    };
    res.body[1] = {
      name: 'Medicare Par Flag',
      value: data.medicareParFlag ? StringUtil.psvConvertYNIndicator(data.medicareParFlag.indicatorValue) : '',
      startDate: data.medicareParFlag ? DateUtil.convertDateToMMDDYYYY(data.medicareParFlag.startDate) : '',
    };
    res.body[2] = {
      name: 'Medicaid Par Flag',
      value: data.medicaidParFlag ? StringUtil.psvConvertYNIndicator(data.medicaidParFlag.indicatorValue) : '',
      startDate: data.medicaidParFlag ? DateUtil.convertDateToMMDDYYYY(data.medicaidParFlag.startDate) : '',
    };
  } else {
    res.body = noRecordFound(3, true);
  }
  return res;
}

function graduation(data) {
  const res = {};
  res.header = ['School', 'Year Completed'];
  if (data.educations && data.educations.medicalSchool) {
    res.body = {
      school: StringUtil.toTitleCase(data.educations.medicalSchool.institutionName),
      year: data.educations.medicalSchool.completedYearNumber,
    };
  } else {
    res.body = noRecordFound(2);
  }
  return res;
}

function internship(data) {
  const res = {};
  res.header = ['Hospital', 'Year Completed'];
  if (data.educations && data.educations.internship) {
    res.body = {
      hospital: StringUtil.toTitleCase(data.educations.internship.institutionName),
      year: data.educations.internship.completedYearNumber,
    };
  } else {
    res.body = noRecordFound(2);
  }
  return res;
}

function residency(data) {
  const res = {};
  res.header = ['Hospital', 'Year Completed'];
  if (data.educations && data.educations.residency) {
    res.body = {
      hospital: StringUtil.toTitleCase(data.educations.residency.institutionName),
      year: data.educations.residency.completedYearNumber,
    };
  } else {
    res.body = noRecordFound(2);
  }
  return res;
}

function contact(data) {
  const res = {};
  res.header = ['Contact Name', 'Contact Type', 'Phone', 'Fax', 'Email'];
  if (data.profileContact && data.profileContact.length > 0) {
    res.body = data.profileContact.map((i) => {
      const row = {};
      row.name = (i.givenName && i.surname) ? `${StringUtil.toTitleCase(i.givenName)} ${StringUtil.toTitleCase(i.surname)}` : '';
      row.type = i.contactTypeName || '';
      row.phone = (i.phoneNumber) ? Helper.renderNumbers(i.phoneNumber) : '';
      row.fax = (i.faxNumber) ? Helper.renderNumbers(i.faxNumber) : '';
      row.email = i.emailAddress || '';
      return row;
    });
  } else {
    res.body = noRecordFound(5, true);
  }
  return res;
}

function additionalAddress(data) {
  const res = {};
  res.header = ['Address Type', 'Address'];
  if (data.additionalLocation && data.additionalLocation.length > 0) {
    res.body = data.additionalLocation.map((i) => {
      const row = {};
      row.type = i.locationTypeName;
      row.address = (i.postalAddress[0].addressLine1Text || '')
        + (i.postalAddress[0].addressLine2Text ? (', ' + i.postalAddress[0].addressLine2Text) : '')
        + (i.postalAddress[0].addressLine3Text ? (', ' + i.postalAddress[0].addressLine3Text) : '');

      return row;
    });
  } else {
    res.body = noRecordFound(2, true);
  }
  return res;
}


export default {
  specialty,
  license,
  otherIdentifiers,
  MMInfo,
  graduation,
  internship,
  residency,
  contact,
  additionalAddress,
};
