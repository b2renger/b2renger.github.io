

// counter for polyphony
int counter = 1;
int numvoice = 8;
color currentcolor;

ArrayList balls;

float gravity = 0.0;

void setup() {
  frameRate(24);
  size(docW, docH);
  smooth();
  frameRate(35);
  balls = new ArrayList();
 // pd = new Pd(44100, 200);
  //pd.load("sound.pd", pd.play);
}

void draw() {
  //motion blur
  fill(0, 75);
  rect(0, 0, docW, docH);


  //update for mouse interaction
  update(mouseX, mouseY); 

  // animate balls
  for (int i=0; i<balls.size(); i++) {
    Ball ball = (Ball) balls.get(i);

    ball.display();
    ball.bounce();


    if (ball.bounced) {
      float noteMap = map(ball.x, 0, docW, 48, 96);
      float midiNote = m2f(noteMap); 
      //println (ball.bounced + "," +midiNote);

      // polyphony stuff 
      for (int j=1; j<=numvoice; j++) {
        switch(counter) {
        case 1 :
          patch.send("note1", midiNote);
          break;
        case 2 :
          patch.send("note2", midiNote);
          break;
        case 3 :
          patch.send("note3", midiNote);
          break;
        case 4 :
          patch.send("note4", midiNote);
          break;
        case 5 :
          patch.send("note5", midiNote);
          break;
        case 6 :
          patch.send("note6", midiNote);
          break;
        case 7 :
          patch.send("note7", midiNote);
          break;
        case 8 :
          patch.send("note8", midiNote);
          break;
        case 9 :
          //pd.send("note9", note);
          break;
        case 10 :
          //pd.send("note10", note);
          break;
        case 11 :
          //pd.send("note11", note);
          break;
        case 12 :
          //pd.send("note12", note);
          break;
          //println("note"+i+"sent"+note);
        }
        counter++;
        if (counter>numvoice) {
          counter = 1;
        }
      }
    }
  }
  }

  ///////////////////////////////////////////
  // method :convert midi notes to frequency
  float m2f (float x) {
    x = 440 * pow (2, (x-69)/12);
    return x;
  }

  ////////////////////////////////////////////////////////////
  // method to update objects according to mouse interactions
  void update(int x, int y) {
    
    if (mousePressed && mouseButton == LEFT) {       
      balls.add(new Ball(mouseX, mouseY));
      }
      
     else if (mousePressed && mouseButton == RIGHT) {   
        for (int i=0; i<balls.size(); i++) {
          balls.remove(i);
        }
      }   
    }


  //////////////////////////////
  // class ball
  class Ball {
    float x;
    float y;
    float w;
    float bounceH;
    float speed;
    boolean bounced;

    Ball(float tempX, float tempY) {
      x = tempX;
      y = tempY;
      bounceH = tempY;
      w =35;
      speed = 5;
      bounced = false;
    }

    void display() {
      noStroke();
      fill(255);
      ellipseMode(CENTER);
      ellipse(x, y, w, w);
    }

    void bounce() {
      bounced = false;
      y = y + speed;
      speed = speed + gravity;

      if ((y > docH-w)|| (y ==0)) {
        speed =speed *-1;
        bounced = true;
      }
      if ((y < bounceH-w)|| (y ==0)) {
        speed =speed *-1;
      }
    }
  }

