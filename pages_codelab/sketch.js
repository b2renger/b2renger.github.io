// Début : 521334560487784448 : 2014-10-12 16:20:19 +0000
// Fin : 696011996823552000 : 2016-02-11 11:14:12 +0000


var data; // to load our json
var counter = 0; // keep track of the index wa are at in the json

var year, month, day, hour, min;
var dc; // date counter instance
var dc_play;
var dc_play_start = false;

var ntweet_hour = 0; // nb of tweets in the hour we are in
var last_month = 0; // what month is it ?

var date_label; // a pg object
var back_image;

var alines = [];

var width,height;

var dateFont ;
var stdFont ;
var monday = false;

var infoMenu;

function preload() {
  var file = "list-prod.json";
  data = loadJSON(file ,success, error, "json");
  dateFont = loadFont('assets/PressStart2P-Regular.ttf');
  stdFont = loadFont('assets/Lato-Regular.ttf');
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  width = windowWidth;
  height = windowHeight;
  dc = new DateCounter(2015,02,28,0);
  dc_play = new DateCounter(2015,02,28,0);
  background(0);
  frameRate(24);
  date_label = createGraphics(350, 54);
  back_image = createGraphics(windowWidth, windowHeight);
  infoMenu = new InfoMenu(windowWidth - 40 , + 30,25);
}

function draw() { 
	background(0);

  // get values out of the loaded JSON
  var id = data[counter].id;
  var count = data[counter].count;
  var date = data[counter].date;
  //console.log(id,count,date);
  
  // date is formatted like this "yyyy-mm-dd hh:mm;ss +0000"
  // we need to split the list for '-' ':' and ' ' to get individual elements
  var dateElements = splitTokens(date,"- :");

  year = dateElements[0];
  month = dateElements[1];
  day = dateElements[2];
  hour = dateElements[3];

  // if date from our counter and date from our json are the same
  if(dc.getDate() == year+"-"+month+"-"+day+" "+hour){
  	
    // map date to a 2D position
  	var x = map(dc.iteration,0,365*24,0,windowWidth);
  	var y = map(dc.iteration,0,365*24,0,windowHeight);
    // create an instance of aline object : a moving date.
  	alines.push(new Animated_Line(hour,count,x,y,windowWidth,windowHeight));
   
  	ntweet_hour = float(count);

    // check the end of the json file
  	if(counter < 3214){
  		counter += 1;
 	  }
  	else {
  		noLoop();
  	}  	
  }
  // if no match
  else {
  	ntweet_hour = float(0);
  }
  
  dc.update();

  for (var i = 0 ; i < alines.length ; i++){
  	alines[i].update();
  	alines[i].draw(back_image);
  	if(alines[i].pct >= 1 ){
       dc_play_start = true;
       Pd.send('panner', [float(alines[i].hour)]);
       Pd.send('play_n', [float(alines[i].count)]);
  		 alines.splice(i,1);
  	}
  }

  if(dc_play_start){
    dc_play.update();
  }

  if(dc_play.hour == 0){
   Pd.send('day', [float(random(5))]);
  }

  if ((dc_play.day%7 + 1) == 1){
    if(monday){ 
      Pd.send('monday', [float(random(5))]);
    }
    monday = false;
  }
  else{
    monday = true;
  }

  if(dc_play.month != last_month){
  	 Pd.send('month', [float(random(5))]);
  	 last_month = dc.month;
  }

  // draw the date label
  date_label.background(0,0,0,150);
  date_label.fill(255,150,0);
  date_label.stroke(255,150,0);
  date_label.strokeWeight(1);
  date_label.textFont(dateFont);
  date_label.textAlign(CENTER,CENTER);
  textSize(24);
  var dataElts = splitTokens(dc.getDate() ,"- :");
  date_label.text(dc_play.getDate()+"h",7,40);
  
  image(back_image,0,0);
 
  image(date_label,windowWidth/2-date_label.width/2,windowHeight-date_label.height);

  infoMenu.update(mouseX,mouseY);
  infoMenu.display();
}

function success (){
	console.log("success loading json");
	console.log(data.length);
}

function error (){
	console.log("error loading json");
}

function InfoMenu (x,y,size){
  this.anchorX = x;
  this.anchorY = y;
  this.size = size;
  this.over = false;
}

