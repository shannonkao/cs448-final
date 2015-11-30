var w = new World();

var cube = new ProceduralObject();
cube.setTranslate(1,2,new Range(5,10));
cube.setRotate(0,90,0);
w.addObject(cube);

var sphere = new ProceduralObject();
var c1 = function(sphereT, cubeT) {
    sphereT.y = cubeT.y*2;
}
var c2 = function(sphereT, cubeT) {
    sphereT.z = cubeT.z-1;
}
var c_t =cube.getTranslate();
sphere.addConstraint("translate", cube.getTranslate(), c1);
sphere.addConstraint("translate", cube.getTranslate(), c2);
sphere.setRotate(90,180,0);
// must add object after adding constraints 
// (TODO this is cause addObject is the only place the constraint graph is updated)
w.addObject(sphere);

var json = w.generate();
console.log(JSON.stringify(json));