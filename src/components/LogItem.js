import React, {Component} from 'react'
import classnames from 'classnames'
import LogTextInput from './LogTextInput'
import PropTypes from 'prop-types';
const Timestamp = require('react-timestamp');
export default class LogItem extends Component {
  static PropTypes = {
    log: PropTypes.object.isRequired,
    editLog: PropTypes.func.isRequired,
    deleteLog: PropTypes.func.isRequired,
  }

  state = {
    editing: false
  }

  handleDoubleClick = () => {
    this.setState({ editing: true })
  }

  handleSave = (id, text) => {
    if (text.length === 0) {
      this.props.deleteLog(id)
    } else {
      this.props.editLog(id, text)
    }
    this.setState({ editing: false })
  }

  render() {
    const {log, deleteLog} = this.props

    let element
    if (this.state.editing) {
      element = (
        <LogTextInput
          text={log.text}
          editing={this.state.editing}
          onSave={(text) => this.handleSave(log.id, text)}
        />
      )
    } else {
      element = (
        <div className="view">
          
          <label onDoubleClick={this.handleDoubleClick}>{log.text}</label>
          <button className="destroy" onClick={() => deleteLog(log.id)} />
          <Timestamp time={this.created_at} format='full' includeDay />
        </div>
      )
    }

    return (
      <li className={classnames({
        completed: log.completed,
        editing: this.state.editing
      })}>
        {element}
      </li>
    )
  }
}