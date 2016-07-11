function create_manager_for_loading(){
	var manager_for_loading = new THREE.LoadingManager();
	manager_for_loading.onProgress = function ( item, loaded, total ) {
		console.log( item, loaded, total );
	};

	return manager_for_loading;
}

function create_scene_basic() {

	scene = new THREE.Scene();

	//light
	var light = new THREE.AmbientLight( 0xffffff);
	light.name = "ambientlight";
	scene.add( light );

	var directionalLight = new THREE.DirectionalLight( 0xffffff );
	directionalLight.position.set( 0, 0, 1 ).normalize();
	scene.add( directionalLight );

	var directionalLight = new THREE.DirectionalLight( 0xffffff );
	directionalLight.position.set( 0, 0, -1 ).normalize();
	scene.add( directionalLight );


	
	// Grid
	var line_material = new THREE.LineBasicMaterial( { color: 0x999999 } ),
	geometry = new THREE.Geometry(),
	floor = -20, step = 10;

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

	renderer.setClearColor( 0xffffff );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( canvas_to_render.scrollWidth, canvas_to_render.scrollHeight, false);
	renderer.shadowMapEnabled = true;
	renderer.shadowMapSoft = true;
	renderer.shadowMapType = THREE.PCFSoftShadowMap;

	return renderer;
}

function create_camera(controls_for_camera){
	var camera = new THREE.PerspectiveCamera( 30, renderer.domElement.width / renderer.domElement.height , 1, 1000 );
	camera.position.z = 100;
	camera.position.y = 0;
	return camera;
}

function creat_controls_for_camera(camera, canvas_to_render){
	var controls = new THREE.OrbitControls( camera, renderer.domElement);
	controls.target = new THREE.Vector3(0,0,0);
	controls.noZoom = true;
	controls.noPan = true;
	controls.minPolarAngle = Math.PI/13*6; // radians
	controls.maxPolarAngle = Math.PI/13*7; // radians

	controls.autoRotate = false;
	controls.autoRotateSpeed = 2.0;

	controls.damping = 0.2;

	return controls;
}

function update_suit_model(model_name,scene, manager_for_loading, path_OBJ, Path_MTL){
	var loader = new THREE.OBJMTLLoader(manager_for_loading);
	// var loader = new THREE.OBJMTLLoader(manager_for_loading);
	loader.load( path_OBJ, Path_MTL,
		function ( suit_model_loaded ) {
			suit_model_loaded.name = model_name;
			scene.remove(scene.getObjectByName(model_name));
			scene.add( suit_model_loaded );
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

// var selectbox_button_style, selectbox_back_bottom, selectbox_collar_style, selectbox_pocket_style;
// var select_fabric;

function update_suit_main(manager_for_loading){
	var suit_main_name = selectbox_button_style.value+'_'+selectbox_back_bottom.value;
	var selected_fabric = select_fabric.getAttribute("selectedfabric");
	var path_OBJ_suit_main = "./assets/models/suit_main/" + suit_main_name + '/' + suit_main_name +'.obj';
	var path_MTL_suit_main = "./assets/models/suit_main/" + suit_main_name + '/' + suit_main_name + '_' + selected_fabric + '.mtl';

	console.log("OBJ: " + path_OBJ_suit_main);
	console.log("MTL: " + path_MTL_suit_main);

	// update_suit_model("suit_main", scene, manager_for_loading, path_OBJ_suit_main, path_MTL_suit_main);
	update_suit_collar();
}

//==============================================unfinished!!!!!!!!!!=================================================================
function update_suit_collar(manager_for_loading){
	var suit_button_style_name = selectbox_button_style.value;
	var suit_collar_name = suit_button_style_name + '_' + selectbox_collar_style.value;
	var selected_fabric = select_fabric.getAttribute("selectedfabric");
	var path_OBJ_suit_collar = "./assets/models/suit_collar/" + suit_collar_name + '/' + suit_collar_name +'.obj';
	var path_MTL_suit_collar = "./assets/models/suit_collar/" + suit_collar_name + '/' + suit_collar_name + '_' + selected_fabric + '.mtl';

	console.log("OBJ: " + path_OBJ_suit_collar);
	console.log("MTL: " + path_MTL_suit_collar);

	update_suit_model("suit_collar", scene, manager_for_loading, path_OBJ_suit_collar, path_MTL_suit_collar);
}
//==============================================================================================================

function update_suit_pocket(manager_for_loading){
	var suit_pocket_name = selectbox_pocket_style.value;
	var selected_fabric = select_fabric.getAttribute("selectedfabric");
	var path_OBJ_suit_pocket = "./assets/models/suit_pocket/" + suit_pocket_name + '/' + suit_pocket_name +'.obj';
	var path_MTL_suit_pocket = "./assets/models/suit_pocket/" + suit_pocket_name + '/' + suit_pocket_name + '_' + selected_fabric + '.mtl';

	console.log("OBJ: " + path_OBJ_suit_pocket);
	console.log("MTL: " + path_MTL_suit_pocket);

	// update_suit_model("suit_pocket", scene, manager_for_loading, path_OBJ_suit_pocket, path_MTL_suit_pocket);
}

function update_fabric(manager_for_loading){
	update_suit_main(scene, manager_for_loading);
	// update_suit_collar();
	update_suit_pocket(scene, manager_for_loading);
}

	