if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container, stats;
var camera, controls_for_camera, scene, renderer, manager_for_loading;

var selectbox_button_style, selectbox_back_bottom, selectbox_collar_style, selectbox_pocket_style;
var select_fabric;

// var loader;

init();
animate();

//===================================================================================================
function animate() {
	requestAnimationFrame(animate);
	controls_for_camera.update();
	render();
}

function init() {

	selectbox_init();
	select_button_init();

	scene = create_scene_basic();

	manager_for_loading = create_manager_for_loading();
	// //=================================================================================================
	// var loader = new THREE.OBJMTLLoader(manager_for_loading);
	// loader.load( '/assets/models/models_for_test/Lol_Katarina_Default/Lol_Katarina_Default.obj',
	// 	'/assets/models/models_for_test/Lol_Katarina_Default/Lol_Katarina_Default.mtl',
	// 	function ( object ) {
	// 		object.scale.x = 2;
	// 		object.scale.y = 2;
	// 		object.scale.z = 2;
	// 		object.name = "model_to_show";

	// 		scene.remove(scene.getObjectByName("model_to_show"));				
	// 		scene.add( object );
	// 	},
	// onProgress, onError );
	// //==================================================================================================
	//=================================================================================================
	// var loader = new THREE.OBJMTLLoader(manager_for_loading);
	// // var loader = new THREE.OBJMTLLoader(manager_for_loading);
	// loader.load( '/assets/models/models_for_test/Lol_Katarina_Default/Lol_Katarina_Default.obj',
	// 	'/assets/models/models_for_test/Lol_Katarina_Default/Lol_Katarina_Default.mtl',
	// 	function ( object ) {
	// 		object.scale.x = 2;
	// 		object.scale.y = 2;
	// 		object.scale.z = 2;
	// 		object.name = "model_to_show";

	// 		// scene.remove(scene.getObjectByName("model_to_show"));
	// 		scene.add( object );
	// 	},
	// 	function ( xhr ) {
	// 		if ( xhr.lengthComputable ) {
	// 			var percentComplete = xhr.loaded / xhr.total * 100;
	// 			console.log( Math.round(percentComplete, 2) + '% downloaded' );
	// 		}
	// 	},
	// 	function ( xhr ) {
	// 	} );
	//==================================================================================================
	update_suit_model("suit_main", 
		scene, manager_for_loading, 
		'/assets/models/models_for_test/Lol_Katarina_Default/Lol_Katarina_Default.obj',
		'/assets/models/models_for_test/Lol_Katarina_Default/Lol_Katarina_Default.mtl');

	// renderer
	canvas_to_render = document.getElementById('canvas_for_three');
	renderer = create_renderer(canvas_to_render);

	camera = create_camera(controls_for_camera);
	controls_for_camera = creat_controls_for_camera(camera, canvas_to_render);
	controls_for_camera.addEventListener( 'change', render );
	style_selector_event_manage_enable();
	window.addEventListener( 'resize', onWindowResize, false );
	
	animate();
}

function onWindowResize() {
	renderer.setSize( canvas_to_render.scrollWidth, canvas_to_render.scrollHeight ,false);
	camera.aspect = renderer.domElement.width / renderer.domElement.height;
	camera.updateProjectionMatrix();

	render();
}

function render() {
	renderer.render( scene, camera );
}

