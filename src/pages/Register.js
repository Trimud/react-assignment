import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';

const styles = theme => ({
  root: {
	textAlign: 'center'
  }
});

class Register extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        Register
      </div>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Register));
