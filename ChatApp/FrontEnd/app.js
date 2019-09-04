       var module=angular.module("module1", [])

        module.controller("Myctrl",main)

        function main()
        {
            console.log("You have called main method..")
        }

module.controller("Myctrl2",main2)

function main2()
{
    console.log("You have called second main method..")
}
