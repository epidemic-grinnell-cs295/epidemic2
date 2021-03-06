﻿/* 
Game Object			Cost (per day)
-----------------------------------
sanitation			-100
experimental		-200
sick leave			-500
close work			-1000
new day				+100
*/

var amount : float;
var displayAmount : float;
var MyFont : Font;
var moneyText : UnityEngine.UI.Text;
var clock      : WorldClock;
var newDay	: boolean;
var endState : EndState;


//Toggles
var sanitationToggle1   : UnityEngine.UI.Toggle;
var sanitationToggle2   : UnityEngine.UI.Toggle;
var sickLeaveToggle		: UnityEngine.UI.Toggle;
var closeWorkToggle		: UnityEngine.UI.Toggle;
var experimentalToggle	: UnityEngine.UI.Toggle;

function Start () {
	amount = 2000.00;
	displayAmount = 2000.00;
	moneyText.text = "$" + amount;
	clock = GameObject.Find("World Clock").GetComponent(WorldClock);
	newDay = false;
	endState = GameObject.Find("EndState").GetComponent(EndState);
}

function Update () {
  if(clock.daySpeed != 0){
    var time = clock.time;
    if (time >28000 && time < 29000 && newDay) {	//get 100 dollars at the start of everyday
    	amount +=100;
    	newDay = false;
    	sanitationCost1();			//charge for treatments everyday around 8
    	sanitationCost2();
    	sickLeaveCost();
    	experimentalCost();
    	closeWorkCost();}
    else if (time > 29000) { newDay = true; }

    if (displayAmount <= 0) {
    	moneyText.text = "$" + displayAmount;
    	endState.LoseGameMoney();}
    else if (amount < displayAmount){	//mechanic to make money tickdown
    	displayAmount -= 5 ;
   		moneyText.text = "$" + displayAmount;}
   	else if (amount > displayAmount){
    	displayAmount += 5 ;
   		moneyText.text = "$" + displayAmount;}
   }
}

function sanitationCost1 (){
	if (this.sanitationToggle1.isOn) { amount -= 100;}
}

function sanitationCost2 (){
	if (this.sanitationToggle2.isOn) {amount -= 100;}
}

function sickLeaveCost (){
	if (this.sickLeaveToggle.isOn) {amount -= 500;}
}

function experimentalCost (){
	if (this.experimentalToggle.isOn) {amount -= 200;}
}

function closeWorkCost (){
	if (this.closeWorkToggle.isOn) {amount -= 1000;}
}