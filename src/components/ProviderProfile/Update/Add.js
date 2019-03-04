import React, { PropTypes, Component } from 'react';
import FA from 'react-fontawesome';
import pcCommon from '../../../assets/styles/pcCommon.css';
import pcNodeHeader from '../../../assets/styles/pcNodeHeader.css';
import pcNodeContainer from '../../../assets/styles/pcNodeContainer.css';
import pcNodeSections from '../../../assets/styles/pcNodeSections.css';
import pcNotificationBar from '../../../assets/styles/pcNotificationBar.css';
import pcGrid from '../../../assets/styles/pcGrid.css';
import messages from '../data/messages.json';
import customStyles from '../css/customStyles.css';
import $ from 'jquery'
import _ from 'lodash'
var moment = require('moment');
const helper = require('../Update/QualityProgramHelper.js');
var DateUtil = require('../../Utils/DateUtil.js');


export default class Add extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

      programList: [],
      programListValue: [],
      enableSubmitButton: false, enableSubmitButtonStartDateSelected: false,
      hideDate: true, hideLevel: true, hideValue: true,
      valueIdArr: [],
      isDuplicateRecord: false,
      ProgramsAddRequest: [],
      messageId: -1,
      startDate: null,
      endDate: null,
      programList1: '',
      program: '', level: '',
      programDDError: false,
      levelDDError: false,
      valueDDError: false,
      effectiveDateError: false,
      expirationDateError: false,
      programData: [],
      addMessageServiceResponse: null,
      conflictMessage: null,
      resetLevelValues: false,
      addModeActive: false,
      isErrorCode409: null,
      duplicateProgram: null,
      duplicateLevel: null,
      duplicateValue: null,
      isConflicting: false,
      isDuplicate: false,
      duplicateMessage: null,
      addOkClicked: false,
      diff: null

    }

    this.conflictCheck = this.conflictCheck.bind(this);
    this.duplicateCheck = this.duplicateCheck.bind(this);
    this.messageSubmitEdit = this.messageSubmitEdit.bind(this);
    this.getMessage = this.getMessage.bind(this);
    this.handleProgramDDChange = this.handleProgramDDChange.bind(this);
    this.handleLevelDDChange = this.handleLevelDDChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleExpirationDateChange = this.handleExpirationDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValueDDChange = this.handleValueDDChange.bind(this);
    this.renderStyle = this.renderStyle.bind(this);
    this.debounceDelayExcelDownload = _.debounce(this.debounceDelayExcelDownload, 100);

  }


  debounceDelayExcelDownload = () => {
    this.props.onButtonClick('Cancel');
    this.refreshPage();
  }

  isValid() {
    if (this.state.effectiveDateError || this.state.expirationDateError) {
      return false;
    }
    if (!this.state.isDuplicateRecord) { return true; }
    else { return false; }
  }

  messageSubmitEdit = (event, value, id) => {
    event.preventDefault();


    switch (value) {
      case 'yes':

        if (this.state.messageId != 1) {
          this.setState({
            messageId: 3, messageSubmitEditYes: true, errorMessage: null, endDate: null
          });

          if (this.isValid && id == 2) {

            let payloadData = this.state.ProgramsAddRequest;
            for (var i = 0; i < payloadData.length; i++) {
              this.props.postQualityProgramAdd(payloadData[i]);
            }
            this.setState({
              messageId: 3, ProgramsAddRequest: []
            });
          }
          else {
            this.setState({ messageId: 4 });
          }
        }
        else if (this.state.messageId == 1) {

          this.setState({
            program: null,
            programList: null,
            startDate: null, endDate: null,
            programListValue: [], enableSubmitButton: false,
            enableSubmitButtonStartDateSelected: false,
            hideDate: false,
            hideLevel: false, hideValue: false,
            programList1: null,
            ProgramsAddRequest: [], isDuplicateRecord: false, dateSelectedIndex: [],
            messageId: -1,
            messageSubmitEditYes: false,
          });

          this.props.onButtonClick('Cancel');
        }


        break;
      case 'no':
        this.setState({
          messageId: -1, dateSelectedIndex: [], ProgramsUpdateRequest: []
        });

        this.props.actions.postQualityProgramAddDataClear();

        break;

      case 'ok':

        if (
          (this.state.diff < 0) || (this.state.isConflicting) || (this.state.isDuplicate)
        ) {


          this.setState({
            messageId: -1, messageSubmitEditYes: false,
            diff: null, isConflicting: false, isDuplicate: false
          });
          this.props.setAddProgramFlag(this.state.program);


        }
        else {


          if (this.state.messageId != 5
            && (this.state.isErrorCode409 == null)) {

            this.setState({
              messageId: -1, messageSubmitEditYes: false
            });

            this.props.setAddProgramFlag('Clear from Add');


            this.debounceDelayExcelDownload();

            this.props.actions.postQualityProgramAddDataClear();
            this.setState({
              messageId: -1, messageSubmitEditYes: false, addOkClicked: true, addModeActive: false
            });

            if (this.state.ProgramsAddRequest.length == 0) {

              this.props.setAddOkClicked(true);
            }
            this.refreshPage();
          }

          else {
            this.setState({
              messageId: -1, messageSubmitEditYes: false, addModeActive: false
            });
          }

        }


    }
  }

  refreshPage = () => {
    this.setState({ addModeActive: false });
    this.props.setAddModeActive(this.state.addModeActive);
    this.props.actions.fetchQualityProgramByPimsId(this.props.providerId, this.props.isHistory);
  }

  getMessage = (id) => {

    if (id < 7 && id != -1 && id != undefined) {
      var message;
      message = messages[id].Message;
      return (
        <tr>
          <td key={id} colSpan="6">
            <div className={pcNotificationBar.nodeNotificationBar + ' ' + pcNotificationBar.alert}>
              <div className={pcNotificationBar.container}>

                <div>

                  <main>
                    <p className={pcCommon.alignLeft}>{message}</p>
                    <div className={pcNotificationBar.actionComponent + ' ' + pcCommon.alignRight}>

                      <ul>
                        {

                          (!this.state.messageSubmitEditYes && !this.state.expirationDateError)
                            && this.state.messageId != 5
                            && !this.state.isDuplicate && !this.state.isConflicting
                            ?
                            <li><button className={pcCommon.success + ' ' + pcCommon.solid + ' ' + pcCommon.btn}
                              onClick={(event) => this.messageSubmitEdit(event, 'yes', id)}
                            > Yes</button></li> : ''}
                        {

                          (!this.state.messageSubmitEditYes && !this.state.expirationDateError)
                            && this.state.messageId != 5
                            && !this.state.isDuplicate && !this.state.isConflicting
                            ?
                            <li><button className={pcCommon.failure + ' ' + pcCommon.solid + ' ' + pcCommon.btn}
                              onClick={(event) => this.messageSubmitEdit(event, 'no')}
                            > No</button></li> : ''}
                        {

                          (this.state.messageSubmitEditYes
                            || (this.state.isDuplicate || this.state.isConflicting)
                            || this.state.expirationDateError)
                            || this.state.messageId == 5 ?
                            <li><button className={pcCommon.failure + ' ' + pcCommon.solid + ' ' + pcCommon.btn}
                              onClick={(event) => this.messageSubmitEdit(event, 'ok')}
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

  componentDidMount() {
    this.props.fetchProgramCodesets();
    this.setState({ messageId: -1 });
    document.getElementById("expirationDate").disabled = true;
    document.getElementById("effectiveDate").disabled = true;
    if (this.props.isErrorCode409 == true) {
      this.setState({
        isErrorCode409: true
      });
    }
    else if (this.props.isErrorCode409 == false) {
      this.setState({
        isErrorCode409: false
      });
    }
    else {
      this.setState({
        isErrorCode409: null
      });
    }
  }

  componentWillUnmount() {
    this.setState({
      messageId: -1,
      addModeActive: false,
    });
  }

  componentWillReceiveProps(newProps) {

    if (newProps.codeSets && this.state.programData.length == 0) {
      this.setState({
        programData: newProps.codeSets
      })
    }

  }

  resetStates() {
    this.setState({
      programList: [],
      programListValue: [],
    });

  }


  conflictCheck = (programName, levelName) => {

    let data = this.props.qpdata;
    let program = helper.getStringWithoutSpace(programName);
    let level = helper.getStringWithoutSpace(levelName);

    let count = 0;
    let isConflicting = false;
    let conflictingProgram = ' ';
    let conflictingLevel = ' ';
    let conflictingPrograms = [
      "accountablecareorganization",
      "comprehensiveprimarycareprogram",
      "comprehensiveprimarycareprogramtrack1",
      "comprehensiveprimarycareprogramtrack2",
      "patientcenteredmedicalhome",
      "patientcenteredmedicalhometrack1",
      "patientcenteredmedicalhometrack2"
    ];

    if (conflictingPrograms.contains(program)) {
      for (var j = 0; j < data.length; j++) {

        let pName = data[j].programName;

        if (helper.getStringWithoutSpace(pName) == program) {

          let lName = data[j].levelName;

          if (helper.getStringWithoutSpace(lName) == level) {
            isConflicting = false;
            break;
          }
          else {
            isConflicting = true;
            break;
          }

        }

        if (conflictingPrograms.contains(helper.getStringWithoutSpace(data[j].programName))) {
          isConflicting = true;
          conflictingProgram = data[j].programName;
          conflictingLevel = data[j].levelName;
        }
      }
    }


    this.setState({
      isConflicting: isConflicting, conflictingProgram: conflictingProgram, conflictingLevel: conflictingLevel
    });

  }



  duplicateCheck = (program, level, valueId) => {
    let data = this.props.qpdata;

    let count = 0;
    let isDuplicate = false;

    let programs = data.programName;
    let levels = data.levelName;
    let valueIds = data.valueId;
    let duplicatePrograms = data.programName;
    let duplicateLevels = data.levelName;
    let duplicateValues = data.valueName;

    let duplicateProgram = null;
    let duplicateLevel = null;
    let duplicateValue = null;

    for (var j = 0; j < data.length; j++) {

      if (data[j].programName == program
        && data[j].levelName == level
        && data[j].valueId == valueId
      ) {
        if (data[j].valueId == valueId) {
          isDuplicate = true;
        }

        duplicateProgram = data[j].programName;
        duplicateLevel = data[j].levelName;
        duplicateValue = data[j].valueName;


        if (isDuplicate) {
          count = count + 1;
          this.setState({ isDuplicate: isDuplicate });
        }

      }

    }

    this.setState({
      duplicateProgram: duplicateProgram, duplicateLevel: duplicateLevel, duplicateValue: duplicateValue
    });

  }

  setExpirationDateVariable(propertyTextToAdd) {
    this.setState({
      expirationDate: propertyTextToAdd
    });
  }

  handleStartDateChange(event) {

    let enableSubmitButtonStartDateSelected1 = false;
    let startDate = null;

    if (event.target.value != '' && this.state.valueIdArr.length != 0 && event.target.value != null) {

      startDate = event.target.value;
      enableSubmitButtonStartDateSelected1 = true;
    }
    else {
      enableSubmitButtonStartDateSelected1 = false;
      startDate = null;
    }


    this.setState({
      startDate: startDate, messageId: -1,
      enableSubmitButtonStartDateSelected: enableSubmitButtonStartDateSelected1
    });
  }

  handleExpirationDateChange(event) {

    if (event.target.value != '') {
      this.setState({ endDate: event.target.value });
    }
    else {
      this.setState({ endDate: null });
    }

  }

  handleProgramDDChange(event) {

    this.props.setAddProgramFlag(event.target.value);
    document.getElementById("expirationDate").disabled = true;
    document.getElementById("effectiveDate").disabled = true;
    $("input[type=date]").val("");

    if (event && event.target && event.target.value) {

      var programList = helper.getProgramLavels(this.state.programData, event.target.value);

      this.setState({
        program: event.target.value,
        programList: programList,
        startDate: null, endDate: null,
        programListValue: [], enableSubmitButton: false,
        enableSubmitButtonStartDateSelected: false,
        hideDate: true,
        hideLevel: false, hideValue: true,
        programList1: '',
        addModeActive: true,
      });

    }

    if (event.target.value === 'Select Program') {
      this.setState({
        hideLevel: true,
        programList: [],
        programListValue: [],
      });
    }

  }

  handleValueDDChange(event, id) {
    this.setState({
      resetLevelValues: false,
      startDate: null, endDate: null,
    });


    let valueIdArr = this.state.valueIdArr;

    if (event.target.value != '') {
      var valueId = parseInt(event.target.value);
      var dups = false;
      for (var i = 0; i < valueIdArr.length; i++) {
        if (valueIdArr[i] == id) {
          valueIdArr[i] = id;
          dups = true;
        }
      }
      if (event.target.checked) {
        valueIdArr.push(parseInt(id));
      }
      else {
        let idx = valueIdArr.indexOf(id);
        let arr = valueIdArr.splice(idx, 1);

        this.setState({
          valueIdArr: valueIdArr
        })
      }

    }

    if (this.state.valueIdArr.length != 0) {

      document.getElementById("expirationDate").disabled = false;
      document.getElementById("effectiveDate").disabled = false;
    }
    else {

      document.getElementById("expirationDate").disabled = true;
      document.getElementById("effectiveDate").disabled = true;

    }

    if (this.state.valueIdArr.length != 0) {
      this.setState({ enableSubmitButton: true, hideDate: false });
    }
    else {
      this.setState({ enableSubmitButton: false });
    }

  }

  handleLevelDDChange(event) {

    document.getElementById("expirationDate").disabled = true;
    document.getElementById("effectiveDate").disabled = true;
    $("input[type=date]").val("");

    if (event && event.target && event.target.value) {

      this.setState({
        enableSubmitButton: false,
        enableSubmitButtonStartDateSelected: false,
        endDate: null, startDate: null, hideDate: true,
        programList1: event.target.value, resetLevelValues: true,
      });

      var programValue = helper.getProgramLavelValues(this.state.programList, event.target.value);
      let programListValue = programValue;
      this.setState({
        level: event.target.value,
        programListValue: programListValue,
        hideValue: false, valueIdArr: [],
      });

    }

    if (event.target.value === 'Select Level') {
      this.setState({
        hideValue: true,
        programListValue: []
      });
    }
  }


  handleSubmit = (event) => {

    event.preventDefault();

    let qpdata = this.props.qpdata;
    let responseList = [];
    let programsAddRequestValueId;
    let valueId;
    let sDate = null;
    let eDate = null;
    let momentSDate = null;
    let momentEDate = null;
    let diff = null;
    let count = this.state.valueIdArr.length;
    let providerId = this.props.providerId;
    let startDate = this.state.startDate;
    let endDate = this.state.endDate;

    let valueIdArr = this.state.valueIdArr;

    for (var i = 0; i < valueIdArr.length; i++) {

      if (!this.state.isDuplicate) {
        this.duplicateCheck(this.state.program, this.state.level, valueIdArr[i]);
      }

    }


    for (var j = 0; j < count; j++) {

      let ProgramsAddRequest = {
        action: 'Insert',
        providerId: null,
        valueId: null,
        startDate: null,
        endDate: null
      }

      valueId = this.state.valueIdArr[j];
      ProgramsAddRequest.providerId = providerId;
      ProgramsAddRequest.valueId = valueId;
      ProgramsAddRequest.startDate = startDate;
      ProgramsAddRequest.endDate = endDate;
      programsAddRequestValueId = ProgramsAddRequest.valueId;

      this.conflictCheck(this.state.program, this.state.level);

      sDate = startDate;
      eDate = endDate;
      momentSDate = moment(sDate);
      momentEDate = moment(eDate);
      diff = momentEDate.diff(momentSDate);

      if (
        ((diff > 0 || diff == 0) || eDate == null)
        && (!this.state.isConflicting)
        && (!this.state.isDuplicate)
      ) {
        responseList.push(ProgramsAddRequest);
      }
      else if (this.state.isConflicting) {
        this.setState({ messageId: 4 });

      }
      else if (this.state.isDuplicate) {
        this.setState({ messageId: 6 });

      }
      else if (diff < 0) {
        this.setState({ messageId: 5, diff: diff });
      }
      else if (diff > 0) {
        this.setState({ diff: null });
      }
    }


    if ((diff > 0 || diff == 0) || eDate == null) {
      let isDups = false;
      for (var j = 0; j < qpdata.length; j++) {
        if (valueId[j] == programsAddRequestValueId) {
          isDups = true;
        }
      }

      this.setState({
        ProgramsAddRequest: responseList, isDuplicateRecord: isDups,
        messageId: 2, addModeActive: true
      });
    }

    //if end Date is valid
    else {
      this.props.setAddProgramFlag('Select Program');
      this.setState({ messageId: 5 });
    }
  }


  renderStyle() {

    if (this.state.messageId != -1) {
      this.props.renderStyle(customStyles.disableContainer);
      return customStyles.disableContainer
    }
    else {
      this.props.renderStyle("");
      return ""
    }
  }
  render() {


    var programList1;
    let qpdata = this.props.qpdata;
    let providerDetailTypeName = this.props.provData.providerDetailTypeName;

    var provType = helper.getProvType(providerDetailTypeName);

    var disableContainer = this.renderStyle();
    var programName = ' ';

    programName = helper.getPrograms(this.state.programData, provType)

    var listValue1 = this.state.programList;
    var listValue = helper.filterList(listValue1);

    var Value = !this.state.resetLevelValues ? this.state.programListValue : [];

    var Value = this.state.programListValue;

    return (

      <tbody colSpan="6">


        {
          (this.state.diff < 0 && this.state.messageId != -1)
            ?
            this.getMessage(5)
            :
            (this.state.isConflicting && this.state.messageId != -1)
              ?
              this.getMessage(4)
              :
              (this.state.isDuplicate && this.state.messageId != -1)
                ?
                this.getMessage(6)
                :
                (this.state.messageId != -1 && this.state.messageId != undefined)
                  ?
                  this.getMessage(this.state.messageId)
                  : null
        }



        <tr id="rowNewRecord" className={disableContainer}>
          <td className={pcNodeHeader.hide}></td>
          <td width="22%">
            <select id="programDD"
              className={this.state.programDDError ? customStyles.dropDown + ' ' + customStyles.programDDError
                : customStyles.dropDown}
              onChange={this.handleProgramDDChange} value={this.state.program}
            >{programName.map((data, index) =>
              <option
                className={customStyles.values}
                key={index}>{data}
              </option>

            )}</select>
          </td>

          <td width="24%"><select id="levelDD"
            title={this.state.hideLevel ? "Please select Program Name" : ''
            }
            className={this.state.hideLevel
              ? customStyles.dropDown + ' ' + customStyles.dropDownDateDisable
              : customStyles.dropDown}
            onChange={this.handleLevelDDChange}
            value={this.state.programList1}
          >{(listValue).map((data, index) =>
            <option className={customStyles.values} key={index}>
              {data}
            </option>

          )}</select>
          </td>

          <td width="14%">

            <div
              title={this.state.hideLevel ? "Please select Program Name" :
                this.state.hideValue ? "Please select Program Level" : ''
              }
              className={
                Value && Value.length > 0 && !this.state.hideValue
                  ? customStyles.dropDownValue
                  : customStyles.dropDownValue + ' ' + customStyles.valueSection + ' ' + customStyles.dropDownDateDisable
              }>

              <dl>

                <dt>
                  <a href="#">
                    <span className={customStyles.hida}> </span>
                    <p className={customStyles.multiSel}></p>
                  </a>
                </dt>

                <dd>
                  <div className={Value.length > 0 ? customStyles.multiSel : customStyles.valueSection}>
                    <ul>
                      {Value && Value.length > 0 ? Value.map((data, index) =>
                        <li key={index} className={customStyles.liValues}>
                          {this.state.hideValue ? <input type="checkbox" /> :
                            <input id={data.programLevelValueId} name={"valueIdCheckBox"} type="checkbox"
                              value={data.programLevelValueId}
                              checked={this.state.resetLevelValues ? false : null}
                              title={this.state.hideLevel ? "Please select Program Name" : ''}
                              onClick={(event) => this.handleValueDDChange(event, data.programLevelValueId)}
                            />
                          }
                          {data.programLevelValue}
                        </li>

                      ) : <li ClassName={customStyles.valueSection} ></li>
                      }

                    </ul>
                  </div>
                </dd>

              </dl>
            </div>

          </td>
          <td width="17%"><
            input id="effectiveDate" type="date"
            title={
              this.state.hideLevel ? "Please select Program Name" :
                this.state.hideValue ? "Please select Program Level" :
                  this.state.valueIdArr.length === 0 ? "Please select Value" : ''
            }
            className={
              this.state.hideDate
                ? customStyles.values + ' ' + customStyles.customDatePicker + ' ' + customStyles.dropDownDate + ' ' + customStyles.dropDownDateDisable
                : customStyles.values + ' ' + customStyles.customDatePicker + ' ' + customStyles.dropDownDate}

            onChange={this.handleStartDateChange}
            // required = {true}
            value={this.state.startDate}
            min={'1899-01-01'} max={'9999-12-31'}
          />
          </td>
          <td width="15%"><
            input id="expirationDate" type="date"
            title={
              this.state.hideLevel ? "Please select Program Name" :
                this.state.hideValue ? "Please select Program Level" :
                  this.state.valueIdArr.length === 0 ? "Please select Value" : ''
            }
            // required = {true}
            className={
              this.state.hideDate
                ? customStyles.values + ' ' + customStyles.customDatePicker + ' ' + customStyles.dropDownDate + ' ' + customStyles.dropDownDateDisable
                : customStyles.values + ' ' + customStyles.customDatePicker + ' ' + customStyles.dropDownDate}
            onChange={this.handleExpirationDateChange}
            value={this.state.endDate}
            min={'1899-01-01'} max={'9999-12-31'}
          />
          </td>

          <td className={customStyles.actions} width="10%">

            <div className={pcNodeHeader.component + ' ' + pcCommon.alignLeft}>
              <ul><li><button id="submitUpdate"
                className={
                  this.state.enableSubmitButton && this.state.enableSubmitButtonStartDateSelected
                    ? pcNodeHeader.submitBtn : pcCommon.disableBtn
                }
                onClick={this.handleSubmit} >Submit
            </button></li></ul>
            </div>

          </td>
        </tr>



        {qpdata.map((item, index) => {
          return (
            <tr key={index} className={disableContainer}>
              <td className={pcNodeHeader.hide}></td>
              <td width="22%">{item.programName}</td>
              <td width="24%">{(item.levelName ? item.levelName : '')}</td>
              <td width="14%">{(item.valueName ? item.valueName : '')}</td>
              <td width="17%"> {this.props.processAndFormatDate(item.startDate)} </td>
              <td width="15%"> {DateUtil.processAndFormatDate(item.endDate)} </td>
              <td width="10%"></td>
            </tr>
          )
        }
        )}


      </tbody>

    )
  }
}
