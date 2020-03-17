const board = document.querySelectorAll('.smallbox')
const startBtn = document.querySelector('#start')
const resetBtn = document.querySelector('#reset')




function xSelected(e, box){
     e.target.dataset.selection = `x`   
     box.classList.add("x")
}

function oSelected(e, box){
    e.target.dataset.selection = `o`
    box.classList.add("o")
}

function ranSelectPlayer(saltNum = 5){
    let x = 0
    let ranNum = 0

    while(x < saltNum){
        ranNum = Math.random()
        x++
    }

    if(Math.round(ranNum) === 1){
        return "o"
    }else{
        return "x"
    }
}

// player x or o
function checkWinning(player){

    const winningNumber = [4, 9, 2, 3, 5, 7, 8, 1, 6]

    for(let i = 0; i < 9; i++){
       for(let j = 0; j < 9; j++){
         for(let k = 0; k < 9; k++){

                
             if (i !== j && i !== k && j !== k){
             
            
                // console.log(`k before ${ board[k].dataset.selection}`)
                
                if(board[i].dataset.selection === player && board[j].dataset.selection === player && board[k].dataset.selection === player){
                    
                    // console.log(`k after ${board[k].dataset.selection}`)

                    if(winningNumber[i] + winningNumber[j] + winningNumber[k] === 15){
                        
                        return [true, player]
                    }

                    
                }
                
                
           }

         }
       } 
    }        

    return false
}

var togglePlayer = true


function checkDraw(board){

      let filledboard = [] 
      if (board[i].dataset.selection){
        filledboard.push(true)
      }
      if(filledboard.length === 9){
          return true
      }
      return false

}


// function whichPlayer(player){
    
//     if(player){
//         return 'o'
//     }else{
//         return 'x'
//     }
// }


function playerSelectedBox(e){

    if(e.target.childElementCount === 0 && e.target.className === "smallbox"){

        if(togglePlayer === "o"){

            let span = document.createElement('span')
            let selectedBox = e.target.appendChild(span.cloneNode())
            
            console.log(`check player select ${selectedBox}`)
            oSelected(e, selectedBox)  
            
            return togglePlayer = "x" 
        }else{
            let span = document.createElement('span')
            let selectedBox = e.target.appendChild(span.cloneNode())

            console.log(`check player select ${selectedBox}`)

            xSelected(e, selectedBox)  
            
            return togglePlayer = "o" 
        }
        

    }

}


function start(){
    
    togglePlayer = ranSelectPlayer(saltNum = 5)

    board.forEach((box)=>{

        box.addEventListener('click', (e)=>{

            console.log(playerSelectedBox(e))
            
            console.log(`${togglePlayer} toggle`)
            
            console.log(checkWinning(togglePlayer))
            
        })

    })

}


function reset(){

    board.forEach((box)=>{
        box.removeEventListener('click', (e)=>{
            playerSelectedBox(e)

        })
    })    

    // clean node  
    board.forEach((box)=>{
        if(box.hasChildNodes()){
            delete box.dataset.selection
            box.removeChild(box.firstChild)
        }
    })
    // clean and start again
    start()
}

startBtn.addEventListener('click', start)
resetBtn.addEventListener('click', reset)







