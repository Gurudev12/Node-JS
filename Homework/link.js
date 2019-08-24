let n1={
   data:100
}
let n2={
    data:200
}
n1.next=n2


let n3={
    data:300
}

n2.next=n3
console.log(n2)