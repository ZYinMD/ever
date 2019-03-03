import React from 'react';

// styles
import styles from '../Table.css';

//fa
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "fa5-pro-solids";

const AlertRow = ({message}) => (
    <tr>
        <td className={styles.alertContainer} colSpan={"12"}>
            <FontAwesomeIcon className={styles.icon} icon={faExclamationTriangle} />
            <span>{message}</span>
        </td>
    </tr>
);

export default AlertRow;