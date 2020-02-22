import machineWatcher from './machine.saga';
import { fork, all } from '@redux-saga/core/effects';

export default function* rootSaga () {
	yield all([fork(machineWatcher)]);
}
