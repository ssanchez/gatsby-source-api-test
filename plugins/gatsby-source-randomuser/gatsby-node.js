const axios = require(`axios`)
const crypto = require(`crypto`)
const uuidv4 = require(`uuid/v4`)

const fetch = numPeople => {
	const url = `https://randomuser.me/api/?results=${numPeople}`
	return axios.get(url)
}

exports.sourceNodes = async ({ boundActionCreators }, { numPeople }) => {
	const { createNode } = boundActionCreators

	try {
		const result = await fetch(numPeople)
		const json = result.data
		const resources = Array.prototype.concat(...json.results)

		resources.map(resource => {
			const digest = crypto
				.createHash(`md5`)
				.update(JSON.stringify(resource))
				.digest(`hex`)

			const node = Object.assign(
				resource,
				{
					id: `RandomUser-${uuidv4()}`,
					parent: `__SOURCE__`,
					children: [],
					internal: {
						type: `RandomUser`,
						contentDigest: digest,
					},
				}
			)

			createNode(node)
		})
	} catch (error) {
		console.error(error)
		process.exit(1)
	}
}
