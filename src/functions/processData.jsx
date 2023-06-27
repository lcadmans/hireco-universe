import { BLOCKS, MARKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export function processData(data) {
	let arr = []
	data.items.forEach(a => {
		let row = {}
		const { fields, metadata, sys } = a

		let { title, subtitle, description, image, otherImages, whatsappNumber, linkedIn, cta, testimonials } = fields

		// console.log(fields)

		let video = fields.video || false

		// console.log(fields)
		let section, ring
		section = sys.contentType.sys.id

		// console.log(section)
		if (section == 'sectionCopy') ring = fields.section

		let { id } = sys

		// const Bold = ({ children }) => <p className='bold'>{children}</p>
		// const Text = ({ children }) => <p className='align-center'>{children}</p>

		// const options = {
		// 	renderMark: {
		// 		[MARKS.BOLD]: text => <Bold>{text}</Bold>
		// 	},
		// 	renderNode: {
		// 		[BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>
		// 	},
		// 	renderText: text => text.replace('!', '?')
		// }

		// console.log('documentToHtmlString')
		// let parsedDescription = documentToHtmlString(description, options)
		// let parsedDescription = documentToReactComponents(description, options)
		// console.log(parsedDescription)

		console.log(fields)
		let descriptionArr = []
		if (!description) {
			descriptionArr = ['']
		} else {
			if (description.content) descriptionArr = description.content || []
			description = description.content[0]
			if (description.content[0].value) description = description.content[0].value
			else description = ''
		}

		// console.log(description)
		// console.log(section)

		// if (section == 'source') {
		// 	console.log(image)
		// }

		row['title'] = title
		row['subTitle'] = subtitle
		// row['description'] = description
		row['description'] = description
		row['descriptionArr'] = descriptionArr
		// row['parsedDescription'] = parsedDescription
		row['image'] = image
		row['section'] = toTitleCase(section)
		row['testimonials'] = testimonials
		row['otherImages'] = otherImages
		row['ring'] = ring
		row['id'] = id
		row['video'] = video
		row['whatsapp'] = whatsappNumber
		row['linkedIn'] = linkedIn
		row['cta'] = cta

		arr.push(row)
	})
	return arr
}

function toTitleCase(str) {
	return str.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
	})
}
