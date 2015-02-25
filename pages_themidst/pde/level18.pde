/* @pjs font = "fonts/peach-sundress.ttf,"fonts/TheGirlNextDoor.ttf"; */

// let's do some processing

Hero hero;
ArrayList arcs;
// unlock :ending animation
boolean locked = true;
//surprise for ending
ParticleSystem ps;

PFont font;

int timer =999999999;
float alphaV=0;



// ----------------------------------------------------------------
void setup() {
  size(700, 700);
  background(0);
  strokeWeight(2);
  stroke(180);
  smooth();

  // 1. the hero
  PVector a = new PVector(0.0, 0.125);
  PVector v = new PVector(0.0, 0.0);
  PVector l = new PVector(width/2, height/2);
  hero = new Hero(a, v, l, 20);

  // 2. the arcs
  arcs = new ArrayList();
  for (int i=1; i<5; i++) { 
    arcs.add(new Arc(width/2, height/2, 
    i*150, i*150, 
    random (PI/3, PI), random (TWO_PI, TWO_PI-PI/2)));
  }

  // 3. ending surprise
  ps = new ParticleSystem(100, new PVector(width/2, height/2, 0));

  font = createFont("fonts/TheGirlNextDoor",38);
  textFont(font);
}



void draw() {

  if (locked) {
    background(0);
    // Run the maze composed of arcs
    for (int i=0; i<arcs.size();i++) {
      Arc a = (Arc) arcs.get(i);  
      a.display();
      a.collide(hero);
	  if ( a.hit ==false){
		if (i == 0){
		patch.send("pdtri",0);
		}
		else if (i ==1){
		patch.send("pdkick",0);	
		}
		else if (i==2){
		patch.send("pdchords",0);
		}
		else if (i==3){
		patch.send("pdnoises1",0);
		}
		else if (i==4) {
		patch.send("pdnoise2",0);
		}
	} else if ( a.hit == true){
            for (int j =0; j<=i ;j++){
              Arc a2 = (Arc) arcs.get(j);
              a2.aColor = color(255,0,0);
              a2.hit = false;
            }
}
  }
    // move hero if mousePressed
    if (mousePressed) {
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
  }

  //friction force
  float c = -0.25;                            // Drag coefficient
  PVector heroVel = hero.getVel();              // Velocity of our thing
  PVector force = PVector.mult(heroVel, c);   // Following the formula
  hero.applyForce(force);    // Adding the force to our object, which will ultimately affect its acc

  // Run the hero object
  hero.makeAppear();
  hero.go();

 // boundaries();

  // check if outside the maze and unlock if it is the case.
  float heroDist = dist (hero.loc.x, hero.loc.y, width/2, height/2);
  if (locked && heroDist>310) {
    locked = false;
	patch.send("endingmusic",0);
  }

  // if unlocked it's the end ! ...
  if (!locked) {

    // make the arcs disappear, but still look normal at first
    if (arcs.size()>0) {
      // same as usual
      background(0);
      hero.go();
      timer = frameCount;

      for (int i=0; i<arcs.size();i++) {
        // decrease alpha value
        Arc a = (Arc) arcs.get(i);  
        a.display();
        a.alphV -= 1;
        // remove if not visible anymore
        if (a.alphV <1 ) {
          arcs.remove(i);
        }
      }
      PVector m = new PVector(-30, -150);
      PVector diff = PVector.sub(m, hero.getLoc());
      diff.normalize();
      float factor = 0.01;  // Magnitude of Acceleration (not increasing it right now)
      diff.mult(factor);
      //object accelerates towards mouse
      hero.setAcc(diff);
    }
    // if no more arcs whe can move our hero to the center
    if (arcs.size()==0) {
      

      // blur the movement
      fill(0, 0, 0, 50);
      noStroke();
      rect(0, 0, width, height);

      displayText ("Congratulations ! ", timer, timer+200, width*2/8, height*3/8, 100);
      displayText ("You defeated all the traps", timer+200, timer+400, width*2/8, height*3/8, 100);
      displayText ("Hero has already been re-united with his girlfriend", timer+400, timer+600,5, height*3/8, 100);
      displayText ("They are probably happy and have a lot of childrens", timer+600, timer+800,5, height*3/8, 100);
      
      
      displayText ("this game has been made by Bérenger Recoules", timer+1000, timer+1200, 15, height*2/8, 100);
      displayText ("drop me an email if you liked it :", timer+1200, timer+1400,width/8, height*2/8, 100);
      displayText ("berenger.recoules@gmail.com", timer+1200, timer+1400,width/8, height*3/8, 100);


      displayText ("This game is programmed with ProcessingJS", timer+1600, timer+1900, 10, height*2/8, 100);
      displayText ("and Webpd which are both opensource projects", timer+1600, timer+1900, 10, height*3/8, 100);
      displayText ("derived from Processing and Pure Data", timer+1600, timer+1900, 10, height*4/8, 100);
      
      if (frameCount> timer+1900 && frameCount< timer+3100){
      fill(255);
      text("So a big thank you goes to :", width*2/8, height*3/8);
      }
      displayText ("Ben Fry and Casey Reas - creators of Processing", timer+1900, timer+2100, 10, height*4/8, 100);
      displayText ("Miller Puckette - creator of Pure Data", timer+2100, timer+2300, 10, height*4/8, 100);
      displayText ("John Resig - the man behind processing.js", timer+2300, timer+2500, 10, height*4/8, 100);
      displayText ("Chris McCormick - intiator of Webpd", timer+2500, timer+2700, 10, height*4/8, 100);
      displayText ("Sébastien Piquemal - developper of Webpd", timer+2700, timer+2900, 10, height*4/8, 100);
      displayText ("and Sébastien again for his precious advices", timer+2900, timer+3100, 10, height*4/8, 100);
      

      // and start our surpise !!
      ps.run();

      if (random(100)>95) {
        float xpos = random(width);
        float ypos = random(height);
        float explosionSize = random(25, 75);
        float partC = random(255);
        for (int i = 0 ; i < explosionSize ; i++) {
          ps.addParticle(xpos, ypos, partC);
        }
      }
      // if you want to join the fun :)
      if (mousePressed) {
        for (int i = 0 ; i < 10 ; i++) {
          ps.addParticle(mouseX, mouseY, random(255));
        }
      }
    }
  }
}


void displayText(String myText, int tStart, int tStop, float expos, float ypos, int fadeDur) {
  textFont(font, 24);
  pushStyle();
  strokeWeight(1);
  fill(255, alphaV);
  stroke(255, alphaV);
  if (tStart<frameCount && frameCount<tStop) {
    pushMatrix();
    translate (expos, ypos);
    text(myText, 0, 0);

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

void boundaries() {
  // Boundaries of our window (they apply even if locked is false)
  if (hero.loc.x<0) {
    PVector newV = hero.getVel();
    newV.x*=-1;
    hero.setVel(newV);
  } 
  if (hero.loc.x>width) {
    PVector newV = hero.getVel();
    newV.x*=-1;
    hero.setVel(newV);
  }
  if (hero.loc.y<0) {
    PVector newV = hero.getVel();
    newV.y*=-1;
    hero.setVel(newV);
  }
  if (hero.loc.y>height) {
    PVector newV = hero.getVel();
    newV.y*=-1;
    hero.setVel(newV);
  }
}




// =====================================================================
class Arc {
  float xpos, ypos;
  float awidth, aheight;
  float astart, astop;
  float angle = 0;
  float updater; // update angle by step
  float x1pin, y1pin, x2pin, y2pin; // cartesian coordinates of astart and astop

  color aColor = color (255, 255, 255);
  float noiseFactor = random(500);
  float strokeW;
  float alphV =255;
  
  boolean hit = false;
	
  
  Arc(float xpos0, float ypos0, 
  float awidth0, float aheight0, 
  float astart0, float astop0 ) {
    xpos = xpos0;
    ypos = ypos0;
    awidth = awidth0;
    aheight = aheight0;
    astart = astart0;
    astop = astop0;
    updater = random(1, 2)/100; 
    strokeW=1;
	
  }

  void display() {
    pushMatrix();
    pushStyle();
    stroke(aColor, alphV);
    strokeW=noise(noiseFactor)*15;
    strokeWeight(strokeW);
    noFill();
    translate(xpos, ypos);
    rotate(angle);
    arc(0, 0, awidth, aheight, astart, astop);
    ellipse(awidth/2*cos(astart), aheight/2*sin(astart), 5, 5);
    ellipse(awidth/2*cos(astop), aheight/2*sin(astop), 5, 5);
    popStyle();
    popMatrix();  
    angle += updater;
    noiseFactor += updater/2;
  }
  void collide(Hero h) {

    float hradius = dist (h.loc.x, h.loc.y, width/2, height/2);

    // get the cartesian coordinates of pins
    x1pin = (awidth/2) * cos(astart+angle)+width/2;
    y1pin = (aheight/2) * sin(astart+angle)+height/2;
    x2pin = (awidth/2) * cos(astop+angle)+width/2;
    y2pin = (aheight/2) * sin(astop+angle)+height/2;

    // collision first check radius
    if (hradius-h.diameter/2<awidth/2+strokeW && hradius+h.diameter/2>awidth/2-strokeW) {

      checkPlayerWithinDoor();
    }
  }

  void checkPlayerWithinDoor () {
    

    // hero 
    PVector Pos1=new PVector( hero.loc.x, hero.loc.y);
    PVector Pos2=new PVector( width/2, height/2 );

    float myAngleStart = myAngleBetween (Pos1, Pos2);
    myAngleStart=degrees(myAngleStart);

    // start of arc
    Pos1=new PVector( x1pin, y1pin);
    float myAngleStart2 = myAngleBetween (Pos1, Pos2);
    myAngleStart2=degrees(myAngleStart2);

    // end of arc
    Pos1=new PVector( x2pin, y2pin);
    float myAngleStart3 = myAngleBetween(Pos1, Pos2);
    myAngleStart3=degrees(myAngleStart3);

    // now check
    // evil 
    if (myAngleStart2<myAngleStart3) {
      // we want 337.23398 must be inside of 307.12787 and 113.809555
      // become  337.23398 must be inside of 307.12787 and 360 113.809555
      myAngleStart2+=360.0;
    }

    if (myAngleStart>myAngleStart3 && 
      myAngleStart<=myAngleStart2 ) {
      // println("True");
      aColor = color (0, 255, 0);
      hit= false;
    } // if
    else {
      aColor = color (255, 0, 0);
	  hero.setAcc(new PVector(0, 0));
	  hero.setVel(new PVector(0, 0));
      hero.setLoc(new PVector(width/2, height/2));
      hit = true;
      
	  patch.send("pdtri",0.05);
	  patch.send("pdchords",0.015);
	  patch.send("pdnoises1",0.5);
	  patch.send("pdnoises2",0.5);
	  patch.send("pdkick",0.25);

	  
	  
    }
  } // func

  float myAngleBetween (PVector myPVector1, PVector myPVector2) {
    // see http://forum.processing.org/topic/help-with-trig-function-or-something-similar#25080000001771067 etc 
    PVector newPos = new PVector ( myPVector1.x-myPVector2.x, 
    myPVector1.y-myPVector2.y);
    float a = atan2(newPos.y, newPos.x);
    if (a<0) { 
      a+=TWO_PI;
    }
    return a;
  }
  //
} // class Arc 
// ======================================================================
class Hero {
  PVector loc;
  PVector vel;
  PVector acc;
  float maxvel;
  float mass;
  // to tween our object
  float diameter ;
  float sDist;
  float tweenfactor=0;
  float cellS, cellS2;
  // to makeAppear() and makeDisAppear()
  float alph = 0;
  //The Constructor (called when the object is first created)
  Hero(PVector a, PVector v, PVector l, float diameter0) {
    acc = a;
    vel = v;
    loc = l;
    maxvel = 4;
    mass = 20;
    diameter = diameter0 ;
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
    //fill(255, 0, 0);
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
  // time related functions called when starting and leaving
  void makeAppear() {
    alph+=1;
    alph = constrain(alph, 0, 180);
  }
  void makeDisappear() {
    alph-=1;
    alph = constrain(alph, 0, 180);
  }
} // class
// end


// A class to describe a group of Particles
// An ArrayList is used to manage the list of Particles 

class ParticleSystem {

  ArrayList particles;    // An arraylist for all the particles
  PVector origin;        // An origin point for where particles are born

    ParticleSystem(int num, PVector v) {
    particles = new ArrayList();              // Initialize the arraylist
    origin = v.get();                        // Store the origin point
    for (int i = 0; i < num; i++) {
      //particles.add(new Particle(origin));    // Add "num" amount of particles to the arraylist
    }
  }

  void run() {
    // Cycle through the ArrayList backwards b/c we are deleting
    for (int i = particles.size()-1; i >= 0; i--) {
      Particle p = (Particle) particles.get(i);
      p.run();
      if (p.dead()) {
        particles.remove(i);
      }
    }
  }

  void addParticle() {
    //particles.add(new Particle(origin));
  }

  void addParticle(float x, float y, float pcolor) {
    particles.add(new Particle(new PVector(x, y), pcolor));
  }

  void addParticle(Particle p) {
    particles.add(p);
  }

  // A method to test if the particle system still has particles
  boolean dead() {
    if (particles.isEmpty()) {
      return true;
    } 
    else {
      return false;
    }
  }
}


// A simple Particle class
class Particle {
  PVector loc;
  PVector vel;
  PVector acc;
  float r;
  float timer;
  float pColor;

  // Another constructor (the one we are using here)
  Particle(PVector l, float pcolor0) {
    acc = new PVector(0, 0.05, 0);
    vel = new PVector(random(-2, 2), random(-3, 0), 0);
    loc = l.get();
    r = random(2);
    timer = 150.0;
    pColor = pcolor0;
  }

  void run() {
    update();
    render();
  }

  // Method to update location
  void update() {
    vel.add(acc);
    loc.add(vel);
    timer -= 1.0;
  }

  // Method to display
  void render() {
    pushStyle();
    colorMode(HSB, 255, 255, 255);
    ellipseMode(CENTER);
    //stroke(255,timer);
    fill(pColor, 255, 255, timer);
    ellipse(loc.x, loc.y, r, r);
    popStyle();
  }

  // Is the particle still useful?
  boolean dead() {
    if (timer <= 0.0) {
      return true;
    } 
    else {
      return false;
    }
  }
}

  
