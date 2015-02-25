// added functions to hero class to change its size
// - makeSwell() => called every frame
// - makeShrink() => called when mouse is pressed
// added boolean 'jailed'



Hero hero;
boolean jailed = true;
float alphaVal= 180;
boolean movingOn=false;

void setup() {
  size(200, 200);
  background(0);
  strokeWeight(2);
  stroke(180);
  PVector a = new PVector(0.0, 0.0);
  PVector v = new PVector(0.0, 0.0);
  PVector l = new PVector(width/2, height/2);
  hero = new Hero(a, v, l);
}


void draw() {

  background(0);
  float c = -0.13;                            // Drag coefficient
  PVector heroVel = hero.getVel();              // Velocity of our thing
  PVector force = PVector.mult(heroVel, c);   // Following the formula
  hero.applyForce(force);                        // Adding the force to our object, which will ultimately affect its acc
  // Run the Thing object
  if (movingOn== false){
  hero.makeAppear();
  }
  else {
	patch.send("pjsquit","bang");
  }
  hero.go();


  hero.makeShrink();
  
  // SOUND
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

	

  if (mousePressed) {
    hero.makeSwell(); 
    // Compute difference vector between mouse and object location
    // 3 steps -- (1) Get Mouse Location, (2) Get Difference Vector, (3) Normalize difference vector
    PVector m = new PVector(mouseX, mouseY);
    PVector diff = PVector.sub(m, hero.getLoc());
    diff.normalize();
    float factor = 0.1;  // Magnitude of Acceleration (not increasing it right now)
    diff.mult(factor);
    //object accelerates towards mouse
    hero.setAcc(diff);
  } 
  else {
    hero.setAcc(new PVector(0, 0));
  }

  if (hero.loc.x<15 && !jailed) {
  
    movingOn = true;
    hero.makeDisappear();
	//println(hero.alph);
    if (hero.alph<10) {
      popUp(9);
	  //closeWindows(10);
    }
  }
  if (hero.loc.x>195) {
    PVector newV = hero.getVel();
    newV.x*=-1;
    hero.setVel(newV);
	patch.send("pjstick",0);
  }
  if (hero.loc.y<5) {
    PVector newV = hero.getVel();
    newV.y*=-1;
    hero.setVel(newV);
	patch.send("pjstick",0);
  }
  if (hero.loc.y>195) {
    PVector newV = hero.getVel();
    newV.y*=-1;
    hero.setVel(newV);
	patch.send("pjstick",0);
  }

  // draw broke quad
  pushStyle();
  stroke(255, alphaVal);
  line(50, 50, 50, 150);
  line(50, 50, 150, 50);
  line(50, 150, 150, 150);
  line(150, 50, 150, 85);
  line(150, 150, 150, 115);
  popStyle();
  // boundaries of this quad 
  

  if (jailed) {
    
    if ((hero.loc.x-hero.diameter/2)<52 ) {
      PVector newV = hero.getVel();
      newV.x*=-1;
      hero.setVel(newV);
	  patch.send("pjshit",0);
    }
    if ((hero.loc.y-hero.diameter/2)<52) {
      PVector newV = hero.getVel();
      newV.y*=-1;
      hero.setVel(newV);
	  patch.send("pjshit",0);
    }
    if ((hero.loc.y+hero.diameter/2)>148) {
      PVector newV = hero.getVel();
      newV.y*=-1;
      hero.setVel(newV);
	  patch.send("pjshit",0);
    }
    if ((hero.loc.x+hero.diameter/2)>148) {
      if ((hero.loc.y-hero.diameter/2)<85 || (hero.loc.y+hero.diameter/2)>115) {
        PVector newV = hero.getVel();
        newV.x*=-1;
        hero.setVel(newV);
		patch.send("pjshit",0);
      }
      else {
        jailed = false;
		patch.send("verb",70);
	  patch.send("feedback",70);
      }
    } 
  }
  else if (jailed == false) {
      alphaVal -=1;
      alphaVal = constrain (alphaVal,5,180);
	  
	  
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
    alph-= 10;
    alph = constrain(alph, 0, 180);
  }

  void makeShrink() {
    diameter -=0.05;
    diameter = constrain( diameter, 10, 50);
  }
  void makeSwell() {
    diameter +=1;
    diameter = constrain(diameter, 10, 50);
  }
}

