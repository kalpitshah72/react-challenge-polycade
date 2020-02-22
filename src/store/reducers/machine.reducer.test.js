import machineReducer from './machine.reducer';
import * as actions from '../actions';
import antd from 'antd';

jest.mock('antd', () => {
	return {
		notification: {
			success: jest.fn(),
			error: jest.fn()
		}
	};
});

const normalState = {
	loading: false,
	machines: [
		{
			id: 'askfasdflk',
			name: 'g1',
			health: 55,
			ip_adress: '1234.2134.1234'
		},
		{
			id: 'asaskfasdflk',
			name: 'g34',
			health: 35,
			ip_adress: '1224.2134.1234'
		}
	],
	machine: {
		id: 'askfasdflk',
		name: 'g1',
		health: 55,
		ip_adress: '1234.2134.1234'
	}
};

describe('Machine Reducer', () => {
	test('should return initial state', () => {
		const expectedState = {
			machines: [],
			machine: {},
			loading: false,
			error: null
		};

		expect(machineReducer(undefined, {})).toEqual(expectedState);
	});

	test('add loading state on machines data request', () => {
		expect(machineReducer({}, actions.getMachines())).toEqual({
			loading: true
		});
	});

	test('add machines data on state when machine data gets sucessfully', () => {
		expect(machineReducer({}, actions.getMachinesSuccess({
			name: 'g1',
			id: 'asflasdflsaf',
			health: 44,
			ip_adress: '12412.41234124.124'
		}))).toEqual({
			loading: false,
			machines: {
				name: 'g1',
				id: 'asflasdflsaf',
				health: 44,
				ip_adress: '12412.41234124.124'
			}
		});
	});

	test('add error on state when getting machine data fails', () => {
		expect(machineReducer({}, actions.getMachinesFail([{
			message: 'error on server'
		}]))).toEqual({
			loading: false,
			errors: [{ message: 'error on server' }]
		});
	});

	test('should update machine health info', () => {
		expect(machineReducer(normalState, actions.updateMachineHealth({
			health: 45,
			id: 'askfasdflk',
			ip_adress: '1224.2134.1234',
			name: 'g1'
		}))).toEqual({
			'loading': false,
			'machine': {
				'health': 55,
				'id': 'askfasdflk',
				'ip_adress': '1234.2134.1234',
				'name': 'g1'
			},
			'machines': [
				{
					'health': 55,
					'id': 'askfasdflk',
					'ip_adress': '1234.2134.1234',
					'name': 'g1'
				},
				{
					'health': 35,
					'id': 'asaskfasdflk',
					'ip_adress': '1224.2134.1234',
					'name': 'g34'
				}
			]
		});
	});

	test('success message on machine name update', () => {
		machineReducer(
			normalState,
			actions.updateMachineNameSuccess());
		expect(antd.notification.success).toHaveBeenCalledTimes(1);
	});

	test('error message on machine name update fail', () => {
		machineReducer(
			normalState,
			actions.updateMachineNameFail());
		expect(antd.notification.error).toHaveBeenCalledTimes(1);
	});

	test('Get a machine by it\'s id', () => {
		expect(machineReducer(normalState, actions.getMachineById())).toEqual(
			Object.assign(normalState, { loading: true })
		);
	});

	test('update state when getting machine data is success', () => {
		expect(machineReducer({
			loading: true,
			machine: undefined
		},
			actions.getMachineByIdSuccess(normalState.machine)))
			.toEqual({
				loading: false,
				machine: normalState.machine
			});
	});

	test('error on state when getting machine data is failed', () => {
		expect(machineReducer({
			loading: true,
			machine: undefined
		},
			actions.getMachineByIdFail({
				message: 'a error'
			})))
			.toEqual({
				loading: false,
				machine: undefined,
				errors: { message: 'a error' }
			});
	});
});
