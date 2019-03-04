import React, {Component} from 'react';
import FA from 'react-fontawesome';
import pcCommon from '../../assets/styles/pcCommon.css';
import pcNodeHeader from '../../assets/styles/pcNodeHeader.css';
import pcActionBar from '../../assets/styles/pcActionBar.css';
import PropTypes from 'prop-types';
import custStyles from './css/customStyles.css';

class NodeHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
        showEdit: false,
        isAddClicked: false,
        disableUpdateButton: false,
        editMode: false,
        addMode: false,
        value: '',
        filter: '',
        isEditClicked: false,
        isHistoryClicked: true,
        isCancelClicked: false,
        isUserAuthorised: true,
        disableHistory: false,
        showHistory: true,
        flag: null,
        messageId: -1,
        isEdit: null,
        addCancelYesClicked: false
    }

    this.onSearchChange = this.onSearchChange.bind(this);
    this.renderEditButton = this.renderEditButton.bind(this);
    this.renderCancelAddSection = this.renderCancelAddSection.bind(this);
    this.renderHistory = this.renderHistory.bind(this);


  }

  componentDidMount(props)  {
    this.setState({disableHistory: this.props.disableHistory, showHistory : this.props.showHistory, flag : this.props.flag,
                    messageId : this.props.messageId, isEdit : this.props.isEdit
      });
  }

  componentWillReceiveProps(nextProps) {


    if(nextProps.addCancelYesClicked){
      this.setState({addCancelYesClicked: nextProps.addCancelYesClicked}, () => {
        this.handleEditButtonClick('Cancel');
      })
    }

    if (nextProps.searchBy) {
      this.setState({filter: nextProps.searchBy, disableHistory: nextProps.disableHistory, showHistory : nextProps.showHistory, flag : nextProps.flag,
                      messageId : nextProps.messageId, isEdit : nextProps.isEdit
        });
    }
  }

  componentWillUnmount() {
    this.setState({value: ''});
  }

  onSearchChange = (event) => {
    this.setState({value: event.target.value});
    this.props.onChange(event);
  }

  handleEditButtonClick = (string) => {


    if( string === 'Edit') {

        this.props.fetchInactiveData();

        this.setState({
        editMode: true,
  	    isEditClicked: true,
        isCancelClicked: false,
        disableHistory: true
        });
        this.props.setEditModeActive('false');
        this.props.onButtonClick('Edit');

      }
    if( string === 'Add') {
        this.setState({
  	    isAddClicked: true,
        isCancelClicked: false,
        disableHistory: true,
        });
        this.props.onButtonClick('Add');
      }
    if( string === 'Cancel') {
      if(this.props.addProgramValueFlag){

           if(!this.props.isAdd){
           //Cancel for Edit Mode
             this.setState({
               isAddClicked: false,
               isUserAuthorised: true,
               isCancelClicked: true,
               showEdit: true,
               editMode: false,
               disableHistory: false,
               addCancelYesClicked:false
           });

           }
           else{

             if(this.state.addCancelYesClicked){
               this.setState({
               isAddClicked: false,
               isUserAuthorised: true,
               isCancelClicked: true,
               showEdit: true,
               editMode: false,
               disableHistory: false,

             });
             }

             else if(this.props.isAdd && this.state.isAddClicked && !(this.props.addProgramValue)){
               //Cancel for Add Mode
               this.setState({
                 isAddClicked: false,
                 isUserAuthorised: true,
                 isCancelClicked: true,
                 showEdit: true,
                 editMode: false,
                 disableHistory: false,
                 addCancelYesClicked:false
               });
             }
             else{
               //Cancel for Add Mode When value is selected
                 this.setState({
                 isAddClicked: false,
                 isUserAuthorised: true,

               });
             }

       }

         this.props.onButtonClick('Cancel');

       }
    }
  }

  renderEditButton(disableContainer){

    if(this.state.isUserAuthorised && this.props.category != "Business Entity" && this.props.category != "Corporate Entity"){

        if((((this.props.showEdit || this.state.showEdit) && !this.state.editMode) || this.props.okClick || this.props.addOkClicked )
        && (
            (this.props.dateSelectedIndex != undefined && this.props.dateSelectedIndex.length == 0)
            || (this.props.addProgramValueFlag != undefined &&  !this.props.addProgramValueFlag)
            ||(this.props.addOkClicked)
          )
        ){
        return(
          <div id="hide1" className= { pcActionBar.item + ' ' + pcCommon.alignRight + ' ' +disableContainer}>
           <ul>
             <li>
               <button id="openUpdate" type="button" title="Edit"
                 onClick={() => this.handleEditButtonClick('Edit')}>
                 <label>Edit</label>
               </button>
             </li>
           </ul>
         </div>

        )
      }

    }
    else{
      return(null)
    }

  }

  renderCancelAddSection(disableContainer){
    if((this.state.isEditClicked  && !this.state.isCancelClicked && !this.props.okClick && !this.props.addOkClicked)
      || ( this.props.dateSelectedIndex != undefined && !this.props.dateSelectedIndex.length == 0)
      ){

      return(
        <div id="hide2" className= { pcActionBar.item + ' ' + pcCommon.alignRight + ' ' + pcNodeHeader.component + ' ' + disableContainer}>
        <ul>
          <li>
            <button id="cancelUpdate" type="button" title="Cancel"
              className={pcNodeHeader.cancelBtn}
              onClick={() => this.handleEditButtonClick('Cancel')}>
              <label>Cancel</label>
            </button>
          </li>
          <li>
            <button id="submitUpdate" type="button" title="Add"
              className={ this.props.editModeActive ? pcNodeHeader.submitBtn + ' ' + pcCommon.disableBtn
                        :  pcNodeHeader.submitBtn}
              onClick={() => this.handleEditButtonClick('Add')}>
              <label>Add</label>
            </button>
          </li>
        </ul>
        </div>


      )

    }
    else{
      return(null);
    }
  }

  renderHistory(disableContainer){
    if(((this.props.showHistory && !this.state.disableHistory) || this.props.okClick ||  this.props.addOkClicked)
    &&  (this.props.dateSelectedIndex != undefined && this.props.dateSelectedIndex.length == 0)
    ){
      return(
        <div className={pcCommon.addPad + ' ' +pcActionBar.item+ ' ' + pcCommon.alignRight + ' ' + disableContainer}>

            <input type="checkbox"
            defaultChecked = {!this.props.flag ? false : true}
          // checked ={ this.props.flag  ? true : false}
          onClick={this.props.fetchInactiveData}
          id="historySwitch" className={pcCommon.hide}
          />
            <label className={pcActionBar.inputSwitch} htmlFor="historySwitch">
            {
              !this.props.flag ?
              <FA  name= "" className={pcActionBar.icon}/> :
              <FA name="check" className={pcActionBar.icon}/>
            }
                Show History
          </label>

        </div>
      )
    }
    else{
      return(null)
    }
  }


  render() {


    const {containerStyle} =this.props ;
    return (
      <div>

        <div className={pcActionBar.actionBar}>
            {
              this.props.disableUpdateButton ?
              this.renderEditButton(containerStyle)
              : null
            }

            {
              this.renderCancelAddSection(containerStyle)
            }

            {
              this.renderHistory(containerStyle)
            }

           </div>

          <div className={pcNodeHeader.nodeHeader}>
            <h2 className={pcCommon.alignLeft}>{this.props.providerType} Information</h2>
          </div>

      </div>


    )
  }
}

export default NodeHeader;

NodeHeader.propTypes = {
  onChange: PropTypes.func,
}
