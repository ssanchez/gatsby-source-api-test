/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const slash = require(`slash`)

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
exports.createPages = ({ graphql, boundActionCreators }) => {
	const { createPage } = boundActionCreators

	return new Promise((resolve, reject) => {
		graphql(`
			{
				allRandomUser(limit: 1000) {
					edges {
						node {
							nat
							name {
								first
								last
							}
						}
					}
				}
			}
		`)
			.then((result) => {
				if (result.errors) {
					reject(result.errors)
				}

				// Create People pages
				const personTemplate = path.resolve(`./src/templates/person.jsx`)
				_.each(result.data.allRandomUser.edges, ({ node }) => {
					createPage({
						path: `/${node.nat}/${node.name.first}_${node.name.last}`,
						component: slash(personTemplate),
						context: {
							id: node.id,
						},
					})
				})
				resolve()
			})
	})
}
