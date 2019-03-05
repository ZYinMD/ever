import React, { PureComponent, Fragment } from 'react';

// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAlphaDown, faSortAlphaUp, faSortNumericDown, faSortNumericUp, faCalendarAlt } from 'fa5-pro-regular';
import { faPencil, faTimesCircle, faCheckCircle } from 'fa5-pro-solids';
import pcCommon from '../../../assets/styles/pcCommon.css';
import styles from '../Table.css';

export default class Tr extends PureComponent {
  handleExpandClick = () => {
    if (this.props.header) return;
    this.props.handleExpandClick();
  }

  render() {
    let { data, header, isExpanded, handleEditClick, handleSortClick, sortable, sortableNumber, editable, editing, handleCancelClick, handleSubmitClick } = this.props;

    if (!Array.isArray(data)) { data = Object.values(data); }

    const renderCell = header
      ? (item, index) => {
        // determine whether the row is editable and then if it is currently editing.
        const isEditable = index === editable;
        const isEditing = !!editing && isEditable;
        // /////////////////////////////////////
        return (
          <td key={index} className={(isEditing ? styles.editing : '') + ' ' + (isEditable ? styles.editHeader : '')}>
            {item}
            {Array.isArray(sortable) && sortable.includes(item)
            && <FontAwesomeIcon className={styles.sortIcon + ' ' + styles.icon} onClick={handleSortClick} icon={faSortAlphaDown} />}
            {Array.isArray(sortableNumber) && sortableNumber.includes(item)
            && <FontAwesomeIcon className={styles.sortIcon + ' ' + styles.icon} onClick={handleSortClick} icon={faSortNumericDown} />}

            {/* icons for editing column */}
            {isEditing && <FontAwesomeIcon className={styles.cancelIcon + ' ' + pcCommon.alignRight} icon={faTimesCircle + ' ' + styles.icon} onClick={handleCancelClick} />}
            {isEditing && <FontAwesomeIcon className={styles.submitIcon + ' ' + pcCommon.alignRight} icon={faCheckCircle + ' ' + styles.icon} onClick={handleSubmitClick} />}

            {/* edit pencil icon for editable column header */}
            {isEditable && !isEditing
            && (
            <span className={styles.editIconContainer} onClick={handleEditClick}>
              <FontAwesomeIcon className={styles.editIcon} icon={faPencil} />
            </span>
            )
          }
          </td>
        );
      }
      : (item, index) => {
        // determine whether the row is editable and then if it is currently editing.
        const isEditable = index === editable;
        const isEditing = !!editing && isEditable;
        // ///////////////////////////////////
        return (
          <td className={isEditing ? styles.editing : ''} key={index}>
            {isEditing ? (
              <Fragment>
                <input className={styles.endDateInput} />
                <FontAwesomeIcon className={styles.calendarIcon + ' ' + styles.icon} icon={faCalendarAlt} />
              </Fragment>
            ) : item}
          </td>
        );
      };
    return <tr onClick={this.handleExpandClick} className={isExpanded ? styles.expanded : ''}>{data.map(renderCell)}</tr>;
  }
}
