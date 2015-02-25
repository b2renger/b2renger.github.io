/* @pjs font = "fonts/peach-sundress.ttf,"fonts/TheGirlNextDoor.ttf"; */

 // binding processing and js
interface JavaScript {
    void showText(String s); 
}

void stopPatch() {
    patch.send("pdquit", "bang");
}

// this one will be called from our webpage see : pjs.bindJavaScript(this)
void bindJavascript(JavaScript js) {
    javascript = js; 
}
// declare a javacript object that will be used when we want to send values to it
// check the mouseMoved() function
JavaScript javascript;

// let's do some processing
Hero heroBoy;
Hero heroGirl;

// the tree
Branch trunk;
float noiseFactor =random(100); // used to move ou tree

PixelCloud whiteMeanies; // they are really mean ...

int timer=300000000; // we just nee a big number here, as it will be re-assigner at first mousePress to make an anchor in time and pursue the scenario from here
int timer2 = 300000000;
int timer3 = 300000000;
boolean step0 = true, step1 = false, step2 = false,step3 = false;
float alphaV=0;
int mouseNumber = 0;

color boyColor = color(116, 196, 255);
color girlColor = color (220, 0, 175);

PFont title;
PFont font;

void setup() {
  size(docW, docH-100);
  background(0);
  strokeWeight(2);
  stroke(180);
  smooth();

  PVector a = new PVector(0.0, 0.0);
  PVector v = new PVector(0.0, 0.0);
  PVector l1 = new PVector(width*6/8, height-25);
  PVector l2 = new PVector(width*5/8, height-25);
  heroBoy = new Hero(a, v, l1, boyColor);
  heroGirl = new Hero(a, v, l2, girlColor);

  
  trunk = new Branch(1, 0, width/2, height/2);
  whiteMeanies = new PixelCloud();

  title = createFont("fonts/peach-sundress.ttf",72);
  font = createFont("fonts/TheGirlNextDoor.ttf",20);
}



