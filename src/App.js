import React, { Component } from 'react';
import './App.css';

class App extends Component {
	constructor() {
		super();

		this.state = {
			recentData: [],
			allTimeData: [],
			allTime: false,
		};
	}

	componentWillMount() {
		this.getRecentData();
		this.getAllTimeData();
	}

	getRecentData = async () => {
		let users = [];
		let res = await fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent');
		let data = await res.json();
		data.forEach(user => {
			users.push({
				username: user.username,
				img: user.img,
				recentScore: user.recent,
				lastUpdate: user.lastUpdate,
				allTime: user.alltime,
			});
		});
		users = users.sort(function(a, b) {
			return b.recentScore - a.recentScore;
		});
		this.setState({ recentData: users });
	};

	renderRecent() {
		const users = this.state.recentData;
		return users.map((user, i) => {
			return (
				<tr key={i}>
					<td className="points" key={'index' + i}>{i + 1}</td>
					<td key={'name' + i}>
						<img className="icon" src={user.img} />
						<a href={`https://freecodecamp.com/${user.username}`}>{user.username}</a>
					</td>
					<td className="points" key={'recent' + i}>
						{user.recentScore}
					</td>
					<td className="points" key={'alltime' + i}>
						{user.allTime}
					</td>
				</tr>
			);
		});
	}

	renderAllTime() {
		const users = this.state.allTimeData;
		return users.map((user, i) => {
			return (
				<tr key={i}>
					<td className="points" key={'index' + i}>{i + 1}</td>
					<td key={'name' + i}>
						<img className="icon" src={user.img} />
						{user.username}
					</td>
					<td className="points" key={'recent' + i}>
						{user.recentScore}
					</td>
					<td className="points" key={'alltime' + i}>
						{user.allTime}
					</td>
				</tr>
			);
		});
	}

	getAllTimeData = async () => {
		let users = [];
		let res = await fetch('https://fcctop100.herokuapp.com/api/fccusers/top/alltime');
		let data = await res.json();
		data.forEach(user => {
			users.push({
				username: user.username,
				img: user.img,
				recentScore: user.recent,
				lastUpdate: user.lastUpdate,
				allTime: user.alltime,
			});
		});
		users = users.sort(function(a, b) {
			return b.allTime - a.allTime;
		});
		this.setState({ allTimeData: users });
	};

	render() {
		return (
			<div className="table">
				<table border="1">
					<tbody
						style={{
							textAlign: 'center',
							borderCollapse: 'collapse',
						}}
					>
						<tr>
							<th className="header" colSpan="4">Leaderboard</th>
						</tr>
						<tr>
							<th className="points">#</th>
							<th>Camper Name</th>
							<th className="points" onClick={() => this.setState({ allTime: false })}>
								Points in last 30 days
							</th>
							<th className="points" onClick={() => this.setState({ allTime: true })}>
								All time points
							</th>
						</tr>
						{this.state.allTime ? this.renderAllTime() : this.renderRecent()}
					</tbody>
				</table>
			</div>
		);
	}
}

export default App;
