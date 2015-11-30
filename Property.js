Property = function ( parent ) {
  this.parent = parent;
}

Property.prototype = {
  getParent: function() { return this.parent; }
}

// scale, rotate, translate
TransformProperty = function(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
  this.__proto__ = Property;
}

// integer count
CountProperty = function(num) {
  this.num = num;
  this.__proto__ = Property;
}
