/*---creating an object---*/
var obj={
	id:1,
	name:"Guru"
}

console.log('printing the object')
/*printing the object*/
console.log(obj)
console.log()



/*---reading the particular attribute of object---*/
console.log('Reading id from object')
console.log(obj.id)
console.log()



/*---Deleting attribute from object---*/
console.log("Deleting attribute from object")
delete obj.name
console.log(obj)
console.log()



/*---updating object---*/
console.log("updating new name")
obj.name="Gurudev"
console.log(obj)



/*Adding new property*/
obj.lastname="Murkar"
