// let's do some processing
Hero hero;
ArrayList miniheroes;

boolean movingOn = false;

void setup() {
  size(200, 200);
  background(0);
  strokeWeight(2);
  stroke(180);
  PVector a = new PVector(0.0, 0.0);
  PVector v = new PVector(0.0, 0.0);
  PVector l = new PVector(width/2, height/2);
  hero = new Hero(a, v, l,20);
  
  miniheroes = new ArrayList();
  for( int i = 0 ; i <5 ; i++){
  
  PVector amh = new PVector(0.0, 0.0);
  PVector vmh = new PVector(0.0, 0.0);
  PVector lmh = new PVector(random(10,90),random(10,height-10));
  
  
	 
  miniheroes.add(new Hero(amh,vmh,lmh,5));
  
  }
  
  
}

void draw() {
  background(0);
  
  float c = -0.23;                            // Drag coefficient
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
  
  
  
  for (int i=0; i<miniheroes.size() ;i++){
  Hero mh = (Hero) miniheroes.get(i);
  float c2 = -0.03;                            // Drag coefficient
  PVector mhVel = mh.getVel();              // Velocity of our thing
  PVector force2 = PVector.mult(mhVel, c2);   // Following the formula
  mh.applyForce(force2);      
  
  mh.makeAppear();
  mh.go();
  // go towards ou hero
  PVector heroPos = new PVector(hero.loc.x, hero.loc.y);
    PVector diff2 = PVector.sub(heroPos, mh.getLoc());
    diff2.normalize();
    float factor = 0.05;  // Magnitude of Acceleration (not increasing it right now)
    diff2.mult(factor);
    //object accelerates towards mouse
    mh.setAcc(diff2);

  // borders
  if (mh.loc.x<5){
    PVector newV = mh.getVel();
    newV.x*=-1;
    mh.setVel(newV);
  }
  if (mh.loc.y<5){
   PVector newV = mh.getVel();
    newV.y*=-1;
    mh.setVel(newV);
    
  }
  if (mh.loc.x>195){
   PVector newV = mh.getVel();
    newV.x*=-1;
    mh.setVel(newV);
  
  }
  if (mh.loc.y>195){
   PVector newV = mh.getVel();
    newV.y*=-1;
    mh.setVel(newV);
  }
  
  hero.collideEqualMass(mh);
  
  }

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
  // boundaries
  if (hero.loc.x<8){
    movingOn = true;
	hero.makeDisappear();
	if (hero.alph<10){
	popUp(4);
	//closeWindows(5);
	}
  
  }
  if (hero.loc.y<5){
    PVector newV = hero.getVel();
    newV.y*=-1;
    hero.setVel(newV);
	patch.send("pjstick",0);
  }
  if (hero.loc.x>195){
  PVector newV = hero.getVel();
    newV.x*=-1;
    hero.setVel(newV);
	patch.send("pjstick",0);
  }
  if (hero.loc.y>185){
  movingOn = true;
	hero.makeDisappear();
	if (hero.alph<10){
	popUp(11);
	//closeWindows(5);
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
  float diameter ;
  float sDist;
  float tweenfactor=0;
  float cellS, cellS2;
  // to makeAppear() and makeDisAppear()
  float alph = 0;
  //collinding
   boolean colliding = false;

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
  
  // collision
  void collideEqualMass(Hero other) {
    float d = PVector.dist(loc,other.loc);
    float sumDiam = diameter/2 + other.diameter/2;
    // Are they colliding?
    if (!colliding && d < sumDiam) {
      // Yes, make new velocities!
      colliding = true;
	  patch.send("pjstouched",0);
      // Direction of one object another
      PVector n = PVector.sub(other.loc,loc);
      n.normalize();

      // Difference of velocities so that we think of one object as stationary
      PVector u = PVector.sub(vel,other.vel);

      // Separate out components -- one in direction of normal
      PVector un = componentVector(u,n);
      // Other component
      u.sub(un);
      // These are the new velocities plus the velocity of the object we consider as stastionary
      vel = PVector.add(u,other.vel);
      other.vel = PVector.add(un,other.vel);
    } 
    else if (d > sumDiam) {
      colliding = false;
    }
  }
}
PVector componentVector (PVector vector, PVector directionVector) {
  //--! ARGUMENTS: vector, directionVector (2D vectors)
  //--! RETURNS: the component vector of vector in the direction directionVector
  //-- normalize directionVector
  directionVector.normalize();
  directionVector.mult(vector.dot(directionVector));
  return directionVector;
}
