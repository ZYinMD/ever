import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';
import styles from './Card.css';
import iconLookup from './iconLookup.js';

export default class Card extends PureComponent {
  renderBody(body) {
    // if body is a string containing one space, need to render it properly, otherwise the title is centered
    if (body === ' ')
      return <p className={styles.body}>&nbsp;</p>;
    // if body is array, return a <p> for each element
    if (Array.isArray(body))
      return body.map((row, index) => <p key={index} className={styles.body}>{row}</p>);
    // otherwise it's usually a string
    else
      return <p className={styles.body}>{body}</p>;
  }

  render() {
    const { title, body, noAutoCap } = this.props;
    if (!body) return null; // if no body, don't display the card
    const icon = iconLookup[title];
    const titleStyle = noAutoCap ? {} : { textTransform: 'uppercase' };
    return (
      <div className={styles.card}>
        <div className={styles.left}>
          <figure>
            <div className={styles.icon}>
              <FontAwesomeIcon icon={icon} />
            </div>
          </figure>
        </div>
        <div className={styles.right}>
          <p className={styles.title} style={titleStyle}>{_.truncate(title, 25)}</p>
          {this.renderBody(body)}
        </div>
      </div>
    );
  }
}
