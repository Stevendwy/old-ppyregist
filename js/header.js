import React, {
	Component
} from 'react'
export default class Header extends Component {
	render() {
		return (
			<div className='container_header TopRightContainer'>
				<img onClick={() => location.href = '/'} src={cdnHost+'/img/p_logo.png'} />
			</div>
		)
	}
}