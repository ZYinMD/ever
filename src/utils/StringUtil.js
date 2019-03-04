/*
*  This JS file is used to convert String Manipulate components for JS.
*/


export const pad = (s) => { return (s < 10) ? '0' + s : s; }

/* Function for converting the string to a title case eg. Tom Jones*/
export const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

/* Change into Upper Case   */
export const psvUpperCase = (str) => {
    return str.toUpperCase();
}

/* Change into Lower Case   */
export const psvLowerCase = (str) => {
    return str.toLowerCase();
}

/* convert indicator Y to 'Yes' and N to 'No' */
export const psvConvertYNIndicator = (str) => {
  if(str === "Y") {
    return "Yes";
  }
  else if (str === "N") {
    return "No";
  }
  else {
    return '';
  }
}

/* Checks overarching rules for all the names*/
export const psvOverarchingRuleForName = (str) => {

  if(str)
  {

    if(str != 'NA' && str!= "Unknown"){
      return str.toUpperCase();
    }
    else{
      return '';
    }
  }
}


/* Phone number format (XXX) XXX-XXXX*/
export function formatPhoneNumber(s) {

  if(s.length <= 10){
    var s2 = (""+s).replace(/\D/g, '');
    var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
  }
  else{
    return s;
  }


}

/* format tax-ID to check the hypen while searching in the individual nodes*/
export function formattedTaxId(taxId,inputValue) {
  if(taxId && inputValue){
  return (
    taxId.replace(/-/g, "").includes(inputValue) ||
    taxId.includes(inputValue)
  )
  }
}
