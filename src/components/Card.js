import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
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
		}
	},
  card: {
		maxWidth: 400,
		margin: 10,
		// xs: > 0; sm: > 600; md: > 960; lg: > 1280
		[theme.breakpoints.between('xs', 'sm')]: {
			maxWidth: 460
		},
		[theme.breakpoints.between('sm', 'md')]: {
			maxWidth: 230
		},
		[theme.breakpoints.between('md', 'lg')]: {
			maxWidth: 320
		},
		[theme.breakpoints.up('lg')]: {
			maxWidth: 380
		}
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

class RecipeReviewCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes, data } = this.props;

    const restaurants = data;

    return (
      <div className={classes.root}>
      {restaurants.map(restaurant => (
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
              {restaurant.description.substring(0,130)+"..."}
            </Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton aria-label="Add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="Share">
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  restaurantData: state.restaurantData
});

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
  restaurantData: PropTypes.object.isRequired
};

export default withRoot(compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps)
)(RecipeReviewCard));
