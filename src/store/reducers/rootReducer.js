import { combineReducers } from 'redux';
import machineReducer from './machine.reducer';

const rootReducer = combineReducers({
	Machines: machineReducer
});

export default rootReducer;
