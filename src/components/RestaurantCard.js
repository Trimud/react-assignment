import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import LanguageIcon from '@material-ui/icons/Language';
import { Link } from 'react-router-dom';
import compose from 'recompose/compose';
import { connect } from "react-redux";
import withRoot from '../withRoot';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
	root: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		flexGrow: 1,
	  justifyContent: 'center',
		overflow: 'hidden',
		maxWidth: 1200,
		paddingTop: 50,
		[theme.breakpoints.down('md')]: {
			paddingTop: 20
    },
    background: 'none'
	},
  card: {
		maxWidth: 800,
		margin: '3px 10px',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
	},
	site: {
		marginTop: 8
	}
});

class RestaurantCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes, data } = this.props;

    const restaurant = data;

    if ( Object.keys(restaurant).length === 0 && restaurant.constructor === Object ) {
      return <div>Error</div>
    } else {

      return (
        <div className={classes.root}>
          <Card className={classes.card} key={restaurant._id}>
            <CardHeader
              avatar={
                <Avatar aria-label="Recipe" className={classes.avatar}>
                  {restaurant.name.charAt(0)}
                </Avatar>
              }
              action={
                <IconButton href={restaurant.site} className={classes.site} aria-label="Visit web site">
                  <LanguageIcon />
                </IconButton>
              }
              title={restaurant.name}
              subheader={restaurant.address}
            />
            <Link to={`/restaurant/${restaurant._id}`}>
              <CardMedia
                className={classes.media}
                image={restaurant.image._downloadURL}
                title={restaurant.name}
              />
            </Link>
            <CardContent>
              <Typography component="p">
                {restaurant.description}
              </Typography>
            </CardContent>
          </Card>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  restaurantData: state.restaurantData
});

RestaurantCard.propTypes = {
  classes: PropTypes.object.isRequired,
  restaurantData: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
};

export default withRoot(compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps)
)(RestaurantCard));
