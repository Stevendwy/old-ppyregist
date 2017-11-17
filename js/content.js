import React, {
	Component
} from 'react'
import UserAgreement from './useragreement'
import Sliders from './sliders'
import VerificationWindow from './verificationwindow'
import LoginFloatWindow from './regist_loginfloatwindow'
import {
	Comfirm
} from './dialog'

export default class Content extends Component {

	constructor() {
		super()
		this.state = {
			currentTypeIndex: -1,
			showDelegate: false,
			showVerificationWindow: false,
			show: 'none',
			showComfirm: 'none',
			takePassword: false
		}
		this.types = ['汽配商', '4S 店', '修理厂', '其他']
		this.imgs = ['https://cdns.007vin.com/img/p_2.png', 'https://cdns.007vin.com/img/p_1.png', 'https://cdns.007vin.com/img/p_2.png', 'https://cdns.007vin.com/img/p_1.png'] //轮播，前后各一个备用
		this.registRequest = {}
	}

	login(vin) {
		this.setState({
			show: "block"
		})
	}

	showDelegate() {
		this.setState({
			showDelegate: true
		})
	}

	checkDelegate() {
		this.setState({
			showDelegate: false
		}, () => {
			this.refs.checkbox.checked = true
		})
	}

	typeClick(index) {
		this.registRequest.company_type = this.types[index]
		this.setState({
			currentTypeIndex: index
		})
	}

	registClick() {
		let _refs = this.refs
		this.registRequest.username = _refs.phone.value
		this.registRequest.real_name = _refs.name.value
		this.registRequest.company = _refs.company.value
		this.registRequest.city = _refs.city.value
		if (this.registRequest.username.length != 11) {
			alert('请输入正确的手机号。')
			return
		} else if (this.registRequest.real_name.length < 1 ||
			this.registRequest.company.length < 1 ||
			this.registRequest.city.length < 1) {
			alert('请完善信息。')
			return
		} else if (!this.registRequest.company_type) {
			alert('请选择公司类型。')
			return
		} else if (!_refs.checkbox.checked) {
			this.setState({
				showDelegate: true
			})
			return
		}

		this.setState({
			showVerificationWindow: true
		})
	}

	checkoutPhone() {
		if (this.refs.phone.value.length != 11) return
		let _uri = '/user/phonecheck'
		let _obj = {
			username: this.refs.phone.value
		}

		$.ajax({
			type: "post",
			url: _uri,
			data: _obj,
			success: data => {
				if (data.code == 4) this.setState({
					showComfirm: 'flex',
					username: this.refs.phone.value
				})
				else if (data.code != 1) {
					this.setState({
						username: null
					}, () => alert(data.msg))
				}
			}
		})
	}

	phoneChange(e) {
		e.target.value = e.target.value.replace(/\D/g, '')
	}

	render() {
		let _showDelegate = this.showDelegate.bind(this)
		let _checkDelegate = this.checkDelegate.bind(this)
		let _typeClick = this.typeClick.bind(this)
		let _registClick = this.registClick.bind(this)
		let _showVerificationWindow = this.state.showVerificationWindow
		let _currentTypeIndex = this.state.currentTypeIndex
		let _show = this.state.show
		let _username = this.state.username
			//		console.log(_username)
			//console.log(_showVerificationWindow)

		return (
			<div className='container_content'>
				<div className='container_content_header'>
					<div className='container_price'>
						<div className='container_price_box'>
							<span>试用</span>
							<div>
								<span className='price'>¥10</span>
								<span className='remind'>(使用期限1天，不可取消，不含税。)</span>
							</div>
						</div>
						<div className='container_price_box'>
							<span>年费</span>
							<div>
								<span className='price'>¥2800</span>
								<span className='remind'>(使用期限1年，不可取消，不含税。)</span>
							</div>
						</div>
					</div>
					<div className='container_user_regist'>
						<div className='container_user_regist_box'>
							<span>零零汽用户注册</span>
							<div className='container_input'>
								<input ref='phone' type='text' placeholder='手机号' onInput={this.phoneChange.bind(this)} onBlur={this.checkoutPhone.bind(this)} />
								<span>*</span>
							</div>
							<div className='container_input'>
								<input ref='name' type='text' placeholder='用户姓名' />
								<span>*</span>
							</div>
							<div className='container_input'>
								<input ref='company' type='text' placeholder='公司名称' />
								<span>*</span>
							</div>
							<div className='container_input'>
								<input ref='city' type='text' placeholder='所在城市' />
								<span>*</span>
							</div>
							<div className='container_remind'>
								<span className='remind'>公司类型</span>
							</div>
							<div className='container_type'>
								{this.types.map((item, index) => {
									let _class = 'type'
									if(index == _currentTypeIndex) _class += ' enable'
									return <div key={index} className={_class} onClick={() => _typeClick(index)}>{item}</div>
								})}
								<span>*</span>
							</div>
							<div className='container_delegate'>
								<input ref='checkbox' type='checkbox' />
								<span>我已阅读并同意<a onClick={_showDelegate}>《零零汽&trade;EPC查询系统用户注册协议》</a></span>
							</div>
							<button onClick={_registClick}>注册获取验证码</button>
							<div className='container_login'>
								<span>已有账号?</span>
								<a onClick={() => this.setState({show: 'block', takePassword: true})}>立即登录</a>
							</div>
						</div>
					</div>
				</div>
				<div className='container_useragreement' style={{display: this.state.showDelegate ? 'block' : 'none'}}>
					<UserAgreement />
					<button className='button_delegate' onClick={_checkDelegate}>已经阅读并同意协议</button>
					<button className='button_close' onClick={() => this.setState({showDelegate: false})}></button>
				</div>
				<div className='container_product'>
					<span>产品简介</span>
					<Sliders imgs={this.imgs} />
				</div>
				<VerificationWindow hiddenEvent={() => this.setState({showVerificationWindow: false})} show={_showVerificationWindow} registRequest={this.registRequest} />
				<LoginFloatWindow show={_show} closeLogin={() => this.setState({show: 'none', takePassword: false})} username={_username} takePassword={this.state.takePassword} />
				<Comfirm message="手机号已注册" todo={() => this.setState({showComfirm: 'none', show: 'block'})} todoTitle="立即登录" show={this.state.showComfirm} />
			</div>
		)
	}
}