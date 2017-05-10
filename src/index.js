/* �� 2 - ������ � ������������ � ���������� */

/*
 ������ 1:
 ������� ��������� ������ � ����������� ������� � ������ ������� true ��� false
 ������� ������ ������� true ������ ���� fn ������� true ��� ���� ��������� �������
 ���������� ����������� ���������� � �������:
 - array �� ������ ��� ������ ������ (� ������� "empty array")
 - fn �� �������� �������� (� ������� "fn is not a function")
 ��������� ������������ ���������� ������ ��� ������ � ���������
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
 ������ 2:
 ������� ��������� ������ � ����������� ������� � ������ ������� true ��� false
 ������� ������ ������� true ���� fn ������� true ���� �� ��� ������ �� ��������� �������
 ���������� ����������� ���������� � �������:
 - array �� ������ ��� ������ ������ (� ������� "empty array")
 - fn �� �������� �������� (� ������� "fn is not a function")
 ��������� ������������ ���������� ������ ��� ������ � ���������
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
 ������ 3:
 ������� ��������� ������� ����������� ���������� ����������, ������ �� ������� �������� ������� fn
 ������� ������ ���������� ������� fn ��� ������� ����������� ��������� (����� ����� fn)
 ������� ������ ������� ������ ����������, ��� ������� fn ��������� ����������
 ���������� ����������� ���������� � �������:
 - fn �� �������� �������� (� ������� "fn is not a function")
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
 ������ 4:
 ������� ����� �������� number (�� ��������� - 0)
 ������� ������ ������� ������, � �������� ������ ���� ��������� �������:
 - sum - ���������� number � ����������� �����������
 - dif - �������� �� number ���������� ���������
 - div - ����� number �� ������ ��������. ��������� ������� �� ��������� �������� (���� �������) � ��� �����
 - mul - �������� number �� ������ ��������. ��������� ���������� �� ��������� �������� (���� �������) � ��� �����
 
 ���������� ������������ � ������ ���������� ������� ����������
 ���������� ����������� ���������� � �������:
 - number �� �������� ������ (� ������� "number is not a number")
 - �����-���� �� ���������� div �������� ����� (� ������� "division by 0")
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
