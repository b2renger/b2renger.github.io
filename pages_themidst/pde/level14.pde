//added class paddle
// orthogonal collisions
// added brick class
// arrayList of bricks
// bricks dissapearing
// added strongerBrick class extending Brick class 
// arrayList of strongBricks
// strongBricks changing colors and dispappearing according to their state

// let's do some processing
Hero hero;
Paddle ph2;
ArrayList bricks;
ArrayList strongBricks;

boolean movingOn = false;

void setup() {
  size(200, 200);
  background(0);
  strokeWeight(2);
  stroke(180);
  PVector a = new PVector(0, 0);
  PVector v = new PVector(random(-1, 1), -2);
  PVector l = new PVector(width/2, height/2);
  hero = new Hero(a, v, l);

  rectMode(CENTER);
  ph2 =new Paddle(width/2, 20, 75, 10);

  bricks = new ArrayList();
  strongBricks = new ArrayList();
  for (int i=0 ; i<4; i++) {
    for (int j=1; j<5 ; j+=2) {
      bricks.add(new Brick(i*51, height-(j+1)*14, 45, 10));
      strongBricks.add(new StrongBrick(i*51, height-(j)*14, 45, 10));
    }
  }
}

void draw() {
  background(0);
    // Run the Thing object
  if (movingOn== false) {
    hero.makeAppear();
  }
  else {
	patch.send("pjsquit","bang");
  }
  hero.go();
  
  // SOUND !!
  float pdtwee1 = map(cos(hero.tweenfactor/4),-1,1,0,1);
  patch.send("pjstween1",pdtwee1);
  float pdtwee2 = map(cos(hero.tweenfactor/4 + PI*3/2),-1,1,0,1);
  patch.send("pjstween2",pdtwee2);
  float pdtwee3 = map(cos(hero.tweenfactor/4+ PI/2),-1,1,0,1);
  patch.send("pjstween3",pdtwee3);
  float pdtwee4 = map(cos(hero.tweenfactor/4+PI),-1,1,0,1);
  patch.send("pjstween4",pdtwee4);
    
  float hposX = map (hero.loc.x,0,width,0,1);
  float hposY = map (hero.loc.y,0,height,0,1);
  float pdvol1 = hposX;
  float pdvol2 = 1-hposX;
  float pdvol3 = hposY;
  float pdvol4 = 1-hposY;
  
  patch.send("pjsvol1",pdvol1);
  patch.send("pjsvol2",pdvol2);
  patch.send("pjsvol3",pdvol3);
  patch.send("pjsvol4",pdvol4);
  
  // Paddle with hacky reflexion
  ph2.updateEx(mouseX);
  if (hero.loc.x+hero.diameter/2>ph2.xpos-ph2.pwidth/2
    && hero.loc.x-hero.diameter/2<ph2.xpos+ph2.pwidth/2
    && hero.loc.y-hero.diameter/2<ph2.ypos+ph2.pheight/2) {
    PVector newV = hero.getVel();
    float newX =map(hero.loc.x,ph2.xpos-ph2.pwidth/2,ph2.xpos+ph2.pwidth/2,-2,2);
    newV.x = newX;
    newV.y*=-1;
    hero.setVel(newV);
	patch.send("pjshit",0);
  }
  ph2.drawMe();
  
  // our bricks ...
  for (int i=0; i<bricks.size();i++) {
    Brick b = (Brick) bricks.get(i);
    b.display();
    b.update(hero);
    if (b.touched >0){
      bricks.remove(i); 
	  //patch.send("pjslighthit",0);
    } 
  }
  
  // our strong bricks
  for (int i=0; i<strongBricks.size();i++) {
  StrongBrick sb = (StrongBrick) strongBricks.get(i);
    sb.display();
    sb.update(hero);
	//boolean hit = false;
    if (sb.touched >0){
		
        sb.grayVal = 200;   
    }
    if (sb.touched >1){
	//hit = true;
      strongBricks.remove(i);   
    }
	
	
	
  }


  // boundaries
  if (hero.loc.x<5) {
    PVector newV = hero.getVel();
    newV.x*=-1;
    hero.setVel(newV);
  }
  if (hero.loc.y<15) {
    movingOn = true;
	hero.makeDisappear();
	if (hero.alph<10){
	popUp(8);
	closeWindows(14);
	}
  }
  if (hero.loc.x>195) {
    PVector newV = hero.getVel();
    newV.x*=-1;
    hero.setVel(newV);
  }
  if (hero.loc.y>185) {
  movingOn = true;
	hero.makeDisappear();
	if (hero.alph<10){
	popUp(18);
	closeWindows(14);
	}
    
  }
}

class Paddle {
  float xpos, ypos, pwidth, pheight;

  Paddle(float xpos0, float ypos0, float pwidth0, float pheight0) {
    xpos = xpos0;
    ypos = ypos0;
    pwidth = pwidth0;
    pheight= pheight0;
  }

