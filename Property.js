Property = function ( parent ) {
  this.parent = parent;
}

Property.prototype = {
  getParent: function() { return this.parent; }
}

// scale, rotate, translate
TransformProperty = function(x, y, z) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
  this.__proto__ = Property;
}

// integer count
CountProperty = function(num) {
  this.num = num || 0;
  this.__proto__ = Property;
}

// geometry, holds a mesh
GeometryProperty = function(m) {
  this.mesh = m;
  this.__proto__ = Property;
}
