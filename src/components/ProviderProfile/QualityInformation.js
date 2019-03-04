import React, {PropTypes, Component} from 'react';
import styles from './css/profile.css';

import Spinner from '../Spinner';
import pcCommon from '../../assets/styles/pcCommon.css';
import pcNodeContainer from '../../assets/styles/pcNodeContainer.css';
import pcNodeSections from '../../assets/styles/pcNodeSections.css';
import pcNotificationBar from '../../assets/styles/pcNotificationBar.css';
import pcGrid from '../../assets/styles/pcGrid.css';
import FA from 'react-fontawesome';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ProviderActions from '../../actions/ProviderProfileAction.js';
import pcNodeHeader from '../../assets/styles/pcNodeHeader.css';
import programData from './data/CODESET_PROGRAMS.json';
import customStyles from './css/customStyles.css';
// import update from 'react/lib/update';
import Add from './Update/Add.js';
import messages from './data/messages.json';
import NodeHeader from './NodeHeader.js';
var Helper = require('./ProfileHelper.js');
var DateUtil = require('../Utils/DateUtil.js');
const helper = require('./Update/QualityProgramHelper.js');

var moment = require('moment');


class QualityInformation extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showEdit : true,

      isEdit: false,
      isDelete: false,
      isAdd: false,
      isHistory: false,
      qpdata: null ,
      isCancel: false,
      expirationDateError: false,
      rowToUpdate: {},
      endDate: null,
      endDate_cached: {
        "index" : -1,
        "endDate" : null
      },
      ProgramsUpdateRequest: {
        "action" : 'Update',
        "providerId" : '',
        "qualityId" : '',
        "valueId" : '',
        "startDate" : null,
        "endDate" : null
      },

      cachedDates : [] ,
      dateSelectedIndex:[], dateSubmittedIndex:[] , dateIndex : '' ,
      messageId: -1,
      messageSubmitEditYes: false,
      startDate : null,
      editMessageServiceResponse: null,
      addProgramValue: null,
      activeRows: [],
      qualityProgramTabClicked: true,
      okClick: false,
      addOkClicked: false,
      addCancelYesClicked: false,
      editModeActive : false,     
      isErrorCode409: false,
      errorCode1: null, errorMessage1: null,
      isConflicting : false , conflictingProgram : null, conflictingLevel : null
    };

    this.getMessage = this.getMessage.bind(this) ;
    this.messageSubmit = this.messageSubmit.bind(this) ;
    this.handleChange = this.handleChange.bind(this) ;
    this.submitHandler = this.submitHandler.bind(this) ;
    this.fetchInactiveData = this.fetchInactiveData.bind(this) ;
    this.onButtonClick = this.onButtonClick.bind(this) ;
    this.setAddProgramFlag = this.setAddProgramFlag.bind(this);
    this.renderStyle = this.renderStyle.bind(this);
    this.processAndFormatDate = this.processAndFormatDate.bind(this);   
    
  }

  setEditModeActive = (flag) => {
    if(flag == 'false'){
      this.setState({editModeActive: false });
    }
    else{
      this.setState({editModeActive: true});
    }

  }
  refreshPage =() => {
    this.setState({ editModeActive : false });
    this.setEditModeActive(this.state.editModeActive);
    this.props.actions.fetchQualityProgramByPimsId(this.props.providerId, this.state.isHistory);
  }

  messageSubmit = (value, id) => {


    switch (value) {
      case 'yes':
        let idx = this.state.dateIndex ;
        let dateSubmittedIndex = this.state.dateSubmittedIndex ;
        let cachedDates = this.state.cachedDates ;
        let idx1 = dateSubmittedIndex.indexOf(this.state.dateIndex) ;
        dateSubmittedIndex = dateSubmittedIndex.splice(idx1, 1) ;
        cachedDates = cachedDates.splice(idx1,1);
      if(this.state.isAdd){
          this.setState({addCancelYesClicked: true});
      }else{

        this.setState({
        messageId: -1, okClick: false
        });
      }
        if(this.state.messageId !== 1){
          this.setState({
            messageId: 3, messageSubmitEditYes: true,
          });
        }else if(this.state.messageId == 1){
          if(this.state.addProgramValue != null && this.state.addProgramValue != 'Select Program' && this.state.addProgramValue != 'Clear from Add' ){

            this.setState({
                isEdit:false, messageId: -1,
                showEdit: true,
                addProgramValue: null, isAdd: false,


            });

          }else{

            this.setState({
                isEdit:false, messageId: -1, showEdit: true,
                okClick: false,
                dateSelectedIndex: [], dateSubmittedIndex: [], cachedDates: [], ProgramsUpdateRequest: []
            });
          }
        }

        if(id == 2){
          let payloadData = JSON.parse(JSON.stringify(this.state.ProgramsUpdateRequest)) ;
          this.props.actions.postQualityProgramUpdate(payloadData);
        }

        break;
      case 'no':

        if(this.state.messageId !== 1){
          this.setState({
                messageId: -1,  ProgramsUpdateRequest: [],

          });
        }else if(this.state.messageId == 1){
          this.setState({
               messageId: -1, okClick: false,
          });
        }

        //this.props.actions.postQualityProgramDataClear();


        break;
        

      case 'ok':
      
      let doNotRefresh = false ;

      if(this.state.messageId == 5){
        doNotRefresh = true;

        let idx = this.state.dateIndex ;
        let dateSubmittedIndex = this.state.dateSubmittedIndex ;
        let dateSelectedIndex = this.state.dateSelectedIndex ;
        let cachedDates = this.state.cachedDates ;
        let idx1 = dateSubmittedIndex.indexOf(this.state.dateIndex) ;


        dateSelectedIndex = dateSelectedIndex.splice(idx1,1) ;
        cachedDates = cachedDates.splice(idx1,1);
      }



        this.setState({
          messageId: -1,
             });


               if( this.state.dateSelectedIndex.length == 0
                 && !doNotRefresh
               ){

                   this.setState({

                     messageSubmitEditYes: false,
                     isAdd:false,
                     editMessageServiceResponse: null,okClick: true
                   });
                 }

                 if(this.state.dateSelectedIndex.length == 0
                   && !doNotRefresh
                 ){

                   this.onButtonClick('Cancel') ;
                   this.refreshPage();
                }
                else if(this.state.dateSelectedIndex.length != 0  && !doNotRefresh){

                  this.setState({
                    messageId: -1,
                    messageSubmitEditYes: false,
                    isAdd:false,
                    editMessageServiceResponse: null,
                    okClick: true
                    });
                }
         break;
    }
  }


  componentDidMount(props)  {

    this.props.actions.fetchQualityProgramByPimsId(this.props.providerId, false); 

    // if(this.props.serviceResponseMessage != undefined){
      //serviceResponseMessage: undefined
    // }

    let isErrorCode409 = false ;
    let errorCode1 = null ;
    let errorMessage1 = null ;

    if(this.props.serviceResponseMessage && this.props.serviceResponseMessage != undefined
      && this.props.serviceResponseMessage.data && this.props.serviceResponseMessage.data != undefined ){

        if(this.props.serviceResponseMessage.data.errorCode == 409){
          isErrorCode409 = true ;
          errorCode1 = this.props.serviceResponseMessage.data.errorCode ;
          errorMessage1 = this.props.serviceResponseMessage.data.errorMessage ;
        }else{
          isErrorCode409 = false ;
          errorCode1 = null ;
          errorMessage1 =  null ;
        }

      this.setState({
        isErrorCode409 : isErrorCode409,
        errorCode1 : errorCode1,
        errorMessage1 : errorMessage1
        });
    }

  }

  componentWillUnmount() {

    this.setState({
      messageId: -1,
      isDelete: false,
      isAdd: false,
      isEdit: false,
      isCancel: false,
      ProgramsUpdateRequest: [],
      dateSelectedIndex:[],
      dateSubmittedIndex:[],

      errorCode1 : null,
      errorMessage1 : null,
      errorType : null,

      errorCodeEdit : null,
      errorMessageEdit : null,
      errorTypeEdit : null

    });
  }

  componentWillReceiveProps(newProps)  {

    let errorCode = null ;
    let errorMessage = null ;
    let errorType = null ;


    if(newProps.serviceResponseMessage && newProps.serviceResponseMessage != null
    && this.state.errorMessage == null){

      let errorMessage = newProps.serviceResponseMessage.data
      ? newProps.serviceResponseMessage.data.errorMessage
      : null ;

      let errorCode = newProps.serviceResponseMessage.data
      ? newProps.serviceResponseMessage.data.errorCode
      : null ;

      let errorType = newProps.serviceResponseMessage.data
      ? newProps.serviceResponseMessage.data.errorType
      : null ;
    }

      this.setState({
          errorCode : errorCode,
          errorMessage : errorMessage,
          errorType : errorType
        });


    var activeRows =[];
    if(newProps && newProps.qpdata && newProps.qpdata.programDetails){
      this.setState({
        qpdata : newProps.qpdata.programDetails
    });
    if(!this.state.isHistory){
          activeRows = newProps.qpdata.programDetails ;
          this.setState({
            activeRows : activeRows
          });
          
        }
      }

    else{
      this.setState({ qpdata: [], activeRows:[] })
    }


    if((newProps.qualityProgSubmitInfoEdit && newProps.qualityProgSubmitInfoEdit != null)
    && this.state.editMessageServiceResponse == null){

      let resMsg =newProps.qualityProgSubmitInfoEdit.data ? newProps.qualityProgSubmitInfoEdit.data.errorMessage : null;

      this.setState({
        editMessageServiceResponse: resMsg
      })
    }




  }

  handleChange = (event, i) => {

    let dateSelectedIndex = this.state.dateSelectedIndex ;
    let cachedDates = this.state.cachedDates ;

    let cachedDate = [];
    let dups = false ;
    let disableSubmit = false;

   let idx11 ;
    if(event.target.value != '' && event.target.value != null){

      this.setState({
        endDate: event.target.value, ProgramsUpdateRequest: [], endDateSelected: true
      });


      cachedDate = { index: i, endDate: event.target.value}

      for(var j = 0; j < cachedDates.length; j++){
          if( (event.target.value != null || event.target.value != '' )
              && cachedDates[j].index == i){
                cachedDates[j].endDate = event.target.value ;
                idx11 = cachedDates[j].index ;
          dups = true ;
        }
      }


      if(idx11 != undefined && !dateSelectedIndex.contains(idx11)){
        dateSelectedIndex.push(idx11) ;
      }

      if(!dups){
        cachedDates.push(cachedDate) ;
        dateSelectedIndex.push(cachedDate.index) ;
      }
    }

    let idx = dateSelectedIndex.indexOf(i) ;

    let editModeActive = null ;

      if( (event.target.value == '' || event.target.value == null )
        && dateSelectedIndex.contains(i) ){
        
        disableSubmit = true ;
        cachedDates.splice(idx,1);
        dateSelectedIndex.splice(idx,1);
      }
      else{
        editModeActive = true ;
      }

      this.setState({
        cachedDates: cachedDates, dateSelectedIndex : dateSelectedIndex
        , editModeActive: editModeActive
      });

    }

  processAndFormatDate = (dob) => {

  let pad = (s) => { return (s < 10) ? '0' + s : s; }


  if(dob) {
    var dobDt = new Date(dob);
    var mm = dobDt.getUTCMonth() + 1;
    var dd = dobDt.getUTCDate();
    var yyyy = dobDt.getUTCFullYear();
    var strYear = yyyy.toString() ;
    var yearLength = strYear.length ;
 
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
    
    return(pad(mm) + '/' + pad(dd) + '/' + strYear );

    }
    return '';
  }


  submitHandler = (event, i) => {

    let qpdata = this.state.activeRows ;
    let sDate = null;
    let eDate = null;

    event.preventDefault();

    let ProgramsUpdateRequest =     {
      action : 'Update',
      providerId : null,
      qualityId : null,
      // valueId : null,
      // startDate : null,
      endDate : null
    }
    let rowToUpdate = qpdata[i] ;
    let cachedDates = this.state.cachedDates ;
    let endDate = null;

     let idx ;

    for(var j = 0; j < cachedDates.length; j++){
       idx = cachedDates[j].index;

       if(idx == i){
      endDate = cachedDates[j].endDate ;
        eDate = endDate ? endDate : null ;
    }
     }

    rowToUpdate.endDate = cachedDates.length >0 ? cachedDates.endDate : null ;
    ProgramsUpdateRequest.providerId = rowToUpdate.providerId ? rowToUpdate.providerId : null ;
    ProgramsUpdateRequest.qualityId = rowToUpdate.qualityId ? rowToUpdate.qualityId : null;
    // ProgramsUpdateRequest.valueId = rowToUpdate.valueId ? rowToUpdate.valueId : null ;
    // ProgramsUpdateRequest.startDate = rowToUpdate.startDate ? rowToUpdate.startDate : null;
    ProgramsUpdateRequest.endDate = endDate ;

     sDate = rowToUpdate.startDate ? rowToUpdate.startDate : null;
    qpdata[i] = rowToUpdate ;
    let dateSelectedIndex = this.state.dateSelectedIndex ;

    const momentSDate = moment(sDate);
    const momentEDate = moment(eDate);
    const diff = momentEDate.diff(momentSDate);

    if(diff > 0 || diff == 0){
      this.setState({
          rowToUpdate: rowToUpdate, ProgramsUpdateRequest: ProgramsUpdateRequest, messageId:2,
          dateSelectedIndex : dateSelectedIndex, dateSubmittedIndex : dateSelectedIndex, dateIndex : i,
          endDateSelected: false
      });
      this.props.setEditModeActive(true);
    }else{
  
      this.setState({ messageId: 5, dateSelectedIndex : dateSelectedIndex, dateSubmittedIndex : dateSelectedIndex, dateIndex : i,  });
    }

    if(this.state.dateSelectedIndex.length == 0){
      this.setState({ editModeActive : false  });
    }
  }

  fetchInactiveData(){
    let pimsId = this.props.providerId ;
    let flag = !this.state.isHistory;

    this.props.actions.fetchQualityProgramByPimsId(pimsId, flag);
    this.setState({
      isHistory: flag
       });
  }

  validProgram(provType, program) {
    if(program.programUsage == 'Both' || program.programUsage == provType) {
      return true;
    }else{
      return false;
    }

  }

  getPrograms(codeSet,provType){
    var programs = [];
    var i ;
    for ( i = 0; i < codeSet.length; i++) {
      if(codeSet[i] !== null && this.validProgram(provType, codeSet[i])) {
        if (programs.indexOf(codeSet[i].programName) === -1) {
          programs.push(codeSet[i].programName);
        }
      }
    }
    return programs;
  };

  getProgramLavels(programList, pgmName, provType){
    var programLevels = [];
    var i ;
    for (i = 0; i < programList.length; i++) {
      if(programList[i] !== null && programList[i].programName == pgmName && this.validProgram(provType, programList[i])) {
        programLevels.push(programList[i]);
      }
    }
    return programLevels;
  }

 setAddProgramFlag = (value) => {


     if(value != undefined && value != ''){
        this.setState({
          addProgramValue : value
        });
      }
      else{
        this.setState({ addProgramValue : '' });
      }
 }

 setAddOkClicked = (flag) => {
   if( flag == true || flag == false){
     this.setState({ addOkClicked : flag});
   }
 }

  onButtonClick = (value) => {

    switch (value) {
      case 'Edit':
      this.setState({
      addOkClicked: false,
      messageId: -1,
      isEdit: true,
      isAdd: false,
      showHistory: false, dateSelectedIndex:[], dateSubmittedIndex:[],
      okClick: false
    });

    break;
        case 'Add':
        this.setState({
        addOkClicked: false,
        messageId: -1,
        isAdd: true,
        isEdit: false,
        isCancel: false, dateSelectedIndex:[], dateSubmittedIndex:[]
      });


      break;
        case 'Cancel':

        if(this.state.addCancelYesClicked){
          this.setState({ addCancelYesClicked : false });
        }

        if(this.state.dateSelectedIndex.length != 0 && this.state.addProgramValue == 'Clear from Add' ){
          this.setState({
              messageId: 1
          });
          break;
        }

        if(this.state.addProgramValue == 'Clear from Add'){
          this.setState({
            addOkClicked: true,
            isEdit: false,
            isAdd: false
          });
          break;

        }


        if(
            (this.state.addProgramValue != null && this.state.addProgramValue != 'Select Program' && this.state.addProgramValue != 'Clear from Add'
            && this.state.messageId != 5 && this.state.dateSelectedIndex.length == 0)
        ){
        this.setState({
            messageId: 1, addOkClicked: false
        });

        }
        else if(this.state.dateSelectedIndex != undefined && this.state.dateSelectedIndex.length != 0
            && this.state.messageId != 5          
           ){

            this.setState({
            messageId: 1, addOkClicked: false
            });
          }else if(
            (this.state.dateSelectedIndex == undefined || this.state.dateSelectedIndex.length == 0) 
            ){

            this.setState({
            messageId: -1,
            isEdit: false,
            showEdit : true,
            isAdd: false,
            isCancel: false,
            ProgramsUpdateRequest: [],
            dateSelectedIndex:[], dateSubmittedIndex:[],cachedDates:[], addOkClicked: false
            });
          }
          else {

            this.setState({ messageId: -1, addOkClicked: false });
          }



      break;
    }

  }

  getMessage = (id) => {
    if(id <7 && id != -1){

      var message = messages[id].Message ;

       return (
      <tr>
        <td key={id}   colSpan="6">
        <div className={pcNotificationBar.nodeNotificationBar + ' ' + pcNotificationBar.alert}>
        <div className={pcNotificationBar.container }>

        <div>

        <main>
        <p className={pcCommon.alignLeft}>{message}</p>
        <div className={pcNotificationBar.actionComponent + ' ' + pcCommon.alignRight}>

        <ul>
        {! this.state.messageSubmitEditYes && this.state.messageId != 5 ?
        <li><button className={pcCommon.success + ' ' + pcCommon.solid + ' ' + pcCommon.btn}
          onClick={() => {
            this.messageSubmit('yes', id)
          }}
        > Yes</button></li> : ''}
        {! this.state.messageSubmitEditYes && this.state.messageId != 5 ?
        <li><button className={pcCommon.failure + ' ' + pcCommon.solid + ' ' + pcCommon.btn}
          onClick={() => {
            this.messageSubmit('no')
          }}
        > No</button></li> : ''}
        { this.state.messageSubmitEditYes || this.state.messageId == 5 ?
        <li><button className={pcCommon.failure + ' ' + pcCommon.solid + ' ' + pcCommon.btn}
          onClick={() => {
            this.messageSubmit('ok')
          }}
        > Ok</button></li> : ''}
        </ul>

        </div>
        </main>

        </div>
        </div>
        </div>
        </td>
      </tr>
      );
    }
  }

  resetErrorCode409 = (value) => {
    if(value == 'false'){
      this.setState({
        isErrorCode409 : false
      });
    }
    else if(value == 'true'){
      this.setState({
        isErrorCode409 : true
      });
    }
    else {
      this.setState({
        isErrorCode409 : null
      });
    }
  }

  renderStyle(){
    if(this.state.messageId != -1){
      this.props.renderStyle(customStyles.disableContainer);
      return customStyles.disableContainer
    }
    else {
      this.props.renderStyle("");
      return ""
    }
  }

  
  render() {

    let pad = (s) => { return (s < 10) ? '0' + s : s; }
    let qpdata = this.state.qpdata ;
    let data = this.props.data;

    if(qpdata == null)
    {
      return(
        <div className = {styles.paneContent}>  <Spinner /> </div>
      )
    }

    var rowToUpdate = qpdata[0];
    var provType = this.props.category;
    var pgmName = null;
    var programName = this.getPrograms(programData,provType) ;
    var programList = this.getProgramLavels(programData,pgmName,provType) ;


    if(!this.state.isAdd) {
      var disableContainer = this.renderStyle();
    }
    return (
      <div>

        <div className={pcNodeContainer.bodyContainer}>

        <NodeHeader providerType={data.providerDetailTypeName}
        isHistory = {this.state.isHistory}
        onHistoryButtonClick={this.onHistoryButtonClick}
        showHistory = {this.props.showHistory}
        fetchInactiveData = {this.fetchInactiveData}
        onButtonClick = {this.onButtonClick}
        isEdit = {this.state.isEdit}
        isAdd={this.state.isAdd}
        isCancel = {this.state.isCancel}
        dateSelectedIndex = {this.state.dateSelectedIndex}
        endDate = {this.state.endDate}
        showEdit = {this.state.showEdit}
        category = {this.props.category}
        cachedDates = {this.state.cachedDates}
        flag = {this.state.isHistory}
        messageId = {this.state.messageId}
        okClick= {this.state.okClick}
        addProgramValueFlag = {(this.state.addProgramValue != 'Select Program' || this.state.addProgramValue == 'Clear from Add')}
        disableUpdateButton={this.props.disableUpdateButton}
        addCancelYesClicked={this.state.addCancelYesClicked}
        addProgramValue = {this.state.addProgramValue}
        addOkClicked = {this.state.addOkClicked}
        editModeActive = {this.state.editModeActive}
        setEditModeActive = {this.setEditModeActive}
         editModeActive = {this.state.editModeActive}
         containerStyle  = {this.props.containerStyle}    

        />

          <div className={pcNodeContainer.nodeContentContainer + ' ' + pcNodeContainer.generalProfile+ ' ' + pcGrid.generalProfile}>

            <section
              className={pcNodeSections.sections + ' ' +
              pcNodeSections.generalProfile + ' ' +
              pcGrid.generalProfile + ' ' +
              pcNodeSections.freeFlow + ' ' +
              pcCommon.noShad }>


              <div className={pcGrid.gridContainer + ' ' + pcNodeSections.nodeBody
              + ' ' + pcGrid.hasInteraction + ' ' + pcCommon.noMarg + ' ' + pcGrid.generalProfile }>

                <table width="100%" cellPadding="0" cellSpacing="0" className={customStyles.qualityInfoTable}>
                  <tbody>
                  <tr className={pcGrid.core + ' ' + pcGrid.expanded + ' ' + disableContainer}>
                    <td>
                      <div className={pcGrid.accordionBar + ' '+customStyles.disablePointer}>
                        <div className={pcCommon.alignLeft + ' ' + pcGrid.info}>
                          <div className={pcCommon.value}>Quality Program Information</div>
                        </div>
                      </div>
                    </td>
                    </tr>

                  <tr className={pcGrid.level }>
                    <td width="100%">
                      <div className={pcGrid.levelContainer}>
                        <content>


                          <div className={pcGrid.freezedHeader}>
                            <table id="qualityProgramTable" cellPadding="0" cellSpacing="0" width="100%">
                             { this.getMessage(this.state.messageId) }
                              <thead>
                              <tr id="rowHeaderRecord">
                                <th className={pcNodeHeader.hide} ></th>
                                <th width="22%">Program Name</th>
                                <th width="24%">Program Level</th>
                                <th width="14%">Value</th>
                                <th width="17%">Start Date</th>
                                <th width="15%">End Date</th>
                                <th width="10%">

                                </th>
                              </tr>
                              </thead>
                            </table>
                          </div>


                          <div className={pcGrid.scrollableGrid+' '+ customStyles.noPadding}>

                            <table>

                              { qpdata.length == 0 ?
                                <tbody>
                                <tr id="rowNoRecord">
                                  <td colSpan="6" className={pcGrid.alert}>
                                    <div className={pcNotificationBar.notificationBar + ' ' + pcNotificationBar.alert + ' ' + pcNotificationBar.noBg}>
                                      <div className={pcNotificationBar.container}>
                                        <FA name="exclamation-triangle"/> <span>No Record Found</span>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                                </tbody>
                                : null }

                              {
                                (
                                  ( (!this.state.isEdit && !this.state.isAdd) && qpdata)
                                    ? qpdata.map((item, index) => {
                                    return (
                                      <tbody key={index} className={disableContainer}>
                                      <tr  >
                                        <td className={pcNodeHeader.hide}></td>
                                        <td width="22%">{item.programName}</td>
                                        <td width="24%">{(item.levelName ? item.levelName : '')}</td>
                                        <td width="14%">{(item.valueName ? item.valueName : '')}</td>
                                        <td width="17%">{this.processAndFormatDate(item.startDate)}</td>
                                        <td width="15%">{DateUtil.processAndFormatDate(item.endDate)}</td>
                                        <td width="10%"></td>
                                      </tr>
                                      </tbody>
                                    )
                                  }) :

                                  ( ( this.state.isEdit && !this.state.isAdd ) || this.state.isCancel ) 
                                  && this.state.activeRows
                                                      ?
                                  this.state.activeRows.map((item, index) => {
                                        return (
                                          <tbody key={index} >

                                          <tr  className={disableContainer} >
                                            <td className={pcNodeHeader.hide}></td>
                                            <td width="22%">{item.programName}</td>
                                            <td width="24%">{(item.levelName ? item.levelName : '')}</td>
                                            <td width="14%">{(item.valueName ? item.valueName : '')}</td>
                                            <td width="17%"> {this.processAndFormatDate(item.startDate) }<FA name="calendar-alt"/>
                                            </td>
                                            <td width="15%">


                                                  <input type='date'
                                                     className={this.state.expirationDateError ? customStyles.customDatePicker
                                                     +' '+customStyles.expirationDateError : customStyles.customDatePicker +' '+customStyles.dropDownDate}
                                                     onChange={(event) => this.handleChange(event,index) }
                          							             // required ={true}
                                                     value = {item.endDate != '9999-12-31'
                                                     && !(this.state.dateSelectedIndex.contains(index))
                                                       ?  item.endDate : null
                                                     }
                                                     min={'1899-01-01'} max={'9999-12-31'}
                                              />
                                            </td>
                                            <td width="10%">
                                              <div className={pcNodeHeader.component + ' ' + pcCommon.alignLeft}>
                                                <ul><li><button id="submitUpdate"
                                                                className={(this.state.dateSelectedIndex.contains(index))
                                                                  ? pcNodeHeader.submitBtn : pcCommon.disableBtn}
                                                                onClick={(event) => this.submitHandler(event,index) } >Submit
                                                </button></li></ul>
                                              </div>
                                            </td>
                                          </tr>

                                          </tbody>
                                        )
                                      })

                                      // <Edit
                                      // qpdata={qpdata}
                                      //onButtonClick = {this.onButtonClick} isEdit = {this.state.isEdit} isDelete = {this.state.isDelete} isAdd = {this.state.isAdd}
                                      //isCancel = {this.state.isCancel}
                                      // />
                                      :

                                      ( this.state.isAdd && qpdata)
                                        ?
                                        <Add
                                          programName = {programName}
                                          provData={data}
                                          qpdata = {this.state.activeRows ?  this.state.activeRows : null}
                                          onButtonClick = {this.onButtonClick}
                                          isEdit = {this.state.isEdit} isAdd = {this.state.isAdd} isCancel = {this.state.isCancel}
                                          isHistory = {this.state.isHistory}
                                          providerId = {this.props.providerId}
                                          postQualityProgramAdd = {this.props.actions.postQualityProgramAdd}
                                          fetchProgramCodesets={this.props.actions.fetchProgramCodesets}
                                          codeSets={this.props.codeSets}
                                          actions={this.props.actions}
                                          setAddProgramFlag = {this.setAddProgramFlag}
                                          renderStyle = {this.props.renderStyle}
                                          addOkClicked = {this.state.addOkClicked}
                                          setAddOkClicked = {this.setAddOkClicked}
                                          setAddModeActive = {this.props.setAddModeActive}
                                          processAndFormatDate = {this.processAndFormatDate}
                                        />
                                        :
                                        // noRecords()
                                        <tbody>
                                        <tr id="rowNoRecord">
                                          <td colSpan="6" className={pcGrid.alert}>
                                            <div className={pcNotificationBar.notificationBar + ' ' + pcNotificationBar.alert + ' ' + pcNotificationBar.noBg}>
                                              <div className={pcNotificationBar.container}>
                                                <FA name="exclamation-triangle"/> <span>No Record Found</span>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                        </tbody>
                                )
                              }

                            </table>
                          </div>
                        </content>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  </table>
              </div>
            </section>
          </div>
        </div>
      </div>
    )
  }
}



export default QualityInformation;
