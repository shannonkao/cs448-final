World = function () {
  this.objects = {};  // list of procedural objects
  this.edges = {};    // map of object id to direct children
}

World.prototype = {
  // maps unique id to object
  addObject: function(obj) { 
    this.objects[obj.id] = obj;
    // add object as child of the objects it's constrainted by
    for (var c in obj.constraints_) {
      if (!this.edges[c.source]) {
        this.edges[c.source] = [obj.id];
      } else {
        this.edges[c.source].push(obj.id);
      }
    }
  },
  
  // traverses current list of objects to find root nodes
  // in constraint graph
  getRoots: function() {
    // create hash of object id to bool
    var isRoot = {};
    for (var id in this.objects) {
      isRoot[id] = true;
    }
    // iterate over children
    for (var id in this.objects) {
      // if object has constraints, it is not a root
      // TODO constraints should hold all constraints that are necessary
      // to calculate the parent object's properties (i.e objects referenced
      // by constraints must be calculated before the current one)
      if (Object.keys(this.objects[id].constraints_).length != 0) {
        isRoot[c.propertyB.parent] = false;
      }
    }
    // get list of root ids
    roots = []
    for (var id in isRoot) {
      if (isRoot[id]) roots.push(id);
    }
    return roots;
  },
  
  // generate values for an object and it's children based 
  // on the dependency graph
  eval: function(obj) {
    obj.eval();
    for (child in edges[obj.id]) {
      eval(child);
    }
  },
  
  // generate values for the world
  generate: function() {
    var roots = this.getRoots();
    for (r in roots) {
      this.eval(r);
    }
  }
  
  
}
