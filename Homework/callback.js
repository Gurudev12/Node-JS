

console.log("User 1 request")
setTimeout(callback1,5000)

console.log("User 2 request")
setTimeout(callback2,3000)

console.log("User 3 request")
setTimeout(callback3,1000)

function callback1()
{
    console.log("Ready in 5 seconds...")
}

function callback2()
{
    console.log("Ready in 3 seconds...")
}

function callback3()
{
    console.log("Ready in 1 seconds...")
}
