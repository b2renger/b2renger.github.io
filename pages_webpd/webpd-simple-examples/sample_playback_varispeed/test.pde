float mX =0;
float mY =0;

void setup() {
  size(docW, docH);
  frameRate(30);
  background(1);
  smooth();
  stroke(255,180);
  strokeWeight(4);
  strokeCap(ROUND);
}

void draw() {
  
  background(1); 
	mX = map(mouseX,0,docW,-1,1);
  mY = map(mouseY,0,docH,0,1);

  //println(mX);

  line(docW/2,docH/2,mouseX,mouseY);
  
  patch.send("pjsspeed",mX);
  patch.send("pjsvol",mY);
  
}
