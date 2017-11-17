import React, {Component} from 'react'
import {render} from 'react-dom'
import Header from './header'
import Content from './content'
import Footer from './footer'

class Page extends Component {
	
	render() {
		return (
			<div className=''>
				<Header />
				<Content />
				<Footer />
			</div>
		)
	}
}

render(<Page />, document.getElementById('root'))
