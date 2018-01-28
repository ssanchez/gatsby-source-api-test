import React, { Component } from 'react'
import { object } from 'prop-types'

class PersonTemplate extends Component {
	render() {
		const person = this.props.data.randomUser
		const {
			name: {
				first,
				last
			},
		} = person

		return (
			<main>
				<h4>{first} {last}</h4>
			</main>
		)
	}
}

PersonTemplate.propTypes = {
	data: object,
}

export default PersonTemplate

export const pageQuery = graphql`
	query personQuery($id: String!) {
		randomUser(id: { eq: $id }) {
			name {
				first
				last
			}
		}
	}
`
