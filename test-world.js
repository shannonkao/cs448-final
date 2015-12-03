$( document ).ready(function() {
    var w = new World();

    // create floor object, passing in unique id ("floor")
    var floor = new ProceduralObject('floor');
    // floor properties
    floor.setTranslate(0,5,new Range(-20,-5));
    floor.setRotate(-20,0,new Range(-10,10));
    // floor.setTranslate(0,0,0);
    // floor.setRotate(0,0,0);
    floor.setScale(30,30,1);
    floor.setMaterial("textures/wood_floor_texture.jpg");
    // floor.setGeometry('obj/lion.obj');
    floor.setGeometry('plane');
    // add to world
    w.addObject(floor);

    var table = new ProceduralObject('table');
    table.setGeometry('obj/table.obj');
    table.setMaterial("#00ffff");
    table.setScale(1,1,1);
    table.setRotate(0.5,0,0);

    var table_translate = function(tableT, floorT) {
        var x_range = new Range(floorT.x-((floor.getScale().x)/2)+5, floorT.x+((floor.getScale().x)/2)-5);
        tableT.x = tableT.prototype.sampleValue(x_range);
        var y_range = new Range(floorT.y-((floor.getScale().y)/2)-5, floorT.y+((floor.getScale().y)/2)-5);
        tableT.y = floorT.y;
        tableT.z = floorT.z;
    }

    var table_rotate = function(tableR, floorR) {
        tableR.y = floorR.z;
    }

    table.addConstraint("translate", floor.getTranslate(), table_translate);
    table.addConstraint("rotate", floor.getRotate(), table_rotate);

    w.addObject(table);

    //create chair1 object
    var chair1 = new ProceduralObject('chair1');
    chair1.setGeometry('obj/chair.obj');
    chair1.setMaterial("#00ffff");
    chair1.setTranslate(0,0,0);
    chair1.setRotate(0,0,0);
    chair1.setScale(1,1,1);

    var chair1_translate = function(chair1T, tableT) {
        chair1T.x = tableT.x;
        chair1T.y = tableT.y;
        chair1T.z = tableT.z;
    }

    // chair1.addConstraint("translate", table.getTranslate(), chair1_translate);

    var chair1_rotate = function(chair1R, tableR) {
        chair1T.x = tableT.x;
        chair1T.y = tableT.y;
        chair1T.z = tableT.z;
    }

    // chair1.addConstraint("rotate", table.getRotate(), chair1_rotate);

    var chair_scale = function(chairS, tableS) {
        chairS.x = tableS.x;
        chairS.y = tableS.y;
        chairS.z = tableS.z;
    }

    // chair1.addConstraint("scale", table.getScale(), chair_scale);

    w.addObject(chair1);

    // create sphere object
    var sphere = new ProceduralObject('sphere');
    // define constraint relation functions
    var c1 = function(sphereT, floorT) {
        sphereT.y = floorT.y*2;
    }
    var c2 = function(sphereT, floorT) {
        sphereT.z = floorT.z-1;
    }
    var c_t =floor.getTranslate();
    // sphere properties
    sphere.addConstraint("translate", floor.getTranslate(), c1);
    sphere.addConstraint("translate", floor.getTranslate(), c2);
    sphere.setRotate(90,180,0);
    sphere.setScale(1,1,1);
    sphere.setGeometry('sphere');
    sphere.setMaterial('textures/brick_texture.jpg');
    // must add object after adding constraints 
    // (TODO this is cause addObject is the only place the constraint graph is updated)
    w.addObject(sphere);

    // generate json
    var json = w.generate();
    console.log(JSON.stringify(json));

    // THREE.js integration
    init();
    var proceduralScene = genScene(json);
    scene.add(proceduralScene);
	animate();
});


// ---------------------------------------------
// ----------- THREE.JS SPECIFIC CODE ----------
// ---------------------------------------------

function setCamera() {
	camera = new THREE.PerspectiveCamera( 50, 500 / 500, 1, 10000 );
	camera.position.y = 3.0;
	camera.position.z = 15.0;

    var positionIncrement = 1;
    var rotationIncrement = 0.1;

    document.addEventListener('keydown', function(e) {
        var key = e.keyCode;
            
        switch( key ) {
            //keyup
            case 38 :
                camera.position.z -= positionIncrement;
                break;
            //keydown
            case 40 :
                camera.position.z += positionIncrement;
                break;
            //keyleft
            case 37 :
                camera.rotation.y += rotationIncrement;
                break;

            //keyright
            case 39 :
                camera.rotation.y -= rotationIncrement;
                break;
        }
    });
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