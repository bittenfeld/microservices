import React, { Component } from 'react';
import Header from './Header'
import MainSection from './MainSection'
const Timestamp = require('react-timestamp');
const initialState = [
  {
    text: 'Log',
    id: 0
  }
]

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logs: initialState,
      gameID: null,
      player: 0,
    }
  }

  addLog = (text) => {
    const logs = [
    {
      id: this.state.logs.reduce((maxId, log) => Math.max(log.id, maxId), -1) +1,
      completed: false,
      text: text,
      Timestamp: this.created_at
    },
    ...this.state.logs
    ]
    this.setState({logs})
  }

  deleteLog = (id) => {
    const logs = this.state.logs.filter(log => log.id !== id)
    this.setState({logs})
  }

  actions = {
    addLog: this.addLog,
    deleteLog: this.deleteLog
  }

  render() {
    return(
      <div>
        <Header addLog={this.actions.addLog} />
        <Timestamp time={this.created_at} format='full' includeDay />
        <MainSection logs={this.state.logs} actions={this.actions} />
      </div>
    )
  }
}

export default App;