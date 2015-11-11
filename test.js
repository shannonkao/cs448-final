var container, stats, controls, camera, scene, renderer;
var orientations, offsets;

var modelManager;

var clearColor;

var instances = 10;
var seed = 0;


function setCamera() {
	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.y = 20.0;
	camera.position.z = 220;
}

function setTerrain() {
	// ground
	var groundGeom = new THREE.PlaneGeometry( 500,500, 1,1 );
	var groundMaterial = new THREE.MeshBasicMaterial( {color: 0x999999, side: THREE.DoubleSide} );
	var ground = new THREE.Mesh( groundGeom, groundMaterial );
	ground.rotation.x += Math.PI/2.0;
	ground.position.y -= 1.0/2.0;
	scene.add(ground);
}

function setLight() {
	var light = new THREE.DirectionalLight( 0xffffff, 3.5 );
	light.position.set( 1, 0, 0 );
	scene.add( light );
}

function setStats() {
	stats = new Stats();
	container.appendChild( stats.domElement );
}

function random() {
	var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

function init() {	
	scene = new THREE.Scene();
	
	container = document.getElementById( 'container' );
	
	renderer = new THREE.WebGLRenderer();
	clearColor = new THREE.Color(0x101010);
	renderer.setClearColor( clearColor );
	renderer.setSize( 500, 500 );
	container.appendChild( renderer.domElement );
	
	setCamera();
	setTerrain();
	setStats();
	
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.addEventListener( 'change', render );

	window.addEventListener( 'resize', onWindowResize, false );
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
}

$( document ).ready(function() {
	init();
	animate();
});