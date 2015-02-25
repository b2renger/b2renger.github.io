/* @pjs transparent="true"; */

color myColor = color (255, 100, 255);
int r = 25;

ArrayList myCubes;

void setup() {
  size(docW, docH, P3D);

  frameRate(30);

  background(0.75);

  smooth();

  noStroke();

  fill(255, 100, 255, 180);

  myCubes = new ArrayList();

}

void draw() {
  
  background(1); 
  
  ambientLight(224, 150, 255);

  translate(width/2, 0, -100);
  
  noStroke();
  
  beginShape(QUAD_STRIP);
  for (float i=0; i<TWO_PI;i+=PI/20) {
    float x = 230*cos(i);
    float y = 230*sin(i);

    fill(i*80, i*25, i*50, 50);
    vertex(x, 2*height/20, y);
    fill(i*25, i*5, i*75, 50);
    vertex(x, 18*height/20, y);
  }
  endShape();
  
 if (keyPressed) {
    float myHeight = map(int(key)%48, 0, 9, 9*height/10, height/10);
    int myNote =int(key)%48+60;  
    if (myNote>=60 && myNote <=82 && frameCount%8 ==0) {
      
      float scaledNote =0;
      
      if (myNote ==60){
       scaledNote = 60;
      }
      if (myNote ==61){
       scaledNote = 63;
      }
      if (myNote ==62){
       scaledNote = 65;
      }
      if (myNote ==63){
       scaledNote = 67;
      }
      if (myNote ==64){
       scaledNote = 69;
      }
      if (myNote ==65){
       scaledNote = 72;
      }
      if (myNote ==66){
       scaledNote = 75;
      }
      if (myNote ==67){
       scaledNote = 77;
      }
      if (myNote ==68){
       scaledNote = 79;
      }
      if (myNote ==69){
       scaledNote = 81;
      }

      myCubes.add(new RotatingCube(scaledNote, myHeight, myColor, 50, PI/2, -0.10, 250));
      key = 72;
    }
  }

  for (int i=0;i<myCubes.size();i++) {
    RotatingCube r = (RotatingCube) myCubes.get(i);
    if (r.destroy) {
      myCubes.remove(i);
    }
    r.update();
    r.fade();
    r.drawMe();
  }
  
}

class RotatingCube {
  float angle;
  float angleIncr;
  int radius;
  float xpos, ypos, zpos;
  color fillColor;
  int cubeSize;
  int cyclecount =0;
  float dimCol;
  boolean destroy = false;
  float note = 0;

  RotatingCube(float note0, float ypos0, color fill0, int size0, float angle0, float incr0, int radius0 ) {
    note = note0;
    angle = angle0;
    radius = radius0;
    xpos = radius*cos(angle0);
    zpos = radius*sin(angle0);
    ypos = ypos0;
    fillColor = fill0;
    cubeSize = size0;
    angleIncr = incr0;
  }

  void drawMe() {
    fill(fillColor);
    noStroke();
    pushMatrix();
    translate(xpos, ypos, zpos);
    rotateY(-angle/4);
    box(cubeSize);
    popMatrix();
  }

  void update() {
    xpos = radius*cos(angle);
    zpos = radius*sin(angle);
    angle+= angleIncr;
  }

  // function to count number of cycles, fade out color according to number of cycles and destroy object after 3 cycles
  void fade() {

    if ((xpos)>=-12 && (xpos)<=13 && (zpos)>=radius-13 && (zpos)<=radius+12) {
      cyclecount+=1;
      dimCol = map(9-cyclecount, 9,0 , 255, 0);
      fillColor = color (fillColor, dimCol);
      
      if (cyclecount == 1) {
       patch.send("note1",note);
      }
      if (cyclecount == 2) {
       patch.send("note2", note);
      }
      if (cyclecount == 3) {
       patch.send("note3", note);
      }
      if (cyclecount == 4) {
       patch.send("note4", note);
      }
      if (cyclecount == 5) {
        patch.send("note5", note);
      } 
      if (cyclecount == 6) {
       patch.send("note6", note);
      }
      if (cyclecount == 7) {
        patch.send("note7", note);
      }  
      if (cyclecount == 8) {
       patch.send("note8", note);
      }

      if (dimCol<=0) {
        destroy = true ;
      }
    }
  }
}

