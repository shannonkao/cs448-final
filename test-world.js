$( document ).ready(function() {
    var w = new World();

    // create floor object, passing in unique id ("floor")
    var floor = new ProceduralObject('floor');
    // floor properties
    floor.setTranslate(0,2,new Range(0,10));
    floor.setRotate(-1.2,0,new Range(0.5, 1.5));
    floor.setScale(10,10,1);
    floor.setMaterial("textures/wood_floor_texture.jpg");
    floor.setGeometry('plane');
    // add to world
    w.addObject(floor);

    var table = new ProceduralObject('table');
    table.setGeometry('obj/table.obj');
    table.setMaterial("0x492116");
    table.setScale(1,1,1);
    table.setRotate(0.5,0,0);

    var table_translate = function(tableT, floorT) {
        var x_range = new Range(floorT.x-((floor.getScale().x)/2)+2, floorT.x+((floor.getScale().x)/2)-2);
        tableT.x = tableT.prototype.sampleValue(x_range);
        var z_range = new Range(floorT.z-((floor.getScale().z)/2)+2, floorT.z+((floor.getScale().z)/2)-2);
        tableT.y = floorT.y;
        tableT.z = tableT.prototype.sampleValue(z_range);
    }

    var table_rotate = function(tableR, floorR) {
        tableR.x = 3.14/2+floorR.x/*-.02*/;
        tableR.y = floorR.z;
    }

    table.addConstraint("translate", floor.getTranslate(), table_translate);
    table.addConstraint("rotate", floor.getRotate(), table_rotate);

    w.addObject(table);

    //create chair1 object
    var chair1 = new ProceduralObject('chair1');
    chair1.setGeometry('obj/chair.obj');
    chair1.setMaterial("0xA64F2F");

    var chair1_translate = function(chair1T, tableT) {
        chair1T.x = tableT.x;
        chair1T.y = tableT.y;
        chair1T.z = tableT.z;
    }

    chair1.addConstraint("translate", table.getTranslate(), chair1_translate);

    var chair1_rotate = function(chair1R, tableR) {
        chair1R.x = tableR.x;
        chair1R.y = tableR.y;
        chair1R.z = tableR.z;
    }

    chair1.addConstraint("rotate", table.getRotate(), chair1_rotate);

    var chair_scale = function(chairS, tableS) {
        chairS.x = tableS.x;
        chairS.y = tableS.y;
        chairS.z = tableS.z;
    }

    chair1.addConstraint("scale", table.getScale(), chair_scale);

    w.addObject(chair1);

    //create chair2 object
    var chair2 = new ProceduralObject('chair2');
    chair2.setGeometry('obj/chair.obj');
    chair2.setMaterial("0xA64F2F");
    
    var chair2_translate = function(chair2T, tableT) {
        chair2T.x = tableT.x;
        chair2T.y = tableT.y;
        chair2T.z = tableT.z;
    }

    chair2.addConstraint("translate", table.getTranslate(), chair2_translate);

    var chair2_rotate = function(chair2R, tableR) {
        chair2R.x = tableR.x;
        chair2R.y = tableR.y + 3.14159;
        chair2R.z = tableR.z;
    }

    chair2.addConstraint("rotate", table.getRotate(), chair2_rotate);

    chair2.addConstraint("scale", table.getScale(), chair_scale);

    w.addObject(chair2);

    //create cup object
    var cup = new ProceduralObject('cup');
    cup.setGeometry('obj/cup.obj');
    cup.setMaterial("textures/text.jpg");

    var cup_translate = function(cupT, tableT) {
        cupT.x = tableT.x;
        cupT.y = tableT.y+1.97;
        cupT.z = tableT.z;
    }

    cup.addConstraint("translate", table.getTranslate(), cup_translate);

    var cup_rotate = function(cupR, tableR) {
        cupR.x = tableR.x;
        cupR.y = tableR.y;
        cupR.z = tableR.z;
    }

    cup.addConstraint("rotate", table.getRotate(), cup_rotate);

    var cup_scale = function(cupS, tableS) {
        cupS.x = 0.021*tableS.x;
        cupS.y = 0.021*tableS.y;
        cupS.z = 0.021*tableS.z;
    }

    cup.addConstraint("scale", table.getScale(), cup_scale);

    w.addObject(cup);


    //create lamp object
    var lamp = new ProceduralObject('lamp');
    lamp.setGeometry('obj/table_lamp.obj');
    lamp.setMaterial("0x121212");

    var lamp_translate = function(lampT, tableT) {
        lampT.x = tableT.x-0.7;
        lampT.y = tableT.y+1.1;
        lampT.z = tableT.z+1.8;
    }

    lamp.addConstraint("translate", table.getTranslate(), lamp_translate);

    var lamp_rotate = function(lampR, tableR) {
        lampR.x = tableR.x;
        lampR.y = tableR.y;
        lampR.z = tableR.z;
    }

    lamp.addConstraint("rotate", table.getRotate(), lamp_rotate);

    var lamp_scale = function(lampS, tableS) {
        lampS.x = 0.01*tableS.x;
        lampS.y = 0.01*tableS.y;
        lampS.z = 0.01*tableS.z;
    }

    lamp.addConstraint("scale", table.getScale(), lamp_scale);

    w.addObject(lamp);

    var ts = new Date().getTime();
    var iter = 10000;
    // generate json
    for (var i=0; i<iter; i++) {
        var json = w.generate();
    }
    // console.log(JSON.stringify(json));
    var te = new Date().getTime();
    var t = (te-ts)/iter;
    console.log("Time to generate: "+t+" ms");
    
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
	var light = new THREE.DirectionalLight( 0xffffff, 1.0 );
	light.position.set( 90, 70, 10 );
    //light.castShadow = true;
	scene.add( light );

    // var ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white ambientLight
    // scene.add( ambientLight );

    var spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( 1000, 100, 100 );
    scene.add( spotLight );

    var spotLight2 = new THREE.SpotLight( 0xffffff );
    spotLight2.position.set( 5, 10, 15 );
    scene.add( spotLight2 );

    var pointLight = new THREE.PointLight(  0xff0000, 1, 20, 0.7);
    pointLight.position.set( 0, 10, 10 );
    //scene.add( pointLight );

    var pointLight2 = new THREE.PointLight(  0xffffff, 1, 10, 0.7);
    pointLight2.castShadow = true;
    pointLight2.shadowDarkness = 0.5
    pointLight2.shadowMapWidth = 1024; // default is 512
    pointLight2.shadowMapHeight = 1024; // default is 512
    pointLight2.position.set( 0, 6, 5 );
    scene.add( pointLight2 );

    var pointLight3 = new THREE.PointLight(  0xff0000, 1, 20, 0.7);
    pointLight3.position.set( 1, 8, 4 );
    //scene.add( pointLight3 );

    var pointLight4 = new THREE.PointLight(  0xffffff, 1, 10, 0.7);
    pointLight4.position.set( -1, 7, 3 );
    //scene.add( pointLight4 );

    var pointLight5 = new THREE.PointLight(  0xff0000, 1, 10, 0.7);
    pointLight5.position.set( 2, 10, 6 );
    //scene.add( pointLight5 );
}

function init() {	
    // uniform dist
	scene = new THREE.Scene();
	
	container = document.getElementById( 'container' );
	
	renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.shadowMapType = THREE.PCFSoftShadowMap;
	clearColor = new THREE.Color(0x000000);
	renderer.setClearColor( clearColor );
	renderer.setSize( 500, 500 );
	container.appendChild( renderer.domElement );

    setLight(scene);
    setCamera();
	controls = new THREE.OrbitControls( camera, renderer.domElement );
}
function animate() {
	requestAnimationFrame( animate );
	render();
	controls.update();
}
function render() {
	var time = performance.now();
	renderer.render( scene, camera );
}