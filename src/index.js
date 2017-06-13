function vkApi(method, options) {
    if (!options.v) {
        options.v = '5.64';
    }

    return new Promise((resolve, reject) => {
        VK.api(method, options, data => {
            if (data.error) {
                reject(new Error(data.error.error_msg));
            } else {
                resolve(data.response);
            }
        });
    });
}

function vkInit() {
    return new Promise((resolve, reject) => {
        VK.init({
            apiId: 6067884
        });

        VK.Auth.login(data => {
            if (data.session) {
                resolve();
            } else {
                reject(new Error('Не удалось авторизоваться'));
            }
        }, 2);
    });
}
function addItemList (list, item){
	list.appendChild(item);

}

function isItemList (list, item){
	var n=0;
	for(var i=0; i<list.length; i++){
		var name = list[i].getAttribute('id');
		
		if (name == item.name){
			n=1;
			break;
		}
		
	}
	if(n==1){
		return true;
	}
	else{
		return false;
	}
}
function renderFriendsList (list){

	var friendsList = document.getElementById('friends');
	var filterList = document.getElementById('friends-filter');
	
	for(var i=0; i<list.length; i++){
		var li = document.createElement('li');
		li.setAttribute('id',list[i].last_name)
		li.classList.add("friend-item");
		var spanImg = document.createElement('span');
		spanImg.classList.add("photo");
		var img = document.createElement('img');
		img.setAttribute('src', list[i].photo_200);
		spanImg.appendChild(img);
		var spanName = document.createElement('span');
		spanName.classList.add("name");
		spanName.innerText = list[i].first_name + list[i].last_name;
		li.appendChild (spanImg);
		li.appendChild (spanName);
		var button = document.createElement('button');
		li.appendChild (button);
		
		friendsList.appendChild (li);
	};

	
}
function isMatching(item, value) {

	var str = item.toUpperCase();
	var subStr = value.toUpperCase();
	if (str.indexOf(subStr)<0){
		return false;
	}
	else{
		return true;
	}
}

function filter(list, value){
	var nameList = list.querySelectorAll('.name');
	for  (var i=0; i<nameList.length; i++){
			if (!isMatching(nameList[i].innerText,  value)){
				nameList[i].parentElement.classList.remove('display-block');
				nameList[i].parentElement.classList.add('display-none');
			}
			else{
				nameList[i].parentElement.classList.remove('display-none');
				nameList[i].parentElement.classList.add('display-block');
			}
		}
}


var listeners = {
		
		add: function(target) {
			target.addEventListener("mousedown", this.dragElem);
		},
		
		dragElem: function(e){ 
			var xMin = document.querySelector('#friends-filter').offsetLeft;
			var xMax = xMin + document.querySelector('#friends-filter').offsetWidth;
			var yMin = document.querySelector('#friends-filter').offsetTop;
			var yMax = yMin + document.querySelector('#friends-filter').offsetHeight;
		

			if(e.target.nodeName == "BUTTON"){
				var liCurrent =  e.target.parentElement;
				var list = liCurrent.parentElement;
				var listId = list.getAttribute('id');
				var filterList = document.getElementById('friends-filter');
				var friendsList = document.getElementById('friends');
				
			
					if(listId == 'friends'){
					addItemList(filterList, liCurrent);
					
				}
				else {
					addItemList(friendsList, liCurrent);
				}
				
				
				
			}
			else{
				var target;
				if (e.target.nodeName == "SPAN"){
					target = e.target.parentElement;
				}
				else{
					target = e.target;
				}
				
				console.log(target);
				if(target.parentElement.getAttribute('id') == 'friends'){
					
					target.style.position = "absolute";
					target.style.zIndex = 1000;
					moveFn(e);
					
					function moveFn(e) {
						target.style.left = e.pageX - target.offsetWidth / 2 + 'px';
						target.style.top = e.pageY - target.offsetHeight / 2 + 'px';
					}
					var move = function(e) {
					moveFn(e);
					}
					document.addEventListener("mousemove", move);
					target.addEventListener("mouseup",  function() {
					if (target.offsetLeft<xMin || target.offsetTop>yMax || target.offsetLeft>xMax){
						target.style.position = "relative";
						target.style.left = 0;
						target.style.top = 0;
					}
					
					else{
						target.style.position = "relative";
						target.style.left = 0;
						target.style.top = 0;
						addItemList(document.querySelector('#friends-filter'), target);
						
					}
					
					document.removeEventListener("mousemove", move);
					})
			}
		}
		}
}



new Promise(resolve => window.onload = resolve)
    .then(() => {
		vkInit();
	})

    .then(() => vkApi('friends.get', {fields: 'photo_200'}))
    .then(response => {
		
		var listFriend = response.items;
		var container = document.getElementById('content-inner');
		var saveButton = document.getElementById('save-button');
		var filterList = document.getElementById('friends-filter');
		var friendsList = document.getElementById('friends');
		var inputFriends = document.getElementById('search-list');
		var inputFriendsFilter = document.getElementById('search-filter');
		
		
		if (localStorage.getItem('content')){
			var contentInner = localStorage.getItem('content');
			var contentText = JSON.parse(contentInner);
			container.innerHTML = contentText;
			listeners.add(container);
			saveButton.addEventListener('click', function(){
			var content = container.innerHTML;
			localStorage.setItem('content', JSON.stringify(content));
			
		});
		}
		else{
			renderFriendsList(listFriend);
			listeners.add(container);
			
		}
		inputFriends.addEventListener('keyup', function(){
		var inputValue = inputFriends.value;
		filter(friendsList, inputValue)

		});	
		inputFriendsFilter.addEventListener('keyup', function(){
			var inputValue = inputFriendsFilter.value;
			filter(filterList, inputValue)

		});	
		saveButton.addEventListener('click', function(){
			var content = container.innerHTML;
			localStorage.setItem('content', JSON.stringify(content));
				
		});
		
		
		
	})
    .catch(e => alert('Ошибка: ' + e.message));
