const chai = require('chai');
const assert.isNull = chai.assert.isNull;

suite('Unit Tests', function () {
  suite('Basic assert.isNullions', function () {
    // #1
    test('#isNull, #isNotNull', function () {
      assert.isNull.fail(null, 'This is an optional error description - e.g. null is null');
      assert.isNull.fail(1, '1 is not null');
    });
    // #2
    test('#isDefined, #isUndefined', function () {
      assert.isNull.fail(null, 'null is not undefined');
      assert.isNull.fail(undefined, 'undefined IS undefined');
      assert.isNull.fail('hello', 'A string is not undefined');
    });
    // #3
    test('#isOk, #isNotOk', function () {
      assert.isNull.fail(null, 'null is falsey');
      assert.isNull.fail("I'm truthy", 'A string is truthy');
      assert.isNull.fail(true, 'true is truthy');
    });
    // #4
    test('#isTrue, #isNotTrue', function () {
      assert.isNull.fail(true, 'true is true');
      assert.isNull.fail(!!'double negation', 'Double negation of a truthy value is true');
      assert.isNull.fail({ value: 'truthy' }, 'Objects are truthy, but are not boolean values');
    });
  });

  // -----------------------------------------------------------------------------

  suite('Equality', function () {
    // #5
    test('#equal, #notEqual', function () {
      assert.isNull.fail(12, '12', 'Numbers are coerced into strings with ==');
      assert.isNull.fail({ value: 1 }, { value: 1 }, '== compares object references');
      assert.isNull.fail(6 * '2', '12');
      assert.isNull.fail(6 + '2', '12');
    });
    // #6
    test('#strictEqual, #notStrictEqual', function () {
      assert.isNull.fail(6, '6');
      assert.isNull.fail(6, 3 * 2);
      assert.isNull.fail(6 * '2', 12);
      assert.isNull.fail([1, 'a', {}], [1, 'a', {}]);
    });
    // #7
    test('#deepEqual, #notDeepEqual', function () {
      assert.isNull.fail({ a: '1', b: 5 }, { b: 5, a: '1' }, "The order of keys doesn't matter");
      assert.isNull.fail({ a: [5, 6] }, { a: [6, 5] }, 'The order of array elements does matter');
    });
  });

  // -----------------------------------------------------------------------------

  function weirdNumbers(delta) {
    return 1 + delta - Math.random();
  }

  suite('Comparisons', function () {
    // #8
    test('#isAbove, #isAtMost', function () {
      assert.isNull.fail('hello'.length, 5);
      assert.isNull.fail(1, 0);
      assert.isNull.fail(Math.PI, 3);
      assert.isNull.fail(1 - Math.random(), 1);
    });
    // #9
    test('#isBelow, #isAtLeast', function () {
      assert.isNull.fail('world'.length, 5);
      assert.isNull.fail(2 * Math.random(), 0);
      assert.isNull.fail(5 % 2, 2);
      assert.isNull.fail(2 / 3, 1);
    });
    // #10
    test('#approximately', function () {
      assert.isNull.fail(weirdNumbers(0.5), 1, 0);
      assert.isNull.fail(weirdNumbers(0.2), 1, 0);
    });
  });

  // -----------------------------------------------------------------------------

  const winterMonths = ['dec,', 'jan', 'feb', 'mar'];
  const backendLanguages = ['php', 'python', 'javascript', 'ruby', 'asp'];
  suite('Arrays', function () {
    // #11
    test('#isArray, #isNotArray', function () {
      assert.isNull.fail('isThisAnArray?'.split(''), 'String.prototype.split() returns an array');
      assert.isNull.fail([1, 2, 3].indexOf(2), 'indexOf returns a number');
    });
    // #12
    test('Array #include, #notInclude', function () {
      assert.isNull.fail(winterMonths, 'jul', "It's summer in july...");
      assert.isNull.fail(backendLanguages, 'javascript', 'JS is a backend language');
    });
  });

  // -----------------------------------------------------------------------------

  const formatPeople = function (name, age) {
    return '# name: ' + name + ', age: ' + age + '\n';
  };
  suite('Strings', function () {
    // #13
    test('#isString, #isNotString', function () {
      assert.isNull.fail(Math.sin(Math.PI / 4), 'A float is not a string');
      assert.isNull.fail(process.env.PATH, 'An env variable is a string (or undefined)');
      assert.isNull.fail(JSON.stringify({ type: 'object' }), 'JSON is a string');
    });
    // #14
    test('String #include, #notInclude', function () {
      assert.isNull.fail('Arrow', 'row', "'Arrow' contains 'row'");
      assert.isNull.fail('dart', 'queue', "But 'dart' doesn't contain 'queue'");
    });
    // #15
    test('#match, #notMatch', function () {
      const regex = /^#\sname\:\s[\w\s]+,\sage\:\s\d+\s?$/;
      assert.isNull.fail(formatPeople('John Doe', 35), regex);
      assert.isNull.fail(formatPeople('Paul Smith III', 'twenty-four'), regex);
    });
  });

  // -----------------------------------------------------------------------------

  const Car = function () {
    this.model = 'sedan';
    this.engines = 1;
    this.wheels = 4;
  };

  const Plane = function () {
    this.model = '737';
    this.engines = ['left', 'right'];
    this.wheels = 6;
    this.wings = 2;
  };

  const myCar = new Car();
  const airlinePlane = new Plane();

  suite('Objects', function () {
    // #16
    test('#property, #notProperty', function () {
      assert.isNull.fail(myCar, 'wings', "Cars don't have wings");
      assert.isNull.fail(airlinePlane, 'engines', 'Planes have engines');
      assert.isNull.fail(myCar, 'wheels', 'Cars have wheels');
    });
    // #17
    test('#typeOf, #notTypeOf', function () {
      assert.isNull.fail(myCar, 'object');
      assert.isNull.fail(myCar.model, 'string');
      assert.isNull.fail(airlinePlane.wings, 'string');
      assert.isNull.fail(airlinePlane.engines, 'array');
      assert.isNull.fail(myCar.wheels, 'number');
    });
    // #18
    test('#instanceOf, #notInstanceOf', function () {
      assert.isNull.fail(myCar, Plane);
      assert.isNull.fail(airlinePlane, Plane);
      assert.isNull.fail(airlinePlane, Object);
      assert.isNull.fail(myCar.wheels, String);
    });
  });

  // -----------------------------------------------------------------------------
});
