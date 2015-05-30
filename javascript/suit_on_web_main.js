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

	// renderer
	canvas_to_render = document.getElementById('canvas_for_three');
	renderer = create_renderer(canvas_to_render);

	camera = create_camera(controls_for_camera);
	controls_for_camera = creat_controls_for_camera(camera, canvas_to_render);
	controls_for_camera.addEventListener( 'change', render );
	style_selector_event_manage_enable();
	window.addEventListener( 'resize', onWindowResize, false );

	update_suit_main(scene, manager_for_loading);
	// update_suit_collar(scene, manager_for_loading);
	update_suit_pocket(scene, manager_for_loading);


	update_suit_model("suit_main", 
		scene, manager_for_loading, 
		'/assets/models/suit_main/single-breasted_2_side/single-breasted_2_side.obj',
		'/assets/models/suit_main/single-breasted_2_side/single-breasted_2_side_fabric_black.mtl');

	update_suit_model("suit_collar", 
		scene, manager_for_loading, 
		'/assets/models/suit_collar/single-breasted_2_peaked_lapel/single-breasted_2_peaked_lapel.obj',
		'/assets/models/suit_collar/single-breasted_2_peaked_lapel/single-breasted_2_peaked_lapel_fabric_blue.mtl');

	// update_suit_model("models_for_test", 
	// 	scene, manager_for_loading, 
	// 	'/assets/models/models_for_test/Lol_Katarina_Default/Lol_Katarina_Default.obj',
	// 	'/assets/models/models_for_test/Lol_Katarina_Default/Lol_Katarina_Default.mtl');

	// console.log(scene);
	// console.log(scene.getObjectByName("models_for_test"));

	// scene.getObjectByName("models_for_test").scale.x = 5;
	// scene.getObjectByName("models_for_test").scale.y = 5;
	// scene.getObjectByName("models_for_test").scale.z = 5;

	animate();
}

	


//===========================================================================================

function onWindowResize() {
	renderer.setSize( canvas_to_render.scrollWidth, canvas_to_render.scrollHeight ,false);
	camera.aspect = renderer.domElement.width / renderer.domElement.height;
	camera.updateProjectionMatrix();

	render();
}

function render() {
	renderer.render( scene, camera );
}

