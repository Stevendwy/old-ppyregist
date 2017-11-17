import React, {Component} from 'react'

export class Toast extends Component {
	
	componentDidMount() {
		
	}
	
	render() {
		let _message = this.props.message
		let _show = this.props.show
		if(_show != "none") setTimeout(() => this.props.hiddenEvent(), 1000)
		return (
			<div ref="toast" className="ToastContainer" style={{display: _show}}>
				<div className='ToastMessageContainer'>
					<span className="ToastMessage">{_message}</span>
				</div>
			</div>
		)
	}
}

Toast.propTypes = {
	message: React.PropTypes.string.isRequired,
	show: React.PropTypes.string.isRequired,
	hiddenEvent: React.PropTypes.func.isRequired
}

export class Comfirm extends Component {
	
	render() {
		let _message = this.props.message
		let _show = this.props.show
		let _todo = this.props.todo
		let _todoTitle = this.props.todoTitle
		
		return (
			<div ref="comfirm" className="ComfirmContainer" style={{display: _show}}>
				<div className='ComfirmMessageContainer'>
					<span className="ComfirmMessage">{_message}</span>
				</div>
				<div className='ComfirmButtonsContainer'>
					<div className="CancelMessage" onClick={() => this.refs.comfirm.style.display = 'none'}>取消</div>
					<div className="TodoMessage" onClick={_todo}>{_todoTitle}</div>
				</div>
			</div>
		)
	}
}

Comfirm.propTypes = {
	message: React.PropTypes.string.isRequired,
	todo: React.PropTypes.func.isRequired,
	todoTitle: React.PropTypes.string.isRequired,
	show: React.PropTypes.string.isRequired
}
