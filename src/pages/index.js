import React, { Component } from 'react'
import { object } from 'prop-types'
import Link from 'gatsby-link'

class IndexPage extends Component {
	render() {
		const { edges: people } = this.props.data.allRandomUser
		return (
			<main>
				{people.map(({ node: user }) => (
					<div key={user.id}>
						<Link to={`/${user.nat}/${user.name.first}_${user.name.last}`}>
							{user.name.first} {user.name.last}
						</Link>
					</div>
				))}
			</main>
		)
	}
}

IndexPage.propTypes = {
	data: object,
}

export default IndexPage

export const pageQuery = graphql`
	query PageQuery {
		allRandomUser {
			edges {
				node {
					id
					name {
						first
						last
					}
					nat
				}
			}
		}
	}
`
