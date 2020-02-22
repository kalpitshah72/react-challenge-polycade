import { getMachines, getMachineById, updateMachineName } from './machine.saga';
import * as actions from '../actions/machine.actions';
import { recordSaga } from '../../utils/recordSaga';

const machines = [
	{
		'id': '99ade105-dee1-49eb-8ac4-e4d272f89fba',
		'ip_address': '127.0.0.31',
		'name': 'Machine 1',
		'health': expect.any(Number)
	},
	{
		'id': '4111947a-6c58-4977-90fa-2caaaef88648',
		'ip_address': '127.0.0.4',
		'name': 'Machine 2',
		'health': expect.any(Number)
	},
	{
		'id': '57342663-909c-4adf-9829-6dd1a3aa9143',
		'ip_address': '127.0.0.55',
		'name': 'Machine 3',
		'health': expect.any(Number)
	},
	{
		'id': '5632e1ec-46cb-4895-bc8b-a91644568cd5',
		'ip_address': '127.0.0.3',
		'name': 'Machine 4',
		'health': expect.any(Number)
	}
];

describe('Machine Operations', () => {
	test('get all machines', async () => {
		const initialAction = actions.getMachines;
		const dispatched = await recordSaga(
			getMachines,
			initialAction
		);
		expect(dispatched[0].type).toBe(actions.getMachinesSuccess().type);
	});

	test('get machine by id', async () => {
		const id = machines[0].id;
		const initialAction = actions.getMachineById(id, jest.fn());
		const dispatched = await recordSaga(
			getMachineById,
			initialAction
		);
		expect(dispatched[0].type)
			.toBe(actions.getMachineByIdSuccess(machines[0]).type);
	});

	test('update machine name', async () => {
		const machine = machines[0];
		const initialAction = actions.updateMachineName(machine);
		const dispatched = await recordSaga(
			updateMachineName,
			initialAction
		);
		expect(dispatched[0].type)
			.toBe(actions.updateMachineNameSuccess(machine).type);
	});
});
