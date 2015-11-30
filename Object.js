var Object = function() {

    var translate_ = new TransformProperty();
    var rotate_ = new TransformProperty();
    var scale_ = new TransformProperty();
    var count_ = new CountProperty();

    var geometry_ = new GeometryProperty();
    var constraints_ = [];

    var propertyNames = {translate: translate_, rotate: rotate_, scale: scale_, count: count_};

    this.setTranslate = function(x, y, z) {
        translate_.x = x;
        translate_.y = y;
        translate_.z = z;
    };

    this.setRotate = function(x, y, z) {
        rotate_.x = x;
        rotate_.y = y;
        rotate_.z = z;
    };

    this.setScale = function(x, y, z) {
        scale_.x = x;
        scale_.y = y;
        scale_.z = z;
    };

    this.setCount = function(count) {
        count_.num = count;
    };

    this.setGeometry = function(geometry) {
        geometry_.mesh = geometry;
    };

    this.addConstraint = function(propertyName, property, relationFn) {
        if (propertyName in propertyNames) {
            constraints_.push(new Constraint(propertyNames[propertyName], property, relationFn, property.parent));
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
        // TODO eval() should generate real-number values for each property
        // assumes that dependencies have already been calculated
        for (var c in this.constraints_) {
            c.eval();
        }
    }
};