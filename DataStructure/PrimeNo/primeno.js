let input=require('readline-sync')
let utility=require('/home/administrator/Desktop/Bridgelab/Utility/Utility')
function primeNoRange()
{
    let prime2D=[[]]
    let i,j

    //prime number finding....
    for(i=0;i<10;i++)
    {
       let count=100
        let prime=utility.displayPrime((count*i)+1,(count*i+100))
        
        prime2D[i]=[]
        
        for(j=0;j<prime.length;j++)
        {
            prime2D[i][j]=prime[j]
        }
    }

    //Displaying that 2D array
    for(i=0;i<10;i++)
    {
        count=100
        console.log("Prime number from "+(count*i)+1 + " to "+(count*i+100))
        for(j=0;prime2D[i][j]!=undefined;j++)
        {
            process.stdout.write(" "+prime2D[i][j])
        }
        console.log("\n");
        
    }
}
module.exports= primeNoRange()
