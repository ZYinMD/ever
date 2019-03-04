const FileSaver = require('file-saver');
// const ExportSummaryHelper = require('../../PcpMemberRoster/Helpers/ExportSummaryHelper');

export const generateFile = (blobData, userInfo) => {

  let file = generateFileFromBlob(blobData);
  let fileName = getFileName(userInfo);

  if(file != null){
    saveFile(file , fileName);
  }

};

const generateFileFromBlob = (blobData) => {


  if (blobData) {

    if (Object.keys(blobData).length > 0) {
      let file = new Blob([blobData.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      })

      return file;
    }
  }

  return null;

};

const saveFile = (file, fileName) => {

  if (file && file.size > 200) {
    FileSaver.saveAs(file, fileName)
  }
};

const getFileName = (userInfo) => {


  let fileName = 'Download';

  if (userInfo && typeof userInfo == 'string'){
    fileName = userInfo;
  }
  else if(userInfo && typeof userInfo == 'object'){
    // let name = ExportSummaryHelper.GetProviderNameTimeStamp(userInfo, 'Group');
    // fileName = `${name}.xlsx`;
  }

  return fileName;

};
