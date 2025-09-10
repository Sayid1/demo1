const ageFormulas = {
	'10-11': {
		male: (weight, height) => (15.6 * weight + 266 * height + 299) * 1.45 * 1.01,
		female: (weight, height) => (9.4 * weight + 249 * height + 462) * 1.45 * 1.01
	},
	'12-14': {
		male: (weight, height) => (15.6 * weight + 266 * height + 299) * 1.5 * 1.01,
		female: (weight, height) => (9.4 * weight + 249 * height + 462) * 1.5 * 1.01
	},
	'15-17': {
		male: (weight, height) => (15.6 * weight + 266 * height + 299) * 1.55 * 1.01,
		female: (weight, height) => (9.4 * weight + 249 * height + 462) * 1.55 * 1.01
	},
	'18-49': {
		male: (weight, height, steps) =>
			(14.52 * weight - 155.88 * 0 + 565.79) * (1.17 + 0.000028 * steps),
		female: (weight, height, steps) =>
			(14.52 * weight - 155.88 * 1 + 565.79) * (1.17 + 0.000028 * steps)
	},
	'50-64': {
		male: (weight, height, steps) =>
			(14.52 * weight - 155.88 * 0 + 565.79) * (1.17 + 0.000028 * steps) * 0.95,
		female: (weight, height, steps) =>
			(14.52 * weight - 155.88 * 1 + 565.79) * (1.17 + 0.000028 * steps) * 0.95
	},
	'65-74': {
		male: (weight, height, steps) =>
			(14.52 * weight - 155.88 * 0 + 565.79) * (1.17 + 0.000028 * steps) * 0.925,
		female: (weight, height, steps) =>
			(14.52 * weight - 155.88 * 1 + 565.79) * (1.17 + 0.000028 * steps) * 0.925
	},
	'75+': {
		male: (weight, height, steps) =>
			(14.52 * weight - 155.88 * 0 + 565.79) * (1.17 + 0.000028 * steps) * 0.9,
		female: (weight, height, steps) =>
			(14.52 * weight - 155.88 * 1 + 565.79) * (1.17 + 0.000028 * steps) * 0.9
	}
}

function calculateHealthIndex(age, gender, weight, height, steps) {
	const ageGroup = getAgeGroup(age)
	if (!ageGroup || (gender !== 'male' && gender !== 'female')) {
		throw new Error('Invalid age or gender')
	}
	const formula = ageFormulas[ageGroup][gender]
	if (!formula) {
		throw new Error('Formula not found for age and gender')
	}

	const baseFormulaResult = formula(weight, height, steps)
	return baseFormulaResult
}

function getAgeGroup(age) {
	if (age >= 10 && age <= 11) return '10-11'
	if (age >= 12 && age <= 14) return '12-14'
	if (age >= 15 && age <= 17) return '15-17'
	if (age >= 18 && age <= 49) return '18-49'
	if (age >= 50 && age <= 64) return '50-64'
	if (age >= 65 && age <= 74) return '65-74'
	if (age >= 75) return '75+'
	return null
}

export default calculateHealthIndex
