var utility=require('../Utility/Utility')

var i,j,player1='X',player2='O',play=1,win

var matrix=[['1','2','3'],
            ['4','5','6'],    
            ['7','8','9']]

        console.log(matrix[0][0]+"|"+matrix[0][1]+ "|"+matrix[0][2])
        console.log(matrix[1][0]+"|"+matrix[1][1]+ "|"+matrix[1][2])
        console.log(matrix[2][0]+"|"+matrix[2][1]+ "|"+matrix[2][2])

var Input=require('readline-sync')
for(i=1;i<=9;i++)
{       
    if(play==1)
    { 
        console.log("Enter Player1 position:")
        var pos=Input.question()
        utility.DisplayMatrix(matrix,pos,player1)
        play=2
    }
    else
    {
        console.log("Enter Player2 position:")
        var pos=Input.question()
        utility.DisplayMatrix(matrix,pos,player2)
        play=1

    }
    utility.Show(matrix)
     win=utility.CheckWin(matrix)
    console.log(win)

    if(win!=' ')
    {
        if(win=='X')
        {
        console.log("Player1 is win")

        }
        else
        {
        console.log("Player 2 win")
        }
    }
    
    
}       
