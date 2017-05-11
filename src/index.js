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

    
    if ( Object.prototype.toString.call(array) !== '[object Array]' || !array.length) {
      throw new Error("empty array");
    }
    if (typeof fn !== "function") {
      throw new Error("fn is not a function");
    }
    for (var i = 0; i < array.length; i++){
        if (fn(array[i])===false){
           return false;
        }
    }
    return true;
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

    
    if (Object.prototype.toString.call(array) !== '[object Array]' || !array.length) {
      throw new Error("empty array");
    }
    if (typeof fn !== "function") {
      throw new Error("fn is not a function");
    }
    for (var i = 0; i < array.length; i++) {
      if (fn(array[i]) === true) {
        return true;
      }
    }
    return false;


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

    if (!Number.isFinite(number)) {
         throw new Error("number is not a number");
    }
    var calc = {
      num : number,
      sum: function(...arg) {
          var array = [...arg];
          var sum = this.num;
          for (var i = 0; i < array.length; i++) {
            sum += array[i];
          }
          return sum;
        
      },
      dif: function(...arg) {
          var array = [...arg];
          var dif = this.num;
          for (var i = 0; i < array.length; i++) {
            dif = dif - array[i];
          }
          return dif;
        
      },
      div: function(...arg) {
          var array = [...arg];
          var div = this.num;
          for (var i = 0; i < array.length; i++) {
          
            if (array[i]===0 || array[i] === null) {
               throw new Error("division by 0");
            }
                div = div / array[i];     
          }
          return div;
        
      },
      mul: function(...arg) {
          var array = [...arg];
          var mul = this.num;
          for (var i = 0; i < array.length; i++) {
            mul = mul * array[i];
          }
          return mul;
     
      }
    };

    return calc;

}

export { isAllTrue, isSomeTrue, returnBadArguments, calculator };
