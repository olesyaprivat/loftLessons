/* ДЗ 6.1 - Асинхронность и работа с сетью */

/**
 * Функция должна создавать Promise, который должен быть resolved через seconds секунду после создания
 *
 * @param {number} seconds - количество секунд, через которое Promise должен быть resolved
 * @return {Promise}
 */
function delayPromise(seconds) {
	var promise = new Promise(function(resolve, reject) {
	 setTimeout(function(){
		resolve();
	  }, seconds*1000);
	  
	})
	return promise;
}

/**
 * Функция должна вернуть Promise, который должен быть разрешен массивом городов, загруженным из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * Элементы полученного массива должны быть отсортированы по имени города
 *
 * @return {Promise<Array<{name: String}>>}
 */
function loadAndSortTowns() {
	
	var promise = new Promise(function(resolve, reject) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json', true);
		xhr.send();
		xhr.addEventListener("load", function() {
			var city = JSON.parse(xhr.responseText);
			var array = [];
			for (var i=0; i<city.length; i++){
				array.push(city[i].name);
			}
			
			var sortCity = array.sort();
			var cityArray = [];
			for (var i=0; i<sortCity.length; i++){
				cityArray.push({name : sortCity[i]});
			}
			
			resolve(cityArray);
		})

	})
	return(promise);
}

export {
    delayPromise,
    loadAndSortTowns
};
