
// The code immmediately below was my initial solution.
  // _.last = function(array, n) {
  //   if (n > array.length) { n = array.length; }
  //   return n === undefined ? array[array.length-1] : array.slice(array.length-n, array.length);
  // };

// If 'n' is greater than 'array.length', 'n' is redefined to 'array.length'. The 'end' 
// parameter of '.slice' doesn't point to a specific index, but provides the number of 
// indexes to count from the 'begin' parameter. If '.slice' is given a 'begin' parameter 
// larger than 'array.length', it defaults to the last index of the array and uses the 
// 'end' parameter for how many indexes to count backwards. Since I'm passing 
// 'array.length' as the 'end' parameter, '.slice' counts backwards the full length of the 
// array which results in the entire array being returned.

// This is shorter.
  _.last = function(array, n) {
    return n === undefined ? array[array.length-1] : array.slice(Math.max(0, array.length-n));
  };

// If 'n' is not provided, the first operand returns the last index of the array. If 'n' is
// defined, the second operand is returned. 'Math.max' takes the the largest of any number 
// of values passed to it. In this case, it's choosing between '0' and 'array.length-n'. If
// 'n' is greater than 'array.length' then 'array.length-n' will return a negative number.
// If a negative number is passed, then 'Math.max' chooses '0' which tells '.slice' to 
// return all items from index '0' to 'array.length'.



  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var j in collection) {
        iterator(collection[j], j, collection);
      }
    }
  };

