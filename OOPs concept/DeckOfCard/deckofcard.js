let utilityQue=require('/home/administrator/Desktop/Bridgelab/Homework/QueueULinkedlist')
let obQue=new utilityQue.QueueLinkedList()

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

    //Distributing cards to players
    distributeCard()
    {
        let k=0
        
        for(let i=0;i<4;i++)
        {
          
            for(let j=0;j<13;j++)
            {
                this.distribute[i][j]=this.deck[k]
                k++

                //inserting cards to linked list
                obQue.enqueue(this.distribute[i][j])
                
            }
            console.log("********************inserting cards into queue using linked list*****************************************************")
            obQue.printQueueList()  
            obQue.clearList()
           
        }
       
        //printing the inserted element in the linked list
        // 
      
        return this.distribute
    }
}


  
  
    //Creating object of Deck class
   let obj=new Deck()
   let suit= ["Clubs","Diamonds", "Hearts", "Spades"]
   let value =["2","3","4","5","6","7","8","9","10","jack","Qeen","king","ace"]
obj.createDeck(suit,value)
console.log(obj.deck.length)
obj.shuffle()
//Printing distributed cards among four player. 
console.log(obj.distributeCard())

//sorting each player cards.


module.exports={Card}