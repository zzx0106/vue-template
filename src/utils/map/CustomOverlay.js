function CustomOverlay(point, text, container) {
  this._point = point;
  this._text = text;
  this._container = container;
}
CustomOverlay.prototype = new BMap.Overlay();
CustomOverlay.prototype.initialize = function (map) {
  this._map = map;
  let div = (this._div = document.createElement('div'));
  div.style.position = 'absolute';
  div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
  div.style.backgroundColor = '#C00020';
  div.style.border = '1px solid #C00020';
  div.style.color = 'white';
  div.style.width = `${12 * this._text.length + 4}px`;
  div.style.textAlign = 'center';
  div.style.marginBottom = '22px';
  div.style.borderRadius = '3px';
  div.style.height = '18px';
  div.style.padding = '2px';
  div.style.lineHeight = '18px';
  div.style.whiteSpace = 'nowrap';
  div.style.MozUserSelect = 'none';
  div.style.fontSize = '10px';
  div.appendChild(document.createTextNode(this._text));

  let arrow = (this._arrow = document.createElement('div'));
  arrow.style.position = 'absolute';
  arrow.style.top = '22px';
  arrow.style.left = `${parseInt((12 * this._text.length - 7.5) / 2)}px`;
  arrow.style.width = '0';
  arrow.style.height = '0';
  arrow.style.borderRight = '5px solid transparent';
  arrow.style.borderLeft = '5px solid transparent';
  arrow.style.borderTop = '5px solid #C00020';
  // arrow.style.transform = 'translateX(-50%)';
  arrow.style.overflow = 'hidden';
  div.appendChild(arrow);
  this._container.getPanes().labelPane.appendChild(div);
  return div;
};
CustomOverlay.prototype.draw = function () {
  let map = this._map;
  let pixel = map.pointToOverlayPixel(this._point);
  this._div.style.left = pixel.x - parseInt((12 * this._text.length + 4) / 2) + 'px';
  this._div.style.top = pixel.y - 35 + 'px';
};
module.exports = CustomOverlay;
