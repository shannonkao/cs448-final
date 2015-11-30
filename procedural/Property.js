Property = function ( parent ) {
  this.parent = parent;
}

Property.prototype = {
  getParent: function() { return this.parent; },
  getValue: function() { return 0; },
  eval: function() { return 0; },
  
  // utility function to get numeric value from an input
  sampleValue: function(input) {
    // if input is number, return
    if (!isNaN(input)) {
      return input;
    } else if (input.type == "range") {
      // TODO replace Math.random() with webppl distribution sampling
      return input.min + (input.max - input.min)*Math.random();
    } else {
        return 0;
    }
  }
}

// scale, rotate, translate
TransformProperty = function(parent, x, y, z) {
  this.parent = parent;
  this.__proto__ = Property;
  // numeric values (change per call to eval)
  this.x = 0;
  this.y = 0;
  this.z = 0;
  // inital definition of properties (may be ranges)
  this._x = x || 0;
  this._y = y || 0;
  this._z = z || 0;
  
  this.eval = function() {
      this.x = this.prototype.sampleValue(this._x);
      this.y = this.prototype.sampleValue(this._y);
      this.z = this.prototype.sampleValue(this._z);
  }
  
  this.getValue = function() {
      return [this.x, this.y, this.z];
  }
}

// integer count
CountProperty = function(parent, num) {
  this.parent = parent;
  this.__proto__ = Property;
  
  // numeric count (integer)
  this.num = 0;
  // definition (may be range/function)
  this._num = num || 0;

  this.eval = function() {
      this.num = this.prototype.sampleValue(this._num);
  }  
  
  this.getValue = function() {
      return this.num;
  }
}

// geometry, holds a mesh
GeometryProperty = function(parent, m) {
  this.__proto__ = Property;
  
  this.mesh = m;  
  
  this.getValue = function() {
      return this.mesh;
  }
}

