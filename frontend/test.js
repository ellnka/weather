"use strict";
/* 1
{
    console.log(5 && 3);
}
*/

/* 2 

{
    let test = null;
    console.log(test);
    function test() {return 1;}
    console.log(test);
    console.log(test && test());
    console.log(test);

}
*/

/* 3 
var a  = 0, b = null, c;
console.log(a || b || c);
*/

/*4
var x, f;
console.log( 0 || x || f() ||1);
*/

/* 5
var age = prompt('enter', 2);
console.log(1 + age);
*/

/* 6 
var f = function factorial(n) {
    return n * factorial(n - 1);
}
factorial(3);
*/

/* 7 
console.log(( x => x + 1)(2));
*/

/* 8 
var name = 'john';
var user = {name: 'ivan'};
user[name] = name;
console.log(user);
*/

/* 9 
var a = {x: 1, y: 5};
var b = a;
a.x = 2;
console.log(b.x);
*/

/* 10 
var arr = [1, 2, 3];
arr.someField = 4;
console.log(arr.length);
*/

/* 11 
var arr = [1, 1, 1].map(function(n){return 2 * n;})
console.log(arr);
*/

/* 12 
function f(x, y, z) {
    console.log(arguments.length);
}
f(2);
f(1, 2, 3);
f();
*/

/* 13 
function f() { a =1;}
var a = 2;
f();
console.log(a);
*/

/* 14 
function f() {var a = 1};
a = 2;
f();
console.log(a);
*/

/*15
var a = 1;
function createMethod() {
    var a = 2;
    return function() {return a;}
}
console.log(createMethod()());
*/

/* 16 
var john = {
    name: 'john',
    getName: function() {return this.name}
}
var getName = john.getName;
console.log(getName());
*/

/*17
var john = {
    name: 'john',
    getName: function() {return this.name}
}
var ivan = {name: 'ivan'};
ivan.getName = john.getName;
console.log(ivan.getName());
*/

/*18
var john = {
    name: 'john',
    getName: function() {return this.name}
}
var ivan = {name: 'ivan'};

console.log(john.getName.call(ivan));
*/

/* 19 
var f = function() {
    console.log(arguments.length);
}.bind(null, 1, 2);
f(1, 2, 3)
*/

/* 20 
var user = {name: 'user'};
var john = Object.create(user);
user.name = 'name';
console.log(john.name);
*/

/* 21 
var user = {name: 'user'};
var john = {name: 'john', __proto__: user};
delete user.name;
console.log(john.name);
*/

function isPrime(num) {

    let arr = [2, 3, 5];
    if (num > 1){
        arr = arr.map((divider) => num === divider || num % divider);
        arr = arr.filter((f) => !f);
    }
    return arr.length === 0;
}
