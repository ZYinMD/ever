/* Util File For Address */
import React from 'react';
import pcCommon from "../../../assets/styles/pcCommon.css";

const StringUtil = require('./StringUtil.js');

export const getAddress = (data) => {

  let finalAddress;
  let addrStatePostal;
  if(data)
    {
      finalAddress = `${data.addressLine1?data.addressLine1+', ':''}
                      ${data.addressLine2?data.addressLine2+', ':''}
                      ${data.addressCity?data.addressCity+', ':''}`

      addrStatePostal = `${data.addressState?data.addressState+', ':''}
                      ${data.addressPostalCode?addDash(data.addressPostalCode):''}`

    }

    return (StringUtil.toTitleCase(finalAddress) + addrStatePostal);

}


export const getAddressWithCounty = (data) => {

  let finalAddress;
  let addrStatePostal;
  if(data)
  {
    finalAddress = `${data.addressLine1?data.addressLine1+', ':''}
                      ${data.addressLine2?data.addressLine2+', ':''}
                      ${data.addressCity?data.addressCity+', ':''}`

    addrStatePostal =`${data.addressState?data.addressState+', ':''}
                      ${data.addressPostalCode?addDash(data.addressPostalCode):''}`
  }

  return (StringUtil.toTitleCase(finalAddress) + addrStatePostal);

}


export const addDash = (str) => {
  if(str && str.length > 5){
    var chars = str.split("");
    chars.splice(chars.length-4,0,'-');
    return chars.join('')
  }
  else {
    return str;
  }
}


export const AddressWithFormattedDisplay = (addressLine) => {

  return (
    <div className={pcCommon.alignLeft}>
        {addressLine.addressLine1Text ? addressLine.addressLine1Text + ',':''}
        {addressLine.addressLine1Text && !addressLine.addressLine2Text ? <br /> : null}
        {addressLine.addressLine2Text?(addressLine.addressLine2Text):''}
        {addressLine.addressLine2Text ? <br /> : null}
        {addressLine.addressLine3Text?(addressLine.addressLine3Text):''}
        {addressLine.addressLine3Text ? <br /> : null}
        {addressLine.addressLine4Text?(addressLine.addressLine4Text):''}
    </div>
  )

}

export const getValidAddress = (addressLine) => {

  let addressString = '';

  if (addressLine) {

    addressString = `${addressLine.addressLine1Text ? addressLine.addressLine1Text + ', ' : ''}${addressLine.addressLine2Text ? addressLine.addressLine2Text + ',' : ''}${addressLine.addressLine3Text ? addressLine.addressLine3Text + ', ' : ''}${addressLine.addressLine4Text ? addressLine.addressLine4Text : ''}`

  }

  return addressString;

}
