function selectbox_init(){
	selectbox_button_style = document.getElementById("selectbox_button_style");
	selectbox_back_bottom = document.getElementById("selectbox_back_bottom");
	selectbox_collar_style = document.getElementById("selectbox_collar_style");
	selectbox_pocket_style = document.getElementById("selectbox_pocket_style");

	selectbox_update();
}

function selectbox_update(){
	var selectbox_button_style = document.getElementById("selectbox_button_style");
	var selectbox_back_bottom = document.getElementById("selectbox_back_bottom");
	var selectbox_collar_style = document.getElementById("selectbox_collar_style");
	var selectbox_pocket_style = document.getElementById("selectbox_pocket_style");	

	switch (selectbox_button_style.selectedOptions[0].getAttribute("value").split("-")[0]){
		case "single":
			console.log("single-breasted");
			selectbox_back_bottom.options[0].removeAttribute("disabled");
			selectbox_back_bottom.options[1].removeAttribute("disabled");
			selectbox_back_bottom.options[2].removeAttribute("disabled");

			selectbox_collar_style.options[0].removeAttribute("disabled");
			selectbox_collar_style.options[1].removeAttribute("disabled");
			break;
		case "double":
			console.log("double-breasted");
			
			if (selectbox_back_bottom.value == "back"){
				selectbox_back_bottom.value = "side";
			}
			selectbox_back_bottom.options[0].setAttribute("disabled","disabled");
			
			if (selectbox_collar_style.value == "notch_lapel"){
				selectbox_collar_style.value = "peaked_lapel";
			}
			selectbox_collar_style.options[0].setAttribute("disabled","disabled");
			break;
		default:
			console.log("undifined situation of button style");
	}
}

function style_selector_event_manage_enable(){
	select_fabric = document.getElementById("select_fabric");
	selectbox_button_style = document.getElementById("selectbox_button_style");
	selectbox_back_bottom = document.getElementById("selectbox_back_bottom");
	selectbox_collar_style = document.getElementById("selectbox_collar_style");
	selectbox_pocket_style = document.getElementById("selectbox_pocket_style");	



	for (var i = 0; i< select_fabric.children.length; i++){
		select_fabric.children[i].addEventListener("click",function(){
			select_fabric.setAttribute("selectedfabric", this.getAttribute("fabrictype"));
			select_fabric.setAttribute("selectedfabricid", this.getAttribute("id"));

			update_fabric();
		});
	}

		selectbox_button_style.addEventListener("change", function(){
			selectbox_update();
			
			update_suit_main();
		});
		selectbox_back_bottom.addEventListener("change", function(){
			selectbox_update();

			update_suit_main();
		});
		selectbox_collar_style.addEventListener("change", function(){
			selectbox_update();

			update_suit_collar();
		});
		selectbox_pocket_style.addEventListener("change", function(){
			selectbox_update();

			update_suit_pocket();
		});
}

function select_button_init(){
	select_fabric = document.getElementById("select_fabric");

	select_fabric.setAttribute("selectedfabric", select_fabric.children[0].getAttribute("fabrictype"));
	select_fabric.setAttribute("selectedfabricid", select_fabric.children[0].getAttribute("id"));

	console.log("select_button_init");
}