void draw() {
  showText(" ");

  background(0);
  fill(255);
  stroke(255);
  rect(0, height-5, width, 5);
  
  for (int i =0 ; i<3;i++){
  point (random(width),random(height));
  }

  heroBoy.makeAppear();
  heroGirl.makeAppear();
  heroBoy.render();
  heroGirl.render();

  textFont(title);
  text("The Midst ...", width*5/8, 100);

  trunk.updateMe(width/5, height);
  trunk.drawMe();
  noiseFactor += 0.0065; 
  if (!step3){
  whiteMeanies.display(mouseX,mouseY);
  }

  textFont(font);
  

  // let's start a long timed sequence 
	if (step0){
  displayText ("- What a lovely night to hang out ...", 100, 350, heroBoy.loc.x, 430, "BOY", 125);

  // inline : yeah lovely appart from that creepy tree ...
  if (frameCount >250 && frameCount <550){
  showText("Yeah ! lovely ... appart from that creepy leafless tree...");
  } else {
	showText(" ");
  }

  displayText ("- You're right honey... still ...", 350, 600, heroGirl.loc.x, 430, "GIRL", 125);
  displayText ("- I wonder what those weird stars are ?", 600, 850, heroGirl.loc.x, 460, "GIRL", 125);

  // inline (after some tome) : did you try pressing the mouse ?
  if (frameCount >1000 && frameCount <1400){
	showText("Did you try pressing the mouse ?");
  }

  //increse number of meanies if mousePressed
  if (mousePressed && mouseNumber == 0 && frameCount>850) {
    timer = frameCount;
    whiteMeanies.number+=10; 
    mouseNumber+=1;
	step1 = true;
	step0 = false;
  }
  }
	
	if (step1){
	
  displayText ("- Look ! ... it is growing !", timer, timer+200, heroBoy.loc.x, 430, "BOY", 100); 
  // inline : oh ! snap !
  if (frameCount >timer +10 && frameCount <timer +400){
	showText("oh ! snap !");
  }
  
  displayText ("- We should get going...", timer+200, timer+400, heroBoy.loc.x, 430, "BOY", 100);   

  displayText ("- No ! I would love to see them from closer", timer+400, timer+600, heroGirl.loc.x, 460, "GIRL", 100); 

  // inline (after some time) : did you try pressing the mouse again ? (not kidding!)
  if (frameCount >timer +850 && frameCount <timer +1000){
	showText("did you try pressing the mouse again ? (not kidding!)");
  }
  

  if (mousePressed && frameCount>timer+600 ) {
    mouseNumber +=1;
    if (mouseNumber >4) {
		
      timer2 = frameCount;
      whiteMeanies.number+=40;
	  step2= true;
		step1=false;
    }
  }
  }
  if(step2){

  displayText ("- Ah !! it's still growing ...", timer2, timer2+200, heroBoy.loc.x, 430, "BOY", 100); 
  // inline : Oh snap! snap ! Why did you presse the mouse ?!
  if (frameCount >timer2 && frameCount <timer2 +450){
	showText("Oh snap! snap ! Why did you press the mouse ?!");
  }
  
  displayText ("- We should REALLY get going... Come on !", timer2+200, timer2+400, heroBoy.loc.x, 430, "BOY", 100); 

  if (frameCount>timer2+250) {
    float targetX = 670;
    float targetY = height-25;

    float dX = targetX - heroBoy.loc.x;
    float dY = targetY - heroBoy.loc.y;
    heroBoy.loc.x += dX*0.015;
    heroBoy.loc.y += dY*0.015;
  }

  displayText ("- No ! No ! NO ! Come closer little star...", timer2+400, timer2+600, heroGirl.loc.x, heroGirl.loc.y-150, "GIRL", 100); 

  if (frameCount>timer2+400) {
    float targetX =mouseX ;
    float targetY = height-(random(5)+20);

    float dX = targetX - heroGirl.loc.x;
    float dY = targetY - heroGirl.loc.y;
    heroGirl.loc.x += dX*0.025;
    heroGirl.loc.y += dY*0.025;
  }

  displayText ("- wohoo! it's so nice !", timer2+600, timer2+750, heroGirl.loc.x, heroGirl.loc.y-150, "GIRL", 75);

  displayText ("- be carefull honey !", timer2+750, timer2+900, heroBoy.loc.x, 460, "BOY", 100);
  

  // inline (after some time) : you should come closer to our heroGirl ... I believe she wants to see the stars better....
  if (frameCount >timer2+1000 && frameCount <timer2 +1500){
	showText("you should come closer to our heroGirl ... I believe she wants to see the stars better...");
  }
  }
  

  if (mouseX < heroGirl.loc.x + heroGirl.diameter && mouseX> heroGirl.loc.x - heroGirl.diameter
    && mouseY < heroGirl.loc.y + heroGirl.diameter && mouseY> heroGirl.loc.y - heroGirl.diameter
    && frameCount > timer2+950) {
    timer3 = frameCount;
    timer2 = 999999999;
	step3=true;
	step2=false;
  }
  if(step3){

  if (frameCount>timer3 && frameCount<timer3+150) {
    float targetX =mouseX ;
    float targetY = mouseY;
    float dX = targetX - heroGirl.loc.x;
    float dY = targetY - heroGirl.loc.y;
    heroGirl.loc.x += dX*0.045;
    heroGirl.loc.y += dY*0.045;
  }

  displayText ("- it's attracting me ! I can't escape !", timer3, timer3+200, heroGirl.loc.x, heroGirl.loc.y-150, "GIRL", 100);
  displayText ("- Let go of me stupid cloud !", timer3+350, timer3+550, heroGirl.loc.x, heroGirl.loc.y, "GIRL", 100);

  // inline html : " yeah ... you are totally responsible for that ! Shame on you!"
  if (frameCount >timer3+150 && frameCount <timer3 +500){
	showText("yep ! ... you are totally responsible for that ! Shame on you!");
  }

  if (frameCount> timer3 +150) {
    float targetX =-150 ;
    float targetY = -10;
    float dX = targetX - heroBoy.loc.x;
    float dY = targetY - heroBoy.loc.y;
    heroGirl.loc.x += dX*0.0015;
    heroGirl.loc.y += dY*0.0015;    
    whiteMeanies.display(heroGirl.loc.x, heroGirl.loc.y);
  }
  else {
    whiteMeanies.display(mouseX, mouseY);
  }

  displayText ("- oh no ! I had a bad feeling about those", timer3+700, timer3+900, heroBoy.loc.x, 430, "BOY", 100);
  displayText ("- well ... so long !!! what should I do next ?", timer3+1100, timer3+1300, heroBoy.loc.x, 430, "BOY", 100);

  // inline : WTF ?? you don't even go after her ?
  if (frameCount >timer3+1300 && frameCount <timer3 +1500){
	showText("WTF ?? you don't even go after her ?");
	patch.send("pdquit",0);
  }

  displayText ("- I'm sure it's going to be hard with traps and everything...", timer3+1500, timer3+1700, heroBoy.loc.x, 430, "BOY", 100);
  displayText ("- plus she was a little boring ...", timer3+1700, timer3+1900, heroBoy.loc.x, 460, "BOY", 100);
  displayText ("- actually I'd rather stay here, and enjoy the mood...", timer3+1900, timer3+2100, heroBoy.loc.x, 460, "BOY", 100);
  	
}
  // inline : what a helpless coward and lazy hero ... if you still want to play, you should probably press start as you can't count on him...
  if (frameCount >timer3+2100 && frameCount <timer3 +5000){
	showText("what a helpless coward and lazy hero ... if you still want to play, you should probably press start as you can't count on him...");

  } 
  
  if (frameCount>timer3 + 5000){
	patch.stop();
	noLoop();
  }
  
}

