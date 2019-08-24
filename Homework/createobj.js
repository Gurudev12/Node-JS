function Bike(model,color){
    this.model = model,
    this.color = color,
 this.getDetails = function(){
      return this.model+' bike is '+this.color;
    }
 }
 var bikeObj1 = new Bike('BMW','BLACK');
 var bikeObj2 = new Bike('BMW','WHITE');
 console.log(bikeObj1.getDetails()); //output: BMW bike is BLACK
 console.log(bikeObj2.getDetails()); //output: BMW bike is WHITE




 function greeting(name) {
    console.log('Hello ' + name);
    }
    function processUserInput(callback) {
        //var name = prompt('Please enter your name.');
        name = 'raja';
        callback(name);
    }
    processUserInput(greeting); //output Hello Raja 