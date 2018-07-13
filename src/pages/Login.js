import React from 'react';
import { connect } from "react-redux";
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ErrorMessage from "./includes/ErrorMessage";
import { login, user } from "../actions/userActions";
import { getUserType } from "../api/kinveyRequester";
import history from "../helpers/history";
import { withRouter } from 'react-router-dom';

const styles = theme => ({
  container: {
	padding: 20,
	'*': {
		boxSizing: 'border-box'
	}
  },
  display1: {
	  margin: '8px 0'
  },
  textField: {
	width: '100%',
	maxWidth: 400
  },
  button: {
	  display: 'inline-block',
	  clear: 'both',
	  margin: '20px 0 0',
  },
  welcome: {
	  textAlign: 'center'
  }
});

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit = (e) => {
		//Make a network call somewhere
		e.preventDefault();
		const username = document.getElementById('username').value;
		const password = document.getElementById('password').value;
		this.props.dispatch(login(username, password));
		this.props.dispatch(user(getUserType()));
	}

	render() {
		const { classes, loginFormState, loggedin } = this.props;

		if (loggedin) {
			return <div className={classes.welcome}>
				<div className={classes.container}>
					<Typography variant="headline" gutterBottom>
						Welcome back!
					</Typography>
				</div>
			</div>;
		}

		return (
			<div className={classes.container}>
				<Typography
					className={classes.display1}
					variant="display1"
				>
					Login
				</Typography>
				<ErrorMessage />
				<form onSubmit={this.handleSubmit}>
					<TextField
						name="username"
						id="username"
						label="Username"
						className={classes.textField}
						// helperText="Please enter username"
						margin="normal"
					/>
					<TextField
						name="password"
						id="password"
						label="Password"
						type="password"
						className={classes.textField}
						// helperText="Please enter username"
						margin="normal"
					/>
					<Button
						variant="contained"
						color="primary"
						className={classes.button}
						type="submit"
					>
						Sign in
					</Button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	userType: state.userType,
	loginFormState: state.loginFormState,
	loggedin: state.loggedin
});

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  userType: PropTypes.string.isRequired,
  loginFormState: PropTypes.object.isRequired,
  loggedin: PropTypes.bool.isRequired,
};

export default withRoot(compose(
	withStyles(styles),
	withRouter,
	connect(mapStateToProps)
)(Login));