InfoMenu.prototype.display= function(){

  fill(255);
  ellipse(this.anchorX,this.anchorY,this.size,this.size);
  stroke(0);
  fill(0);
  textFont(stdFont);
  //text(CENTER,CENTER);
  textSize(20);
  text("i",this.anchorX-3,this.anchorY+this.size/3);

  if (this.over){
    textSize(18);
    fill(255,180);
    translate(this.anchorX-500 - this.size*2 , this.anchorY-this.size/2);
    rect(0, 0 , 500+this.size/2 , 245,10);
    fill(0);
    text("Twitter sonification @codelab_fr - Happy Birthday Codelab !",7,25);
    textSize(16);
    text("Codelab is a french forum dedicated to creative code, it has a twitter ",7,60);
    text("bot that post a link for each new post.",7,80);
    text("The twitter account has been scrapped to compile a json file made of ",7,105);
    text("the number of post per hour of the day.",7,125);
    text("Tweets are emitted at the bottom-right corner, and travel to their target", 7 ,150);
    text("position to form a representation of a full year of posts.",7,170);
    text("A black bar represents an hour with no post, a vivid yellow one means",7,195);
    text("many messages have been posted.",7,215);
    text("It should sound better with headphones.",7,240);
  }
}

InfoMenu.prototype.update= function(x,y){
  if(dist(x,y,this.anchorX,this.anchorY)< this.size/2){
    this.over = true;
  }
  else{
    this.over = false;
  }

}


function Animated_Line(hour,count,targetX,targetY,w,h){
	this.targetX = targetX;
	this.targetY = targetY;
	this.startX = w;
	this.startY = h;
	this.currentX = w;
	this.currentY = h;
	this.pct =0;
	this.baseWidth=w;
	this.baseHeight =h;
  this.count = count;
  this.size = this.count*5;
  this.alpha = 150 + 10*this.count;
  this.hour = hour;
 
}

Animated_Line.prototype.update = function(){
	this.currentX = lerp(this.startX, this.targetX , this.pct);
	this.currentY = lerp(this.startY, this.targetY , this.pct);
	this.baseWidth = lerp(this.baseWidth, 1  , this.pct);
	this.pct += 0.0055;	
}

Animated_Line.prototype.draw = function(back_image){

	noStroke();
  fill(255,255,0,180);
  ellipse(this.currentX,this.currentY,this.size,this.size);

  if (this.pct >= 1 ){
    back_image.push();
    back_image.stroke(255,255,0,this.alpha);
    back_image.strokeWeight(0.15);
    back_image.translate(this.targetX,this.targetY);
    back_image.rotate(45);
    back_image.line(0,0,0,windowWidth);
    back_image.line(0,0,0,-windowWidth);
    back_image.pop();
  }
}

Animated_Line.prototype.display = function(param){
  if(param == "days"){
    push()
    noStroke();
    fill(255,150,0,180);
    ellipse(this.currentX-5,this.currentY+5,4,4);
    pop();
  }
  else if (param =="weeks"){
    push()
    noStroke();
    fill(255,150,0,180);
    ellipse(this.currentX-5,this.currentY+5,6,6);
    pop();
  }
  else if (param =="months"){
    push()
    noStroke();
    fill(255,150,0,180);
    ellipse(this.currentX-5,this.currentY+5,8,8);
    pop();
  }
}



function DateCounter(y,m,d,h){
	this.year = y;
	this.month = m;
	this.day = d;
	this.hour = h;
	this.iteration = 0;
}

DateCounter.prototype.getDate = function(){
	return this.year +"-"+nf(this.month,2,0)+"-"+nf(this.day,2,0)+" "+nf(this.hour,2,0);
}

DateCounter.prototype.update = function(){
	this.iteration += 1;

	if (this.hour == 23){

	if (this.month == 1 || this.month == 3 || this.month == 5 || this.month == 7 || this.month == 8 || this.month == 10) {
      if (this.day == 31) {
        this.day = 1;
        this.month+=1;
      } else {
        this.day +=1;
      }
    } else if (this.month == 4 || this.month == 6 || this.month == 9 || this.month == 11) {
      if ( this.day == 30) {
        this.day = 1;
        this.month+=1;
      } else {
        this.day +=1;
      }
    } else if (this.month == 2) {
      if (this.year == 2016 || this.year == 2012) {
        if (this.day == 29) {
          this.day = 1;
          this.month+=1;
        } else {
          this.day +=1;
        }
      } else {
        if (this.day == 28) {
          this.day = 1;
          this.month+=1;
        } else {
          this.day +=1;
        }
      }
    } else if (this.month == 12) {
      if (this.day == 31) {
        this.day = 1;
        this.month = 1;
        this.year +=1;
      } else {
        this.day +=1;
      }
    }
    this.hour +=1;
    this.hour = this.hour%24;
	}
	else {
		this.hour +=1 ;
		this.hour = this.hour%24;
		
	}
}

