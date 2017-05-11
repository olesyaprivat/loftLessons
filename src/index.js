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
    if (typeof array !== 'object' || !array.length) {
      throw new Error("empty array");
    }
    for (var i = 0; i < array.length; i++){
        if (fn(array[i])===false){
           return false;
        }
    }
    return true;
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
    if (typeof array !== 'object' || !array.length) {
      throw new Error("empty array");
    }
    for (var i = 0; i < array.length; i++) {
      if (fn(array[i]) === true) {
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
       try{
          fn(arg[i]);
       }
       catch (e){
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
function calculator(number = 0) {
  try {
    if (typeof number !== "number") {
         throw new Error("number is not a number");
    }
    var calc = {
      num : number,
      sum: function(...arg) {
          var sum = this.num;
          for (var i = 0; i < arg.length; i++) {
            sum += arg[i];
          }
          return sum;
        
      },
      dif: function(...arg) {
        
          var dif = this.num;
          for (var i = 0; i < arg.length; i++) {
            dif = dif - arg[i];
          }
          return dif;
        
      },
      div: function(...arg) {
        
          var div = this.num;
          for (var i = 0; i < arg.length; i++) {
            if (arg[i] === 0) {
              throw new Error("division by 0");
            }
            div = div / arg[i];
          }
          return div;
        
      },
      mul: function(...arg) {
       
          var mul = this.num;
          for (var i = 0; i < arg.length; i++) {
            mul = mul * arg[i];
          }
          return mul;
     
      }
    };

    return calc;
  } catch (e) {
    console.log(e.message);
  }
}

export { isAllTrue, isSomeTrue, returnBadArguments, calculator };
