import * as actions from './machine.actions';
describe('machine actions', () => {
	test('should create an action to get all machine data', () => {
		const expectedAction = {
			type: actions.GET_MACHINES
		};
		expect(actions.getMachines()).toEqual(expectedAction);
	});

	test('should create an action to inform all machine data gets succesfully', () => {
		const expectedAction = {
			type: actions.GET_MACHINES_SUCCESS,
			payload: [
				{
					name: 'g1',
					id: 'aslfnqwe1',
					health: 44,
					ip_address: '123.1234.12'
				}
			]
		};
		expect(actions.getMachinesSuccess(expectedAction.payload)).toEqual(expectedAction);
	});

	test('should create an action to inform an error to get all machine data', () => {
		const expectedAction = {
			type: actions.GET_MACHINES_FAIL,
			errors: [
				{ message: 'bad_connection' }
			]
		};
		expect(actions.getMachinesFail(expectedAction.errors)).toEqual(expectedAction);
	});

	test('create an action to get a Machine by it\'s id', () => {
		const data = { id: 'asfasofn' };
		const expectedAction = {
			type: actions.GET_MACHINE_BY_ID,
			id: data.id
		};
		expect(actions.getMachineById(data.id)).toEqual(expectedAction);
	});

	test('create an action to inform get a Machine by it\'s id succesfully', () => {
		const payload = {
			id: 'asfasofn',
			name: 'g1',
			health: 44,
			ip_address: '231.1234.1234'
		};
		const expectedAction = {
			type: actions.GET_MACHINE_BY_ID_SUCCESS,
			payload
		};
		expect(actions.getMachineByIdSuccess(payload)).toEqual(expectedAction);
	});

	test('create an action to inform get a Machine by it\'s id gets errors', () => {
		const errors = [
			{ message: 'server error' }
		];
		const expectedAction = {
			type: actions.GET_MACHINE_BY_ID_FAIL,
			errors
		};
		expect(actions.getMachineByIdFail(errors)).toEqual(expectedAction);
	});

	test('create an action to update machine name', () => {
		const machine = {
			id: 'asfasofn',
			name: 'g1',
			health: 44,
			ip_address: '231.1234.1234',
			setName: 'helo'
		};
		const expectedAction = {
			type: actions.UPDATE_MACHINE_NAME,
			machine
		};
		expect(actions.updateMachineName(machine)).toEqual(expectedAction);
	});

	test('create an action to inform update machine name successfully', () => {
		const payload = {};
		const expectedAction = {
			type: actions.UPDATE_MACHINE_NAME_SUCCESS,
			payload
		};
		expect(actions.updateMachineNameSuccess(payload)).toEqual(expectedAction);
	});

	test('create an action to inform an error on updated machine name', () => {
		const errors = [
			{ message: 'a error' }
		];
		const expectedAction = {
			type: actions.UPDATE_MACHINE_NAME_FAIL,
			errors
		};
		expect(actions.updateMachineNameFail(errors)).toEqual(expectedAction);
	});

	test('create a action to update machine health', () => {
		const data = {
			id: 'asdflasdf',
			health: 55
		};
		const expectedAction = {
			type: actions.UPDATE_MACHINE_HEALTH,
			id: data.id,
			health: data.health
		};
		expect(actions.updateMachineHealth(data.id, data.health)).toEqual(expectedAction);
	});
});
