import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../../withRoot';

const styles = theme => ({
	root: {
	  display: 'flex',
	  flexWrap: 'wrap',
	  justifyContent: 'space-around',
	  overflow: 'hidden',
	  backgroundColor: theme.palette.background.paper
	},
	gridList: {
	  flexWrap: 'nowrap',
	  // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
	  transform: 'translateZ(0)',
	},
	title: {
	  color: '#fff',
	},
	titleBar: {
	  background:
		'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
	}
});

// Shuffle array order so that we don't always show same restaurants initially
const shuffleArray = arr => (
	arr
	  .map(a => [Math.random(), a])
	  .sort((a, b) => a[0] - b[0])
	  .map(a => a[1])
);

class SingleLineGrid extends Component {
	render() {
		const { classes, data } = this.props;
		const restaurants = shuffleArray(data);
		return (
			<div className={classes.root}>
				<GridList className={classes.gridList} cols={1.5}>
				{restaurants.map(restaurant => (
					<GridListTile key={restaurant._id}>
					<img
						src={restaurant.image._downloadURL}
						alt={restaurant.name}
					/>
					<GridListTileBar
						title={restaurant.name}
						classes={{
						root: classes.titleBar,
						title: classes.title,
						}}
					/>
					</GridListTile>
				))}
				</GridList>
			</div>
		)
	}
}

SingleLineGrid.propTypes = {
	classes: PropTypes.object.isRequired,
	data: PropTypes.array.isRequired
};

export default withRoot(withStyles(styles)(SingleLineGrid));
