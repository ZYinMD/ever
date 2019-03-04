import React, {PropTypes, Component} from 'react';
import pcCommon from '../../assets/styles/pcCommon.css';
import pcNodeContainer from '../../assets/styles/pcNodeContainer.css';
import pcNodeSections from '../../assets/styles/pcNodeSections.css';
import pcNotificationBar from '../../assets/styles/pcNotificationBar.css';
import pcGrid from '../../assets/styles/pcGrid.css';

import FA from 'react-fontawesome';
import NodeHeader from './NodeHeader.js';

var Helper = require('./ProfileHelper.js');
var DateUtil = require('../Utils/DateUtil.js');
const StringUtil = require('../Utils/StringUtil.js');

class LicenseInformation extends React.Component {

  render() {
    let data = this.props.data;

    return (
      <div className={pcNodeContainer.bodyContainer}>

        <NodeHeader providerType={data.providerDetailTypeName}/>
        <div className={pcNodeContainer.nodeContentContainer + ' ' + pcNodeContainer.generalProfile+ ' ' + pcGrid.generalProfile}>
          <section className={pcNodeSections.sections + ' ' + pcNodeSections.generalProfile}>
            <header>
              License / Certification Information
            </header>
            <div className={pcNodeSections.nodeBody + ' ' + pcGrid.gridContainer}>
              <table cellpadding="0" cellspacing="0" width="100%" border="0">
                <thead>
                <tr>
                  <th>Type</th>
                  <th>Number</th>
                  <th>Status</th>
                  <th>State</th>
                  <th>Body</th>
                  <th>Original Issue Date</th>
                  <th>Expiration Date</th>
                </tr>
                </thead>
                {
                  ((data.licenseCertification) ? data.licenseCertification.map(function (item, index) {
                    return (
                      <tbody>
                      <tr key={index}>
                        <td>{Helper.checkIfNotAvailable(item.licenseTypeName)} </td>
                        <td>{Helper.checkIfNotAvailable(item.licenseNumber)} </td>
                        <td>{Helper.checkIfNotAvailable(item.licenseStatusName)} </td>
                        <td>{Helper.checkIfNotAvailable(item.uspsStateCode)} </td>
                        <td>{Helper.checkIfNotAvailable(item.licensingOrganizationName)} </td>
                        <td>{DateUtil.convertDateToMMDDYYYY(item.licenseOriginalIssueDate)} </td>
                        <td>{DateUtil.convertDateToMMDDYYYYBlank(item.licenseExpirationDate)} </td>
                      </tr>
                      </tbody>
                    )
                  }) :
                    <tbody>
                    <tr>
                      <td colSpan="7" className={pcGrid.alert}>

                      <div className={pcNotificationBar.notificationBar + ' ' + pcNotificationBar.alert + ' ' + pcNotificationBar.noBg}>
                        <div className={pcNotificationBar.container}>
                        <FA name="exclamation-triangle"/> <span>No Record Found</span>
                        </div>
                      </div>
                      </td>
                    </tr>
                    </tbody>)
                }
              </table>
            </div>
          </section>


          <section className={pcNodeSections.sections + ' ' + pcNodeSections.generalProfile}>
            <header>
              Other Identifiers
            </header>
            <div className={pcNodeSections.nodeBody + ' ' + pcGrid.gridContainer}>
              <table cellpadding="0" cellspacing="0" width="100%" border="0">
                <thead>
                <tr>
                  <th>Name</th>
                  <th>Id</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                </tr>
                </thead>
                <tbody>
                {
                  (data.internalIdentifiers && data.internalIdentifiers.length > 0) ?
                    ( data.internalIdentifiers.map(function (item, index) {
                        return (
                          (item.name ?
                            <tr key={index}>
                              <td>{item.name} </td>
                              <td>{item.id} </td>
                              <td>{DateUtil.convertDateToMMDDYYYY(item.startDate)} </td>
                              <td>{DateUtil.convertDateToMMDDYYYYBlank(item.endDate)} </td>
                            </tr>
                            : '')
                        )
                      })
                    )
                    :
                    <tr>
                      <td colSpan="4" className={pcGrid.alert}><FA name="exclamation-triangle"/> No Record Found</td>
                    </tr>
                }
                </tbody>
              </table>
            </div>
          </section>

          <section className={pcNodeSections.sections + ' ' + pcNodeSections.generalProfile}>
            <header>
              Medicare & Medicaid Information
            </header>
            <div className={pcNodeSections.nodeBody + ' ' + pcGrid.gridContainer}>
              <table cellpadding="0" cellspacing="0" width="100%" border="0">
                <thead>
                <tr>
                  <th>Name</th>
                  <th>Value</th>
                  <th>Start Date</th>
                </tr>
                </thead>

                {(data.cmsOptOutIndicator || data.medicareParFlag || data.medicaidParFlag) ?
                    <tbody>
                            <tr >
                              <td>Medicare Opt Out</td>
                              <td>{ data.cmsOptOutIndicator ? StringUtil.psvConvertYNIndicator(data.cmsOptOutIndicator) : ''}
                              </td>
                              <td>{  data.cmsOptOutEffectiveDate ? DateUtil.convertDateToMMDDYYYY(data.cmsOptOutEffectiveDate) : ''}
                              </td>
                            </tr>
                            <tr >
                              <td>Medicare Par Flag</td>
                              <td>{ data.medicareParFlag ? StringUtil.psvConvertYNIndicator(data.medicareParFlag.indicatorValue) : ''}
                              </td>
                              <td>{  data.medicareParFlag ? DateUtil.convertDateToMMDDYYYY(data.medicareParFlag.startDate) : ''}
                              </td>
                            </tr>
                            <tr >
                              <td>Medicaid Par Flag</td>
                              <td>{ data.medicaidParFlag ? StringUtil.psvConvertYNIndicator(data.medicaidParFlag.indicatorValue) : ''}
                              </td>
                              <td>
                              {  data.medicaidParFlag ? DateUtil.convertDateToMMDDYYYY(data.medicaidParFlag.startDate) : ''}
                              </td>
                            </tr>
                            </tbody>
                            :
                            <tbody>
                            <tr>
                              <td colSpan="4" className={pcGrid.alert}><FA name="exclamation-triangle"/> No Record Found</td>
                            </tr>
                            </tbody>
                        }

              </table>
            </div>
          </section>



        </div>
      </div>
    )
  }
}

export default LicenseInformation;