void displayText(String myText, int tStart, int tStop, float expos, float ypos, String type, int fadeDur) {
  //textFont(font,24);
  if (type == "GIRL") {
    pushStyle();
    strokeWeight(1);
    fill(girlColor, alphaV);
    stroke(girlColor, alphaV);
    if (tStart<frameCount && frameCount<tStop) {
      pushMatrix();
      translate (expos, ypos);
      text(myText, 0, 0);
      line (5, 10, 25, 10);
      line(25, 10, 35, 30);
      line(35, 30, 40, 10);
      line(40, 10, 80, 10);
      popMatrix();
      if (frameCount <tStart+fadeDur) {
        alphaV +=3;
        alphaV = constrain (alphaV, 0, 255);
      } 
      else if (frameCount >tStop-fadeDur) {
        alphaV -=3;
        alphaV = constrain (alphaV, 0, 255);
      }
    }
    popStyle();
  }
  else if (type == "BOY") {
    pushStyle();
    strokeWeight(1);
    fill(boyColor, alphaV);
    stroke(boyColor, alphaV);
    if (tStart<frameCount && frameCount<tStop) {
      pushMatrix();
      translate (expos, ypos);
      text(myText, 0, 0);
      line (5, 10, 25, 10);
      line(25, 10, 30, 30);
      line(30, 30, 40, 10);
      line(40, 10, 80, 10);
      popMatrix();
      if (frameCount <tStart+100) {
        alphaV +=3;
        alphaV = constrain (alphaV, 0, 255);
      } 
      else if (frameCount >tStop-100) {
        alphaV -=3;
        alphaV = constrain (alphaV, 0, 255);
      }
    }
    popStyle();
  }
}

class Hero {
  PVector loc;
  PVector vel;
  PVector acc;
  float maxvel;
  float mass;
  // to tween our object
  float diameter =30;
  float sDist;
  float tweenfactor=0;
  float cellS, cellS2;
  // to makeAppear() and makeDisAppear()
  float alph = 0;
  color colorH;

