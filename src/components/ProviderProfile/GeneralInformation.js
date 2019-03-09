import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import pcCommon from '../../assets/styles/pcCommon.css';
import pcNodeContainer from '../../assets/styles/pcNodeContainer.css';
import pcNodeSections from '../../assets/styles/pcNodeSections.css';
import pcNotificationBar from '../../assets/styles/pcNotificationBar.css';
import pcGrid from '../../assets/styles/pcGrid.css';
import pcInputs from '../../assets/styles/pcInputs.css';
import CustomDropDown from './CustomDropDown.js';

import FA from 'react-fontawesome';
import Popover from 'react-simple-popover';
import Spinner from '../Spinner';
import ToolTips from '../ToolTips';
import NodeHeader from './NodeHeader.js';
const Helper = require('./ProfileHelper.js');
const StringUtil = require('../Utils/StringUtil.js');
const DateUtil = require('../Utils/DateUtil.js');
const DataFormat = require('../Utils/DataFormat.js');
const cursor = require('./cursorPosition.js');

class GeneralInformation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      copied: false,
      styleData:''
    };
  }

  componentDidMount() {
    var container = ReactDOM.findDOMNode(this);
    if(container) {
      container.addEventListener("click", cursor.getClickPosition, false);
    }
  }


  handleClick(e) {
    var container = document.getElementById("nodeContainer");
    var getStyles = cursor.getProfilePosition(container,this.props.data.providerNPI.length);

    this.setState({
      open: !this.state.open,
      styleData: {
        top : getStyles.dropDownTopPos,
        left : getStyles.dropDownLeftPos,
        margin : 0 ,
        height : getStyles.dropDownHeightPos
      }
    })

  }

  handleClose(e) {
    this.setState({open: false});
  }

  renderLanguageUsage(languages) {
    return ((languages) ? languages.map((item, index) => {
        return (<span>{item}</span>)
      })
        : ''
    )
  }

  renderselectNPIBox(npiList) {
    if (npiList) {
      return (npiList.map((item, index) => {
          return (<li key={index}><span># </span>
            <span>{item.npi} {item.npiTypeCode ? ('(' + item.npiTypeCode) + ')' : ''}</span></li>)
        })
      );
    }
  }

  npiCopyList(npiList) {
    if (npiList) {
      return (npiList.map((item, index) => {
          return [item.npi, item.npiTypeCode]
        })
      );
    }
  }

  renderNPIFirstElement(NPIList) {
    if (NPIList) {
      for (var i = 0; i < NPIList.length; i++) {
        return <span> {NPIList[0].npi} {NPIList[0].npiTypeCode ? ( '(' + NPIList[0].npiTypeCode + ')') : ''} </span>
      }
    }
  }


  render() {
    let data;
    if (this.props.data) {
      data = this.props.data;
    }

    if (!data) {
      return (
        <div><Spinner /></div>
      )
    }


    return (
      <div className={pcNodeContainer.bodyContainer}>
        <NodeHeader providerType={data.providerDetailTypeName}/>
        <div id = "nodeContainer" className={pcNodeContainer.nodeContentContainer+ ' ' + pcNodeContainer.generalProfile+ ' ' + pcGrid.generalProfile}>
          {this.state.open ? <CustomDropDown elementType="npi" DropDownVisibleStatus = {this.handleClose.bind(this)} dataSet = {data.providerNPI} styleData = {this.state.styleData} /> : ''}
          { data ?
            ((data.providerDetailTypeName === 'Professional' || data.providerDetailTypeName === 'Supplier Individual')
            && data.individualName) ?
              <section className={pcNodeSections.sections + ' ' + pcNodeSections.generalProfile + ' ' + pcGrid.generalProfile}>
                <header>
                  General Information
                </header>
                <div className={pcNodeSections.nodeBody + ' ' + pcGrid.nonRepeatedData + ' ' + pcGrid.col5}>
                  <ul>
                    <li>
                      <label>Name</label>
                      <span>
                            {(data.individualName) ? StringUtil.psvUpperCase(Helper.getFullName(data.individualName[0])) : ''}
                        </span>
                    </li>

                    <li>
                      <label>Degree</label>
                      <span>{(data.individualName) ? data.individualName[0].degreeName : ''}</span>
                    </li>

                    <li>
                      <label>Gender</label>
                      <span>{((data.individualGenderCode == 'M') ? 'Male' : 'Female')}</span>
                    </li>

                    <li>
                      <label>DOB</label>
                      <span>{DateUtil.convertDateToMMDDYYYY(data.individualBirthDate)}</span>
                    </li>

                    <li>
                      <label>Category</label>
                      <span>
                          { data ? data.providerDetailTypeName : ''}
                        </span>
                    </li>

                    <li>
                      <label>FB #</label>
                      <span>
                          { data.fbNumber ? (data.fbNumber.id) : ''}
                        </span>
                    </li>

                    <li>
                      <label>FB # Start Date</label>
                      <span>
                          { data.fbNumber ? (DateUtil.convertDateToMMDDYYYY(data.fbNumber.startDate)) : ''}
                        </span>
                    </li>

                    <li>
                      <label>FB # End Date</label>
                      <span>
                          { data.fbNumber ? DateUtil.convertDateToMMDDYYYYBlank(data.fbNumber.endDate) : '' }
                        </span>
                    </li>

                    <li>
                      <label>FB # Inactive Reason</label>
                      <span>
                          { data.fbNumber ? (data.fbNumber.expirationReasonName ? data.fbNumber.expirationReasonName : '' ) : '' }
                        </span>
                    </li>

                    <li>
                      <label>Tax ID</label>
                      <span>
                          { data.federalTaxIdentifierNumber ? DataFormat.maskTaxID(data.taxIdentifierTypeCode, data.federalTaxIdentifierNumber) : '' }
                        </span>
                    </li>

                    <li>
                      <label>Active NPI(s)</label>
                      <span>
                        { data.providerNPI ?
                          <span className={pcCommon.alignLeft}>
                              {this.renderNPIFirstElement(data.providerNPI)}
                          </span>
                          : '' }
                        {
                          (data.providerNPI && data.providerNPI.length > 1 ) ?
                            <a
                              href="#"
                              className={pcGrid.more + ' ' + pcCommon.alignLeft}
                              ref="target"
                              onClick={this.handleClick(data.providerNPI.length).bind(this)} title="Click for more NPIs">
                              <FA name="ellipsis-h"/>
                            </a> : ''
                        }
                        </span>
                      {/*<span>
                          <Popover
                            placement='bottom'
                            container={this}
                            target={this.refs.target}
                            show={this.state.open}
                            onHide={this.handleClose.bind(this)}>
                              <div>
                                <ul>
                                  {this.renderselectNPIBox(data.providerNPI)}
                                </ul>
                              </div>
                          </Popover>
                        </span>*/}
                    </li>

                    <li>
                      <label>Language(s) other than English</label>
                      <span>
                        <p>
                          {this.renderLanguageUsage(data.languages)}
                        </p>
                        </span>
                    </li>
                  </ul>
                </div>
              </section> :
              <section className={pcNodeSections.sections + ' ' + pcNodeSections.generalProfile}>
                <header>
                  General Information
                </header>
                <div className={pcNodeSections.nodeBody + ' ' + pcGrid.nonRepeatedData + ' ' + pcGrid.col5}>
                  <ul>
                    <li>
                      <label>Name</label>
                      <span>
                          {data ? (data.organizationName) ? StringUtil.psvUpperCase(Helper.getOrgFullName(data.organizationName, 'DBA')) : '' : ''}
                        </span>
                    </li>

                    <li>
                      <label>Business Entity Name</label>
                      <span>
                          {data ? (data.organizationName) ? StringUtil.psvUpperCase(Helper.getOrgFullName(data.organizationName, 'LGL')) : '' : ''}
                        </span>
                    </li>

                    <li>
                      <label>Category</label>
                      <span>
                          { data ? data.providerDetailTypeName : ''}
                        </span>
                    </li>

                    <li>
                      <label>FB #</label>
                      <span>
                          { data.fbNumber ? (data.fbNumber.id) : ''}
                        </span>
                    </li>

                    <li>
                      <label>FB # Start Date</label>
                      <span>
                          { data.fbNumber ? DateUtil.convertDateToMMDDYYYY(data.fbNumber.startDate) : ''}
                        </span>
                    </li>

                    <li>
                      <label>FB # End Date</label>
                      <span>
                          { data.fbNumber ? DateUtil.convertDateToMMDDYYYYBlank(data.fbNumber.endDate) : '' }
                        </span>
                    </li>

                    <li>
                      <label>FB # Inactive Reason</label>
                      <span>
                          { data.fbNumber ? (data.fbNumber.expirationReasonName ? data.fbNumber.expirationReasonName : '' ) : '' }
                        </span>
                    </li>

                    <li>
                      <label>Tax ID</label>
                      <span>
                          {
                            (
                              (data.providerDetailTypeName !== 'Supplier Individual') ?
                                (data.federalTaxIdentifierNumber ? data.federalTaxIdentifierNumber : '')
                                : (data.federalTaxIdentifierNumber ? DataFormat.maskTaxID(data.taxIdentifierTypeCode, data.federalTaxIdentifierNumber) : '')
                            )
                          }
                        </span>
                    </li>

                    <li>
                      <label>Active NPI(s)</label>
                        { data.providerNPI ?
                          <span className={pcCommon.alignLeft}>
                            {this.renderNPIFirstElement(data.providerNPI)}
                          </span>
                          : '' }
                        {
                          (data.providerNPI && data.providerNPI.length > 1 ) ?
                            <a
                              href="#"
                              className={pcGrid.more + ' ' + pcCommon.alignLeft}
                              ref="target"
                              onClick={this.handleClick.bind(this)} title="Click for more NPIs">
                              <FA name="ellipsis-h"/>
                            </a> : ''
                        }

                      {/*<span>
                          <Popover
                            placement='bottom'
                            container={this}
                            target={this.refs.target}
                            show={this.state.open}
                            onHide={this.handleClose.bind(this)}>
                            <div>
                                <ul>
                                  {this.renderselectNPIBox(data.providerNPI)}
                              </ul>
                            </div>
                          </Popover>
                        </span>*/}
                    </li>
                  </ul>

                </div>
              </section>
            : ''}


          <section className={pcNodeSections.sections + ' ' + pcNodeSections.generalProfile}>
            <header>Specialty Information</header>
            <div className={pcGrid.gridContainer + ' ' + pcNodeSections.nodeBody}>
              <table cellPadding="0" cellSpacing="0" width="100%">
                <thead>

                { (data.providerDetailTypeName == 'Professional' || data.providerDetailTypeName == 'Supplier Individual') ? (
                  <tr>
                    <th>Specialty</th>
                    <th>Board</th>
                    <th>Board Status</th>
                    <th>Board Date</th>
                    <th>Board Expiration Date</th>
                    <th>Board Specialty</th>
                    <th>Board Subspecialty</th>
                  </tr>
                )
                  :
                  (
                    <tr>
                      <th>Specialty</th>
                    </tr>
                  ) }
                </thead>
                <tbody>
                { data ?
                  ((data.activeSpecialty) ? data.activeSpecialty.map(function (item, index) {
                      return (
                        ( (item.providerSpecialtyText) ?
                          (
                            (data.providerDetailTypeName == 'Professional' || data.providerDetailTypeName == 'Supplier Individual') ?
                              (
                                <tr key={index}>
                                  <td>{Helper.checkIfNotAvailable(item.providerSpecialtyText)}</td>
                                  <td>{Helper.checkIfNotAvailable(item.boardCertificationOrganizationName)} </td>
                                  <td>{Helper.checkIfNotAvailable(item.boardCertificationStatusName)} </td>
                                  <td>{DateUtil.convertDateToMMDDYYYY(item.boardCertificationDate)} </td>
                                  <td>{DateUtil.convertDateToMMDDYYYYBlank(item.boardCertificationExpirationDate)} </td>
                                  <td>{Helper.checkIfNotAvailable(item.providerGeneralSpecialtyName)} </td>
                                  <td>{Helper.checkIfNotAvailable(item.providerSubspecialtyName)} </td>
                                </tr>
                              ) :
                              (
                                <tr key={index}>
                                  <td>{item.providerSpecialtyText}</td>
                                </tr>
                              )
                          ) : '')
                      )
                    }) : (<tr>
                      <td colSpan="7" className={pcGrid.alert}>

                      <div className={pcNotificationBar.notificationBar + ' ' + pcNotificationBar.alert + ' ' + pcNotificationBar.noBg}>
                        <div className={pcNotificationBar.container}>
                        <FA name="exclamation-triangle"/> <span>No Record Found</span>
                        </div>
                      </div>
                      </td>
                    </tr>)
                  )
                  : ''}

                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>

    )

  }
}

export default GeneralInformation;
