$( document ).ready(function() {
    var w = new World();

    var cube = new ProceduralObject('cube');
    cube.setTranslate(1,2,new Range(5,10));
    cube.setRotate(0,90,0);
    cube.setScale(1,1,1);
    cube.setGeometry('cube');
    w.addObject(cube);

    var sphere = new ProceduralObject('sphere');
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
    sphere.setScale(1,1,1);
    sphere.setGeometry('sphere');
    // must add object after adding constraints 
    // (TODO this is cause addObject is the only place the constraint graph is updated)
    w.addObject(sphere);

    var json = w.generate();
    console.log(JSON.stringify(json));

    // THREE.js integration
    init();
    var proceduralScene = genScene(json);
    scene.add(proceduralScene);
    console.log(scene);
	animate();
});

function setCamera() {
	camera = new THREE.PerspectiveCamera( 50, 500 / 500, 1, 10000 );
	camera.position.y = 3.0;
	camera.position.z = 15.0;
}
function setLight(s) {
	var light = new THREE.DirectionalLight( 0xffffff, 1.5 );
	light.position.set( 90, 70, 100 );
	s.add( light );
}
function init() {	
    // uniform dist
	scene = new THREE.Scene();
	
	container = document.getElementById( 'container' );
	
	renderer = new THREE.WebGLRenderer();
	clearColor = new THREE.Color(0x000000);
	renderer.setClearColor( clearColor );
	renderer.setSize( 500, 500 );
	container.appendChild( renderer.domElement );

    setLight(scene);
    setCamera();
}
function animate() {
	requestAnimationFrame( animate );

	render();
}

function render() {
	var time = performance.now();
	renderer.render( scene, camera );
}