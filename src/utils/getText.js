import getConfig from '../config.js'
import { Circle as CircleStyle, Fill, Stroke, Style, Icon, Text } from 'ol/style.js'

function getText(feature, resolution, dom) {
		const configSettings = getConfig()
	const { maxResolution, type } = configSettings.text
  // const type = dom.text.value;
  // const maxResolution = dom.maxreso.value;
  let text = feature.get('name');

  if (resolution > maxResolution) {
    text = '';
  }
  else if(type == 'wrap')  {
  	text = stringDivider(text, 16, '\n');
  }

  return text;
};

function createTextStyleComplicated(feature, resolution, dom) {
	const configSettings = getConfig()
	// console.log('resolt', resolution)
	// console.log('getConfig.text', configSettings.text)
	const { maxResolution, align, rotation, fontName, size, color, outline, outlineWidth, offsetX, overflow, height, weight } = configSettings.text
  // const align = dom.align.value;
  // const baseline = dom.baseline.value;
  // const size = dom.size.value;
  // const height = dom.height.value;
  // const offsetX = parseInt(dom.offsetX.value, 10);
  // const offsetY = parseInt(dom.offsetY.value, 10);
  // const weight = dom.weight.value;
  // const placement = dom.placement ? dom.placement.value : undefined;
  // const maxAngle = dom.maxangle ? parseFloat(dom.maxangle.value) : undefined;
  // const overflow = dom.overflow ? dom.overflow.value == 'true' : undefined;
  // const rotation = parseFloat(dom.rotation.value);
  // if (dom.font.value == "'Open Sans'" && !openSansAdded) {
  //   const openSans = document.createElement('link');
  //   openSans.href = 'https://fonts.googleapis.com/css?family=Open+Sans';
  //   openSans.rel = 'stylesheet';
  //   document.getElementsByTagName('head')[0].appendChild(openSans);
  //   openSansAdded = true;
  // }
  const font = weight + ' ' + size + '/' + height + ' ' + fontName;
  // const fillColor = dom.color.value;
  // const outlineColor = dom.outline.value;
  // const outlineWidth = parseInt(dom.outlineWidth.value, 10);

  return new Text({
    textAlign: align,
    // textBaseline: baseline,
    font: font,
    text: getText(feature, resolution),
    fill: new Fill({color: color}),
    stroke: new Stroke({color: outline, width: outlineWidth}),
    offsetX: offsetX,
    // offsetY: offsetY,
    // placement: placement,
    // maxAngle: maxAngle,
    overflow: overflow,
    // rotation: rotation,
  });
};
export default function createTextStyle(feature, resolution) {
	const configSettings = getConfig()
	const { maxResolution,  fontName, size, color, outline, outlineWidth, height, weight } = configSettings.text
	// const font = weight + ' ' + size + '/' + height + ' ' + fontName;
  return new Text({
    textAlign: 'end',
    text: resolution < 2000 ? feature.get('name') : '',
    stroke: new Stroke({color: 'white', width: 2}),
    // font: font,
    offsetX: -10,
    scale:1.3
  });
};






function stringDivider(str, width, spaceReplacer) {
  if (str.length > width) {
    let p = width;
    while (p > 0 && str[p] != ' ' && str[p] != '-') {
      p--;
    }
    if (p > 0) {
      let left;
      if (str.substring(p, p + 1) == '-') {
        left = str.substring(0, p + 1);
      } else {
        left = str.substring(0, p);
      }
      const right = str.substring(p + 1);
      return left + spaceReplacer + stringDivider(right, width, spaceReplacer);
    }
  }
  return str;
}