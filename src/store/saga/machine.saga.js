import axios from 'axios';
import * as actions from '../actions';
import { all, put, takeEvery } from '@redux-saga/core/effects';
const ROOT_URL = 'http://localhost:8080/machines';

export function* getMachines (_action) {
	try {
		const data = yield axios.get(`${ROOT_URL}`).then(req => req.data);
		yield put(actions.getMachinesSuccess(data));
	} catch (error) {
		yield put(actions.getMachinesFail(error));
	}
}

export function* getMachineById (action) {
	try {
		const { id, setName } = action;
		const data = yield axios.get(`${ROOT_URL}/${id}`).then(req => req.data);
		setName(data.name);
		yield put(actions.getMachineByIdSuccess(data));
	} catch (error) {
		yield put(actions.getMachineByIdFail(error));
	}
}

export function* updateMachineName (action) {
	try {
		const { machine } = action;
		const data = yield axios.put(`${ROOT_URL}/${machine.id}`, machine).then(req => req.data);
		yield put(actions.updateMachineNameSuccess(data));
	} catch (error) {
		yield put(actions.updateMachineNameFail(error));
	}
}

export default function* machineWatcher () {
	yield all([
		takeEvery(actions.GET_MACHINES, getMachines),
		takeEvery(actions.GET_MACHINE_BY_ID, getMachineById),
		takeEvery(actions.UPDATE_MACHINE_NAME, updateMachineName)
	]);
}
