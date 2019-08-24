function Y()
{
 return new Promise(function(reject){
    var a=1
    setTimeout(function(){
        reject(a)
    },5000)
    console.log('hcbfgbfgbi')
})
}
async function X()
{
    var d = await Y()
    console.log(d)
    console.log('hiii')
}
X()