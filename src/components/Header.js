import React, {proptypes} from 'react'
import LogTextInput from './LogTextInput'
import PropTypes from 'prop-types';

const Header = ({addLog}) => {

  const handleSave = text => {
    if (text.length !== 0) {
      addLog(text)
    }
  }

  return (
    <header className="header">
      <h1>Logs</h1>
      <LogTextInput
        newLog
        onSave={handleSave}
        placeholder="New log"
      />
    </header>
  )
}

Header.PropTypes = {
  addTodo: PropTypes.func.isRequired
}

export default Header