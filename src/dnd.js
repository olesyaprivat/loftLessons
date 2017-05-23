/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 * Запрощено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');

/**
 * Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */
function createDiv() {
	var div = document.createElement("div");
	var w = window.innerWidth;
	
	div.classList.add ("draggable-div");
	div.setAttribute("style", "background-color:"+ getRandomColor() + "height:"+ getRandom() + "width:"+ getRandom()  + "top:" + getRandom() + "left:" + getRandom());
	return div;
}
function getRandom() {
	var randomNumber = Math.ceil(Math.random() * 1000);
	return randomNumber + "px;";
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color + ";";
}
/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */
function addListeners(target) {
	target.addEventListener("mousedown", function(e) { 
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
    document.removeEventListener("mousemove", move);
  })

})
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    let div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации d&d
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
