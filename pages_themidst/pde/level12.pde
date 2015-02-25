// let's do some processing
Hero hero;
boolean movingOn = false;
noiseFactor = random(500);

void setup() {
  size(200, 200);
  background(0);
  strokeWeight(2);
  stroke(180);
  PVector a = new PVector(-0.3,0.525);
  PVector v = new PVector(0.0, 0.0);
  PVector l = new PVector(width/2, height/2);
  hero = new Hero(a, v, l);
}

void drawVector(PVector v, PVector loc, float scayl) {
  pushMatrix();
  float arrowsize = 4;
  // Translate to location to render vector
  translate(loc.x,loc.y);
  stroke(0);
  // Call vector heading function to get direction (note that pointing up is a heading of 0) and rotate
  rotate(v.heading2D());
  // Calculate length of vector & scale it to be bigger or smaller if necessary
  float len = v.mag()*scayl;
   leng = map(len, 15,40, 0.0, 0.10);
  patch.send("pdnoisevol",leng);
  // Draw three lines to make an arrow (draw pointing up since we've rotate to the proper direction)
  stroke(255);
  strokeWeight(1);
  line(0,0,len,0);
  line(len,0,len-arrowsize,+arrowsize/2);
  line(len,0,len-arrowsize,-arrowsize/2);
  popMatrix();
}

void draw() {
	// background(0);
	noStroke();
	fill(0,25);
	rect(0,0,200,200);
	
	PVector gravity = new PVector(map(noise(noiseFactor,50),0,1,-1,2),map(noise(noiseFactor,200),0,1,-2,1));
	noiseFactor += 0.005;
	hero.applyForce(gravity);
	
	for (int i =25; i< width; i+=50){
		for(int j=25; j< height;j+=50){
			PVector center = new PVector(i,j);
			drawVector(gravity,center,500);
		}
	}
 
	float c = -0.23;                            // Drag coefficient
	PVector heroVel = hero.getVel();              // Velocity of our thing
	PVector force = PVector.mult(heroVel, c);   // Following the formula
	hero.applyForce(force);                        // Adding the force to our object, which will ultimately affect its acc
  
  // Run the Thing object
	if (movingOn== false){
	hero.makeAppear();
	}
	else {
	patch.send("pjsquit",0);
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
		float factor = 0.045;  // Magnitude of Acceleration (not increasing it right now)
		diff.mult(factor);
		//object accelerates towards mouse
		hero.setAcc(diff);
	} 	
	else {
		hero.setAcc(new PVector(0, 0));
	}
	
	// boundaries
	if (hero.loc.x<5){
		PVector newV = hero.getVel();
		newV.x*=-1;
		hero.setVel(newV);
		patch.send("pjstick","bang");
	}		
	if (hero.loc.y<25){
		movingOn = true;
		hero.makeDisappear();
		if (hero.alph<10){
			patch.stop();
			popUp(6);
			closeWindows(12);
		}
	}
	if (hero.loc.x>175){
		movingOn = true;
		hero.makeDisappear();
		if (hero.alph<10){
			patch.stop();
			popUp(13);
			closeWindows(12);
		}
	}
	if (hero.loc.y>195){
		PVector newV = hero.getVel();
		newV.y*=-1;
		hero.setVel(newV);
		patch.send("pjstick","bang");
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
}

