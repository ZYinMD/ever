
import _ from 'lodash'
// fetchInactiveData(){
export const fetchInactiveData = (pimsId, isHistory) => {
 this.setState({
       isHistory: isHistory
     })
 this.props.actions.fetchQualityProgramByPimsId(pimsId, isHistory);
}


export const getProvType = (providerDetailTypeName) => {
var provType = 'Practitioner';
if((providerDetailTypeName === "Supplier Individual" ||  providerDetailTypeName === "Professional") && providerDetailTypeName != undefined){
  provType = 'Practitioner';
}else {
  provType = 'Provider';
}
return provType ;
}

//Helper Method
export const validProgram = (provType, program, incatives) => {

   if(incatives.includes(program.programId)) {
      return false;
   } else  {
     if(program.programUsage == 'Both' || program.programUsage == provType) {
       return true;
     }else{
       return false;
     }
   }
 }

//Helper Method
export const getPrograms = (codeSet,provType) => {
   var programs = [];
  // var incativePrograms = [47, 49, 54, 55, 43, 46, 51];
   var incativePrograms = [65];  
   var programsSorted = ['Select Program'];
//   programs.push('Select Program');
   var i ;

    for ( i = 0; i < codeSet.length; i++) {
      if(codeSet[i] !== null
        && validProgram(provType, codeSet[i], incativePrograms)) {
        if (programs.indexOf(codeSet[i].programName) === -1) {
            programs.push(codeSet[i].programName);
        }
      }
    }

    var sortedList = _.orderBy(programs,[data => data.toLowerCase()], function(item){
      // return data
    }, 'asc');

    var res = programsSorted.concat(sortedList);

    return res;
  };

//Helper Method
export const getProgramLavels = (programList, pgmName) => {
   var programLevels = [];
   var formatedPgmName = getStringWithoutSpace(pgmName);
   var sortedProgramLevels = [{
                           programId : "0000",
                           programLevel : "Select Level",
                           programLevelId : "",
                           programLevelValue : "Select Value",
                           programLevelValueId : "",
                           programName :  "Select Program",
                           programUsage : ""
                         }];
   var i ;
    for (i = 0; i < programList.length ; i++) {
      if(programList[i] !== null
      &&  !programLevels.includes(programList[i])
      && getStringWithoutSpace(programList[i].programName) == formatedPgmName )
      {
        programLevels.push(programList[i]);
      }
    }

    var sortedList = sortByProgramLevel(programLevels, 'programLevel');
    var finalList = sortedProgramLevels.concat(sortedList);
    return finalList;
  }

//Helper Method
export const getProgramLavelValues = (programLevelList, pgmLevelName) => {

  let programValuesWithIds = [] ;
	var programLevelValues = [];
  var i ;
  var formatedLevelName = getStringWithoutSpace(pgmLevelName);

  for (i = 0; i < programLevelList.length; i++) {
    if(programLevelList[i] !== null
     && programLevelList.length > 0
     && !programLevelValues.includes(programLevelList[i].programLevelValue)
     && getStringWithoutSpace(programLevelList[i].programLevel) == formatedLevelName )
     {
      programLevelValues.push(programLevelList[i].programLevelValue);

      var programValuesWithId = { programLevelValueId: programLevelList[i].programLevelValueId,
       programLevelValue: programLevelList[i].programLevelValue } ;
       programValuesWithIds.push(programValuesWithId);
    }
  }

  var sortedList = sortByProgramLevel(programValuesWithIds, 'programLevelValue');
  return sortedList;

};

//Helper Method - Pass programList from the function call
export const filterList = (listValue) => {
    var levelData = [] ;
    var x;
    for(x in listValue){
        if(
          // listValue[x].programLevel != "" &&
          listValue[x].programLevel != undefined
        &&  !levelData.includes(listValue[x].programLevel)) {
      levelData.push(listValue[x].programLevel);
     }
    }
    return levelData;
}

//Helper Method - Pass programListValue from the function call
export const filterValue = (Value) => {
    var valueData = [] ;
    var x;
    for(x in Value){
        if(Value[x].programLevelValue != "" &&  Value[x].programLevelValue != undefined
        &&  !valueData.includes(Value[x].programLevelValue)) {
      valueData.push(Value[x].programLevelValue);
     }
    }

    return valueData;
}

//Helper Method - To sort program names alphabetically

export const sortByProgram = (data) =>{

  if(data){

    if(data.programDetails){

      let sortedList = _.orderBy(data.programDetails,[data => data.programName.toLowerCase()], function(item){
        return item.programName
      }, 'asc');

      data.programDetails = sortedList;
    }

    return data

  }

};

const sortByProgramLevel = (data, id) =>{

  if(data){

      let sortedList = _.orderBy(data,[data => data[id].toLowerCase()], function(item){
        return item[id]
      }, 'asc');

    return sortedList

  }

};

export const getStringWithoutSpace = (data) =>{

  var str = '';

  if(data){
    str = data;
    var result = str.replace(/\s/g, '');
    return result.toLowerCase();
  }

  return str;

};
