function create_manager_for_loading(){
	var manager_for_loading = new THREE.LoadingManager();
	manager_for_loading.onProgress = function ( item, loaded, total ) {
		console.log( item, loaded, total );
	};

	return manager_for_loading;
}

// var onProgress = function ( xhr ) {
// 	if ( xhr.lengthComputable ) {
// 		var percentComplete = xhr.loaded / xhr.total * 100;
// 		console.log( Math.round(percentComplete, 2) + '% downloaded' );
// 	}
// };
// var onError = function ( xhr ) {
// };

function create_scene_basic() {

	scene = new THREE.Scene();

	var light = new THREE.AmbientLight( 0xffffff);
	light.name = "ambientlight";
	scene.add( light );
	
	// Grid

	var line_material = new THREE.LineBasicMaterial( { color: 0x999999 } ),
	geometry = new THREE.Geometry(),
	floor = 0, step = 10;

	for ( var i = 0; i <= 20; i ++ ) {

		geometry.vertices.push( new THREE.Vector3( - 100, floor, i * step - 100 ) );
		geometry.vertices.push( new THREE.Vector3(   100, floor, i * step - 100 ) );

		geometry.vertices.push( new THREE.Vector3( i * step - 100, floor, -100 ) );
		geometry.vertices.push( new THREE.Vector3( i * step - 100, floor,  100 ) );
	}

	var line = new THREE.Line( geometry, line_material, THREE.LinePieces );
	scene.add( line );

	return scene;
}


function create_renderer(canvas_to_render){
	var renderer = new THREE.WebGLRenderer( { canvas: canvas_to_render, antialias: true } );

	renderer.setClearColor( 0xcccccc );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( canvas_to_render.scrollWidth, canvas_to_render.scrollHeight, false);
	renderer.shadowMapEnabled = true;
	renderer.shadowMapSoft = true;
	renderer.shadowMapType = THREE.PCFSoftShadowMap;

	return renderer;
}

function create_camera(controls_for_camera){
	var camera = new THREE.PerspectiveCamera( 30, renderer.domElement.width / renderer.domElement.height , 1, 1000 );
	camera.position.z = 15;
	camera.position.y = 5;
	return camera;
}

function creat_controls_for_camera(camera, canvas_to_render){
	var controls = new THREE.OrbitControls( camera, renderer.domElement);
	controls.target = new THREE.Vector3(0,3.5,0);
	controls.damping = 0.2;

	return controls;
}


function update_suit_model(model_name,scene, manager_for_loading, path_OBJ, Path_MTL){
	var loader = new THREE.OBJMTLLoader(manager_for_loading);
	// var loader = new THREE.OBJMTLLoader(manager_for_loading);
	loader.load( path_OBJ, Path_MTL,
		function ( suit_main_loaded ) {
			// suit_main_loaded.scale.x = 2;
			// suit_main_loaded.scale.y = 2;
			// suit_main_loaded.scale.z = 2;
			suit_main_loaded.name = model_name;
			scene.remove(scene.getObjectByName(model_name));
			scene.add( suit_main_loaded );
		},
		function ( xhr ) {
			if ( xhr.lengthComputable ) {
				var percentComplete = xhr.loaded / xhr.total * 100;
				console.log( Math.round(percentComplete, 2) + '% downloaded' );
			}
		},
		function ( xhr ) {
		} );
}

	