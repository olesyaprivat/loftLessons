/* ДЗ 4 - работа с DOM */

/**
 * Функция должна создать элемент с тегом DIV, поместить в него текстовый узел и вернуть получившийся элемент
 *
 * @param {string} text - текст, который необходимо поместить в div
 * @return {Element}
 */
function createDivWithText(text) {
	var div = document.createElement('div');
	div.innerHTML = (text);
	return div;
}

/**
 * Функция должна создать элемент с тегом A, установить значение для атрибута href и вернуть получившийся элемент
 *
 * @param {string} hrefValue - значение для атрибута href
 * @return {Element}
 */
function createAWithHref(hrefValue) {
	var a = document.createElement('a');
	a.setAttribute("href", hrefValue);
	return a;
}

/**
 * Функция должна вставлять элемент what в начало элемента where
 *
 * @param {Element} what - что вставлять
 * @param {Element} where - куда вставлять
 */
function prepend(what, where) {
	var firstElem = where.firstChild;
	where.insertBefore(what, firstElem);
}


/**
 * Функция должна перебрать все дочерние элементы элемента where
 * и вернуть массив, состоящий из тех дочерних элементов
 * следующим соседом которых является элемент с тегом P
 * Рекурсия - по желанию
 *
 * @param {Element} where - где искать
 * @return {Array<Element>}
 *
 * @example
 * для html '<div></div><p></p><a></a><span></span><p></p>'
 * функция должна вернуть: [div, span]
 * т.к. следующим соседом этих элементов является элемент с тегом P
 */
function findAllPSiblings(where) {
	var childs = where.children;
	var arr = [];
	for (var i=0; i<childs.length; i++){

	if(childs[i].nextElementSibling){
	if (childs[i].nextElementSibling.tagName == "P"){
			arr.push(childs[i]);
		}
	}
	}
	return arr;
}


/**
 * Функция должна перебрать все дочерние узлы типа "элемент" внутри where
 * и вернуть массив, состоящий из текстового содержимого перебираемых элементов
 * Но похоже, что в код закралась ошибка, которую нужно найти и исправить
 *
 * @param {Element} where - где искать
 * @return {Array<string>}
 */
function findError(where) {
    var result = [];

    for (var i = 0; i < where.children.length; i++) {
        result.push(where.children[i].innerText);
    }

    return result;
}

/**
 * Функция должна перебрать все дочерние узлы элемента where
 * и удалить из него все текстовые узлы
 * Без рекурсии!
 * Будьте внимательны при удалении узлов,
 * можно получить неожиданное поведение при переборе узлов
 *
 * @param {Element} where - где искать
 *
 * @example
 * после выполнения функции, дерево <div></div>привет<p></p>loftchool!!!
 * должно быть преобразовано в <div></div><p></p>
 */
function deleteTextNodes(where) {
	var arr = where.childNodes;
	if (arr.length !== 0){
		for (var i=0; i<arr.length; i++){
			if (arr[i].nodeType == 3){
				arr[i].remove();
			}
		}
	}
}

/**
 * Выполнить предудыщее задание с использование рекурсии
 * то есть необходимо заходить внутрь каждого дочернего элемента
 *
 * @param {Element} where - где искать
 *
 * @example
 * после выполнения функции, дерево <span> <div> <b>привет</b> </div> <p>loftchool</p> !!!</span>
 * должно быть преобразовано в <span><div><b></b></div><p></p></span>
 */

function deleteTextNodesRecursive(where) {
	var arr = where.childNodes;
	if (arr.length !== 0){
		for (var i=0; i<arr.length; i++){
			if (arr[i].nodeType == 3){
				arr[i].remove();
				i--;
			}
			else{
				deleteTextNodesRecursive(arr[i]);
			}
		}
	}
	
}

