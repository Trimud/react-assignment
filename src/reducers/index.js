
import restaurants from '../reducers/restaurantsReducer';
import users from '../reducers/usersReducer';
import initialState from './initialState';

const reducers = [
  restaurants,
  users
];

// Combine reducers
export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Put global reducers here
    default:
      newState = state;
      break;
  }
  return reducers.reduce((s, r) => r(s, action), newState);
}
