// Name:junhyung-kim
// Date:202110647
// Version:1
// Project:snake-project

let Board=[
		["W", "W","W", "W","W", "W","W", "W","W", "W","W", "W","W", "W","W", "W","W", "W","W", "W"],
		["W", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", "W"],
		["W", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", "W"],
		["W", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", "W"],
		["W", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", "W"],
		["W", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", "W"],
		["W", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", "W"],
		["W", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", "W"],
		["W", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", "W"],
		["W", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", "W"],
		["W", ".",".", "E",".", ".",".", ".",".", ".","B", ".",".", ".",".", ".",".", ".",".", "W"],
		["W", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", "W"],
		["W", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", "W"],
		["W", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", "W"],
		["W", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", "W"],
		["W", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", "W"],
		["W", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", "W"],
		["W", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", "W"],
		["W", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", "W"],
		["W", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", ".",".", "W"],
		["W", "W","W", "W","W", "W","W", "W","W", "W","W", "W","W", "W","W", "W","W", "W","W", "W"]	
]

	let Bus =[
	[10,10],
	[11,10],
	[12,10]
	];
	
	let Enemy =[
	[3,10],
	[4,10],
	[5,10],
	[6,10],
	[7,10]
	];

	
let Direction = "right";
let Timer;
let Apple;
let speed = parseInt(prompt("Enter your level: 1~3"));
let myScore=0;

if(speed == 1){
	speed = 200;
}

else if(speed == 2){
	speed = 150;
}	

else{
  speed = 100; 
}


function CreateApple(){
	let xRandomPos = Math.floor(Math.random() * 20);
	let yRandomPos = Math.floor(Math.random() * 20);
	while (Board[yRandomPos][xRandomPos] != "."){
		xRandomPos = Math.floor(Math.random() * 20);
		yRandomPos = Math.floor(Math.random() * 20);
	}
	Apple = [xRandomPos,yRandomPos];
}


function DrawBoard(){
	
	ClearGrid();
	
	//bus//
	for(let i in Bus){
		let xPosOfBus = Bus[i][0];
		let yPosOfBus = Bus[i][1];
		Board[yPosOfBus][xPosOfBus] = "B";
	}
	
	//apple board//
	let xPosApple = Apple[0];
	let yPosApple = Apple[1];
	Board[yPosApple][xPosApple] = "A";
	
	//enemey board//
	for(let j in Enemy){
	let xPosOfEnemy = Enemy[j][0];
		yPosOfEnemy = Enemy[j][1];
		Board[yPosOfEnemy][xPosOfEnemy] ="E";
	}
	
	//maps//
	for(let y = 0; y<Board.length; y++){
		for(let x = 0; x<Board[y].length; x++){
			if(Board[y][x]=="W") AddBlock(x,y,"red");
			else if(Board[y][x]==".") AddBlock(x,y,"White");
			else if(Board[y][x]=="B") AddBlock(x,y,"red");
			else if(Board[y][x]=="A") AddBlock(x,y,"Green");
			else if(Board[y][x]=="E") AddBlock(x,y,"Blue");
		}
	}
}

function StartGame(){
	CreateApple();
	DrawBoard();
	Timer = setInterval(Tick, speed);
	document.addEventListener("keydown", KeyPressed);
}


function KeyPressed(event){
	console.log(event.keyCode);
	if(event.keyCode == 38 && Direction != "down") Direction ='up';
	if(event.keyCode == 40 && Direction != "up") Direction ='down';
	if(event.keyCode == 37 && Direction != "right") Direction = 'left';
	if(event.keyCode == 39 && Direction != "left") Direction = 'right';
}

function UpdateDirection(direction){
	Direction = direction;
	MoveBus();
	MoveEnemy();
}

let isGrowing = false; //이동중 자라나지 못하게 하기 위해 false 지정 (그리고 중요!!! 얘는 enemy snake랑 player[bus] 둘다 작동한데 필요하므로
						//전역 변수로 따로 빼놔야 한다.---> 재정의하면 작동 안됨!!! 


function MoveBus(){ //player
	//isGrowing = false -> 이 경우 !isGrowing = true를 의미하는게 되버림 
	
	let xPosBusHead = Bus[Bus.length -1][0];
	let yPosBusHead = Bus[Bus.length -1][1];
	

	if(Direction == "right"){
		Bus.push([xPosBusHead +1, yPosBusHead]);
	}
	
	if(Direction == "left"){
		Bus.push([xPosBusHead -1, yPosBusHead]);
	}
	
	if(Direction == "down"){
		Bus.push([xPosBusHead, yPosBusHead +1]);
	}
	
	if(Direction == "up"){
		Bus.push([xPosBusHead, yPosBusHead -1]);
	}
	
	if(!isGrowing){
		//fix the board
		let xPosBusTail = Bus[0][0];
		let yPosBusTail = Bus[0][1];
		Board[yPosBusTail][xPosBusTail] = ".";
		//Rrmove last segment
		Bus.shift();
	}else{
		isGrowing = false;
	}
	//redraw board(changed bus img)
	DrawBoard();
}


function MoveEnemy(){ //적 

	let xPosEnemyHead = Enemy[Enemy.length -1][0];
	let yPosEnemyHead = Enemy[Enemy.length -1][1];
	
	if(Direction == "left"){
		Enemy.push([xPosEnemyHead +1, yPosEnemyHead]);
	}
	
	if(Direction == "right"){
		Enemy.push([xPosEnemyHead -1, yPosEnemyHead]);
	}
	
	if(Direction == "up"){
		Enemy.push([xPosEnemyHead, yPosEnemyHead +1]);
	}
	
	if(Direction == "down"){
	  Enemy.push([xPosEnemyHead, yPosEnemyHead -1]);
	}
	
	if(!isGrowing){ 
		let xPosEnemyTail = Enemy[0][0];
		let yPosEnemyTail = Enemy[0][1];
		Board[yPosEnemyTail][xPosEnemyTail] = ".";
		Enemy.shift();
	}else{
		isGrowing = false; 
	}
	
	DrawBoard();
}


function GameOver(){
	clearInterval(Timer);
}

function Tick(){
	//cheack the deadly conclusion
	let xPosHeadNext = Bus[Bus.length -1][0];
	let yPosHeadNext = Bus[Bus.length -1][1];
	
	let xPosEnemyHeadNext =Enemy[Enemy.length -1][0];
	let yPosEnemyHeadNext =Enemy[Enemy.length -1][1];
	
	//update position
	if(Direction == "right") xPosHeadNext++;
	if(Direction == "left") xPosHeadNext--;
	if(Direction == "up") yPosHeadNext--;
	if(Direction == "down") yPosHeadNext++;
		
	//console.log(Board[yPosHeadNext][xPosHeadNext])
		
	//hit the wall and enemy
	if(Board[yPosHeadNext][xPosHeadNext] == "W"
	 || Board[yPosHeadNext][xPosHeadNext] =="E"){
		GameOver();
		alert("Game Over!");
		return null;
	}
			
		//hit the apple
	if(Board[yPosHeadNext][xPosHeadNext] == "A"){
		isGrowing = true;
		let appleXpos = Apple[0];
		let appleYpos = Apple[1];
		Board[appleYpos][appleXpos] = ".";
		CreateApple();
		myScore++
		document.getElementById("scoreboard").innerText = "Score: " + myScore;	
	}
	
	MoveBus();
	MoveEnemy();
}

function playAudio(){
    myAudio.play();
}

function stopAudio(){
	myAudio.pause();
}

function exit(){
	location.href="file:///C:/Users/User/Desktop/202305127%EA%B9%80%EC%A4%80%ED%98%95-%EC%9B%B9%ED%8E%98%EC%9D%B4%EC%A7%80/portfolio.html";
}


 
