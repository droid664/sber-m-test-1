import { encoded, translations } from './data.js'

const decoded = (encoded, translations) => {
	const exceptions = ['groupId', 'service', 'formatSize', 'ca']
	const uniqIds = new Set()
	const data = encoded.slice(0)

	data.forEach((item) => {
		for (const [name, value] of Object.entries(item)) {
			if (!isNaN(value)) {
				uniqIds.add(Number(value))
			}

			if (value && !exceptions.includes(name)) {
				item[name] = translations[value] ?? value // TODO: Если нет значения в translations, оставим исходное
			}
		}
	})

	return {
		encoded: data,
		uniqIds: Array.from(uniqIds),
	}
}

console.log(decoded(encoded, translations))