/**
 * *** Со звездочкой ***
 * Необходимо собрать статистику по всем узлам внутри элемента root и вернуть ее в виде объекта
 * Статистика должна содержать:
 * - количество текстовых узлов
 * - количество элементов каждого класса
 * - количество элементов каждого тега
 * Для работы с классами рекомендуется использовать свойство classList
 * Постарайтесь не создавать глобальных переменных
 *
 * @param {Element} root - где собирать статистику
 * @return {{tags: Object<string, number>, classes: Object<string, number>, texts: number}}
 *
 * @example
 * для html <div class="some-class-1"><b>привет!</b> <b class="some-class-1 some-class-2">loftschool</b></div>
 * должен быть возвращен такой объект:
 * {
 *   tags: { DIV: 1, B: 2},
 *   classes: { "some-class-1": 2, "some-class-2": 1 },
 *   texts: 3
 * }
 */



function collectDOMStat(root) {
	var collect = {
	tags : {},
	classes: {}
	};
	textStat (root, collect);
	classStat (root, collect.classes);
	tagsStat (root, collect.tags);
	return  collect;
};

function tagsStat  (elem, stat){
	var arr = elem.children;
	for (var i=0; i<arr.length; i++){
		var elemTag = arr[i].tagName;
		if(stat.hasOwnProperty(elemTag)) {
			stat[elemTag] = ++stat[elemTag];
		} else {
			stat[elemTag] = 1;
		}		
		tagsStat(arr[i], stat);
	}
	return stat;
};


function classStat (elem, stat){
	var arr = elem.children;
	for (var i=0; i<arr.length; i++){
		var elemClassList = arr[i].classList;
		if(elemClassList.length !==0){
			for (var j=0; j<elemClassList.length; j++){

				 if(stat.hasOwnProperty(elemClassList[j])) {
				   stat[elemClassList[j]] = ++stat[elemClassList[j]];
				 } else {
					stat[elemClassList[j]] = 1;
				 }		
			}
		}
		classStat(arr[i], stat);
	}
	return stat;
};


function textStat (elem, stat){
	var arr = elem.childNodes;
	for (var i=0; i<arr.length; i++){
		if(arr[i].nodeType == 3){
			if(stat.hasOwnProperty('texts')){
				stat.texts = ++stat.texts;
			}
			else{
				stat.texts = 1;
			}
		}
		else{
			textStat (arr[i], stat);
		}
	}
	
	return stat.texts;
}


/**
 * *** Со звездочкой ***
 * Функция должна отслеживать добавление и удаление элементов внутри элемента where
 * Как только в where добавляются или удаляются элемента,
 * необходимо сообщать об этом при помощи вызова функции fn со специальным аргументом
 * В качестве аргумента должен быть передан объект с двумя свойствами:
 * - type: типа события (insert или remove)
 * - nodes: массив из удаленных или добавленных элементов (а зависимости от события)
 * Отслеживание должно работать вне зависимости от глубины создаваемых/удаляемых элементов
 * Рекомендуется использовать MutationObserver
 *
 * @param {Element} where - где отслеживать
 * @param {function(info: {type: string, nodes: Array<Element>})} fn - функция, которую необходимо вызвать
 *
 * @example
 * если в where или в одного из его детей добавляется элемент div
 * то fn должна быть вызвана с аргументов:
 * {
 *   type: 'insert',
 *   nodes: [div]
 * }
 *
 * ------
 *
 * если из where или из одного из его детей удаляется элемент div
 * то fn должна быть вызвана с аргументов:
 * {
 *   type: 'remove',
 *   nodes: [div]
 * }
 */
function observeChildNodes(where, fn) {

var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation){ 
  var arr = [];
  var info = {};
	  if (mutation.addedNodes.length > 0){
			for (var i = 0; i < mutation.addedNodes.length; i++) {
				arr.push(mutation.addedNodes[i]);
			}
			info.nodes = arr;
			info.type = "insert";
		}
	  if (mutation.removedNodes.length > 0 ){
		for (var i = 0; i < mutation.removedNodes.length; i++){
			arr.push(mutation.removedNodes[i]);
		}
		info.nodes = arr;
		info.type = "remove";
	  }
	
	  fn(info);
  });    
  
});
 
var config = { childList: true, subtree: true };

observer.observe(where, config);
}




export {
    createDivWithText,
    createAWithHref,
    prepend,
    findAllPSiblings,
    findError,
    deleteTextNodes,
    deleteTextNodesRecursive,
    collectDOMStat,
    observeChildNodes
};
