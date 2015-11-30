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
            constraints_.push(new Constraint(propertyNames[propertyName], property, relationFn));
        }
    };

    function Constraint(propertyA, propertyB, relationFn) {
        this.propertyA = propertyA;
        this.propertyB = propertyB;
        this.relationFn = relationFn;
    }

};