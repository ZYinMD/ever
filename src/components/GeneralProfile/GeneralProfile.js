import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styles from './GeneralProfile.css';
import pcNodeContainer from '../../assets/styles/pcNodeContainerRR.css';
import NodeHeader, { HorizontalNav, Tab } from '../NodeHeader';
import TabPages from './TabPages';
import decideTabTitle from './helpers/decideTabTitle';
import prepareName from './helpers/prepareName';
import prepareCategory from './helpers/prepareCategory';

class GeneralProfile extends PureComponent {
  state = { currentTab: 'BasicInfo' }

  changeTab = function (tabPage) {
    this.setState({ currentTab: tabPage });
  }

  renderTabTitles(data) {
    // tabPage here is the name of the component, tabTitle is the text it displays on the nav bar
    return Object.keys(TabPages).map((tabPage) => {
      const tabTitle = decideTabTitle(tabPage, data);
      if (tabPage === this.state.currentTab)
        return <Tab text={tabTitle} key={tabTitle} active />;
      else
        return <Tab text={tabTitle} key={tabTitle} onClick={() => { this.changeTab(tabPage); }} />;
    });
  }

  renderTabContent(data) {
    // TabCotent is the component that displays the body of the page, TabPages is the object imported on line 4, consisting of 5 such components
    const TabContent = TabPages[this.state.currentTab];
    return (
      <div className={pcNodeContainer.nodeContentContainer}>
        <div className={styles.centerChild}>
          <div className={styles.almostFluidContainer}>
            <TabContent data={data} />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { data } = this.props;
    if (!data) return null;
    return (
      <div className={pcNodeContainer.nodeParentContainer}>
        <NodeHeader
          name={prepareName(data)}
          category={prepareCategory(data)}
          topBorderColor="#ff6a6b"
          button1
          button2
        >
          <HorizontalNav>
            {this.renderTabTitles(data)}
          </HorizontalNav>
        </NodeHeader>
        {this.renderTabContent(data)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  if (!state.providerProfile.providerGeneralInfo.data)
    return { data: null };
  // if axios returns 404, get data for this poor node by hacking the search result list, else use the axios return
  if (state.providerProfile.providerGeneralInfo.data.errorCode === 404) {
    const axiosURL = state.providerProfile.providerGeneralInfo.config.url;
    const providerId = axiosURL.slice(axiosURL.lastIndexOf('/') + 1);
    return { data: state.searchReducer.providerSearch.data.filter(i => i.providerId == providerId) };
  }
  return { data: state.providerProfile.providerGeneralInfo.data };
}

export default connect(mapStateToProps)(GeneralProfile);
