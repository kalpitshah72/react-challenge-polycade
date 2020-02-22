export const GET_MACHINES = 'GET_MACHINES';
export const GET_MACHINES_SUCCESS = 'GET_MACHINES_SUCCESS';
export const GET_MACHINES_FAIL = 'GET_MACHINES_FAIL';

export const GET_MACHINE_BY_ID = 'GET_MACHINE_BY_ID';
export const GET_MACHINE_BY_ID_SUCCESS = 'GET_MACHINE_BY_ID_SUCCESS';
export const GET_MACHINE_BY_ID_FAIL = 'GET_MACHINE_BY_ID_FAIL';

export const UPDATE_MACHINE_NAME = 'UPDATE_MACHINE_NAME';
export const UPDATE_MACHINE_NAME_SUCCESS = 'UPDATE_MACHINE_NAME_SUCCESS';
export const UPDATE_MACHINE_NAME_FAIL = 'UPDATE_MACHINE_NAME_FAIL';

export const UPDATE_MACHINE_HEALTH = 'UPDATE_MACHINE_HEALTH';

export const getMachines = () => ({
	type: GET_MACHINES
});

export const getMachinesSuccess = (payload) => ({
	type: GET_MACHINES_SUCCESS,
	payload
});

export const getMachinesFail = (errors) => ({
	type: GET_MACHINES_FAIL,
	errors
});

export const getMachineById = (id, setName) => ({
	type: GET_MACHINE_BY_ID,
	id,
	setName
});

export const getMachineByIdSuccess = (payload) => ({
	type: GET_MACHINE_BY_ID_SUCCESS,
	payload
});

export const getMachineByIdFail = (errors) => ({
	type: GET_MACHINE_BY_ID_FAIL,
	errors
});

export const updateMachineName = (machine) => ({
	type: UPDATE_MACHINE_NAME,
	machine
});

export const updateMachineNameSuccess = (payload) => ({
	type: UPDATE_MACHINE_NAME_SUCCESS,
	payload
});

export const updateMachineNameFail = (errors) => ({
	type: UPDATE_MACHINE_NAME_FAIL,
	errors
});

export const updateMachineHealth = (id, health) => ({
	type: UPDATE_MACHINE_HEALTH,
	id,
	health
});
