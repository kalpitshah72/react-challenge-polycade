import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Link
} from 'react-router-dom';
import Machines from './components/machine/Machines';
import MachineDetails from './components/machineDetails/MachineDetails';
import './App.css';
import { Card, Icon, Avatar } from 'antd';


function App () {
	const { Meta } = Card;
	return (
		<Router>
			<Provider store={store}>
				<div className='App'>
					<header className='App-header'>
						<img alt='logo' height='272' width='800' src='https://i.imgur.com/jcvsFKh.png' />
					</header>

					<nav className='App-nav'>
						<Link to='/'>Home</Link>
						<Link to='/machines'>Machines</Link>
					</nav>

					<Switch>
						<Route exact path="/">
							<div className="d-flex j-s-a">
								<Card
									style={{ width: 300 }}
									cover={
										<img
											alt="example"
											src="https://img.youtube.com/vi/HYrcX8QIIAs/maxresdefault.jpg" />
									}
									actions={[
										<Icon type="setting" key="setting" />,
										<Icon type="edit" key="edit" />,
										<Icon type="ellipsis" key="ellipsis" />
									]}
								>
									<Meta
										avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
										title="Card title"
										description="This is the description"
									/>
								</Card>
								<Card
									style={{ width: 300 }}
									cover={
										<img
											alt="example"
											src="https://img.youtube.com/vi/reAPorQHxNQ/maxresdefault.jpg" />
									}
									actions={[
										<Icon type="setting" key="setting" />,
										<Icon type="edit" key="edit" />,
										<Icon type="ellipsis" key="ellipsis" />
									]}
								>
									<Meta
										avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
										title="Card title"
										description="This is the description"
									/>
								</Card>
								<Card
									style={{ width: 300 }}
									cover={
										<img
											alt="example"
											src="https://img.youtube.com/vi/_SFGbJSGQc8/maxresdefault.jpg" />
									}
									actions={[
										<Icon type="setting" key="setting" />,
										<Icon type="edit" key="edit" />,
										<Icon type="ellipsis" key="ellipsis" />
									]}
								>
									<Meta
										avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
										title="Card title"
										description="This is the description"
									/>
								</Card>
							</div>
						</Route>
						<Route exact path='/machines'>
							<Machines />
						</Route>
						<Route exact path='/machines/:id'>
							<MachineDetails />
						</Route>
					</Switch>
				</div>
			</Provider>
		</Router>
	);
}

export default App;
