// arrayList
// class Floor and orthogonal sticky collision 
// detereministic timing of event using frameCount

// inverse flux when commin from top or bottom ? store position of the hero at the end of this case
// and restore it in cases above and below as initializing position for the hero.




Hero hero;
ArrayList floors;
boolean movingOn = false;

void setup() {
  size(200, 200);
  background(0);
  strokeWeight(2);
  stroke(180);
  
  PVector a = new PVector(0.0, 0.125);
  PVector v = new PVector(0.0, 0.0);
  PVector l = new PVector(width/2, height/2);
  
  hero = new Hero(a, v, l,20);
  floors = new ArrayList();
  floors.add(new Floor(hero, 25));
  floors.add(new Floor(hero ,75));
  floors.add(new Floor(hero ,125));
  floors.add(new Floor(hero ,175));
}


void draw() {
  
  background(0);
  
  float c = -0.23;                            // Drag coefficient
  PVector heroVel = hero.getVel();              // Velocity of our thing
  PVector force = PVector.mult(heroVel, c);   // Following the formula
  hero.applyForce(force);                        // Adding the force to our object, which will ultimately affect its acc
  
  // Run the hero object
  if (!movingOn){
  hero.makeAppear();
  }
  else {
	patch.send("pjsquit","bang");
  }
  hero.go();
  
  if (frameCount%85>83){
     floors.add(new Floor(hero,height-5));
  }
  
  for (int i=0 ; i< floors.size() ; i++){
    Floor f = (Floor) floors.get(i);
    f.display();
    f.collide(hero);
    
    if (f.ypos<0){
     floors.remove(i); 
    }
  }
	
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
  
  if (hero.loc.x<5){
    PVector newV = hero.getVel();
    newV.x*=-1;
    hero.setVel(newV);
	patch.send("pjstick",0);
  }
  
  if (hero.loc.x>195){
    PVector newV = hero.getVel();
    newV.x*=-1;
    hero.setVel(newV);
	patch.send("pjstick",0);
  }
  
  if (hero.loc.y<15){
    movingOn = true;
    hero.makeDisappear();
    if (hero.alph<10) {
      popUp(5);
	  closeWindows(11);
    }
  }
  
  if (hero.loc.y>185){
    movingOn = true;
    hero.makeDisappear();
    if (hero.alph<10) {
      popUp(17);
	  closeWindows(11);
    }
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
  Hero(PVector a, PVector v, PVector l, float diam) {
    acc = a;
    vel = v;
    loc = l;
    maxvel = 4;
    mass = 20;
    diameter = diam;
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
    fill(175,alph);
    tween(); // change appearance while moving
  
    ellipse(loc.x, loc.y, diameter -cellS, diameter +cellS2);
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
    if (sDist>75){
      tweenfactor+=0.3;
    }
    else {
      tweenfactor+= map(sDist, 0,75,0.09,0.25);
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
    alph = constrain(alph,0,180);
  }
  void makeDisappear() {
    alph-=10;
    alph = constrain(alph,0,180);
  }
}


class Floor{
  
  float ypos;
  float x1Gap,x2Gap;
  
  
  
  
  Floor(Hero h, float y0){
    ypos = y0;  
    while ((x2Gap-x1Gap)<h.diameter+5 || (x2Gap-x1Gap)>h.diameter*2){
      x1Gap= random (0, width);
      x2Gap = random (0,width);
      
    }
    float dif = x2Gap-x1Gap;
    
     
  }
  
  void display(){
    pushStyle();
    stroke(255);
    strokeWeight(4);
    line (0,ypos,x1Gap,ypos);
    line(x2Gap,ypos,width,ypos);
    popStyle();  
    ypos-=0.5;
  }
  
  void collide(Hero h){
    if(h.loc.y > ypos-h.diameter && h.loc.y < ypos){
      if (h.loc.x-h.diameter/2<x1Gap || h.loc.x+h.diameter/2>x2Gap){
        h.loc.y = ypos-h.diameter/2;
      }
    }
    
  }
  
  
  
}




