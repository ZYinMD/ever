import React, {PropTypes, Component} from 'react';
import pcCommon from '../../assets/styles/pcCommon.css';
import pcNodeContainer from '../../assets/styles/pcNodeContainer.css';
import pcNodeSections from '../../assets/styles/pcNodeSections.css';
import pcNotificationBar from '../../assets/styles/pcNotificationBar.css';
import pcGrid from '../../assets/styles/pcGrid.css';
import FA from 'react-fontawesome';
import NodeHeader from './NodeHeader.js';

var Helper = require('./ProfileHelper.js');
var StringUtil = require('../Utils/StringUtil.js');

class GraduationInformation extends React.Component {

  render() {
    let data = this.props.data;
    return (
      <div className={pcNodeContainer.bodyContainer}>

        <NodeHeader providerType={data.providerDetailTypeName}/>
        <div className={pcNodeContainer.nodeContentContainer + ' ' + pcNodeContainer.generalProfile+ ' ' + pcGrid.generalProfile}>


          <section className={pcNodeSections.sections + ' ' + pcNodeSections.generalProfile}>
            <header>
              Graduation Information
            </header>
            <div className={pcNodeSections.nodeBody + ' ' + pcGrid.nonRepeatedData + ' ' + pcGrid.col5}>
              {
                ((data.educations && data.educations.medicalSchool) ?
                    <ul>
                      <li className={pcGrid.merge + ' ' + pcGrid.cell}>
                        <label>School</label>
                        <span>
              {
                StringUtil.toTitleCase(data.educations.medicalSchool.institutionName)
              }</span>
                      </li>
                      <li>
                        <label>Year Completed</label>
                        <span>
                {
                  data.educations.medicalSchool.completedYearNumber
                }
              </span>
                      </li>
                    </ul>
                    :
                    <div>
                    <ul>
                      <li className={pcGrid.merge + ' ' + pcGrid.cell + ' ' + pcGrid.alert}>
                        <label>School</label>
                      </li>

                      <li className={pcGrid.alert}>
                        <label>Year Completed</label>
                      </li>
                    </ul>
                    <div className={pcNotificationBar.notificationBar + ' ' + pcNotificationBar.alert + ' ' + pcNotificationBar.noBg}>
                      <div className={pcNotificationBar.container}>
                      <FA name="exclamation-triangle"/> <span>No Record Found</span>
                      </div>
                    </div>
                    </div>
                )
              }
            </div>
          </section>


          <section className={pcNodeSections.sections + ' ' + pcNodeSections.generalProfile}>
            <header>
              Internship Information
            </header>
            <div className={pcNodeSections.nodeBody + ' ' + pcGrid.nonRepeatedData + ' ' + pcGrid.col5}>
              {
                ((data.educations && data.educations.internship) ?
                    <ul>
                      <li className={pcGrid.merge + ' ' + pcGrid.cell}>
                        <label>Hospital</label>
                        <span>
                      {
                        StringUtil.toTitleCase(data.educations.internship.institutionName)
                      }
                    </span>
                      </li>

                      <li>
                        <label>Year Completed</label>
                        <span>
                        {
                          data.educations.internship.completedYearNumber
                        }
                      </span>
                      </li>
                    </ul>
                    :
                    <div>
                    <ul>
                      <li className={pcGrid.merge + ' ' + pcGrid.cell + ' ' + pcGrid.alert}>
                        <label>Hospital</label>
                      </li>

                      <li className={pcGrid.alert}>
                        <label>Year Completed</label>
                      </li>
                    </ul>
                    <div className={pcNotificationBar.notificationBar + ' ' + pcNotificationBar.alert + ' ' + pcNotificationBar.noBg}>
                      <div className={pcNotificationBar.container}>
                      <FA name="exclamation-triangle"/> <span>No Record Found</span>
                      </div>
                    </div>
                    </div>
                )
              }
            </div>
          </section>


          <section className={pcNodeSections.sections + ' ' + pcNodeSections.generalProfile}>
            <header>
              Residency Information
            </header>
            <div className={pcNodeSections.nodeBody + ' ' + pcGrid.nonRepeatedData + ' ' + pcGrid.col5}>

              {
                ((data.educations && data.educations.residency) ?
                    <ul>
                      <li className={pcGrid.merge + ' ' + pcGrid.cell}>
                        <label>Hospital</label>
                        <span>
                      {
                        StringUtil.toTitleCase(data.educations.residency.institutionName)
                      }
                    </span>
                      </li>

                      <li>
                        <label>Year Completed</label>
                        <span>
                        {
                          data.educations.residency.completedYearNumber
                        }
                      </span>
                      </li>
                    </ul>
                    :
                    <div>
                    <ul>
                      <li className={pcGrid.merge + ' ' + pcGrid.cell + ' ' + pcGrid.alert}>
                        <label>Hospital</label>
                      </li>

                      <li className={pcGrid.alert}>
                        <label>Year Completed</label>
                      </li>
                    </ul>
                    <div className={pcNotificationBar.notificationBar + ' ' + pcNotificationBar.alert + ' ' + pcNotificationBar.noBg}>
                      <div className={pcNotificationBar.container}>
                      <FA name="exclamation-triangle"/> <span>No Record Found</span>
                      </div>
                    </div>
                    </div>
                )
              }
            </div>
          </section>
        </div>
      </div>
    )
  }
}

export default GraduationInformation;
