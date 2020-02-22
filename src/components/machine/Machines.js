import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { List } from 'antd';
import { Icon } from 'antd';
const ws = new WebSocket('ws://localhost:1337');

class Machines extends React.Component {
	constructor (props) {
		super(props);
	}

	static get propTypes () {
		return {
			getMachines: PropTypes.func,
			updateMachineHealth: PropTypes.func,
			machines: PropTypes.array,
			history: PropTypes.objectOf(PropTypes.shape({
				push: PropTypes.func
			}))
		};
	}

	componentDidMount () {
		this.props.getMachines();

		ws.onmessage = evt => {
			const message = JSON.parse(evt.data);
			this.props.updateMachineHealth(message.id, message.health);
		};
	}

	render () {
		const { machines } = this.props;
		return (
			<div>
				<List
					header={<div data-testid="listTitle">All Machines</div>}
					bordered
					dataSource={machines}
					renderItem={machine => (
						<List.Item data-testid="machineEach">
							<Link data-testid="machineLink" to={`/machines/${machine.id}`} className="w-100">
								<div className="d-flex j-s-b">
									<div>
										<div data-testid="machineName">Machine Name: {machine.name}</div>
										<div data-testid="machineIp">Machine IP Address: {machine.ip_address}</div>
									</div>
									<div className="d-flex align-self-center">
										<div className="align-self-center m-r-10">Machine Health:</div>
										<div className="p-relative">
											<span data-testid="machineHealth" className="health">{(machine.health > 0 ? machine.health : 0)}</span>
											<Icon
												className="antd-icon"
												type="heart"
												theme="twoTone"
												twoToneColor={machine.health <= 50 ? 'red' : machine.health > 50 && machine.health <= 80 ? '#fab842' : 'green'}
											/>
										</div>
									</div>
								</div>
							</Link>
						</List.Item>
					)}
				/>
			</div>
		);
	}
}

function mapStateToProps (state) {
	return { machines: state.Machines.machines };
}

function mapDispatchToProps (dispatch) {
	return {
		getMachines: bindActionCreators(actions.getMachines, dispatch),
		updateMachineHealth: bindActionCreators(actions.updateMachineHealth, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Machines);
