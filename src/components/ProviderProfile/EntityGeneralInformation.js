import React, {PropTypes, Component} from 'react';
import styles from './css/profile.css';
import FA from 'react-fontawesome';
import Popover from 'react-simple-popover';
import Spinner from '../Spinner';
import NodeHeader from './NodeHeader.js';

const Helper = require('./ProfileHelper.js');
const StringUtil = require('../Utils/StringUtil.js');
const DataFormat = require('../Utils/DataFormat.js');


class EntityGeneralInformation extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    let data;
    if (this.props.entityData) {
      data = this.props.entityData;
    }
    if (!data) {
      return (
        <div className={styles.paneContent}><Spinner /></div>
      )
    }
    return (
      <div className={styles.paneContent}>
        <NodeHeader providerType={data.category}/>

        { data ?

          <div className={styles.divContainer}>
            <div className={styles.flexContainer}>
              <div className={styles.flexGrid}>
                <div className={styles.thirdContainer}>

                  <div className={styles.flexGridContainer}>
                    <div className={styles.sectionHeder}>
                      General Information
                    </div>

                    <div className={styles.subContainer}>
                      <div className={styles.flexGridItem_col2}>
                        <label className={styles.infoCardHeadings}>Name</label>
                        <div className={styles.nameCardData}>
                          { data ? StringUtil.psvUpperCase(data.displayName) : '' }
                        </div>
                      </div>

                      <div className={styles.flexGridItem_col2}>
                        <label className={styles.infoCardHeadings}>Category</label>
                        <div className={styles.infoCardData}>
                          { data ? data.category : '' }
                        </div>
                      </div>
                      {
                        ((data.providerDetailTypeName !== 'Corporate Entity') ?
                            <div className={styles.flexGridItem_col2}>
                              <label className={styles.infoCardHeadings}>Tax ID</label>
                              <div className={styles.infoCardData}>
                                { data.formattedTaxId ? DataFormat.maskTaxID(data.taxIdType, data.formattedTaxId) : '' }
                              </div>
                            </div>
                            : ''
                        )
                      }
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
          : ''
        }
      </div>
    )
  }
}

export default EntityGeneralInformation;
