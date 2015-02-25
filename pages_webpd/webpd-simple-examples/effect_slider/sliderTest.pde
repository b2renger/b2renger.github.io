color colorBackground = color (150);
color colorFront = color (0, 53, 123);
color colorHighlight = color (205);



int textSize = 18;

Slider  mySlider;


void setup() {
  size(docW, docH);
  smooth();
  background(0);
 
  mySlider = new Slider(10, 10, 150, 50, 0, 100, colorBackground, colorFront, colorHighlight, "mySlider");
}

void draw() {
  background(0);

  mySlider.interact();
  mySlider.display();

  float ringMod = mySlider.getValue();
  patch.send("ringmod",ringMod);

  
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
    text (label, xpos, sHeight + textSize +5);

    popMatrix();
    popStyle();
  }

  void interact() {
    if (mouseX>xpos && mouseX<xpos+sWidth && mouseY>ypos && mouseY<ypos+sHeight) {
      currentColor = sColorH;
      if (mousePressed) {
        pos = mouseX;
        float newValue = map(pos, xpos, xpos+sWidth, min, max);
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

