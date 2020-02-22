import * as actions from '../actions';
import { notification } from 'antd';

const intialState = {
	machines: [],
	machine: {},
	loading: false,
	error: null
};

export default function machineReducer (state = intialState, { payload, errors, ...action }) {

	switch (action.type) {
		case actions.GET_MACHINES:
			return {
				...state,
				loading: true
			};
		case actions.GET_MACHINES_SUCCESS:
			return {
				...state,
				loading: false,
				machines: payload
			};
		case actions.GET_MACHINES_FAIL:
			return {
				...state,
				loading: false,
				errors
			};
		case actions.UPDATE_MACHINE_HEALTH: {
			const index = state.machines.findIndex(machine => machine.id === action.id);
			const machines = state.machines;
			machines[index] = { ...state.machines[index], health: action.health };
			const isCurrentMachine = state.machine.id === action.id;
			return {
				...state,
				machines: [...machines],
				machine: isCurrentMachine ? { ...state.machine, health: action.health } : state.machine
			};
		}
		case actions.UPDATE_MACHINE_NAME: {
			const index = state.machines.findIndex(machine => machine.id === action.id);
			const machines = state.machines;
			machines[index] = { ...state.machines[index], ...payload };
			const isCurrentMachine = state.machine.id === action.id;
			return {
				...state,
				machines: [...machines],
				machine: isCurrentMachine ? { ...state.machine, ...payload } : state.machine
			};
		}
		case actions.UPDATE_MACHINE_NAME_SUCCESS: {
			notification.success({
				message: 'Success',
				description:
					'Name Updated'
			});
			return {
				...state,
				loading: false
			};
		}
		case actions.UPDATE_MACHINE_NAME_FAIL: {
			notification.error({
				message: 'Failed',
				description:
					'updating name failed'
			});
			return {
				...state,
				loading: false
			};
		}
		case actions.GET_MACHINE_BY_ID:
			return {
				...state,
				loading: true
			};
		case actions.GET_MACHINE_BY_ID_SUCCESS:
			return {
				...state,
				loading: false,
				machine: payload
			};
		case actions.GET_MACHINE_BY_ID_FAIL:
			return {
				...state,
				loading: false,
				errors
			};
		default:
			return state;
	}
}

