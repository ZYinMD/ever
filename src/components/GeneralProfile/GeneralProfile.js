import React, { PureComponent } from 'react';
import styles from './GeneralProfile.css';
import NodeHeader, { HorizontalNav, Tab } from '../NodeHeader';
import TabPages from './TabPages';
import data from './mockData/Z44.json';
import decideTabTitle from './helpers/decideTabTitle';
import { firstNameFirst, getOrgFullName } from './helpers/ProfileHelper';

class GeneralProfile extends PureComponent {
  state = { currentTab: 'BasicInfo' }

  changeTab = function (tabPage) {
    this.setState({ currentTab: tabPage });
  }

  prepareName(data) {
    if (data.individualName)
      return firstNameFirst(data.individualName[0]);
    if (data.organizationName)
      return getOrgFullName(data.organizationName, 'DBA');
    return 'N/A';
  }

  prepareCategory(data) {
    return data.providerDetailTypeName || '';
  }

  renderTabTitles() {
    // tabPage here is the name of the component, tabTitle is the text it displays on the nav bar
    return Object.keys(TabPages).map((tabPage) => {
      const tabTitle = decideTabTitle(tabPage, data);
      if (tabPage === this.state.currentTab)
        return <Tab text={tabTitle} key={tabTitle} active />;
      else
        return <Tab text={tabTitle} key={tabTitle} onClick={() => { this.changeTab(tabPage); }} />;
    });
  }

  renderTabContent() {
    // TabCotent is the component that displays the body of the page, TabPages is the object imported on line 4, consisting of 5 such components
    const TabContent = TabPages[this.state.currentTab];
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
          name={this.prepareName(data)}
          category={this.prepareCategory(data)}
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
