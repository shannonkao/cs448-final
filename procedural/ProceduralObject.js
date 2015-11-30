ProceduralObject = function(id) {

    this.id = id || uid();
    
    this.translate_ = new TransformProperty(this.id);
    this.rotate_ = new TransformProperty(this.id);
    this.scale_ = new TransformProperty(this.id);
    this.count_ = new CountProperty(this.id);
    // TODO add color property

    this.geometry_ = new GeometryProperty();
    
    this.constraints_ = [];

    this.propertyNames = { translate: this.translate_, 
                            rotate: this.rotate_, 
                            scale: this.scale_, 
                            count: this.count_};

    this.getTranslate = function() {return this.translate_};
    this.setTranslate = function(x, y, z) {
        this.translate_._x = x;
        this.translate_._y = y;
        this.translate_._z = z;
    };

    this.getRotate = function() {return this.rotate_};
    this.setRotate = function(x, y, z) {
        this.rotate_._x = x;
        this.rotate_._y = y;
        this.rotate_._z = z;
    };

    this.getScale = function() {return this.scale_};
    this.setScale = function(x, y, z) {
        this.scale_._x = x;
        this.scale_._y = y;
        this.scale_._z = z;
    };

    this.getCount = function() {return this.count_};
    this.setCount = function(count) {
        this.count_._num = count;
    };

    this.getGeometry = function() {return this.geometry_};
    this.setGeometry = function(geometry) {
        this.geometry_.mesh = geometry;
    };

    this.addConstraint = function(propertyName, property, relationFn) {
        if (propertyName in this.propertyNames) {
            this.constraints_.push(new Constraint( this.propertyNames[propertyName], 
                                                    property, 
                                                    relationFn, 
                                                    property.parent));
        }
    };

    function Constraint(propertyA, propertyB, relationFn, source) {
        this.propertyA = propertyA;       // property of this object being constrained
        this.propertyB = propertyB;       // property that the constraint depends on
        this.relationFn = relationFn;
        this.source = source;             // the id of the other object involved in the constraint
        
        this.eval = function() {
            this.relationFn(this.propertyA, this.propertyB);
        }
    }

    this.eval = function() {
        // assumes that dependencies have already been calculated
        // evaluate all properties initially
        for (var p in this.propertyNames) {
            this.propertyNames[p].eval();
        }
        // override defaults with constraints if present
        for (var i=0; i<this.constraints_.length; i++) {
            this.constraints_[i].eval();
        }
    }
};