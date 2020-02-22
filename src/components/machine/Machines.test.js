import React from 'react';
import { render, wait } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Machines from './Machines';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Machines Component', () => {
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
				machine: {},
				loading: false,
				error: null
			}
		});

		container = render(
			<Provider store={store} >
				<BrowserRouter>
					<Machines />
				</BrowserRouter>
			</Provider>
		);
	});

	test('Show Correct title on Machines List', () => {
		const { getByTestId } = container;
		expect(getByTestId('listTitle').textContent).toBe('All Machines');
	});

	test('Render all Machine on List', () => {
		const { getAllByTestId } = container;

		expect(getAllByTestId('machineEach').length).toBe(4);
	});

	test('Show the correct machine name on each list item', () => {
		const { getAllByTestId } = container;

		wait(() => {
			getAllByTestId('machineName');
		});

		const machineNames = getAllByTestId('machineName');

		expect(machineNames[0].textContent).toBe('Machine Name: g1');
		expect(machineNames[1].textContent).toBe('Machine Name: g2');
		expect(machineNames[2].textContent).toBe('Machine Name: g13');
		expect(machineNames[3].textContent).toBe('Machine Name: g2s');

	});

	test('Show the correct machine id address on each list item', () => {
		const { getAllByTestId } = container;

		wait(() => {
			getAllByTestId('machineIp');
		});

		const machineIp = getAllByTestId('machineIp');

		expect(machineIp[0].textContent).toBe('Machine IP Address: 12.214.22');
		expect(machineIp[1].textContent).toBe('Machine IP Address: 22.2124.21');
		expect(machineIp[2].textContent).toBe('Machine IP Address: 123.214.22');
		expect(machineIp[3].textContent).toBe('Machine IP Address: 225.2124.21');
	});

	test('Link on correct link address on each machine list item', () => {
		const { getAllByTestId } = container;

		wait(() => {
			getAllByTestId('machineIp');
		});

		const machineLinks = getAllByTestId('machineLink');

		expect(machineLinks[0]).toHaveAttribute('href', '/machines/asdvnasld');
		expect(machineLinks[1]).toHaveAttribute('href', '/machines/vnzxvlasdlqw');
		expect(machineLinks[2]).toHaveAttribute('href', '/machines/avnlaskdfjq23');
		expect(machineLinks[3]).toHaveAttribute('href', '/machines/asvnasfdlkq23423');
	});

	test('Show the correct number of health status on heart icon', () => {
		const { getAllByTestId } = container;

		wait(() => {
			getAllByTestId('machineHealth');
		});

		const machineHealths = getAllByTestId('machineHealth');

		expect(machineHealths[0]).toHaveTextContent('62');
		expect(machineHealths[1]).toHaveTextContent('33');
		expect(machineHealths[2]).toHaveTextContent('62');
		expect(machineHealths[3]).toHaveTextContent('33');
	});
});
