var map;

var template = `
<div class="content-info">
	<div class="header">{{address}}
	</div>
	<div class="content-list">
	<div class="non-review">Отзывов пока нет</div>
	</div>
	<div class="form-add">
		<h3>Ваш отзыв</h3>
		
		<div>
			<input type="text" placeholder="Ваше имя"  class="input-text name"/>
		</div>
		<div>
			<input type="text" placeholder="Место"  class="input-text place"/>
		</div>
		<div>
			<textarea placeholder="Ваш отзыв"  class="input-text review"></textarea>
		</div>
		<div class="button-container"><button class="button-form">Добавить</button></div>

	</div>
</div>
`;

var templateFn = Handlebars.compile(template);
var markersList = {
	arrayMarkerAll : [],
	titleList : [],
	content : [],
	contentReview : []
};

function geocodePlaceId(geocoder, map, latLng) {
	return new Promise(resolve => {
		var header = geocoder.geocode({'location': latLng}, function(results, status) {
		if (status === 'OK') {
		if (results[1]) {
			resolve ({address : results[1].formatted_address});	
		} 
		else {
			window.alert('No results found');
		}
		}
		else {
			window.alert('Geocoder failed due to: ' + status);
		}
	});
	})
}
function renderReview (content){

	var itemRewiew = document.createElement('div');
	var now = new Date();
	var time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
	var data = now.getFullYear() + "/" + now.getMonth()+ "/" + now.getDate() + ' ' + time;
	var inputNameValue = content.querySelector('.name').value || "";
	var inputPlaceValue = content.querySelector('.place').value || "";
	var inputReviewValue = content.querySelector('.review').value || "";
	var reviewList = content.querySelector('.content-list');
	var spanPlace = document.createElement('div');
	spanPlace.classList.add('place-content');
	spanPlace.innerHTML = inputPlaceValue;
	var spanName = document.createElement('span');
	spanName.classList.add('name-content');
	spanName.innerHTML = inputNameValue;
	var divReview = document.createElement('div');
	divReview.classList.add('review-content');
	divReview.innerHTML = inputReviewValue;
	var spanData = document.createElement('span');
	spanData.innerHTML = data; 
	itemRewiew.appendChild(spanName);
	itemRewiew.appendChild(spanPlace);
	itemRewiew.appendChild(spanData);
	itemRewiew.appendChild(divReview);
	reviewList.appendChild(itemRewiew);
	reviewList.querySelector('.non-review').setAttribute('style', 'display:none');
	
	var reviewObj = {
		date: data,
		name: inputNameValue,
		place: inputPlaceValue,
		review: inputReviewValue
	}
	markersList.contentReview.push (reviewObj);	
	clearForm (content);
}
function infoWindowOpen (map, pos, content){
 	var infowindow = new google.maps.InfoWindow({
			position: pos
	});
	infowindow.open(map);
	infowindow.setContent(content);
	return infowindow;
}
function clearForm (content){
	content.querySelector('.name').value = "";
	content.querySelector('.place').value = "";
	content.querySelector('.review').value = "";
}
function renderContentPopap (title, map, pos){
	var content = document.createElement('div');
	content.innerHTML = templateFn(title);
	infoWindowOpen (map, pos, content);
	var arrayMarker = [];
	
	content.addEventListener ('click', function(e){

		if (e.target.nodeName == 'BUTTON'){
			var marker = new google.maps.Marker({
				position: pos,
				map: map
			});

			marker.addListener('click', function(e){
				infoWindowOpen (map, pos, content);
			})
	
			markersList.arrayMarkerAll.push(marker);
			markersList.titleList.push(title);
			arrayMarker.push(marker);
			renderReview(content);
			markersList.content.push(content);
			var list = content.querySelector('.content-list').children;
			
			if(list.length > 1){
				setCluster(arrayMarker);
			}
		}
	})
}
function setCluster(markers) {
  	var markerCluster = new MarkerClusterer(map, markers, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
	
	map.addListener('zoom_changed', function () {
        var markerCluster = new MarkerClusterer(map, markersList.arrayMarkerAll, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
	})	

	ClusterIcon.prototype.triggerClusterClick = function() {
		var markerClusterer = this.cluster_.getMarkerClusterer();
		event.stopPropagation();
		google.maps.event.trigger(markerClusterer, 'clusterclick', this.cluster_);
		if (markerClusterer.isZoomOnClick(event)) {			
			var array = this.cluster_.markers_;
			var clasterObj = getData (array);
			var contentCarusel = renderCaruselContent (clasterObj, array[0].position);
			var infowindowCarusel = infoWindowOpen (map, array[0].position, contentCarusel);
			var addressList  = document.querySelectorAll('.carusel_wrap .adress');
			for (var i=0; i<addressList.length; i++){
				addressList[i].addEventListener('click', function(e){
				var title = e.target.innerHTML;
				var number = isTtitle (clasterObj.titles, title);
				infowindowCarusel.close();
				infoWindowOpen(map, array[0].position, clasterObj.content[number]);
			})
  }

		}
	};
}
function isTtitle (array, title){
	var n = -1;
	for (var i=0; i<array.length; i++){
		if (array[i] == title){
			n=i;
		}
	}
	return n;
}

function getData (clasterMarker){
	var allMarkers = markersList.arrayMarkerAll;
	var titleListArray = markersList.titleList;
	var listContent = markersList.content;
	var clasterObj = {
		titles : [],
		markers : [],
		content : [],
		contentReview : []
	}
	var n = [];
	for(var j=0; j<clasterMarker.length; j++){
		
		for (var i=0; i<allMarkers.length; i++){
			if (allMarkers [i].position.lat() == clasterMarker[j].position.lat() && allMarkers [i].position.lng() == clasterMarker[j].position.lng()){
			
				if(n.length==0){
					n.push(i);	
				}
				else{
					if(isTtitle (n, i)==-1){
					n.push(i);	
				}
				}
			}
		}

	}
	for (var i=0; i<n.length; i++){
		var number = n[i];
		clasterObj.titles.push (titleListArray[number].address);
		clasterObj.markers.push (allMarkers[number]);
		clasterObj.content.push (listContent[number]);
		clasterObj.contentReview.push (markersList.contentReview[number]);
	}
	return clasterObj;
}
function renderCaruselContent (clasterObj, position){

	var content = document.createElement('div');
	content.classList.add('carusel_wrap');
	var ulList = document.createElement('ul');
  	ulList.setAttribute('id', 'list');
	ulList.setAttribute('class', 'list');
  	var links  = document.createElement('ul');
  	links.setAttribute('id', 'links');
	links.setAttribute('class', 'links');
	var wrapper = document.createElement('div');
	wrapper.setAttribute('id', 'carousel');
	wrapper.setAttribute('class', 'carousel');
	var j = 0;

	for (var i = 0; i < clasterObj.titles.length; i++) {
		var li = document.createElement('li');
		var divPlace = document.createElement('div');
		divPlace.classList.add('place');
		var divAdress = document.createElement('div');
		divAdress.classList.add('adress');
		var divTextReview = document.createElement('div');
		divTextReview.classList.add('text-review');
		var divDataReview = document.createElement('div');
		divDataReview.classList.add('data-review');
		divPlace.innerHTML = clasterObj.contentReview[i].place;
		divAdress.innerHTML = clasterObj.titles[i];
		divTextReview.innerHTML = clasterObj.contentReview[i].review;
		divDataReview.innerHTML = clasterObj.contentReview[i].date;
 		li.appendChild(divPlace);
		li.appendChild(divAdress);
		li.appendChild(divTextReview);
		li.appendChild(divDataReview);
		ulList.appendChild(li);

		var linkLi = document.createElement('li');
		linkLi.setAttribute('id', i);
		linkLi.innerHTML = ++j;
		links.appendChild(linkLi);
		if (i == 0){
			li.classList.add('display-block');
			linkLi.classList.add('active');
		}
	}
  	content.appendChild (ulList);
  	content.appendChild (links);
  	var listitems = ulList.children;
	var linksitems = links.children;
 	links.addEventListener('click', function(e){
		var id = e.target.getAttribute('id');
		for (var i = 0; i < listitems.length; i++){
			listitems[i].classList.remove('display-block');
			if (i==id){
				listitems[i].classList.add('display-block');
			}
			else{
				listitems[i].classList.remove('display-block');
			}
    	 }	

		for (var i = 0; i < linksitems.length; i++){
			linksitems[i].classList.remove('active');
		}
		e.target.classList.add('active');
  	}); 
  	var buttonPrev=document.createElement('button');
  	buttonPrev.setAttribute('id', 'prev');
	buttonPrev.innerText = '<' 
 	var buttonNext=document.createElement('button');
  	buttonNext.setAttribute('id', 'next');
	buttonNext.innerText = '>' 
  	content.appendChild (buttonPrev);
  	content.appendChild (buttonNext);
  	buttonPrev.addEventListener('click', function(){
		for (var i=0; i<listitems.length; i++){
			var classItem = listitems[i].classList;
			if(isTtitle(classItem, 'display-block')>=0){
				if(listitems[i].previousSibling){
					listitems[i].classList.remove('display-block');
					listitems[i].previousSibling.classList.add('display-block');

					for (var j = 0; j < linksitems.length; j++){
						linksitems[j].classList.remove('active');
					}
					linksitems[i-1].classList.add('active');
					break;
				}
			}
		}
  	});
 	buttonNext.addEventListener('click', function(){
     	for (var i=0; i<listitems.length; i++){
			var classItem = listitems[i].classList;
			if(isTtitle(classItem, 'display-block')>=0){
				if(listitems[i].nextSibling){
					listitems[i].classList.remove('display-block');
					listitems[i].nextSibling.classList.add('display-block');
					for (var j = 0; j < linksitems.length; j++){
						linksitems[j].classList.remove('active');
					}
					linksitems[i+1].classList.add('active');
					break;
				}
			}
		}
  	});
  	return content;
}

function initMap() {
    var uluru = {lat: -25.363, lng: 131.044};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: uluru
    });
     
}
  
new Promise(resolve => window.onload = resolve)
.then(() => {
	initMap();
	var mc = new MarkerClusterer(map);
})
.then(() => {
	map.addListener('click', function(e , event) {
		var title;
		var geocoder = new google.maps.Geocoder;
		geocodePlaceId(geocoder, map, e.latLng).then(response =>{
		title = response;
	})
	.then(()=>{
		renderContentPopap (title, map , e.latLng);
	})
	});
	var a = markersList.arrayMarkerAll;
	setCluster(markersList.arrayMarkerAll);
})

	  
	  
	  
	  
	  
