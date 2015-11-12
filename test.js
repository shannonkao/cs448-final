var container, stats, controls, camera, scene, renderer;
var orientations, offsets;

var modelManager;

var clearColor;

var instances = 10;
var seed = 1;


function setCamera() {
	camera = new THREE.PerspectiveCamera( 50, 500 / 500, 1, 10000 );
	camera.position.y = 500.0;
	camera.position.z = 0;
}

function setTerrain(s) {
	// ground
	var groundGeom = new THREE.PlaneGeometry( 500,500, 1,1 );
	var groundMaterial = new THREE.MeshBasicMaterial( {color: 0x999999, side: THREE.DoubleSide} );
	var ground = new THREE.Mesh( groundGeom, groundMaterial );
	ground.rotation.x += Math.PI/2.0;
	ground.position.y -= 1.0/2.0;
	s.add(ground);
}

function setLight(s) {
	var light = new THREE.DirectionalLight( 0xffffff, 1.5 );
	light.position.set( 90, 70, 100 );
	s.add( light );
}

function setStats() {
	stats = new Stats();
	container.appendChild( stats.domElement );
}

function random() {
	var x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function getVal(range, distribution) {
  switch(distribution) {
    case 'normal':
    case 'gaussian':
      var r = random()*2 - 1;
      var sample = 1/Math.sqrt(2*Math.PI) * Math.exp(-(r-1)*(r-1)/2) * 2;
      return ((range[1] - range[0])*sample + range[0]);
      break;
    case 'cosine':
      var r = random();
      var sample = (Math.cos(( r )*Math.PI)*0.5 + 0.5);
      return ((range[1] - range[0])*(sample) + range[0]);
      break;
    default: // uniform distribution
      var r = random();
      return ((range[1] - range[0])*r + range[0]);
      break;
  }
    
}

function cube(distribution) {
  var dimensions = [10, getVal([10,50], distribution), 10]
  var translation = [getVal([-200, 200], distribution), dimensions[1]/2, getVal([-200, 200], distribution)]
  
  var c = new THREE.BoxGeometry(dimensions[0], dimensions[1], dimensions[2]);
  var m = new THREE.Mesh(c, new THREE.MeshLambertMaterial( {color: 0xcccccc} ));
  m.position.set(translation[0], translation[1], translation[2]);
  return m;
}

function init() {	
  // uniform dist
	scene = new THREE.Scene();
	
	container = document.getElementById( 'uniform' );
	
	renderer = new THREE.WebGLRenderer();
	clearColor = new THREE.Color(0xffffff);
	renderer.setClearColor( clearColor );
	renderer.setSize( 500, 500 );
	container.appendChild( renderer.domElement );
	
	setTerrain(scene);
  setLight(scene);
  
  for (var i=0; i<200; i++) {
    scene.add(cube('uniform'));
  }
  
  // gaussian dist
	scene_gauss = new THREE.Scene();
	container_gauss = document.getElementById( 'gaussian' );
	renderer_gauss = new THREE.WebGLRenderer();
	renderer_gauss.setClearColor( new THREE.Color(0xffffff) );
	renderer_gauss.setSize( 500, 500 );
	container_gauss.appendChild( renderer_gauss.domElement );
  	
	setTerrain(scene_gauss);
  setLight(scene_gauss);
    
  for (var i=0; i<200; i++) {
    scene_gauss.add(cube('cosine'));
  }
  
  // globals
  setCamera();
	setStats();
  	
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.addEventListener( 'change', render );
}

function onWindowResize( event ) {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
	requestAnimationFrame( animate );

	render();
	stats.update();
	controls.update();
}

function render() {
	var time = performance.now();
	renderer.render( scene, camera );
	renderer_gauss.render( scene_gauss, camera );
}

$( document ).ready(function() {
	init();
	animate();
});