import React, { Component } from 'react';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../../withRoot';

const styles = {
	title: {
	  color: '#fff'
	},
	titleBar: {
	  background:
		'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
	}
};

class SingleLineGrid extends Component {
	render() {
		const { classes, data } = this.props;
		const restaurant = data;
		return (
			<GridListTile>
				<img src="https://material-ui.com/static/images/grid-list/breakfast.jpg" alt={restaurant.name} />
				<GridListTileBar
					title={restaurant.name}
					classes={{
						root: classes.titleBar,
						title: classes.title,
					}}
				/>
			</GridListTile>
		)
	}
}

SingleLineGrid.propTypes = {
	classes: PropTypes.object.isRequired,
	data: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(SingleLineGrid));
