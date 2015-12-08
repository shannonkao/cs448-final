World = function () {
  this.objects = {};    // list of procedural objects
  this.edges = {};      // map of object id to direct children
  
  this.error = "";      // error string for scenes that cannot be evaluated
  this.json = {};       // json output of evaluated scene
  
  this.visited = {};    // variables for cycle detection
  this.stack = {};
}

World.prototype = {
  // maps unique id to object
  addObject: function(obj) { 
    this.objects[obj.id] = obj;
    // add object as child of the objects it's constrainted by
    for (var i=0; i<obj.constraints_.length; i++) {
      var c = obj.constraints_[i]; 
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
    // create hash of object id to bool, reset visited node table
    var isRoot = {};
    for (var id in this.objects) {
      isRoot[id] = true;
      this.visited[id] = false;
    }
    // iterate over children
    for (var id in this.objects) {
      // if object has constraints, it is not a root
      // TODO constraints should hold all constraints that are necessary
      // to calculate the parent object's properties (i.e objects referenced
      // by constraints must be calculated before the current one)
      if (Object.keys(this.objects[id].constraints_).length != 0) {
        isRoot[id] = false;
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
  eval: function(obj, parent) {
    this.visited[obj.id] = true;
    this.stack[obj.id] = true;
    
    // evaluate object
    obj.eval();
    if (this.edges[obj.id]) {
        for (var i=0; i<this.edges[obj.id].length; i++) {
            var child = this.edges[obj.id][i];
            // error checking
            if (this.stack[this.objects[child].id]) {
                this.error = "Cycle detected in your graph.";
                return;
            }
            // recurse
            this.eval(this.objects[child], this.obj);
        }
    }
    
    this.stack[obj.id] = false;
  },
  
  // generate values for the world
  generate: function() {
    var roots = this.getRoots();
    if (roots.length === 0) this.error = "No root nodes detected in your scene."
        
    for (var i=0; i<roots.length; i++) {
      this.eval(this.objects[roots[i]], null);
    }
    
    if (this.error != "") {
        return {"error": this.error};
    } else {
        //return this.json;
    }
    
    // return flat json object of world objects
    var json = {}
    for (var id in this.objects) {
        json[id] = {};
        json[id]["translate"] = this.objects[id].getTranslate().getValue();
        json[id]["rotate"] = this.objects[id].getRotate().getValue();
        json[id]["scale"] = this.objects[id].getScale().getValue();
        json[id]["count"] = this.objects[id].getCount().getValue();
        json[id]["geometry"] = this.objects[id].getGeometry().getValue();
        json[id]["material"] = this.objects[id].getMaterial().getValue();
    }
    
    return json;
  }
}
