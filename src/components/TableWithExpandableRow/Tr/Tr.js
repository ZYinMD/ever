import React, { PureComponent, Fragment } from 'react';

import styles from '../Table.css';
import pcCommon from '../../../assets/styles/pcCommon.css';

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAlphaDown, faSortAlphaUp, faSortNumericDown, faSortNumericUp, faCalendarAlt } from "fa5-pro-regular";
import { faPencil, faTimesCircle, faCheckCircle } from "fa5-pro-solids";

// components
import DatePicker from '../../DatePicker';
import Tooltip from '@material-ui/core/Tooltip';

export default class Tr extends PureComponent {

  handleExpandClick = () => {
    if ( this.props.header || this.props.editing) return;
    this.props.handleExpandClick()
  }

  handleSubmitClick = () => {
    const { handleSubmitClick, submitDisabled } = this.props;
    if (!submitDisabled) this.props.handleSubmitClick();
  }

  render() {
    var {
      data,
      header,
      isExpanded,
      handleEditClick,
      handleSortClick,
      sortable,
      sortableNumber,
      editable,
      editing,
      handleCancelClick,
      handleSubmitClick,
      submitDisabled,
      onInputChange,
      inputDefaultValue,
      inputId,
      wrapperId,
      minDate,
      wasEdited,
      hasError
    } = this.props;

    if (!Array.isArray(data))
      data = Object.values(data);

    const renderCell = header ?
      (item, index) => {
        // determine whether the row is editable and then if it is currently editing.
        const isEditable = index === editable;
        const isEditing = !!editing && isEditable;
        ///////////////////////////////////////
        return <td key={index} className={(isEditing ? styles.editing : '') + ' ' + (isEditable ? styles.editHeader : '') }>{item}
          {Array.isArray(sortable) && sortable.includes(item) &&
            <FontAwesomeIcon className={styles.sortIcon + ' ' + styles.icon} onClick={handleSortClick} icon={faSortAlphaDown}/>}
          {Array.isArray(sortableNumber) && sortableNumber.includes(item) &&
            <FontAwesomeIcon className={styles.sortIcon + ' ' + styles.icon} onClick={handleSortClick} icon={faSortNumericDown}/>}

          {/* icons for editing column*/}
          {isEditing &&
            <FontAwesomeIcon
              className={styles.submitIcon + ' ' + pcCommon.alignRight + ' ' + (submitDisabled ? styles.disabled : '') + ' ' + styles.icon}
              icon={faCheckCircle}
              onClick={this.handleSubmitClick}
            />
          }
          {isEditing &&
            <FontAwesomeIcon
              className={styles.cancelIcon + ' ' + pcCommon.alignRight + ' ' + styles.icon}
              icon={faTimesCircle}
              onClick={handleCancelClick}
            />
          }

          {/* edit pencil icon for editable column header*/}
          {isEditable && !isEditing &&
            <Tooltip title='Edit/Update'>
              <span className={styles.editIconContainer} onClick={handleEditClick}>
                <FontAwesomeIcon className={styles.editIcon} icon={faPencil}/>
              </span>
            </Tooltip>
          }
        </td>
       } :
      (item, index) => {
        // determine whether the row is editable and then if it is currently editing.
        const isEditable = index === editable;
        const isEditing = !!editing && isEditable;
        /////////////////////////////////////
        return <td className={isEditing ? styles.editing : ''} key={index}>
          {isEditing ?
            <DatePicker
              handleOnChange={onInputChange}
              minDate={minDate}
              defaultDate={inputDefaultValue}
              wasEdited={wasEdited}
              hasError={hasError}
            />
            : item}
        </td>
      }
    return <tr onClick={this.handleExpandClick} className={isExpanded ? styles.expanded : ''}>{data.map(renderCell)}</tr>
  }
}