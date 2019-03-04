/**
 This JS file is used to convert Data from JSON format into page render.
 */

var DateUtil = require('../Utils/DateUtil.js');


export const getFullName = (individualName) => {
  var name = '';
  if (individualName) {
    name += (individualName.surname ? (individualName.surname) : '');
    name += (individualName.givenName ? (', ' + individualName.givenName) : '');
    name += (individualName.middleName ? (' ' + individualName.middleName.slice(0, 1)) : '');
    name += (individualName.suffixName ? (' ' + individualName.suffixName) : '');
  }
  return name;
}

export const getOrgFullName = (orgNameList, type) => {
  var name = '';
  if (orgNameList) {
    for (var i = 0; i < orgNameList.length; i++) {
      if (type === orgNameList[i].organizationNameTypeCode) {
        return orgNameList[i].organizationName;
      }
    }
  }
  return name;
}

export const getAlternativeIdentifierValue = (xRefData, type) => {
  if (xRefData) {
    for (var i = 0; i < xRefData.length; i++) {
      if (xRefData[i].providerAlternateIdentifierTypeCode == type) {
        let bolActive = DateUtil.isActive(xRefData[i].providerAlternateIdentifierEffectiveDate, xRefData[i].providerAlternateIdentifierExpirationDate);

        return {
          data: [{
            "id": xRefData[i].providerAlternateIdentifier,
            "expired": (bolActive ? '' : ' (Inactive) '),
            "startDate": DateUtil.convertDateToMMDDYYYY(xRefData[i].providerAlternateIdentifierEffectiveDate),
            "endDate": DateUtil.checkEndDate(xRefData[i].providerAlternateIdentifierExpirationDate)
          }]
        };
      }
    }
  }
}

export const consolidateAlternativeIdentifiers = (xRefData) => {
  var identifiers = {
    data: []
  };
  if (xRefData) {
    for (var i in xRefData) {
      if (!(xRefData[i].providerAlternateIdentifierTypeCode === "PIMS" || xRefData[i].providerAlternateIdentifierTypeCode === "FB"
        || xRefData[i].providerAlternateIdentifierTypeCode === "PIP" || xRefData[i].providerAlternateIdentifierTypeCode === "MC")) {
        let bolActive = DateUtil.isActive(xRefData[i].providerAlternateIdentifierEffectiveDate, xRefData[i].providerAlternateIdentifierExpirationDate);

        identifiers.data.push(
          {
            "type": checkIfNotAvailable(xRefData[i].providerAlternateIdentifierTypeCode),
            "id": checkIfNotAvailable(xRefData[i].providerAlternateIdentifier),
            "name": checkIfNotAvailable(xRefData[i].providerAlternateIdentifierTypeName),
            "expired": (bolActive ? '' : ' (Inactive) '),
            "startDate": DateUtil.convertDateToMMDDYYYY(xRefData[i].providerAlternateIdentifierEffectiveDate),
            "endDate": DateUtil.checkEndDate(xRefData[i].providerAlternateIdentifierExpirationDate)
          });
      }
    }
  }
  return identifiers.data;
}

export const getAllLanguages = (languages) => {
  var language = {
    data: []
  };

  for (var i in languages) {
    if (languages[i].isoLanguageName != "English") {
      language.data.push({"name": languages[i].isoLanguageName});
    }
  }
  return language.data;
}

export const getSpecialty = (provSpecialty) => {
  var specialDiv = '';
  if (provSpecialty) {
    for (var i = 0; i < provSpecialty.length; i++) {
      if (specialDiv) {
        specialDiv += ',';
      }
      specialDiv += provSpecialty[i].providerSpecialtyText;
    }
  }
  return specialDiv;
}

/* Not used the following Method and moved this logic into service.*/
export const getProviderValueName = (providerValue) => {
  let name;
  for (var i = 0; i < providerValue.providerProgramLevel.length; i++) {
    for (var j = 0; j < providerValue.providerProgramLevel[i].providerProgramLevelValue.length; j++) {
      if (providerValue.providerProgramLevel[i].providerProgramLevelValue[j].providerProgramValueName === ('N/A' || 'Not Applicable')) {
        return name = '';
      }
      else {
        return name = providerValue.providerProgramLevel[i].providerProgramLevelValue[j].providerProgramValueName;
      }
    }
  }
}

export const getContactName = (contact) => {
  var fullName = '';
  if (contact) {
    if ((contact.givenName) !== "Receptionist" && (contact.surname) !== "Receptionist" &&
      (contact.givenName) !== '' && (contact.surname) !== '' && (contact.givenName)) {


      fullName += ((contact.givenName) ? contact.givenName : '');
      fullName += (fullName ? ' ' : '');
      fullName += ((contact.surname) ? contact.surname : '');

    }
  }
  return ((fullName) ? fullName : '');
}


export const getPhoneContact = (item, chType) => {
  var contact = '';
  if (item && item.contact && item.contact[0].contactCommunicationChannel) {
    var contactCh = item.contact[0].contactCommunicationChannel
    if (contactCh) {
      for (var i = 0; i < contactCh.length; i++) {
        if (contactCh[i].telephoneNumberTypeCode == chType) {
          contact += `(${contactCh[i].telephoneAreaCode})-${contactCh[i].telephoneExchangeNumber}-${contactCh[i].telephoneStationNumber}`;
          return contact;
        }
      }
    }
  }
  return contact;
}

export const getContactChannelNameByType = (contactChannel, type) => {
  if (contactChannel) {
    for (var i = 0; i < contactChannel.length; i++) {
      if (contactChannel[i].communicationChannelCode == type) {
        return contactChannel[i].contactCommunicationChannelCustomKey;
      }
    }
  }
  return '';
}


