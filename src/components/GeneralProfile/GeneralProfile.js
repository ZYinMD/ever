import React, { PureComponent } from 'react';
import styles from './GeneralProfile.css';
import NodeHeader, { HorizontalNav, Tab } from '../NodeHeader';
import Tabs from './TabPages';

class GeneralProfile extends PureComponent {
  state = { currentTab: 'License' }

  changeTab = function (tab) {
    this.setState({ currentTab: tab });
  }

  renderTabNames() {
    return Object.keys(Tabs).map((tabName) => {
      if (tabName === this.state.currentTab)
        return <Tab text={tabName} active />;
      else
        return <Tab text={tabName} onClick={() => { this.changeTab(tabName); }} />;
    });
  }

  render() {
    return (
      <div className={styles.centerChild}>
        <NodeHeader
          name="Crystal J. Ankney"
          category="Supplier Individual"
          topBorderColor="#ff6a6b"
          button1
          button2
        >
          <HorizontalNav>
            {renderTabNames}
          </HorizontalNav>
        </NodeHeader>
        <div className={styles.nonFluidContainer} />

      </div>
    );
  }
}

export default GeneralProfile;
