/* ДЗ 2 - работа с исключениями и отладчиком */

/*
 Задача 1:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true только если fn вернула true для всех элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isAllTrue(array, fn) {
  try {
    if (typeof fn !== "function") {
      throw new Error("fn is not a function");
    }
    if (array.length == 0 || array.length == undefined) {
      throw new Error("empty array");
    }
    if (fn(array) == true) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e.message);
  }
}

/*
 Задача 2:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true если fn вернула true хотя бы для одного из элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isSomeTrue(array, fn) {
  try {
    if (typeof fn !== "function") {
      throw new Error("fn is not a function");
    }
    if (array.length == 0 || array.length == undefined) {
      throw new Error("empty array");
    }
    for (var i = 0; i < array.length; i++) {
      if (fn(array[i]) == true) {
        return true;
      }
    }
    return false;
  } catch (e) {
    console.log(e.message);
  }
}

/*
 Задача 3:
 Функция принимает заранее неизветсное количество аргументов, первым из которых является функция fn
 Функция должна поочередно запусти fn для каждого переданного аргумента (кроме самой fn)
 Функция должна вернуть массив аргументов, для которых fn выбросила исключение
 Необходимо выбрасывать исключение в случаях:
 - fn не является функцией (с текстом "fn is not a function")
 */
function returnBadArguments(fn, ...arg) {
  try {
    if (typeof fn !== "function") {
      throw new Error("fn is not a function");
    }
    var a = [];
    for (var i = 0; i < arg.length; i++) {
      if (!fn(arg[i])) {
        a.push(arg[i]);
      }
    }
    return a;
  } catch (e) {
    console.log(e.message);
  }
}

/*
 Задача 4:
 Функция имеет параметр number (по умолчанию - 0)
 Функция должна вернуть объект, у которого должно быть несколько методов:
 - sum - складывает number с переданными аргументами
 - dif - вычитает из number переданные аргументы
 - div - делит number на первый аргумент. Результат делится на следующий аргумент (если передан) и так далее
 - mul - умножает number на первый аргумент. Результат умножается на следующий аргумент (если передан) и так далее
 
 Количество передаваемых в методы аргументов заранее неизвестно
 Необходимо выбрасывать исключение в случаях:
 - number не является числом (с текстом "number is not a number")
 - какой-либо из аргументов div является нулем (с текстом "division by 0")
 */
function calculator(...arg) {
  try {
    var number = 0;
    var calc = {
      typeCheck: function() {
        for (var i = 0; i < arg.length; i++) {
          if (typeof arg[i] !== "number") {
            throw new Error("number is not a number");
          }
        }
        return true;
      },
      sum: function() {
        if (this.typeCheck() == true) {
          for (var i = 0; i < arg.length; i++) {
            number = number + arg[i];
          }
          return number;
        }
      },
      dif: function() {
        if (this.typeCheck() == true) {
          for (var i = 0; i < arg.length; i++) {
            number = number - arg[i];
          }
          return number;
        }
      },
      div: function() {
        if (this.typeCheck() == true) {
          for (var i = 0; i < arg.length; i++) {
            if (arg[i] == 0) {
              throw new Error("division by 0");
            }
            number = number / arg[i];
          }
          return number;
        }
      },
      mul: function() {
        if (this.typeCheck() == true) {
          for (var i = 0; i < arg.length; i++) {
            number = number * arg[i];
          }
          return number;
        }
      }
    };

    return calc;
  } catch (e) {
    console.log(e.message);
  }
}

export { isAllTrue, isSomeTrue, returnBadArguments, calculator };
