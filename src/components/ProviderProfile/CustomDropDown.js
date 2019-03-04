import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import pcInputs from "../../assets/styles/pcInputs.css";
import FA from 'react-fontawesome';

export default class CustomDropDown extends React.Component{

  constructor(props){
    super(props);
    this.state={
      visible: true,
    }
  }

  componentDidMount() {
    document.addEventListener('click',
    this.handleClickOutside.bind(this), true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside.bind(this), true);
  }


  handleClickOutside(event,data) {
    if (this.state.visible) {
      if (this._reactInternalInstance != null) {
        const domNode = ReactDOM.findDOMNode(this);
        if (!domNode || !domNode.contains(event.target)) {
          this.setState({
            visible: false
          });
          this.props.DropDownVisibleStatus(this.state.visible)
        }
      }
    }

  }


  render() {

    return (
      <div id="dropDownContainer" className={pcInputs.dropDown} style ={this.props.styleData}>
        <ul>
          {
            this.props.dataSet &&  this.props.dataSet.map((result, index)=> {
              return(
                <li key={index}>
                  <span className={this.props.styles}>{result[this.props.elementType]}</span>
                </li> 
              )
            })
          }
        </ul>
      </div>
    )

  }

}

CustomDropDown.propTypes = {
  styleData: PropTypes.object.isRequired,
  dataSet: PropTypes.array.isRequired,
  elementType:PropTypes.string.isRequired,
  className: PropTypes.func,
};



