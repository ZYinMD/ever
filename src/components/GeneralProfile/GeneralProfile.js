import React, { PureComponent } from 'react';
import styles from './GeneralProfile.css';
import NodeHeader, { HorizontalNav, Tab } from '../NodeHeader';
import Tabs from './TabPages';
import data from './mockData/mockGeneralprofile.json';
import decideTabTitle from './helpers/decideTabTitle';

class GeneralProfile extends PureComponent {
  state = { currentTab: 'Info' }

  changeTab = function (tab) {
    this.setState({ currentTab: tab });
  }

  renderTabTitles() {
    // tab here is the name of the component, tabTitle is the title it displays on the nav bar
    return Object.keys(Tabs).map((tab) => {
      const tabTitle = decideTabTitle(tab, data);
      if (tab === this.state.currentTab)
        return <Tab text={tabTitle} key={tabTitle} active />;
      else
        return <Tab text={tabTitle} key={tabTitle} onClick={() => { this.changeTab(tab); }} />;
    });
  }

  renderTabContent() {
    // TabCotent is the component that displays the body of the page, Tabs is the object imported on line 4, consisting of 5 such components
    const TabContent = Tabs[this.state.currentTab];
    return (
      <div className={styles.nonFluidContainer}>
        <TabContent data={data} />
      </div>
    );
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
            {this.renderTabTitles()}
          </HorizontalNav>
        </NodeHeader>
        {this.renderTabContent()}
      </div>
    );
  }
}

export default GeneralProfile;
