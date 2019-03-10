import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import GeneralProfile from './components/GeneralProfile';
import data from './mockData';
import c from './redux/constants';

class App extends PureComponent {
  componentDidMount = () => {
    this.props.dispatch({
      type: c.PUT_DATA_TO_STORE,
      payload: data,
    });
  }

  render() {
    return <GeneralProfile />;
  }
}

export default connect(null, null)(App);
