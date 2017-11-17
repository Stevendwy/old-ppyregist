import React, {
	Component
} from 'react'
import FloatWindow from './floatwindow'
import UserAgreement from './useragreement'

export default class Footer extends Component {
	constructor() {
		super()
		this.state = {
			showUserAgreement: 'none'
		}
	}

	userAgreementClick() {
		this.setState({
			showUserAgreement: 'block'
		})
	}

	goAboutus() {
		let url = "http://www.peipeiyun.com/"
		var href = encodeURI(url)
		window.open(href)
	}

	goIcp() {
		let url = "http://www.miitbeian.gov.cn/"
		var href = encodeURI(url)
		window.open(href)
	}

	render() {
		let _showUserAgreement = this.state.showUserAgreement
		let _userAgreementClick = this.userAgreementClick.bind(this)
		let _goAboutus = this.goAboutus.bind(this)
		let _goIcp = this.goIcp.bind(this)

		return (
			<div className="container_footer">
				<div className="container_footer_content">
					<span onClick={_goAboutus} style={{cursor: 'pointer'}}>关于我们</span>
					<span onClick={_userAgreementClick} style={{cursor: 'pointer'}}>用户协议</span>
					<div onClick={_goIcp} style={{cursor: 'pointer'}}>
						© 2016-2017 007vin.com 版权所有 ICP证：浙17026959号-2
					</div>
				</div>
				<FloatWindow 
					title='用户协议'
					img='https://cdns.007vin.com/img/icon_san.png'
					show={_showUserAgreement}
					hiddenEvent={() => {
						this.setState({
							showUserAgreement: 'none'
						})
					}}
					content={<UserAgreement />}
				/>
			</div>
		)
	}
}