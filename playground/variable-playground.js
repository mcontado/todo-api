// var person = {
// 	name: 'Andrew',
// 	age: 21
// };

// function updatePerson(obj) {
// 	//would not update the original because you are creating a new object
// 	// obj = {
// 	// 	name: 'Andrew',
// 	// 	age: 24
// 	// };

// 	//mutate
// 	obj.age = 24;
// }

// updatePerson(person);
// console.log(person);

//Array Example
var arr = [15, 37];

function addGrade(arr) {
	arr.push(21);
}

function addGradeNew(arr) {
	arr = [21];
}

// addGrade(arr);
// console.log(arr);

addGradeNew(arr);
console.log(arr);