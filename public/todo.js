var input_item = document.getElementById('input_item');
var btn_item = document.getElementById('btn_item');
var ul_items = document.getElementById('ul_items');
var btn_delete = document.getElementById('btn_delete');

btn_item.addEventListener('click', function(e){
	if(input_item.value !== ""){
		var item = input_item.value;

		ajax_newItem(item);
	}	
});

ul_items.addEventListener('click', function(e){
	if(e.target.id === 'btn_delete'){
		ajax_deleteItem(e.target.parentElement.textContent, e.target.parentElement);
	}
 });

function ajax_newItem(_item){
	var data = {item: _item};
	var item = JSON.stringify(data);
	var xhr = new XMLHttpRequest();
	
	xhr.onreadystatechange = function(){
		if(this.readyState === 4 && this.status === 200){
			if(this.responseText === "already exists"){
				console.log("item alredy exists");
				input_item.value = "";
			}
			else{
				var newItem = this.responseText;
				var t = document.createTextNode(newItem);
				var li = document.createElement('li');
				var btn_delete = document.createElement('button');
				
				btn_delete.id='btn_delete';
				btn_delete.innerHTML = "delete";
				li.appendChild(btn_delete);
				li.id='li_items';
				li.appendChild(t);
				ul_items.appendChild(li);
				input_item.value = "";
			}		
		}
	}

	xhr.open('post', '/newItem', true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(item);
}

function ajax_deleteItem(_item, _element){
	var item = JSON.stringify({item: _item.replace(/delete/i, "")});
	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function(){
		if(this.readyState === 4 && this.status === 200){
			_element.remove();
		}
	}

	xhr.open('delete', '/deleteItem', true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(item);
}