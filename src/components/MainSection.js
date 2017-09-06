import React, {Component} from 'react'
import LogItem from './LogItem'
import PropTypes from 'prop-types';

 const LOG_FILTERS = {
   SHOW_ALL: () => true,
   SHOW_ACTIVE: log => !log.completed,
   SHOW_COMPLETED: log => log.completed
 }

 export default class MainSection extends Component {
   static PropTypes = {
     logs: PropTypes.array.isRequired,
     actions: PropTypes.object.isRequired
   }

   state = { filter: 'SHOW_ALL' }

   handleClearCompleted = () => {
     this.props.actions.clearCompleted()
   }

   handleShow = filter => {
     this.setState({ filter })
   }

   renderToggleAll(completedCount) {
     const { logs, actions } = this.props
     if (logs.length > 0) {
       return (
         ''
       )
     }
   }
/*
   renderFooter(completedCount) {
     const { logs } = this.props
     const { filter } = this.state
     const activeCount = logs.length - completedCount

     if (logs.length) {
       return (
         <Footer
           completedCount={completedCount}
           activeCount={activeCount}
           filter={filter}
           onClearCompleted={this.handleClearCompleted.bind(this)}
           onShow={this.handleShow.bind(this)} />
       )
     }
   }
*/
   render() {
     const { logs, actions } = this.props
     const { filter } = this.state

     const filteredLogs = logs.filter(LOG_FILTERS[filter])
     const completedCount = logs.reduce((count, log) => {
       return log.completed ? count + 1 : count
     }, 0)

     return (
       <section className="main">
         {this.renderToggleAll(completedCount)}
         <ul className="log-list">
           {filteredLogs.map(log =>
             <LogItem key={log.id} log={log} {...actions} />
           )}
         </ul>

       </section>
     )
   }
}