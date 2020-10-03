import convertPlantUMLSourceToImageURL from '../plantuml/PlantUMLEncoder';
const defaultConfig = {
	addTitle: false
}
export default function parseDiagramData(rawData, config) {
	const { addTitle } = config ? config : defaultConfig;

	const index = rawData.indexOf("@startuml");
	if (index < 0) {
		return { valid: false };
	}
	const dataString = rawData.substring(0, index);
	let umlString = rawData.substring(index + "@startuml".length);

	const dataArray = dataString.split("\n");
	const dataObject = {};
	dataArray.forEach(data => {
		data = data.trim();
		if (data.startsWith("@")) {
			const spaceIndex = data.indexOf(" ");
			if (spaceIndex < 0) {
				const name = data.substring(1);
				dataObject[name] = true;
			} else {
				const name = data.substring(1, spaceIndex).trim();
				const value = data.substring(spaceIndex).trim();
				dataObject[name] = value;
			}
		}
	});
	if (addTitle && dataObject.title) {
		umlString = "TITLE " + dataObject.title + "\n" + umlString;
	}
	console.log(dataObject);
	const imageUrl = convertPlantUMLSourceToImageURL(umlString);

	return {
		valid: true,
		data: dataObject,
		src: imageUrl
	};
};