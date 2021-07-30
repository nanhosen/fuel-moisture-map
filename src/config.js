// const configObj = {
// 	text: {
// 		maxResolution: 2000,
// 		align: 'right',
// 		rotation: 0,
// 		fontName: 'arial',
// 		size: '16px',
// 		color: 'black',
// 		ouline: 'red',
// 		outlineWidth:0.2,
// 		type: 'wrap',
// 		height: 1,
// 		offsetX: -15,
// 		overflow: false,
// 		weight: 'normal'
// 	}
// }

// export default function getConfig(){
// 	return configObj
// }

const configObj = {
	text: {
		maxResolution: 2000,
		align: 'end',
		rotation: 0,
		fontName: 'arial',
		size: '16px',
		color: 'white',
		ouline: 'red',
		outlineWidth:2,
		type: 'wrap',
		height: 1,
		offsetX: 5,
		overflow: false,
		weight: 'normal'
	}
}

export default function getConfig(){
	return configObj
}



//   return new ol.style.Text({
//     textAlign: 'end',
//     // textBaseline: baseline,
//     // font: font,resolution < 5000 ? feature.get('') : '';
//     text: resolution < 2000 ? feature.get('name') : '',
//     // fill: new ol.style.Fill({color: fillColor}),
//     stroke: new ol.style.Stroke({color: 'white', width: 2}),
//     offsetX: 5
//     // offsetY: offsetY,
//     // placement: placement,
//     // maxAngle: maxAngle,
//     // overflow: overflow,
//     // rotation: rotation
//   });
// };