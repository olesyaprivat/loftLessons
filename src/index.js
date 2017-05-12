/* �� 3 - ������ � ��������� � ���������� */

/*
 ������ 1:
 �������� ������ ����������� ������ forEach ��� ������ � ���������
 */
function forEach(array, fn) {
   for (var i = 0; i < array.length; i++) {
      fn(array[i], i, array);
   }
}

/*
 ������ 2:
 �������� ������ ����������� ������ map ��� ������ � ���������
 */
function map(array, fn) {
   var arr = [];
   for (var i = 0; i < array.length; i++) {
      arr[i] = fn(array[i], i, array);
   }
   return arr;
}

/*
 ������ 3:
 �������� ������ ����������� ������ reduce ��� ������ � ���������
 */
function reduce(array, fn, initial) {
   var result;
   if (initial) {
      result = initial;
      for (var i = 0; i < array.length; i++) {
         result = fn(result, array[i], i, array);
      }
   }
   else {
      result = array[0];
      for (var i = 1; i < array.length; i++) {
         result = fn(result, array[i], i, array);
      }
   }
   return result;
}
/*
 ������ 4:
 ������� ��������� ������ � ��� ��������, ������� ���������� ������� �� �������
 ������� ������ ������� ��������� �������� �� ���������� �������
 */
function deleteProperty(obj, prop) {
   delete obj[prop];
}

/*
 ������ 5:
 ������� ��������� ������ � ��� �������� � ���������� true ��� false
 ������� ������ ��������� ���������� �� ��������� �������� � ��������� �������
 */
function hasProperty(obj, prop) {
   if (obj.hasOwnProperty([prop])) {
      return true;
   }
   return false;
}

/*
 ������ 6:
 ������� ������ �������� ��� ������������� �������� ������� � ������� �� � ���� �������
 */
function getEnumProps(obj) {
   var arr = [];
   for (var key in obj) {
      arr.push(key);
   }
   return arr;
}

/*
 ������ 7:
 ������� ������ ��������� ��� �������� �������, ������������� �� ����� � ������� �������� � ������� � ���� �������
 */
function upperProps(obj) {
   var arr = [];
   for (var key in obj) {
      arr.push(key.toUpperCase());
   }
   return arr;
}

/*
 ������ 8 *:
 �������� ������ ����������� ������ slice ��� ������ � ���������
 */
function slice(array, from, to) {

   var arr = [];
   var start = 0;
   var end = array.length;


   if (from !== undefined && to !== undefined) {
      start = from;
      end = to;
   }
   if (to > array.length) {
      end = array.length;
   }

   if (from && !to) {
      start = from;
      end = array.length;
   }
   if (from < 0) {
      
      if (from < -(array.length)) {
         start = 0;
      }
      else{
        start = array.length + from; 
      }
      
   }
   if (to < 0) {
      end = array.length + to;
   }


   for (var i = start; i < end; i++) {
      arr.push(array[i]);
   }

   return arr;

}


/*
 ������ 9 *:
 ������� ��������� ������ � ������ ������� Proxy ��� ����� �������
 Proxy ������ ������������� ��� ������� ������ �������� ������� � ��������� ��� �������� � �������
 */
function createProxy(obj) {
var p = new Proxy(obj, {
 set(target, prop, value) {
    target[prop] = value*value;
    return target[prop];
  }
});
   return p;
}

export {
   forEach,
           map,
           reduce,
           deleteProperty,
           hasProperty,
           getEnumProps,
           upperProps,
           slice,
           createProxy
}
;
