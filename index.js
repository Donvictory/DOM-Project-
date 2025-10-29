let buttonElement = JSON.parse(localStorage.getItem('buttonElement'));

function subscribe(){
      buttonElement = document.querySelector('.subscribe-bn');
    if( buttonElement.innerHTML === 'Subscribe')
      {
         buttonElement.innerHTML =  'Subscribed';
         buttonElement.classList.add('is-subscribed');
    }else {
        buttonElement.innerHTML  = 'Subscribe';
        buttonElement.classList.remove('is-subscribed');
    }
   localStorage.setItem('buttonElement', JSON.stringify(buttonElement));
}
 
document.title = 'DOM Project';

 function computerMove(){
    let randomNumber = Math.random();
    let computerGuess = '';
    if(randomNumber >  0 && randomNumber <  1/3){
      computerGuess = 'rock';

    }else if (randomNumber >  1/3 && randomNumber <  2/3){
      computerGuess ='paper';
    }else if (randomNumber >  2/3 && randomNumber <  1){
       computerGuess ='scissors';
    }
    return computerGuess;
 }
 

 let score = JSON.parse(localStorage.getItem('score')) || {
  wins : 0,
  losses : 0,
  ties : 0
 }
 let isAutoPlaying = false;
  let intervalId;

 function autoplay(){
  if(!isAutoPlaying){
    intervalId =  setInterval(function(){
    const playerMove = computerMove();
    playGame(playerMove);
  }, 1000);
      isAutoPlaying = true;
  } else{
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
 
 }
     
 function playGame(playerMove){
   const computerGuess = computerMove();
   let result = ''

  if (playerMove === 'paper'){
        if(computerGuess === 'rock'){
        result = 'You win!';
        }else if (computerGuess === 'paper'){
        result = 'Tie!';
        }else if(computerGuess === 'scissors'){
        result ='You lose!'
  }
  } else if(playerMove === 'rock'){
        if(computerGuess === 'rock'){
        result = 'Tie!';
        }else if (computerGuess === 'paper'){
        result = 'You lose!';
        }else if(computerGuess === 'scissors'){
        result ='You win!'
        }
  }else if(playerMove === 'scissors'){
        if(computerGuess === 'rock'){
        result = 'You lose!';
        }else if (computerGuess === 'paper'){
        result = 'You win!';
        }else if(computerGuess === 'scissors'){
        result ='Tie!'
        }
  }else if(playerMove === 'reset score'){
        score =  {
        wins : 0,
        losses : 0,
        ties : 0
        }
   
    document.querySelector('.js-score2').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
    document.querySelector('.js-score').innerHTML ='';
    document.querySelector('.js-score1').innerHTML ='';
        return;
    }

    

    if(result === 'You win!'){
      score.wins += 1;
    }else if (result === 'You lose!'){
      score.losses += 1;
    }else if(result === 'Tie!'){
      score.ties += 1;
    }
    localStorage.setItem('score', JSON.stringify(score));

    document.querySelector('.js-score').innerHTML =  `${result}` ;
    document.querySelector('.js-score1').innerHTML =  `You:<img src="${playerMove}-emoji.png" alt=""> -Computer: <img src="${computerGuess}-emoji.png" alt="">` ;
    document.querySelector('.js-score2').innerHTML =` Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
 }





  function orderCost(){
    let cost = document.getElementById('Cost');
    finalCost = cost.value;
    let result =  (+finalCost + 10);
    if(finalCost >= 40 ){
        document.querySelector('.order').innerHTML = `Price - $${finalCost}`;
    }else if (finalCost){
        document.querySelector('.order').innerHTML = `Price - $${result}`;
    }else{
       document.querySelector('.order').innerHTML = `Please Enter a number`
    }
  }
  function handkeydown(event){
    if(event.key === 'Enter'){
      orderCost( );
    }
  }

  function old(){
     let display = document.getElementById('prac1');
       let display1 = document.querySelector('.prac');
         display1.innerHTML = display.value;
  }