var _objloader = new THREE.OBJLoader();
var _objmtlloader = new THREE.OBJMTLLoader();

// generate unique id
function uid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

// generate THREE.js scene from json
function genScene(json) {
    var obj = new THREE.Object3D();
    for (var id in json) {
        var mat = new THREE.MeshPhongMaterial();
        if (json[id].material.split('.').pop() == "jpg" || json[id].material.split('.').pop() == "png") {
            mat.map = THREE.ImageUtils.loadTexture(json[id].material);
            mat.needsUpdate = true;
        } else {
            //console.log(mat);
            mat.color.setHex(json[id].material);
            //console.log(json[id].material);
            mat.needsUpdate = true;
        }
        // var geom = new THREE.Geometry();
        // if (json[id].geometry.split('.').pop() == "obj") {
        //     // obj file
        //     var objJSON = json[id];
        //     (function(objJSON, mat) {
        //         _objloader.load(objJSON.geometry, function(mesh) {
        //             // var material = new THREE.MeshLambertMaterial();
        //             // var mesh = new THREE.Mesh(geometry, material);
        //             mesh.rotation.set(objJSON.rotate[0],objJSON.rotate[1],objJSON.rotate[2])
        //             mesh.position.set(objJSON.translate[0],objJSON.translate[1],objJSON.translate[2])
        //             mesh.scale.set(objJSON.scale[0],objJSON.scale[1],objJSON.scale[2])
        //             mesh.material = mat;
        //             obj.add(mesh);
        //         } );
        //     })(objJSON, mat);
        var geom = new THREE.Geometry();
        if (json[id].geometry.split('.').pop() == "obj") {
            // obj file
            var objJSON = json[id];
            (function(objJSON, mat) {
                _objmtlloader.load(objJSON.geometry, objJSON.geometry.split('.')[0]+'.mtl', function(mesh) {
                    // var material = new THREE.MeshLambertMaterial();
                    // var mesh = new THREE.Mesh(geometry, material);
                    mesh.rotation.set(objJSON.rotate[0],objJSON.rotate[1],objJSON.rotate[2])
                    mesh.position.set(objJSON.translate[0],objJSON.translate[1],objJSON.translate[2])
                    mesh.scale.set(objJSON.scale[0],objJSON.scale[1],objJSON.scale[2])
                    mesh.traverse( function( child ) {
                        if (child instanceof THREE.Mesh) {
                            child.material = mat;
                            child.castShadow = true;
                            child.receiveShadow = true;
                        }
                    });
                    obj.add(mesh);
                } );
            })(objJSON, mat);
            
        } else {
            // default shapes
            switch (json[id].geometry) {
                case 'sphere':
                    geom = new THREE.SphereGeometry(1, 32, 32);
                    break;
                case 'cube':
                    geom = new THREE.BoxGeometry(1,1,1);
                    break;
                case 'plane':
                    geom = new THREE.PlaneGeometry(1,1);
                    break;
            }
            var mesh = new THREE.Mesh(geom, mat);
            mesh.rotation.set(json[id].rotate[0],json[id].rotate[1],json[id].rotate[2])
            mesh.position.set(json[id].translate[0],json[id].translate[1],json[id].translate[2])
            mesh.scale.set(json[id].scale[0],json[id].scale[1],json[id].scale[2])
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            obj.add(mesh);   
        }
    }        
    return obj;
}