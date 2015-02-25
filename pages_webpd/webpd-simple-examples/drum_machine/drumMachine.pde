
color colorBackground = color (50);
color colorFront = color (0, 53, 123);
color colorHighlight = color (205,50);

int textSize = 18;

Slider  ringmodS,reverbS,bpmS;
Button ringmodB,reverbB,bpmB;

int lastBpmVal = 0;

boolean releasedEvent=false;


void setup() {
  size(docW, docH);
  frameRate(30);
  background(1);
  smooth();

  bpmS = new Slider(150, height/2+50, 200, 25, 250, 800, colorBackground, colorFront, colorHighlight, " ");
  ringmodS = new Slider(150, height/2+120, 200, 25, 0, 100, colorBackground, colorFront, colorHighlight, " ");
  reverbS = new Slider(150, height/2+200, 200, 25, 0, 100, colorBackground, colorFront, colorHighlight, " ");

  bpmB = new Button(75, height/2+50, 25, colorBackground, colorFront, colorHighlight, " hello ");
  ringmodB = new Button(75, height/2+120, 25, colorBackground, colorFront, colorHighlight, " hello ");
  reverbB = new Button(75, height/2+200, 25, colorBackground, colorFront, colorHighlight, " ");
}

void draw() {
  
  background(1); 
  fill(205);
  text("Tempo",25,height/2+50);
  text("Ring Modulation",25,height/2+110);
  text("Reverberation",25,height/2+180);

  bpmS.interact();
  bpmS.display();
  float newBpmS = bpmS.getValue();
  patch.send("pjs_bpm", newBpmS);
  //println(newBpmS);


  ringmodS.interact();
  ringmodS.display();
  float newRingS = ringmodS.getValue();
  patch.send("pjsringmod", newRingS);

  reverbS.interact();
  reverbS.display();
  float newRevS = reverbS.getValue();
  patch.send("pjsreverb", newRevS);

  bpmB.interact();
  bpmB.display();
  int newAutoPlay = bpmB.getValue();
  if (newAutoPlay != lastBpmVal){
  patch.send("pjs_autoplay", newAutoPlay);
  lastBpmVal = newAutoPlay;
}
  //println(newAutoPlay);

  ringmodB.interact();
  ringmodB.display();
  int newRingB = ringmodB.getValue();
  patch.send("pjsringmod_on", newRingB);


  reverbB.interact();
  reverbB.display();
  int newRevB = reverbB.getValue();
  patch.send("pjsreverb_on", newRevB);


  fill(50);
  rect(0,0,docW/3,height/2,25);
  rect(docW/3,0,docW/3,height/2,25);
  rect(docW*2/3,0,docW/3,height/2,25);
  
  
  if (mouseX< docW/3 && mouseY<height/2){
     fill(180);
     rect(0,0,docW/3,height/2,25);
  }
  if (mouseX>docW/3 && mouseX<docW*2/3 && mouseY<height/2){
    fill(180);
    rect(docW/3,0,docW/3,height/2,25);
  }
  if (mouseX> docW*2/3 && mouseY<height/2){
      fill(180);
      rect(docW*2/3,0,docW/3,height/2,25);
  }

  releasedEvent= false;
}


void mousePressed(){
   if (mouseX< docW/3 && mouseY<height/2){
           patch.send("triggerS1",1);
    }

    if (mouseX>docW/3 && mouseX<docW*2/3 && mouseY<height/2){
           patch.send("triggerS2",1);
    }

    if (mouseX> docW*2/3 && mouseY<height/2){
           patch.send("triggerS3",1);
    }
}

void mouseReleased() {
  releasedEvent = true;
}


class Slider {

  int xpos, ypos, sWidth, sHeight;
  int min, max;
  float value, pos;
  color sColorB, sColorF, sColorH, currentColor;
  String label;  

  Slider( int xpos, int ypos, int sWidth, int sHeight, int min, int max, color sColorB, color sColorF, color sColorH, String label) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.sWidth = sWidth;
    this.sHeight = sHeight;
    this.min = min;
    this.max = max;
    this.sColorB = sColorB;
    this.sColorF = sColorF;
    this.sColorH = sColorH;
    currentColor = sColorF;
    value = 0.5;
    pos = map(value, min, max, xpos, xpos+sWidth);
    this.label=label;
  }

  void display() {
    pushStyle();
    pushMatrix();
    noStroke();

    translate(xpos, ypos);
    fill(sColorB);
    rect(0, 0, sWidth, sHeight, 10);
    fill(currentColor);  
    rect(0, 0, pos, sHeight, 10);
    fill(sColorB);
    text (label, 0, ypos + sHeight + textSize +5);

    popMatrix();
    popStyle();
  }

  void interact() {
    if (mouseX>xpos && mouseX<xpos+sWidth && mouseY>ypos && mouseY<ypos+sHeight) {
      currentColor = sColorH;
      if (mousePressed) {
        pos = mouseX-xpos;
        float newValue = map(pos, 0, sWidth, min, max);
        value = newValue;
      }
    }
    else {
      currentColor = sColorF;
    }
  }

  float getValue() {
    return value;
  }
}


class Button {

  int xpos, ypos, size;
  color bColorB, bColorF, bColorH, currentColor,activeColor;
  int value;
  String label;
  boolean pressed = false;

  Button(int xpos, int ypos, int size, color bColorB, color bColorF, color bColorH, String label) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.size = size;
    this.bColorB = bColorB;
    this.bColorF = bColorF;
    this.bColorH = bColorH;
    activeColor = bColorB;
    currentColor = bColorB;
    this.label = label;
  }

  void display() {
    pushMatrix();
    pushStyle();
    noStroke();
    translate (xpos, ypos);

    fill(activeColor);
    rect(0, 0, size, size, 10);
    fill(currentColor);
    rect(0, 0, size, size, 10);
    
    stroke(255);
    fill(255);
    text(label,0,ypos+size+textSize+5);

    popStyle();
    popMatrix();
  }

  void interact() {
    if (mouseX> xpos && mouseX<xpos+size && mouseY>ypos && mouseY<ypos+size) {
      currentColor = bColorH; 
      if (releasedEvent && !pressed) {
        pressed = true;
        activeColor = bColorF;
        value = 1;
      }
      else if (releasedEvent && pressed) {
        pressed = false;
        activeColor = bColorB;
        value = 0;
      }
    }
    else {
      if (pressed) {
        currentColor = bColorF;
      }
      else if (!pressed) {
        currentColor = bColorB;
      }
    }
  }

  int getValue() {
    return value;
  }
}