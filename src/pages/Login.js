import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';
// Router imports
import { Route, Link } from 'react-router';

const styles = theme => ({
  root: {
	textAlign: 'center'
  }
});

class Login extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        Login
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Login));