// All arrays are objects, but not all objects are arrays. Therefore, 'if' checks if the 
// collection is an array and then decides how to iterate over it. The iterator's first 
// parameter refers to the item in 'collection', the second refers to the current index of
// the for loop, and the third to the entire collection.



  _.indexOf = function(array, target){
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

// This function requires a for loop, but since '_.each' is already written, it can be used
// to make this function cleaner. 'result' is pre-defined as '-1' indicating 'target' has
// not yet been located. '_.each' runs a truth test on each item in the array. If the item 
// of the current iteration is equal to 'target' and 'result = -1', then 'result' becomes 
// the index of the current iteration. Since 'result' is no longer '-1', the 'if' clause 
// won't return true for any of the remaining iterations. If 'target' is not found in 
// 'array', then '-1' is returned.
// 
// The only question I have is would 'return (result = index);' break out of '_.each'  
// sooner making the function more efficient? Otherwise, I think '_.each' will continue 
// iterating through the remaining indexes even after it's found 'target'.



  _.filter = function(collection, test) {
    var pass = [];

    _.each(collection, function(item) {
      if (test(item)) {
        pass.push(item);
      }
    });

    return pass;
  };

// This is similiar to '_.indexOf' with the exception that it returns all items that pass
// a truth test. Instead of determining if an item of 'collection' is equal to a 'target', 
// it performs a test on 'item'. If the result of that test is 'true', then it's added to 
// an array that's returned once all items have been tested.

 

// The code immediately below was my initial solution.
  // _.reject = function(collection, test) {
  //   var fail = [];

  //   _.filter(collection, function(item) {
  //     if (!test(item)) {
  //       fail.push(item);
  //     }
  //   });

  //   return fail;
  // };

// I later realized it could be leaner like this.
  _.reject = function(collection, test) {
    return _.filter(collection, function(item) {
      return !test(item);
    });
  };

// Instead of copying and modifying the body of '_.filter', we actually use '_.filter' to 
// write this function but invert the test for each item. '_.filter' would normally find 
// items that pass 'test' and retun those. But using '!' to invert the results of 'test' 
// result in every failing item being returned.


// The code immediately below was my initial solution.
  // _.uniq = function(array) {
  //   var result = [];

  //   _.each(array, function(item) {
  //     if (_.indexOf(result, item) === -1) {
  //       result.push(item);
  //     }
  //   });

  //   return result;
  // };

// I later learned about qaudratic time complexity and constant-time lookup in objects.
  _.uniq = function(array) {
    var unique = {};
    var result = [];

    _.each(array, function(item) {
      unique[item] = item;
    });

    _.each(unique, function(item) {
      result.push(item);
    });

    return result;
  };

  // My original solution was inefficient and expensive. It was iterating over 'result' 
  // for each item in 'array' which takes longer each time 'result' grows. The second 
  // solution utilizes an object's key/value structure to create a duplicate-free version
  // of 'array'. The duplicate-free 'unique' object is then converted to an array and 
  // returned. This version requires only two loops while the commented out version above 
  // requires n number of loops.
  // 
  // This works because the value of 'array[item]' is used to create a key in 'unique' by 
  // that name and assign it the value of 'array[item]'. When the first '_.each' encounters
  // a duplicate in 'array', it overwrites the existing key/value pair in 'unique' instead 
  // of creating a second set. Once the first '_.each' completes, all that's left is to 
  // copy it into a new array which is accomplished with the second '_.each'.



  _.map = function(collection, iterator) {
    var result = [];

    _.each(collection, function(value, key, collection) {
      result.push(iterator(value, key, collection));
    });

    return result;
  };

// Applies an iterator function to each item in a collection and pushes the result to a new
// array which is returned. In other words, the 'iterator' function could add 5 to each 
// item in 'collection' and return a new array of the results of each 'item + 5'. 



  _.pluck = function(collection, key) {
    return _.map(collection, function(item){
      return item[key];
    });
  };

// Let's say you have an array and each index contains an object. Each object contains 
// three key/value pairs: name, age, sex. '_.map' is used with a function that returns a 
// new array containing only the key/vlaue pair specified in the 'key' parameter.



// The code immediately below was my initial solution.
  // _.reduce = function(collection, iterator, accumulator) {
  //   _.each(collection, function(value, key ){
  //     if (accumulator === undefined) {
  //       accumulator = collection[key];
  //       if (key > 0) {
  //         accumulator = iterator(accumulator, value);
  //       }
  //     } else {
  //       accumulator = iterator(accumulator, value);
  //     }
  //   });
  //   return accumulator;
  // };

// If 'accumulator' is undefined on the first iteration, it's set to 'collection[key]'. In 
// the first iteration, 'key' is 0 preventing the nested 'if' clause from evaluating. If 
// the 'if' clause evaluates true, then the 'else' clause isn't run until the second 
// iteration skipping the first element in collection. The 'else' clause then evaluates for
// the remaining items in 'collection' unless accumulator is equal to 'undefined' again.

// The code below is more clear.
  _.reduce = function(collection, iterator, accumulator) {
    var accumFound = arguments.length < 3;

    _.each(collection, function(value){
      if (accumFound) {
        accumulator = value;
        accumFound = false;
      } else {
        accumulator = iterator(accumulator, value);
      }
    });
    return accumulator;
  };

// The above code is essentially what's given in Fulcrum's solution. I used a different 
// variable name and checked for '< 3' rather than '=== 2'. If 'arguments.length' is '2' or
// '< 3', that means no accumulator was passed in which means it gets defined by the first 
// index of 'colleciton'. 'accumFound' is then changed to 'false' so that the 'if' clause 
// is never evaluated again. The 'else' clause is evaluated for the remaining iterations.
// If an 'accumulator' is passed in, only the 'else' clause evaluates for each item in 
// 'colleciton'.



  _.contains = function(collection, target) {
    return _.reduce(collection,

      function(wasFound, item) {        // wasFound is accumulator. Item is collection[i].
        if (wasFound) { return true; }  // If wasFound is true, 'return' exits and
        return item === target;         // 'item === target' never evaluates.
      },

      false);  // The accumulator (wasFound) starts as false.
  };

// The accumulator 'wasFound' starts as false causing the interator in '_.reduce' to 
// evaluate 'item === target'. This checks if 'colleciton[item]' is equal to 'target'. If 
// not equal, 'wasFound' remains false since the result of the iterator becomes the value 
// of 'wasFound'. This cycle continues until 'return item === target' evaluates true. Once 
// true, the 'if' clause returns 'true' for the remaining items in 'collection'. Remember 
// that '_.reduce' updates the value of the accumulator (wasFound) with the result of each 
// iteration.



// The code immediately below was my initial solution.
  // _.every = function(collection, iterator) {
  //   iterator = iterator || _.identity;
  //   return _.reduce(collection, function(equalityValue, item) {
  //     if (!equalityValue) {
  //       return false;
  //     }
  //     return !!iterator(item) === true;
  //   }, true);  // accumulator (equalityValue) starts as true.
  // };

// If no iterator is passed in, a default iterator is provided using the '||' operator. The
// use of '_.identity' means 'collection[item]' of the current iteration is passed to the
// equality comparison. '_.reduce' determines if all items pass an equality test. Since
// 'equalityValue' starts as true, the first 'if' clause is skipped. The '!!' (not not) 
// operators coerce a value into a Boolean. One '!' inverts the value to a Boolean. The 
// second '!' inverts it again so the original value is now a proper Boolean rather than a 
// truthy/falsy value. This allows for equality comparisons with values that aren't already
// proper Booleans. If the result of the iterator call comparison is true, the function 
// continues looping. If false, the 'if' clause returns false for the remaining iterations
// since 'equalityValue' will have been changed to false.

// The code below is more concise, but does the same thing.
  _.every = function(collection, iterator) {
    iterator = iterator || _.identity;
    return _.reduce(collection, function(equalityValue, item) {
      return equalityValue && !!iterator(item); // accumulator = result of this line 
    }, true);
  };

// The difference between this and my initial solution is the use of the '&&' operator.
// 'equalityValue' starts as true. '&&' is used to check if 'equalityValue' and 
// '!!iterator(item)' are both true. If '!!iterator(item)' ever returns false, then
// 'equalityValue' is changed to false. When '&&' sees 'equalityValue' is false, it never 
// evaluates '!!iterator(item)' again because once one of the operands is false, '&&' can 
// never return true. Therefore, '_.reduce' returns false if any iteration returns false.
// 
// Note:  '!!item === true' and '!item === false' produce the same result.



  _.some = function(collection, iterator) {
    iterator = iterator || _.identity;
    if (_.every(collection, function(item) {
          return !!iterator(item) === false;
        })) {
      return false;
    }
    return true;
  };

// Used '_.every' to determine if all items pass a fail test. In other words, is it 'true' 
// that they're all false? If all are false, then the result of '_.some' is false. If all 
// items don't fail, then at least some passed making the result true. So, if the result of
// '_.every' is true, then '_.some' returns false. Otherwise, it returns true.



  _.extend = function(obj) {
    _.each(arguments, function(collection) {
      _.each(collection, function(value, key) {
        obj[key] = value;
      });
    });
    return obj;
  };

// The use of nested '_.each' functions allows access to the keys and values of objects 
// passed as arguments. The first '_.each' function gives access to each object passed as 
// an argument. The nested '_.each' gives access to the contents of each object. Once the 
// contents of each object are reached, they're applied to the first argument (obj).



  _.defaults = function(obj) {
    _.each(arguments, function(collection) {
      _.each(collection, function(value, key) {
        obj[key] !== undefined ? obj[key] : obj[key] = value;
        // obj[key] === undefined && (obj[key] = value);
      });
    });
    return obj;
  };

// Uses nested '_.each' functions just like '_.extend'. 'obj[key]' points to the key value,
// not key name. In order not to overwrite falsy values, the ternary operator checks if 
// 'obj[key]' isn't 'undefined'. '{}' and 'NaN' are falsy values, but aren't 'undefined'.
// If not undefined (defined), it returns 'obj[key]'. If 'obj[key]' is both falsy and 
// undefined, the latter operand evaluates assigning 'value' to 'obj[key]'.
// 
// The line commented out works in place of the ternary operator, but is less intuitive in 
// my opinion since I think of '&&' more as an equality operator. However, it works because
// if the first operand returns 'false', then it returns the second operand. In this case, 
// the second operand would evaluate 'obj[key] = value'.



  _.once = function(func) {
    var alreadyCalled = false;
    var result;

    return function() {
      if (!alreadyCalled) {
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      return result;
    };
  };

// The varible 'alreadyCalled' starts as 'false' and is changed to 'true' once 'func' has
// been called. Each call checks the value of 'alreadyCalled' and if 'true', 'func' isn't
// called again. Note that 'func' is called using '.apply(this, arguments)' and not simply 
// 'func(arguments)'. I'm not certain what 'this' refers to here, but 'apply' is needed 
// because 'arguments' is an array-like object. 'apply' passes the contents of 'arguments'
// into 'func' because 'func' may not be designed to accept an array.



  _.memoize = function(func) {
    var results = {};

    return function() {
      var args = JSON.stringify(arguments);
      return results[args] !== undefined ? results[args] : results[args] = func.apply(this, arguments);
    };
  };

// 'results' is an object that stores key/value pairs. When a unique set of arguments are 
// passed in, a new key name is created by stringifying (JSON.stringify) the 'arguments' 
// object. Then, 'func' is called on 'arguments' (not the stringified 'args') and the 
// result is stored in the newly created key. If 'results[args]' already exists, then it 
// simply returns the already computed value.
// 
// The key to writing/understanding this function is in understanding how bracket and dot
// notation work. Dot notation may look cleaner, but is limited in what key names it 
// accepts. Bracket notation accepts spaces and various symbols. Therefore, bracket 
// notation requires quotes around the name. When 'args' is passed into 'results' using
// bracket notation, it must be passed wrapped in quotes as a string (JSON.stringify).



  _.delay = function(func, wait) {
    var args = Array.prototype.slice.call(arguments, 2);
    setTimeout(function() {
      return func.apply(this, args);
    }, wait);
  };

// 'args' is an array of arguments passed starting at arguments[2]. 'setTimeout is called 
// using an anonymous function the returns 'func'. Since 'args' holds an array, 'func' must
// be called using '.apply' since this method is used to take an array. Lastly, the 'wait' 
// parameter is passed to 'setTimeout'.



  _.shuffle = function(array) {
    var tempArray = [];

    _.each(array, function(item) {
      tempArray.push(item);
    });

    var newArray = [];
    var ri;
    
    while(tempArray.length) {
      ri = Math.floor(Math.random() * tempArray.length);
      newArray.push(tempArray[ri]);
      tempArray.splice(ri, 1);
    }
    return newArray;
  };

// Utilizes the Fisher-Yates shuffle. First, a clone of 'array' is made to 'tempArray' 
// using '_.each'. 'ri' holds a randomly generated number between 0 and the current length
// of 'tempArray'. 'tempArray[ri]' is pushed to 'newArray' and deleted ('.splice') from 
// 'tempArray'. The 'while' loop continues until 'tempArray' is empty. Lastly, 'newArray' 
// is returned.
// 
// http://bost.ocks.org/mike/shuffle/
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Examples









