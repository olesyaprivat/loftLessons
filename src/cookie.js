/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
* На странице должно быть текстовое поле для фильтрации cookie
* В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
* Если в поле фильтра пусто, то должны выводиться все доступные cookie



* Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу



 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');
var arrayTable = [];

function addCookie(name, value){
		document.cookie = name + "=" +  value;
		var a = {};
		a[name] = value;
		arrayTable.push(a);
		addTr (name, value);
			
}
function addTr (name, value){
	var tr = document.createElement("tr");
	var tdName = document.createElement("td");
	var tdValue = document.createElement("td");
	var tdButton = document.createElement("td");
	var button = document.createElement("button");
	tdName.innerText = name;
	tr.appendChild (tdName);
	tdValue.innerText = value;
	tr.appendChild (tdValue);
	listTable.appendChild(tr);
	tr.setAttribute("name", name);
	button.innerText = "удалить";
	button.setAttribute("id", name);
	button.setAttribute("class", "delete-button");
	tdButton.appendChild(button);
	tr.appendChild(tdButton);
	
		button.addEventListener('click', function() {
			var name = this.getAttribute("id");
			deleteCookieTable(name);
			var date = new Date(0);
			document.cookie = name + "=; expires=" + date.toUTCString();
			
			for (var i=0; i<arrayTable.length; i++){
				for (key in arrayTable[i]) {
					if (name == key){
						arrayTable.splice(i, 1);
					}
				}
				}
			
		})
}
function deleteCookieTable(name){
	var tr = homeworkContainer.querySelector('[name = "' + name + '"]');
	tr.remove();
}
addButton.addEventListener('click', function() {
	var name = addNameInput.value;
	var value = addValueInput.value;
	var arr = document.getElementsByTagName('tr');
	var n;
	var valueFilter = filterNameInput.value;
	
	if (arr.length !==0){
	
	for (var i=0; i<arr.length; i++){
		if(isMatchingName(arr[i], name)){
		  n=i;
		  break;
		}
		else{
		  n=-1;
		}
		
	}
	if(n>=0){
			if(valueFilter && !value==valueFilter){
				document.cookie = name + "=" +  value;
				deleteCookieTable(name);
			}
			arr[n].children[1].innerText = value;
			document.cookie = name + "=" +  value;
		}

		else{
			if (!valueFilter){
				addCookie(name, value);
			}
			else{
				if (name !== valueFilter &&  value !== valueFilter){
					addCookie(name, value);
				}
			}
	
		}

	}
	else{
		addCookie(name, value);
	}	

});
function isMatchingName(tr, name) {
	var tdList = tr.children;
	if(name == tdList[0].innerText){
		return true;
		}
	else{
		return false;
	}
}
filterNameInput.addEventListener('keyup', function() {

	var valueFilter = filterNameInput.value;
	var trList = listTable.getElementsByTagName('tr');
	if(valueFilter){
	listTable.innerText = "";
	for (var i=0; i<arrayTable.length; i++){		
		for (key in arrayTable[i]) {
			if (valueFilter == key || valueFilter == arrayTable[i][key]){
				addTr(key, arrayTable[i][key]);
			}
		}
	}
	}
	else{
		listTable.innerText = "";
		for (var i=0; i<arrayTable.length; i++){		
			for (key in arrayTable[i]) {
				addTr(key, arrayTable[i][key]);
			}
		}
	}
});


