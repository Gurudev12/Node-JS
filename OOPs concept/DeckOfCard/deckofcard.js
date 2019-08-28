class Card
{
    constructor(suit,value)
    {
    this.suit=suit
    this.value=value
    }
}

class Deck
{
    constructor()
    {
       this.deck=[]
       this.distribute=[[],[],[],[]]
    }
    createDeck(suit,value)
    {
        for(let i=0;i<4;i++)
        {
            for(let j=0;j<13;j++)
            {
                this.deck.push(new Card(suit[i],value[j]));   
            }
        }
        return this.deck
    }

    //Shuffling the cards
    shuffle()
    {
        let counter=this.deck.length,temp,i

        while(counter)
        {
            i=Math.floor(Math.random() * counter--);

            temp=this.deck[counter]
            this.deck[counter]=this.deck[i]
            this.deck[i]=temp
        }
         return this.deck
    }
    distributeCard()
    {
        let k=0
        console.log("Player1")
        for(let i=0;i<4;i++)
        {
            for(let j=0;j<13;j++)
            {
                this.distribute[i][j]=this.deck[k]
                k++
            }
        }
        return this.distribute
    }
}


  
  

   let obj=new Deck()
   let suit= ["Clubs","Diamonds", "Hearts", "Spades"]
   let value =["2","3","4","5","6","7","8","9","10","jack","Qeen","king","ace"]
obj.createDeck(suit,value)
console.log(obj.deck.length)
obj.shuffle()

console.log(obj.distributeCard())

//console.log(out[0][3])
module.exports={Card}