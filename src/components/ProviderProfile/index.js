import React, {PropTypes, Component} from 'react';

import styles from './css/profile.css';
import FA from 'react-fontawesome';
import Img from '../Img';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ProviderActions from '../../actions/ProviderProfileAction.js';
import Tabs from '../Tabs';
import Pane from '../Tabs/Pane';
import GeneralInformation from './GeneralInformation.js';
import LicenseInformation from './LicenseInformation.js';
import EducationInformation from './EducationInformation.js';
import QualityInformation from './QualityInformation.js';
import OtherInformation from './OtherInformation.js';
import EntityGeneralInformation from './EntityGeneralInformation.js';
import pcCommon from '../../assets/styles/pcCommon.css';
import pcBarnacleTabs from '../../assets/styles/pcBarnacleTabs.css';
import pcNodeContainer from '../../assets/styles/pcNodeContainer.css';
import customStyles from './css/customStyles.css';

var Helper = require('./ProfileHelper.js');

var QualityProgramHelper = require('./Update/QualityProgramHelper');

class ProviderProfileDetails extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.className = styles.container + (props.className ? ' ' + props.className : '');
    this.state = {
      currentTabId: 1,
      provData: '',
      emailData: false,
      phoneData: false,
      faxData: false,
      show: false,
	    showHistory: true,
      categoryEntityCheck: false,
      headerTitle: '',
      containerStyle: "",

      qualityProgSubmitInfoEdit: "",
      enableSubmitButtonStartDateSelected: "",
      disableUpdateButton: false,
      qpData:[],
      editModeActive: false, addModeActive: false
    }
    this.handleHeader = this.handleHeader.bind(this);
    this.renderDisableData = this.renderDisableData.bind(this);
  }

  handleClick = (e) => {
    if (e && this.props.onClick) {
      this.props.onClick(e);
    }
  }

  myhandleClick = e => {
    this.setState({target: e.target, show: !this.state.show});
  };

  handleTabClick = (id) => {
    this.setState({
      currentTabId: id
    });
  }

  renderDisableData(containerStyle){

    if(containerStyle != this.state.containerStyle){
      this.setState({
        containerStyle
      })
    }
   // this.setState(prevState => {prevStatde.containerStyle != containerStyle ? containerStyle: ""})
  }

  componentWillReceiveProps(newProps) {

    if(newProps.qualityProgramData && newProps.qualityProgramData != this.props.qualityProgramData){
      let data = newProps.qualityProgramData;
      let sortedData = QualityProgramHelper.sortByProgram(newProps.qualityProgramData);

      this.setState({
        qpData: sortedData
      });

    }

    this.className = styles.container + (newProps.className ? ' ' + newProps.className : '');
    if (this.state.provData) {
      this.setState({provData: newProps.provData.data});
    }

    if(newProps.qualityProgSubmitInfoEdit != this.props.qualityProgSubmitInfoEdit){
        this.setState({
          qualityProgSubmitInfoEdit: newProps.qualityProgSubmitInfoEdit
        })
    }

    if(newProps.qualityProgSubmitInfo != this.props.qualityProgSubmitInfo){
        this.setState({
          qualityProgSubmitInfo: newProps.qualityProgSubmitInfo
        })
    }
  }

  componentDidMount() {

    let data = this.props.provData && this.props.provData.data || this.state.provData;
    if (this.props.selectedIndexResultData.category === 'Business Entity' || this.props.selectedIndexResultData.category === 'Corporate Entity') {
      this.setState({categoryEntityCheck: true});
    }

    if (this.props.userInfoData && this.props.userInfoData.Provider_Network_Update) {
      this.setState({
        disableUpdateButton: true
      })
    }

  }

  handleHeader = (selected) => {
    this.setState({headerTitle: selected});
  }
 setAddModeActive = (flag) => {
    if(flag == true){
      this.setState({addModeActive: true});
    }
    else{
      this.setState({addModeActive: false});
    }
  }

 setEditModeActive = (flag) => {
    if(flag == true){
      this.setState({editModeActive: true});
    }
    else{
      this.setState({editModeActive: false});
    }
  }

  render() {
    let data;
    const {headerTitle, categoryEntityCheck} = this.state
    let educationCategoryCheck;
    let CategoryCheckStyling;
    let entityData;
    let styleOptions = {
      'color': 'white',
      'background-color': '#16a085',
      'border-left': '10px solid',
      'width': '150px',
      'margin-left': '-10px'
    }
    let addressIconStyling = {
      'position': 'relative',
      'bottom': '13px',
      'right': '2px'
    }
    let userIconStyling = {
      'position': 'absolute',
      'left': '102px',
      'top': '14px',
    }
    let qualityIconStyling = {
      'position': 'relative',
      'bottom': '12px'
    }
    let educationIconStyling = {
      'left': '4px'
    }
    data = this.props.provData && this.props.provData.data || this.state.provData || this.props.provData;

    if (data && data.providerDetailTypeName === 'Professional') {
      educationCategoryCheck = {
        'display': 'table'
      }
    }
    else {
      educationCategoryCheck = {
        'display': 'none'
      }
    }

    if (this.props.selectedIndexResultData.category === 'Business Entity' || this.props.selectedIndexResultData.category === 'Corporate Entity') {
      CategoryCheckStyling = {
        'display': 'none'
      }
      educationCategoryCheck = {
        'display': 'none'
      }
      entityData = this.props.selectedIndexResultData;
    }
    else {
      CategoryCheckStyling = {
        'display': 'table'
      }
    }
    return (
      <div className={pcNodeContainer.nodeParentContainer + ' ' + pcBarnacleTabs.nodeParentContainer + ' ' + pcNodeContainer.withLeftTabs} onClick={this.handleClick}>
        <input type="checkbox" id="collapseSwitch_GeneralProfile" className={pcCommon.hide}/>
        <label className={pcBarnacleTabs.barnacleTabCollapseSwitch} htmlFor="collapseSwitch_GeneralProfile"
               title="Collapse/ Expand">
          Collapse/ Expand
        </label>
        <h2>General Profile</h2>
        <div className={styles.topHeader}>
          <span
            className={styles.nodeHeader}> {headerTitle ? headerTitle : `${categoryEntityCheck ? entityData.category : data && data.providerDetailTypeName } ${'Information'}`}</span>
        </div>
        <Tabs selected={0} ontabSelected={this.handleHeader}  className = {this.state.containerStyle}>
          <Pane fontAwsomeIcon={'user'} styling={userIconStyling} selectedTab={styleOptions}
                label={`${ this.state.categoryEntityCheck ? entityData.category : data && data.providerDetailTypeName } ${'Information'}`}
          >
            {this.state.categoryEntityCheck ?
              <EntityGeneralInformation entityData={entityData ? entityData : ''}/> :
              <GeneralInformation data={data}/> }
          </Pane>
          <Pane fontAwsomeIcon={'drivers-license-o'} CategoryCheckStyle={CategoryCheckStyling}
                styling={addressIconStyling} className={styles.pane + " " + this.state.containerStyle} label="License/Cert & Other Identifiers">
            <LicenseInformation data={data}/>
          </Pane>
          <Pane fontAwsomeIcon={'graduation-cap'} styling={educationIconStyling}
                CategoryCheckStyle={educationCategoryCheck} className={styles.pane + " " + this.state.containerStyle} label="Education Information">
            <EducationInformation data={data}/>
          </Pane>
          <Pane fontAwsomeIcon={'stethoscope'} styling={qualityIconStyling} CategoryCheckStyle={CategoryCheckStyling}
                className={styles.pane + " " + this.state.containerStyle} label="Quality Program Information">
            <QualityInformation
            data={data}
            showHistory={this.state.showHistory}
            providerId ={this.props.selectedIndexResultData.providerId}
            qpdata =  {this.state.qpData}
            isEdit = {this.state.isEdit} isDelete = {this.state.isDelete} isAdd = {this.state.isAdd}
            actions={this.props.actions}
            codeSets={this.props.codeSets && this.props.codeSets.codeSetDetails}
            serviceResponseMessage ={this.state.qualityProgSubmitInfo}
            qualityProgSubmitInfoEdit ={this.state.qualityProgSubmitInfoEdit}
            category = {this.props.selectedIndexResultData.category}
            disableUpdateButton={this.state.disableUpdateButton}
            renderStyle = {this.renderDisableData}
            {...this.state}
            setAddModeActive = {this.setAddModeActive}
            setEditModeActive = {this.setEditModeActive}
            />
          </Pane>
          <Pane fontAwsomeIcon={'phone'} CategoryCheckStyle={CategoryCheckStyling} className={styles.pane + " " + this.state.containerStyle}
                label="Additional Information">
            <OtherInformation data={data}/>
          </Pane>
        </Tabs>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {

  return {
    actions: bindActionCreators({...ProviderActions}, dispatch)
  };
}

const mapStateToProps = state => {
  const searchReducer = state.providerProfile;
  const userInfoReducer = state.userInfo;

  return {
    searchReducer,
    provData: searchReducer.providerGeneralInfo,
    qualityProgramData: searchReducer.qualityProgramInfo,
    codeSets: searchReducer.qualityProgramCodesets,
    qualityProgSubmitInfo:searchReducer.qualityProgramSubmittedInfo,
    qualityProgSubmitInfoEdit:searchReducer.qualityProgramSubmittedInfoEdit,
    userInfoData: userInfoReducer.userInformation
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProviderProfileDetails);
