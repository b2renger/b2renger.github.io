// change the looks
// sliders : pdoofreq - pdoovol / pdppfreq - pdppvol / pdopfreq - pdopvol / pdpofreq - pdpovol /
// pdindex - pd ratio

int anim_lenght = 24;
int currentFrame = 0;
int lastTime = 0;
int counter =0;
PImage[] frames = new PImage[anim_lenght];

int [] xPos = new int[anim_lenght];
int [] yPos = new int[anim_lenght];

// oo = osc osc , pp = phasor phasor
HScrollbar oofreq, oovol;
HScrollbar ppfreq, ppvol; 
HScrollbar opfreq, opvol; 
HScrollbar pofreq, povol; 
HScrollbar index, ratio; 

float pdoofreq, pdoovol, pdppfreq, pdppvol, pdopfreq, pdopvol, pdpofreq, pdpovol, pdindex, pdratio;

color ecolor;

void setup() {
  size(320, 460);
  frameRate(30);
  strokeWeight(1);
  smooth();
  background(222);
  rect (0, 300, width, 300);

  for (int i = 0; i < frames.length; i++) {
    frames[i] = get();
   pushStyle();
  fill(0);
  rect (0, 300, width, 300); 
  popStyle();
  }

 

  oofreq = new HScrollbar(10, 320, 100, 15, 16);
  oovol = new HScrollbar(170, 320, 100, 15, 16);
  ppfreq = new HScrollbar(10, 350, 100, 15, 16);
  ppvol = new HScrollbar(170, 350, 100, 15, 16);
  opfreq = new HScrollbar(10, 380, 100, 15, 16);
  opvol = new HScrollbar(170, 380, 100, 15, 16);
  pofreq = new HScrollbar(10, 410, 100, 15, 16);
  povol = new HScrollbar(170, 410, 100, 15, 16);
  index = new HScrollbar(10, 440, 100, 15, 16);
  ratio = new HScrollbar(170, 440, 100, 15, 16);
}


void draw() {
  int currentTime = millis();
  pushStyle();
  fill(0);
  rect (0, 300, width, 300);
  popStyle();
  if (currentTime > lastTime+100) {
    nextFrame();
    lastTime = currentTime;
    counter +=1;
    if (counter >anim_lenght-1) { 
      counter =0;
    }
  }

  if (mousePressed == true && mouseY<300) {
    pushStyle();
    //colorMode(HSB);
    //ecolor = color (random(255), 255, 255, 150);
    //fill(ecolor);
    //stroke(0, 50);
    ellipse (mouseX, mouseY, 10, 10);
    popStyle();
    xPos[counter] = mouseX;
    yPos[counter] = mouseY;
  } 

  int ex = xPos[counter];
  int wy = yPos[counter];

  ex = floor(map(ex, 0, width, 1000, 10000));
  wy = floor(map(wy, 0, height, 1000, 10000));

patch.send("pdx", ex);
 patch.send("pdy", wy);

  //pntln(ex+"  "+wy);

  // sliders update and display
  oofreq.update();
  oofreq.display();
  oovol.update();
  oovol.display();
  ppfreq.update();
  ppfreq.display();
  ppvol.update();
  ppvol.display();
  opfreq.update();
  opfreq.display();
  opvol.update();
  opvol.display();
  pofreq.update();
  pofreq.display();
  povol.update();
  povol.display();
  index.update();
  index.display();
  ratio.update();
  ratio.display();

  text("freq-oo", 120, 325);
  text("vol-oo", 280, 325);

  text("freq-pp", 120, 355);
  text("vol-pp", 280, 355);

  text("freq-op", 120, 385);
  text("vol-op", 280, 385);

  text("freq-po", 120, 415);
  text("vol-po", 280, 415);

  text("index", 120, 445);
  text("ratio", 280, 445);

  //sliders get values and send to pd
  pdoofreq = map(oofreq.getPos(), 10, 110, 50, 500);
  patch.send("pdoofreq", pdoofreq);
  pdoovol = map(oovol.getPos(), 10, 110, 0, 1);
  patch.send("pdoovol", pdoovol);
  pdppfreq = map(ppfreq.getPos(), 10, 110, 50, 500);
  patch.send("pdppfreq", pdppfreq);
  pdppvol = map(ppvol.getPos(), 10, 110, 0, 1);
  patch.send("pdppvol", pdppvol);
  pdopfreq = map(opfreq.getPos(), 10, 110, 50, 500);
  patch.send("pdopfreq", pdopfreq);
  pdopvol = map(opvol.getPos(), 10, 110, 0, 1);
  patch.send("pdopvol", pdopvol);
  pdpofreq = map(pofreq.getPos(), 10, 110, 50, 500);
  patch.send("pdpofreq", pdpofreq);
  pdpovol = map(povol.getPos(), 10, 110, 0, 1);
  patch.send("pdpovol", pdpovol);
  pdindex = map(index.getPos(), 10, 110, 1, 100);
  patch.send("pdindex", pdindex);
  pdratio = map(ratio.getPos(), 10, 110, 0, 1);
  patch.send("pdratio", pdratio);
  // println(pdoofreq);
  
}

void nextFrame() {
  frames[currentFrame] = get(); // Get the display window
  currentFrame++; // Increment to next frame
  if (currentFrame >= frames.length) {
    currentFrame = 0;
  }
  image(frames[currentFrame], 0, 0);
}

class HScrollbar {
  int swidth, sheight;    // width and height of bar
  float xpos, ypos;       // x and y position of bar
  float spos, newspos;    // x position of slider
  float sposMin, sposMax; // max and min values of slider
  int loose;              // how loose/heavy
  boolean over;           // is the mouse over the slider?
  boolean locked;
  float ratio;


  HScrollbar (float xp, float yp, int sw, int sh, int l) {
    swidth = sw;
    sheight = sh;
    int widthtoheight = sw - sh;
    ratio = (float)sw / (float)widthtoheight;
    xpos = xp;
    ypos = yp-sheight/2;
    spos = xpos + swidth/2 - sheight/2;
    newspos = spos;
    sposMin = xpos;
    sposMax = xpos + swidth - sheight;
    loose = l;
  }

  void update() {
    if (overEvent()) {
      over = true;
    } 
    else {
      over = false;
    }
    if (mousePressed && over) {
      locked = true;
    }
    if (!mousePressed) {
      locked = false;
    }
    if (locked) {
      newspos = constrain(mouseX-sheight/2, sposMin, sposMax);
    }
    if (abs(newspos - spos) > 1) {
      spos = spos + (newspos-spos)/loose;
    }
  }

  float constrain(float val, float minv, float maxv) {
    return min(max(val, minv), maxv);
  }

  boolean overEvent() {
    if (mouseX > xpos && mouseX < xpos+swidth &&
      mouseY > ypos && mouseY < ypos+sheight) {
      return true;
    } 
    else {
      return false;
    }
  }

  void display() {
    pushStyle();
    noStroke();
    fill(204);
    rect(xpos, ypos, swidth, sheight);
    if (over || locked) {
      fill(0, 0, 0);
    } 
    else {
      fill(102, 102, 102);
    }
    rect(spos, ypos, sheight, sheight);

    popStyle();
  }

  float getPos() {
    // Convert spos to be values between
    // 0 and the total width of the scrollbar
    return spos * ratio;
  }
}



