import React from 'react';

//fa
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusSquare, faPlusSquare } from "fa5-pro-light";

// styles
import styles from './Table.css';

const ExpandedIcon = ({isExpanded}) => (
    <FontAwesomeIcon
        icon={isExpanded ? faMinusSquare : faPlusSquare}
        className={styles.expandIcon}
    />
);

export default ExpandedIcon;