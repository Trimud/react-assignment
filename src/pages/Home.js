import React from 'react';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import withRoot from '../withRoot';
import { withStyles } from '@material-ui/core/styles';

const Home = props => (
  <div>
    <h1>Home</h1>
    <p>Welcome home!</p>
    <button onClick={() => props.changePage()}>Go to about page via redux</button>
  </div>
)

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/about-us')
}, dispatch)

export default withRoot(compose(
	withStyles(styles),
	connect(mapStateToProps),
)(Home)