var w = new World();

var cube = new ProceduralObject();
cube.setTranslate(1,2,5);
cube.setRotate(0,90,0);
w.addObject(cube);

var sphere = new ProceduralObject();
var c1 = function(cubeT, sphereT) {
    sphereT.y = cubeT.y*2;
}
sphere.addConstraint(c1);
sphere.setRotate(90,180,0);
w.addObject(sphere);

var json = w.generate();
console.log(JSON.stringify(json));