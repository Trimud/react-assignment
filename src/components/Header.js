import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Food from '@material-ui/icons/RestaurantMenu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';
import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {
	flexGrow: 1,
	textAlign: 'center'
  },
  flex: {
    flex: 1,
  },
  header: {
	  background: theme.palette.primary.main
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  logoIcon: {
	  verticalAlign: 'middle'
  },
  homeMenuLink: {
    color: '#fff'
  },
  menuLink: {
    color: 'rgba(0, 0, 0, 0.87)',
    textDecoration: 'none'
  }
});

class Header extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
  };

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.header}>
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <Link to="/" className={classes.homeMenuLink} id="home"><HomeIcon /></Link>
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              <Food className={classes.logoIcon}/> Foodelicious
            </Typography>
            {auth && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>
                    <Link to="/login" className={classes.menuLink}>Login</Link>
                  </MenuItem>
                  <MenuItem onClick={this.handleClose}>
                    <Link to="/register" className={classes.menuLink}>Register</Link>
                  </MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Header));
