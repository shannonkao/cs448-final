Property = function ( parent ) {
  this.parent = parent;
}

Property.prototype = {
  getParent: function() { return this.parent; },
  eval: function() { return 0; }
  
  // utility function to get numeric value from an input
  getValue: function(input) {
    // if input is number, return
    if (!isNaN(input)) {
      return input;
    } else if (input.type == 'range') {
      // TODO replace Math.random() with webppl distribution sampling
      return input.min + (input.max - input.min)*Math.random();
    }
  }
}

// scale, rotate, translate
TransformProperty = function(x, y, z) {
  this.__proto__ = Property;
  
  // numeric values (change per call to eval)
  this.x = 0;
  this.y = 0;
  this.z = 0;
  // inital definition of properties (may be ranges)
  this._x = x;
  this._y = y;
  this._z = z;
  
  this.eval = function() {
      this.x = eval(this._x);
      this.y = eval(this._y);
      this.z = eval(this._z);
  }
}

// integer count
CountProperty = function(num) {
  this.__proto__ = Property;
  
  // numeric count (integer)
  this.num = 0;
  // definition (may be range/function)
  this._num = num;

  this.eval = function() {
      this.num = eval(this._num);
  }
}

// geometry, holds a mesh
GeometryProperty = function(m) {
  this.__proto__ = Property;
  
  this.mesh = m;
}
