import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import MachineDetails from './MachineDetails';
import { createMemoryHistory } from 'history';
import { Router, Route } from 'react-router-dom';
import '@testing-library/jest-dom';
import * as actions from '../../store/actions';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('MachineDetails Component', () => {
	let store;
	let container;

	beforeEach(() => {
		store = mockStore({
			Machines: {
				machines: [
					{
						id: 'asdvnasld',
						name: 'g1',
						'ip_address': '12.214.22',
						health: 62
					},
					{
						id: 'vnzxvlasdlqw',
						name: 'g2',
						'ip_address': '22.2124.21',
						health: 33
					},
					{
						id: 'avnlaskdfjq23',
						name: 'g13',
						'ip_address': '123.214.22',
						health: 62
					},
					{
						id: 'asvnasfdlkq23423',
						name: 'g2s',
						'ip_address': '225.2124.21',
						health: 33
					}
				],
				machine: {
					id: 'asdvnasld',
					name: 'g1',
					'ip_address': '12.214.22',
					health: 62
				},
				loading: false,
				error: null
			}
		});

		store.dispatch = jest.fn();

		const history = createMemoryHistory();
		history.push('/machines/asdvnasld');


		container = render(
			<Provider store={store} >
				<Router history={history}>
					<Route exact path='/machines/:id'>
						<MachineDetails />
					</Route>
				</Router>
			</Provider>
		);
	});
	test('show correct info of machine', () => {
		const { getByPlaceholderText, getByTestId } = container;

		expect(getByPlaceholderText('Machine Name').value).toBe('g1');
		expect(getByTestId('machineHealth')).toHaveTextContent('62');
		expect(getByTestId('machineIp')).toHaveTextContent('Machine IP Address: 12.214.22');
	});
	test('Update machine name on submit', () => {
		const { getByDisplayValue } = container;

		fireEvent.keyDown(getByDisplayValue('g1'), { key: 'Enter', code: 13 });
		expect(store.dispatch).toHaveBeenCalledTimes(2);
		expect(store.dispatch).toHaveBeenNthCalledWith(
			2,
			actions.updateMachineName({
				id: 'asdvnasld',
				name: 'g1',
				'ip_address': '12.214.22',
				health: 62
			})
		);
	});
});
