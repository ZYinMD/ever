import React from 'react';

// styles
import styles from './styles.css';

const ExpandedRow = ({children}) => (
    <tr className={styles.expTR}>
        <td className={styles.expTD} colSpan={"12"}>
            {children}
        </td>
    </tr>
);

export default ExpandedRow;