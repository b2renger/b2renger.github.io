


Hero hero;

ArrayList segments;
Segment segment;

boolean movingOn = false;


// function to generate big or small numbers to place our lines randomely
float small(){
  return random(5,75);
}
float big(){
 return random(125,200); 
}

void addSegment (String type){
 if (type == "TOP"){
   segments.add(new Segment(small(), small(), big(), small())); //TOP 
 }
 
 if (type == "LEFT"){
   segments.add(new Segment(small(), small(), small(), big())); //LEFT 
 }
  
 if (type == "BOTTOM"){
   segments.add(new Segment(small(), big(), big(), big()));//BOTTOM  
 }
  
 if (type == "RIGHT"){
   segments.add(new Segment(big(), small(), big(), big())); // RIGHT
 } 
  
  
}

void setup() {
  size(200, 200);
  background(0);
  strokeWeight(2);
  stroke(180);
  PVector a = new PVector(0.0, 0.125);
  PVector v = new PVector(0.0, 0.0);
  PVector l = new PVector(width/2, height/2);
  hero = new Hero(a, v, l);

  segments = new ArrayList();


  
  for (int i = 0 ; i<5; i++){
    addSegment("TOP");
    addSegment("LEFT");
    addSegment("RIGHT");   
    addSegment("BOTTOM");
  }


}


void draw() {

  background(0);
  float c = -0.23;                            // Drag coefficient
  PVector heroVel = hero.getVel();              // Velocity of our thing
  PVector force = PVector.mult(heroVel, c);   // Following the formula
  hero.applyForce(force);                        // Adding the force to our object, which will ultimately affect its acc
  // Run the Thing object
  if(!movingOn){
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

  if (hero.loc.x<15) {
     movingOn = true;
	hero.makeDisappear();
	if (hero.alph<10){
	popUp(15);
	//closeWindows(16);
	}
  }

  if (hero.loc.x>185) {
     movingOn = true;
	hero.makeDisappear();
	if (hero.alph<10){
	popUp(17);
	//closeWindows(15);
	}
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

  for (int i = 0 ; i < segments.size() ; i++) {
    Segment seg = (Segment) segments.get(i); 
    seg.display();
    handleCollisions(hero, seg);

    if (seg.alive == false) {
      segments.remove(i);
	  patch.send("pjstouched",0);
      
      // do probabilities !
      float randNumb = random(100);
      
      if (randNumb <25){
        addSegment("BOTTOM");
      }
      if (randNumb >25 && randNumb <50){
        addSegment("TOP");
      }
      if (randNumb >50 && randNumb <75){
        addSegment("RIGHT");
      }
      if (randNumb >75){
        addSegment("LEFT");
      }
      
    }
  }
  
  
  if (frameCount%250>245){
  addSegment("BOTTOM");
  addSegment("LEFT");
  addSegment("RIGHT");
  addSegment("TOP");
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


class Segment {  

  float xpos1, ypos1, xpos2, ypos2;
  PVector a, b;
  boolean alive = true;
  float displayAngle;

  Segment (float xpos10, float ypos10, float xpos20, float ypos20) {
    xpos1 = xpos10;
    ypos1 = ypos10;
    xpos2 = xpos20;
    ypos2 = ypos20;
    a = new PVector(xpos1, ypos1);
    b = new PVector(xpos2, ypos2);
    displayAngle =0;
  }

  void display() { 
    pushStyle();
    stroke(255);
    strokeWeight(1);    
    line (xpos1, ypos1, xpos2, ypos2);
    popStyle();
  }
}


/** For each line drawn, test if there is a collision with
 *  ball. If there is, calculate a force vector perpendicular
 *  to the line, with a larger magnitude if the ball is closer
 *  to the line. */
void handleCollisions(Hero t, Segment segment) {
  //for (Line currentLine : terrain) {
  if (collision(t, segment)) {   
    segment.alive = false;
    PVector dist_v = normalVector(t, segment);

    // Give a slightly stronger force for lines closer to
    // the center of the circle.
    PVector force = PVector.div(dist_v, dist_v.mag());
    force.mult(7 * pow(dist_v.mag(), -1));

    // Keep the ball's initial velocity parallel to the line,
    // but replace its velocity perpindicular to the line with
    // the force vector.
    PVector seg = PVector.sub(segment.a, segment.b);
    t.vel = PVector.add(project(t.vel, seg), force);
  }


  //}
}

/* Returns the vector perpendicular to the given line that
 * intersects the center of the given circle */
PVector normalVector(Hero c, Segment line) {
  PVector pt_v = PVector.sub(c.loc, line.a);
  PVector seg_v = PVector.sub(line.b, line.a);

  PVector proj_v = project(pt_v, seg_v);

  PVector closest;
  if (PVector.angleBetween(proj_v, seg_v) >= 3.14) {
    closest = line.a;
  } 
  else if (proj_v.mag() > seg_v.mag()) {
    closest = line.b;
  } 
  else {
    closest = PVector.add(line.a, proj_v);
  }
  PVector dist_v = PVector.sub(c.loc, closest);
  return dist_v;
}

/** Returns a vector of the projection of 'v' onto 'onto' */
PVector project(PVector v, PVector onto) {
  PVector proj_v = new PVector(onto.x, onto.y);
  proj_v.normalize();
  proj_v.mult(PVector.dot(v, proj_v));

  return proj_v;
}

/** Checks for a collisions between a circle and a line
 *  connecting two points */
boolean collision(Hero c, Segment line) {
  float dist = normalVector(c, line).mag();
  return dist < c.diameter/2;
}


/** Returns true if a line from a to b intersects a line from c to d
 *
 *  See http://compgeom.cs.uiuc.edu/~jeffe/teaching/algorithms/ for a
 *  good explanation of this algorithm. */
boolean intersect(PVector a, PVector b, PVector c, PVector d) {
  boolean acd = ccw(a, c, d) < 0;
  boolean bcd = ccw(b, c, d) < 0;
  boolean abc = ccw(a, b, c) < 0;
  boolean abd = ccw(a, b, d) < 0;

  return acd != bcd && abc != abd;
}

/** Returns >0 if the three points are in clockwise order, <0 if they
 *  are in counter clockwise order, or 0 if they are collinear. */
float ccw(PVector p1, PVector p2, PVector p3) {
  return (p2.x - p1.x) * (p3.y - p1.y)
    - (p2.y - p1.y) * (p3.x - p1.x);
}  



 
 
