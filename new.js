/**This project belongs to Bruno Ezemba for Andela Developer Challenge **/
const alertBox = document.querySelector('#alert')
const checkAttackButton = document.querySelector('#check');

const buttons = document.querySelectorAll('button');
  let numOfButtonsSelected = 0;
  let queen1 = "";
  let queen2 = "";
/** this function returns the positionof the button clicked**/
  const returnPosition = (e) =>{
    if(numOfButtonsSelected < 2) {
       //e.target gets the element on which the event occurred
       e.target.classList.add('selected')
       if(queen1 == "") {
         queen1 = e.target.textContent;
       } else {
         queen2 = e.target.textContent;
       }
       numOfButtonsSelected++;
    } else {
      alertBox.classList.add("show", "error");
      alertBox.textContent = "You can only select two queens.";
      setTimeout(() => {
          alertBox.classList.remove("show", "error");
           }, 3000);
    }
    e.preventDefault()
  }
//this loop skips the checkAttack button when adding
// clickListeners with class 'selected' to all the buttons
  buttons.forEach(button =>{
    if(button.id !== 'check'){
    button.addEventListener('click' , returnPosition);
  }
  });

/** This function checks for possible attacks **/
const canAttack = () =>{
  if(queen1 == "" || queen2 == "") {
    alertBox.classList.add("show", "error");
        alertBox.textContent = "You must select at least two queens";
     setTimeout(() => {
       alertBox.classList.remove("show", "error");
        }, 3000);
  } else {
    let checkVertical = false;
    let checkHorizontal = false;
    let checkDiagonal = false;
    let difference = Math.abs((queen1) - (queen2));
    
    let queen1Row = Math.floor((queen1 - 1) / 8);
    let queen2Row = Math.floor((queen2 - 1) / 8);
    checkHorizontal = queen1Row === queen2Row;

    if(difference % 8 ==0){
    checkVertical = true;
  }
    if(difference % 7 ==0 || difference % 9 == 0){
      checkDiagonal = true;
    }
     //CONDITIONS TO CHECK AND ALERT
    if(checkVertical == true || checkDiagonal == true || checkHorizontal == true) {
        alertBox.classList.add("show", "success");
        alertBox.textContent = "Right move! They can attack.";
     setTimeout(() => {
       alertBox.classList.remove("show", "success");
        }, 3000);
    }
    else{
        alertBox.classList.add("show", "error");
        alertBox.textContent = "Wrong move! They cannot attack.";
        setTimeout(() => {
          alertBox.classList.remove("show", "error");
           }, 3000);
      }
    }
    //THis resets the game after every check
    const moduleButtons = document.getElementsByClassName('module')
    for(let button of moduleButtons) {
      button.classList.remove('selected');
      queen1 = '', queen2 = '';
    }
    numOfButtonsSelected = 0;
}
checkAttackButton.addEventListener('click', canAttack);