  void drawMe() {
    pushMatrix();
    translate(xpos, ypos);
    strokeWeight(1);
    stroke(255);
    fill(255, 180);
    rect(0, 0, pwidth, pheight);
    popMatrix();
  }

  void updateEx(float ex) {
    xpos =constrain(ex, 40, 160);
  }
  void updateWy(float wy) {
    ypos=constrain(wy, 40, 160);
  }
}

class Hero {
  PVector loc;
  PVector vel;
  PVector acc;
  float maxvel;
  float mass;
  // to tween our object
  float diameter =20;
  float sDist;
  float tweenfactor=0;
  float cellS, cellS2;
  // to makeAppear() and makeDisAppear()
  float alph = 0;

  //The Constructor (called when the object is first created)
  Hero(PVector a, PVector v, PVector l) {
    acc = a;
    vel = v;
    loc = l;
    maxvel = 4;
    mass = 20;
  }
  //main function to operate object
  void go() {
    update();  
    render();
  }
  //function to update location
  void update() {
    vel.add(acc);
    loc.add(vel);
    //limit speed to max
    if (vel.mag() > maxvel) {
      vel.normalize();
      vel.mult(maxvel);
    }
  }
  //function to display
  void render() {
    strokeWeight(8);
    stroke(220, alph);
    fill(175, alph);
    tween(); // change appearance while moving
    ellipse(loc.x, loc.y, diameter-cellS, diameter+cellS2);
  }
  // transform movement (used in draw)
  void applyForce(PVector force) {
    force.div(mass);   // Newton's second law
    acc.add(force);    // Accumulate acceleration
  }
  //Add functions to our thing object to access the location, velocity and acceleration from outside the class
  PVector getVel() {
    return vel.get();
  }
  PVector getAcc() {
    return acc.get();
  }
  PVector getLoc() {
    return loc.get();
  }
  void setLoc(PVector v) {
    loc = v.get();
  }
  void setVel(PVector v) {
    vel = v.get();
  }
  void setAcc(PVector v) {
    acc = v.get();
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
    float sMult = map(sDist, 0, 100, 0.09*diameter, .25 * diameter);
    // fill to global variables  to affect the drawing of our ellipse
    cellS = sMult * cos(tweenfactor);
    cellS2 = sMult * (.5 +(cos(tweenfactor)/2));
  }

  // time related functions
  void makeAppear() {
    alph+=10;
    alph = constrain(alph, 0, 180);
  }
  void makeDisappear() {
    alph-=10;
    alph = constrain(alph, 0, 180);
  }
}


class Brick {
  float xpos, ypos;
  int touched ;
  float alphaVal;
  float bwidth, bheight;

  Brick (float xpos0, float ypos0, float bwidth0, float bheight0 ) {
    xpos = xpos0;
    ypos = ypos0;
    bwidth = bwidth0;
    bheight = bheight0;
    alphaVal = 255;
    touched =0;
  }

  void display() {
    pushStyle();
    pushMatrix();
    rectMode(CORNER);
    strokeWeight(2);
    stroke(255, 150);
    strokeCap(ROUND);
    translate(xpos, ypos);
    fill(200, alphaVal);
    rect(0, 0, bwidth, bheight);
    popMatrix();
    popStyle();
  }

  void update(Hero h) {
    if ((h.loc.x+h.diameter/2)>xpos &&
      (h.loc.x-h.diameter/2)<xpos+bwidth &&
      (h.loc.y+h.diameter/2)>ypos) {
         patch.send("pjslighthit",0);
      PVector newV = h.getVel();
      newV.y*=-1;
      h.setVel(newV);
      touched += 1;
    }
  }
}


class StrongBrick extends Brick{
  boolean nTouched;
  int grayVal;
  
  StrongBrick(float xpos0, float ypos0, float bwidth0, float bheight0){
    super(xpos0,ypos0,bwidth0,bheight0);
    nTouched = false;
    grayVal = 150;
    
  }
  
   void display() {
    pushStyle();
    pushMatrix();
    rectMode(CORNER);
    strokeWeight(2);
    stroke(255, 150);
    strokeCap(ROUND);
    translate(xpos, ypos);
    fill(grayVal, alphaVal);
    rect(0, 0, bwidth, bheight);
    popMatrix();
    popStyle();
  }
  
  void update(Hero h) {
    if ((h.loc.x+h.diameter/2)>xpos &&
      (h.loc.x-h.diameter/2)<xpos+bwidth &&
      (h.loc.y+h.diameter/2)>ypos) {
         
      PVector newV = h.getVel();
      newV.y*=-1;
      h.setVel(newV);
	  patch.send("pjsstronghit",0);
      touched += 1;
    }
	}
  
  
  
  
}
/*  */

