
/**
  This JS file is used to convert Date related components for JS.
*/
const timeUtil = require('./TimeUtils.js');

export const pad = (s) => { return (s < 10) ? '0' + s : s; }



export const convertDateToMMDDYYYY = (dob) => {
  if(dob) {
    var dobDt = new Date(dob);
    var mm = dobDt.getUTCMonth() + 1;
    var dd = dobDt.getUTCDate();
    var yyyy = dobDt.getUTCFullYear();
    return(pad(mm) + '/' + pad(dd) + '/' + yyyy);
  }
  return '';
}

/*  convert date format with slash ( / )  */

export const convertDateToMMDDYYYYBlank = (date) => {
  if(date) {
    var dobDt = new Date(date);
    var mm = dobDt.getUTCMonth() + 1;
    var dd = dobDt.getUTCDate();
    var yyyy = dobDt.getUTCFullYear();
    var finalDate = pad(mm) + '/' + pad(dd) + '/' + yyyy;
    if(!finalDate.includes('9999'))
    {
       return finalDate;
    }
  }
  return '';
}

export const isActive = (startDate, endDate) => {
  var sysDate = new Date();
  var sDate = new Date(startDate);
  var eDate = new Date(endDate);

  if(sDate <= sysDate && eDate > sysDate ) {
    return true;
  }
  return false;
}

export const checkEndDate = (endDate) => {
  if(endDate) {
  var sysDate = new Date();
  var eDate = new Date(endDate);
  var highEndDate = new Date('12/31/9999')
  if(eDate >= sysDate && (highEndDate.getFullYear() == eDate.getFullYear())) {
    return '' ;
  }
  else {
    return convertDateToMMDDYYYY(eDate);
  }
}
else {
  return null;
}
}

export const isDateValid = (expirationDate) =>{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    }

    if(mm<10) {
        mm = '0'+mm
    }
    today = yyyy + '-' + mm + '-' + dd;
    if(expirationDate > today){

      return true;
    }
    else{
      return false;
    }
}

// function to export the current Date with TimeStamp

export const displayMMDDYYYYWithTimeStamp = () => {
    var dobDt = new Date();
    var mm = dobDt.getUTCMonth() + 1;
    var dd = dobDt.getUTCDate();
    var yyyy = dobDt.getUTCFullYear();
    var hh = dobDt.getHours();
    var mins = dobDt.getMinutes();
    var ss = dobDt.getSeconds();

    return(pad(mm) + '/' + pad(dd) + '/' + pad(yyyy) + '_' + pad(hh) + pad(mins) + ss);

}

// function to export the current Date with TimeStamp

export const displayMMDDYYYYWithTimeStampAndWithoutHyphens = () => {
  var dobDt = new Date();
  var mm = dobDt.getUTCMonth() + 1;
  var dd = dobDt.getUTCDate();
  var yyyy = dobDt.getUTCFullYear();
  var hh = dobDt.getHours();
  var mins = dobDt.getMinutes();
  var ss = dobDt.getSeconds();

  return(pad(mm)  + pad(dd)  + pad(yyyy) + '_' + pad(hh) + pad(mins) + ss);

}


// function to export the current Date with  Proper TimeStamp Format

export const displayMMDDYYYYWithTimeStampFormat = () => {
    var dobDt = new Date();

    var mm = dobDt.getUTCMonth() + 1;
    var dd = dobDt.getUTCDate();
    var yyyy = dobDt.getUTCFullYear();
    var hh = dobDt.getHours();
    var mins = dobDt.getMinutes();
    var ss = dobDt.getSeconds();

    return(pad(mm) + '/' + pad(dd) + '/' + pad(yyyy) + ' ' + timeUtil.getTwelveHoursFormatedTime(pad(hh) + ':' + pad(mins) + ':' + ss));

}

/* Function to convert ISO date to MMDDYYYY format*/

export const convertDateFromISO = (date, highYear) => {

  let d = date.toString().substring(0, 10);
  let formatedDate = this.convertDateToMMDDYYYY(d);

    if(!highYear || !formatedDate.includes(highYear)){
      return formatedDate
    }
    else{
      return '';
    }

};


export const processAndFormatDate = (dob) => {
  if(dob) {
    var dobDt = new Date(dob);
    var mm = dobDt.getUTCMonth() + 1;
    var dd = dobDt.getUTCDate();
    var yyyy = dobDt.getUTCFullYear();
    var strYear = yyyy.toString() ;
    var yearLength = strYear.length ;

    if(strYear.includes('9999'))
    {
       return '';
    }
    else
    {
      if(yearLength < 4)
      {
        if(yearLength == 3)
        {
          strYear = "0"+strYear;
        }
        else if(yearLength == 2)
        {
          strYear = "00"+strYear;
        }
        else if(yearLength == 1)
        {
          strYear = "000"+strYear;
        }
      }
    }
    return(pad(mm) + '/' + pad(dd) + '/' + strYear );

  }
  return '';
}
