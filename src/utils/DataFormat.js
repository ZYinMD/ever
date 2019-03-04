
import globalConfig from './../config/GlobalAppConfig';

/*
  This method used to format taxid based on provider type values.
*/

export const formatTaxID = (taxIdVal, provType) => {
  if(taxIdVal) {
    if(provType === 'Professional' || provType === 'Supplier Individual') {
      return (taxIdVal.substring(0,3) + '-' + taxIdVal.substring(3,5) + '-' + taxIdVal.substring(5));
    }
    else {
      return (taxIdVal.substring(0,2) + '-' +taxIdVal.substring(2));
    }
  }
}

// Mask SSN value based on role type.
export const maskTaxID = (idType, idValue) => {

  var isSecureRole = globalConfig.getConfig('isSecureRole');
  
  if(idType && idType === 'SSN' && (isSecureRole && !isSecureRole) && idValue.indexOf("**-") != -1) {
    var last4 = idValue.substring(idValue.length - 4);
    var mask = idValue.substring(0, (idValue.length - 4)).replace(/\d/g,"*");
    return (mask + last4);
  }
  else {
    return idValue;
  }
}

// Mask SSN value based on role type.
export const formatMaskTaxID = (idValue) => {
  
  var idType = "EIN";
  if((idValue.match(/-/g)).length > 1) {
    idType = "SSN";
  }
  return maskTaxID(idType, idValue);
}

/**
*/
export const covertNpiListToString = (provNpiData) => {
  let npiIds = '';
  if(provNpiData) {
    provNpiData.map((item) => {
      if(npiIds) {
        npiIds += ',';
      }
      npiIds += item.number;
    });
  }
  return npiIds;
}
