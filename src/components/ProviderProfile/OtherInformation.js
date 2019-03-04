import React, {PropTypes} from 'react';
import pcCommon from '../../assets/styles/pcCommon.css';
import pcNodeContainer from '../../assets/styles/pcNodeContainer.css';
import pcNodeSections from '../../assets/styles/pcNodeSections.css';
import pcNotificationBar from '../../assets/styles/pcNotificationBar.css';
import pcGrid from '../../assets/styles/pcGrid.css';
import NodeHeader from './NodeHeader.js';

import Spinner from '../Spinner';
import ToolTips from '../ToolTips';
import FA from 'react-fontawesome';
const StringUtil = require('../Utils/StringUtil.js');
const Helper = require('./ProfileHelper.js');

class OtherInformation extends React.Component {

  renderContactInfo(contactArr) {
    if (contactArr && contactArr.length > 0) {
      return (
        contactArr.map((item, index) => {

          let name = Helper.getContactName(item);

          if (name.length > 0) {
            return (
              <tr key={index}>
                <td>{(item.givenName && item.surname) ? `${StringUtil.toTitleCase(item.givenName)} ${StringUtil.toTitleCase(item.surname)}` : ''}</td>
                <td>{(item.contactTypeName) ? <ToolTips name={item.contactTypeName} maxlength={25}/> : ''}</td>
                <td>{(item.phoneNumber) ? Helper.renderNumbers(item.phoneNumber) : ''}</td>
                <td>{(item.faxNumber) ? Helper.renderNumbers(item.faxNumber) : ''}</td>
                <td>{(item.emailAddress) ? (
                  <a href={"mailto:" + item.emailAddress[0]}>{item.emailAddress[0]}</a>) : ''}</td>
              </tr>
            )

          }

        })
      )

    }
    else {
      return (
        <tr>
          <td colSpan='5' className={pcGrid.alert}>
          <div className={pcNotificationBar.notificationBar + ' ' + pcNotificationBar.alert + ' ' + pcNotificationBar.noBg}>
            <div className={pcNotificationBar.container}>
            <FA name="exclamation-triangle"/> <span>No Record Found</span>
            </div>
          </div>
          </td>
        </tr>
      )
    }
  }

  renderAdditionalAddress() {
    let addAddressList = this.props.data.additionalLocation;
    console.log(addAddressList);

    return (addAddressList ?

        addAddressList.map((item, index) => {
            return (
              <tr key={index}>
                <td>
                  { item.locationTypeName }
                </td>

                <td>
                  <p>
                    { item.postalAddress[0].addressLine1Text ?
                      <span>{item.postalAddress[0].addressLine1Text}</span> : '' }
                    { item.postalAddress[0].addressLine2Text ?
                      <span>{' ' + item.postalAddress[0].addressLine2Text}</span> : '' }
                    { item.postalAddress[0].addressLine3Text ?
                      <span>{' ' + item.postalAddress[0].addressLine3Text}</span> : '' }
                  </p>
                </td>
              </tr>
            )
          }
        ) :
        <tr>
          <td colSpan='2' className={pcGrid.alert}>
            <div className={pcNotificationBar.notificationBar + ' ' + pcNotificationBar.noBg}>
              <FA name='exclamation-triangle'/> No Record Found
            </div>
          </td>
        </tr>
    );
  }


  render() {

    let data
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
        <div className={pcNodeContainer.nodeContentContainer + ' ' + pcNodeContainer.generalProfile+ ' ' + pcGrid.generalProfile}>


          {(data.providerDetailTypeName === "Supplier Individual" || data.providerDetailTypeName === "Professional") ? null :

            <section className={pcNodeSections.sections + ' ' + pcNodeSections.generalProfile}>
              <header>Contact Information</header>

              <div className={pcGrid.gridContainer + ' ' + pcNodeSections.nodeBody}>
                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                  <thead>
                  <tr>
                    <th>Contact Name</th>
                    <th>Contact Type</th>
                    <th>Phone</th>
                    <th>Fax</th>
                    <th>Email</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.renderContactInfo(this.props.data.profileContact)}
                  </tbody>
                </table>
              </div>
            </section>
          }


          <section className={pcNodeSections.sections + ' ' + pcNodeSections.generalProfile}>
            <header>Additional Address</header>
            <div className={pcGrid.gridContainer + ' ' + pcNodeSections.nodeBody}>
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <thead>
                <tr>
                  <th>Address Type</th>
                  <th>Address</th>
                </tr>
                </thead>
                <tbody>
                { this.renderAdditionalAddress()  }
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    )

  }

}


export default OtherInformation;
