import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../../store/actions';
import { Icon } from 'antd';
import { Input } from 'antd';

const ws = new WebSocket('ws://localhost:1337');

const MachineDetails = ({ machine, getMachineById, ...props }) => {

	const [name, setName] = useState(machine.name);

	useEffect(() => {
		const id = props.match.params.id;
		getMachineById(id, setName);
		ws.onmessage = evt => {
			const message = JSON.parse(evt.data);
			console.log(evt);
			props.updateMachineHealth(message.id, message.health);
		};
	}, []);

	const valueChange = (e) => {
		setName(e.target.value);
	};
	const onEnterNameChange = (e) => {
		if (e.key === 'Enter') {
			props.updateMachineName({ ...machine, name });
		}
	};

	return (
		<div data-testid="machineDetails" className="d-flex j-s-b">
			<div>
				<div>Machine Name:
					<Input
						placeholder="Machine Name"
						value={name}
						onKeyDown={onEnterNameChange}
						onChange={valueChange}
					/>
					<small>Press enter to update name</small>
				</div>
				<div data-testid="machineIp">Machine IP Address: {machine.ip_address}</div>
			</div>
			<div className="d-flex align-self-center">
				<div className="align-self-center m-r-10">Machine Health:</div>
				<div className="p-relative">
					<span className="health" data-testid="machineHealth">{(machine.health > 0 ? machine.health : 0)}</span>
					<Icon
						className="antd-icon"
						type="heart"
						theme="twoTone"
						twoToneColor={machine.health <= 50 ? 'red' : machine.health > 50 && machine.health <= 80 ? '#fab842' : 'green'}
					/>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => ({
	machine: state.Machines.machine
});

const mapDispatchToProps = dispatch => ({
	getMachineById: bindActionCreators(actions.getMachineById, dispatch),
	updateMachineHealth: bindActionCreators(actions.updateMachineHealth, dispatch),
	updateMachineName: bindActionCreators(actions.updateMachineName, dispatch)
});

MachineDetails.propTypes = {
	getMachineById: PropTypes.func,
	updateMachineHealth: PropTypes.func,
	updateMachineName: PropTypes.func,
	machine: PropTypes.object,
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string.isRequired
		})
	})

};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MachineDetails));