  //The Constructor (called when the object is first created)
  Hero(PVector a, PVector v, PVector l, color colorInit) {
    acc = a;
    vel = v;
    loc = l;
    maxvel = 4;
    mass = 20;
    colorH = colorInit;
  }

  //function to display
  void render() {
    strokeWeight(8);
    stroke(colorH, alph);
    fill(175, alph);
    tween(); // change appearance while moving
    ellipse(loc.x, loc.y, diameter-cellS, diameter+cellS2);
  }

  // ou tween function !
  void tween() {
    // distance from mouse
    sDist = dist(mouseX, mouseY, loc.x, loc.y);
    // change tween factor (angle for our wavelet animation)
    if (sDist>75) {
      tweenfactor+=0.3;
    }
    else {
      tweenfactor+= map(sDist, 0, 75, 0.09, 0.25);
    }
    //scale our multiplication factor for our tween effect
    // float sMult = map(sDist, 0, 100, 0.09*diameter, .15 * diameter);
    // fill to global variables  to affect the drawing of our ellipse
    cellS = 0.12*diameter * cos(tweenfactor);
    cellS2 = 0.12 *diameter* (.5 +(cos(tweenfactor)/2));
  }

  // time related functions
  void makeAppear() {
    alph+=1;
    alph = constrain(alph, 0, 180);
  }
  void makeDisappear() {
    alph-=1;
    alph = constrain(alph, 0, 180);
  }
}

class Branch {
  float level, index;
  float x, y;
  float endx, endy;
  float noiseF2;
  float oriH, oriV;
  float windFactor;
  int maxLevel =4;
  int numChildren =4;

  Branch[] children = new Branch[0]; //

  Branch (float lev, float ind, float ex, float wy) {
    level =lev;
    index =ind;
    noiseF2=random(100);
    oriH = random(-85, 85);
    oriV = random(-160, -80);
    updateMe(ex, wy);
    if (level<maxLevel) { // avoid infinite loop
      children = new Branch[numChildren];
      for (int i = 0; i<numChildren;i++) {
        children[i] = new Branch(level+1, i, endx, endy);
      }
    }
    
  }

  void updateMe(float ex, float wy) {
    x =ex;
    y =wy;
    endx = x+ (level*noise(noiseFactor, noiseF2, 60)*2+oriH);
    endy = y+(level*noise(noiseFactor, noiseF2, 40)+oriV);
    for (int i =0; i<children.length; i++) {
      children[i].updateMe(endx, endy);
      noiseF2+=0.00002;
    }
  }

  void drawMe() {
    pushStyle();
    stroke(255, map(maxLevel-level+1, 0, maxLevel, 0, 255));
    strokeWeight(maxLevel-level+1);
    line(x, y, endx, endy);
    //ellipse(x, y, 5, 5);
    for (int i = 0 ; i<children.length;i++) {
      //children[i].updateMe();
      children[i].drawMe();
    }
    popStyle();
  }
}

class PixelCloud {
  float whiteNoise;
  float xpos, ypos;
  float number =1;

  PixelCloud() {
    whiteNoise = random(100);
  }

  void display(float xpos, float ypos) {
    // mean white pixels
    pushStyle();
    stroke(255);
    strokeCap(ROUND);
    strokeWeight(1);  
    float ex = map(noise(whiteNoise, 50, 120), 0, 1, -50, 50)+xpos;
    float wy = map(noise(whiteNoise, 65, 40), 0, 1, -50, 50)+ypos;
    for (int i=0; i < number ; i++) {
      float radius = random(0, 90);
      float angle = random (0, TWO_PI);
      point (ex + radius*cos(angle), wy+radius*sin(angle));
    }
    popStyle();
    whiteNoise +=0.05;
  }
}
