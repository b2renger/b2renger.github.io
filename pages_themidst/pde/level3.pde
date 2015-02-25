// let's do some processing
Hero hero;
Hero bumper;

boolean movingOn = false;

void setup() {
  size(200, 200);
  background(0);
  strokeWeight(2);
  stroke(180);
  PVector a = new PVector(0.0, 0.0);
  PVector v = new PVector(0.0, 0.0);
  PVector l = new PVector(width/2, height/2);
  hero = new Hero(a, v, l,20,20,0);
  
PVector amh = new PVector(-10.0, 0.0);
  PVector vmh = new PVector(-100.0, 0.0);
  PVector lmh = new PVector(100,50);
	
	agent = new Hero(amh,vmh,lmh,50,1500,PI);
	agent2 = new Hero(amh,vmh,lmh,50,1500,TWO_PI);
	agent3 = new Hero(amh,vmh,lmh,50,1500,PI/2);
	agent4 = new Hero(amh,vmh,lmh,50,1500,3*PI/2);
    
}

void draw() {
noStroke();
  fill(0,20);
  rect(0,0,width,height);
  
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
  
	agent.makeAppear();
	agent.goAgent();
	agent.transport(hero);
	
	agent2.makeAppear();
	agent2.goAgent();
	agent2.transport(hero);
	
	agent3.makeAppear();
	agent3.goAgent();
	agent3.transport(hero);
	
	agent4.makeAppear();
	agent4.goAgent();
	agent4.transport(hero);
	
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
  
  // boundaries
  if (hero.loc.x<25){
	movingOn = true;
	hero.makeDisappear();
	if (hero.alph<10){
	popUp(2);
	
	}
  
 
  }
  
  if (hero.loc.y<5){
    PVector newV = hero.getVel();
    newV.y*=-1;
    hero.setVel(newV);
	patch.send("pjstick",0);
  }
  if (hero.loc.x>190){
	movingOn = true;
	hero.makeDisappear();
	if (hero.alph<10){
	popUp(4);
	
	}
  }
  if (hero.loc.y>190){
  movingOn = true;
	hero.makeDisappear();
	if (hero.alph<10){
	popUp(9);
	
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
  //colliding
   boolean colliding = false;
   float noiseFactor;
   // circular motion
   float angle;


  //The Constructor (called when the object is first created)
  Hero(PVector a, PVector v, PVector l, float diam, float mass0,float angle0) {
    acc = a;
    vel = v;
    loc = l;
    maxvel = 4;
    mass = 20;
	diameter = diam;
	mass=mass0;
	noiseFactor= random(500);
	angle=angle0;
  }
  //main function to operate object
  void go() {
    update();  
	 tween(); // change appearance while moving
    render();
  }
  
  void goAgent(){
	//update();
	angle+=0.025;
	loc.x = cos(angle)*80+width/2;
	loc.y = sin(angle)*80+height/2;
	//cellS2 = random(-10,10);
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
  void transport (Hero other) {
    float d = PVector.dist(loc,other.loc);
    float sumDiam = diameter/2 + other.diameter/2;
    // Are they colliding?
    if (!colliding && d < sumDiam) {
      // Yes, make new velocities!
      colliding = true;
	  patch.send("pjstouched",0);
	  
    } 
    else if (d > sumDiam) {
      colliding = false;
    }
	if (colliding){
	//movingOn = true;
	
	//makeDisappear();
	//if (hero.alph<10){
	int goTo = (int)random(17);
	hero.setAcc(new PVector(0, 0));
	hero.setVel(new PVector(0, 0));
	hero.loc.x = width/2;
	hero.loc.y = height/2;
		//closeWindows(3);
		//popUp(3);
		//movingOn = false;
	colliding=false;
	//}
	
	
		
		
		
	  
	  
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