export const getAddress = (addressId, endDate, addressList) => {
  var lineOne = '';
  var lineTwo = '';
  var lineThree = '';
  if (addressList) {
    for (var i = 0; i < addressList.length; i++) {
      if (addressList[i].postalAddressIdentifier == addressId && DateUtil.isDateValid(endDate)) {
        lineOne += addressList[i].addressLine1Text;
        if (addressList[i].addressLine2Text) {
          lineTwo += ', ' + addressList[i].addressLine2Text;
        }
        if (addressList[i].cityName) {
          lineThree += '' + addressList[i].cityName;
        }
        if (addressList[i].uspsStateCode) {
          lineThree += ', ' + addressList[i].uspsStateCode;
        }
        if (addressList[i].postalCode) {
          lineThree += ' ' + this.formatZipCode(addressList[i].postalCode);
        }
        break;
      }

    }
  }
  return [lineOne, lineTwo, lineThree];
}

export const getChannelContact = (officeContact, chType) => {
  var contact = '';
  if (officeContact && officeContact[0].contact && officeContact[0].contact[0].contactCommunicationChannel) {
    var contactCh = officeContact[0].contact[0].contactCommunicationChannel
    if (contactCh) {
      for (var i = 0; i < contactCh.length; i++) {
        if (contactCh[i].telephoneNumberTypeCode == chType) {
          contact += `(${contactCh[i].telephoneAreaCode})-${contactCh[i].telephoneExchangeNumber}-${contactCh[i].telephoneStationNumber}`
          return contact;
        }
      }
    }
  }
  return contact;
}

export const getActiveSpecialityInfo = (specialityList) => {
  var validSpecialityList = {
    data: []
  };

  if (specialityList) {
    for (var i in specialityList) {
      if (DateUtil.isActive(specialityList[i].boardCertificationDate, specialityList[i].boardCertificationExpirationDate)) {
        validSpecialityList.data.push(
          {
            "boardCertificationOrganizationName": checkIfNotAvailable(specialityList[i].boardCertificationOrganizationName),
            "boardCertificationStatusName": checkIfNotAvailable(specialityList[i].boardCertificationStatusName),
            "boardCertificationDate": specialityList[i].boardCertificationDate,
            "boardCertificationExpirationDate": DateUtil.checkEndDate(specialityList[i].boardCertificationExpirationDate),
            "providerGeneralSpecialtyName": checkIfNotAvailable(specialityList[i].providerGeneralSpecialtyName),
            "providerSubspecialtyName": checkIfNotAvailable(specialityList[i].providerSubspecialtyName),
            "providerSpecialtyText": checkIfNotAvailable(specialityList[i].providerSpecialtyText)
          });
      }
      else {
        validSpecialityList.data.push(
          {
            "boardCertificationOrganizationName": checkIfNotAvailable(specialityList[i].boardCertificationOrganizationName),
            "boardCertificationStatusName": checkIfNotAvailable(specialityList[i].boardCertificationStatusName),
            "boardCertificationDate": specialityList[i].boardCertificationDate,
            "boardCertificationExpirationDate": DateUtil.checkEndDate(specialityList[i].boardCertificationExpirationDate),
            "providerGeneralSpecialtyName": checkIfNotAvailable(specialityList[i].providerGeneralSpecialtyName),
            "providerSubspecialtyName": checkIfNotAvailable(specialityList[i].providerSubspecialtyName),
            "providerSpecialtyText": checkIfNotAvailable(specialityList[i].providerSpecialtyText)
          });
      }
    }
  }
  return validSpecialityList.data;

}

export const spliceSecondaryData = (LicenseData) => {
  var data = LicenseData;
  var dataCode = LicenseData.split(/-(.+)/)[1];
  return dataCode;
}

export const spliceInitialData = (LicenseData) => {
  var data = LicenseData;
  var dataName = LicenseData.split(/-(.+)/)[0];
  return dataName;
}


/* Function for formating zip code eg 12345-6789*/
export const formatZipCode = (zip) => {
  var formatedZip;
  if (zip) {
    var firstHalf = zip.substr(0, 5);
    var secondHalf = zip.substr(5, 9);
    return formatedZip = `${firstHalf}-${secondHalf}`;
  }
}

export const checkIfNotAvailable = (value) => {
  if (value) {
    if (value === 'N/A' || value === 'Not Applicable' || value === 'NA') {
      return null;
    }
    else {
      return value;
    }
  }
  else {
    return null;
  }
}


export const getValidContacts = (contactList, phoneType) => {

  let validPhoneContacts = [];

  if (contactList) {
    contactList.map(item => {
      let phoneNum = this.getPhoneContact(item, phoneType);

      if (phoneNum.length > 0) {
        let name = this.getContactName(item.contact);
        {
          if (name.length > 0) {
            validPhoneContacts.push(item);
          }
        }
      }
    })

    return validPhoneContacts;
  }
  else {
    return null;
  }
}

export const getValidEmails = (contactList) => {

  let validEmailContacts = [];

  if (contactList) {
    contactList.map(item => {

      let emailID = this.getContactChannelNameByType(item.contact[0].contactCommunicationChannel, 'EM');

      if (emailID.length > 0) {
        let name = this.getContactName(item.contact);

        if (name.length > 0) {
          validEmailContacts.push(item)
        }
      }
    })

    return validEmailContacts;
  }
  else {
    return null;
  }
}

export const renderNumbers = (numberArr) => {
  if (numberArr && numberArr.length > 1) {
    var str = "";
    for (var i = 0; i < numberArr.length; i++) {
      if (i == (numberArr.length - 1)) {
        str += numberArr[i];
      }
      else {
        str += numberArr[i] + ", ";
      }
    }
    return str;
  }
  else {
    return numberArr;
  }
}
