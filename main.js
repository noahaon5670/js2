// let formula = 0;
var result = document.getElementById("result");

function allClear(){
  result.textContent = 0;
}

function clearChar(){
  result.textContent = result.textContent.slice(0, -1);
}

function clearBtn(){
  clearChar();
  if(result.textContent.length === 0) result.textContent = 0;
}

function addChar(str){
  result.textContent += str;
}

function replaceTheEndOfString(str){
  clearChar();
  result.textContent += str;
}

function nextCharForNum(str){
  let secondToLast = result.textContent.slice(-2,-1);
  if(isArithmetic(secondToLast)){
    clearChar();
  }
  addChar(str);
}

function nextCharForZero(str){
  let secondToLast = result.slice(-2,-1);
  if(!isArithmetic(secondToLast)) addChar(str);
}

function isArithmetic(char) {
  if(char === "+" || char === "-" || char === "×" || char === "÷") return true;
  return false;
}

function isNum(char){
  if(parseInt(char) >= 1 && parseInt(char) <= 9) return true;
  return false;
}

function editAction(str, action){
  switch(action){
    case 'addChar':
      addChar(str);
      break;
    case 'addZero':
      addChar(0);
      break;
    case 'addZeroAndDecimal':
      addChar(0);
      addChar(".");
      break;
    case 'replaceTheEndOfString':
      replaceTheEndOfString(str);
      break;
    case 'nextCharForNum':
      nextCharForNum(str);
      break;
    case 'nextCharForZero':
      nextCharForZero(str);
      break;
    case 'none':
      break;
  }
}

function editFormula(str, action1, action2, action3, action4, action5){
  let lastChar;
  if(result.textContent.length === 1) lastChar = result.textContent;
  else lastChar = result.textContent.slice(-1);
  
  if(result.textContent === "0"){
    editAction(str, action1);
  }
  else if(isNum(lastChar)){
    editAction(str, action2);
  }
  else if(isArithmetic(lastChar)){
    editAction(str, action3);
  }
  else if(lastChar === "0"){
    editAction(str, action4);
  }
  else if(lastChar === "."){
    editAction(str, action5);
  }
  else{
    alert("?????");
  }
}

function edit(str){
  switch(str.className) {
    case 'arithmetic':
      editFormula(str.value,"addChar", "addChar", "replaceTheEndOfString", "addChar", "replaceTheEndOfString");
      break;
    case 'num':
      if(parseInt(str.value) > 0) editFormula(str.value,"replaceTheEndOfString", "addChar", "addChar", "nextCharForNum", "addChar"); //１~ 9
      else editFormula(str.value,"none", "addChar", "addZero", "nextCharForZero", "addChar"); // 0の時
      break;
    case 'decimal-point':
      editFormula(str.value,"addChar", "addChar", "addZeroAndDecimal", "addChar", "none");
  }
}

function replaceResultString(){
  result.textContent = result.textContent.replace(/×/g, "*");
  result.textContent = result.textContent.replace(/÷/g, "/");
} 

function calc() {
  replaceResultString();
  result.textContent = new Function("return " + result.textContent)();
}