// a table  and a noise  to create a landscape
float ylim[] = new float[docW];
float noisef ;
// a collection of snowflakes objects
ArrayList snowflakes;
// counter for polyphony
int counter = 1;
int numvoice = 8;


void setup() {
  size(docW, docH);
  background(0);
  smooth();
  // actually create the landscape by populating the array
  ylim[0] = random(docH);
  noisef = ylim[0];
  populate_array();
  /* //debugging landscape
   for (int i =0; i<width ; i++) {
   println (ylim[i]);
   }*/
  // array of snowflakes
  snowflakes = new ArrayList();  
}

void draw() {
  // add snowflakes to array list according to a probability
  // and trigger a sound
  float prob = random(100);
  if (prob<2.5) {
    float xPos = random (width);
    snowflakes.add(new SnowFlake(xPos, 0));
    // sendNote2pd();
    // map xposition to a midi scale
    float nMap = map (xPos, 0, width, 60, 96);
    // round it up keeping it as float
    float note = floor (nMap);
    // transform it to freq using custom fucntion
    note = m2f(note);
    // send note to pd
    for (int i=0; i<numvoice; i++) {
      switch(counter) {
      case 1 :
        patch.send("note1", note);
        break;
      case 2 :
        patch.send("note2", note);
        break;
      case 3 :
        patch.send("note3", note);
        break;
      case 4 :
        patch.send("note4", note);
        break;
      case 5 :
        patch.send("note5", note);
        break;
      case 6 :
        patch.send("note6", note);
        break;
      case 7 :
        patch.send("note7", note);
        break;
      case 8 :
        patch.send("note8", note);
        break;
      case 9 :
        patch.send("note9", note);
        break;
      case 10 :
        patch.send("note10", note);
        break;
      case 11 :
        patch.send("note11", note);
        break;
      case 12 :
        patch.send("note12", note);
        break;
      }
    }
    counter++;
    if (counter>numvoice) {
      counter = 1;
    }
    //println(counter);
  }
  // if too much snowflakes make some space
  if (snowflakes.size()> 750) {
    snowflakes.remove(0);
  }
  // for all snowflakes do ...
  for (int i=0; i < snowflakes.size() ; i ++) {
    SnowFlake sf = (SnowFlake) snowflakes.get(i);
    // get position
    float xpos = sf.getX();
    float ypos = sf.getY();
    int index = round(xpos);
    // get y lim according to position 
    float ylimpos = ylim[index];
    // limit ypos and draw
    if (ypos >ylimpos) {
      sf.y = ylimpos ;
      sf.draw_sf();
    } 
    // updat ypos and draw
    else if (ypos<ylimpos) {
      sf.update_sfy();
      sf.update_sfx();
      
    }
    sf.draw_sf();
  }
}
///////////////////////////////////////
// make a landscape with a perlin noise
void populate_array() {
  for (int i =0 ; i< docW ; i++) {
    float addy = height/3+noise(noisef,10)*height;
    ylim[i] = addy;
    noisef += 0.013;
  }
}
/////////////////////////////////////
// convert midi notes to frequency
float m2f (float x) {
  x = 440 * pow (2, (x-69)/12);
  return x;
}

////////////////////
// object
class SnowFlake {
  float x, y;
  float noiseF=0;
  // simple constructor
  SnowFlake (float x0, float y0) {
    x = x0;
    y = y0;
  }
  // draw and update
  void draw_sf () {
    pushStyle();
    noStroke();
    fill(255, 15);
    ellipse(x, y, random(1, 3), random(1, 3));
    popStyle();
  }
  void update_sfy() {
    y = y+ 0.55;
  }
  void update_sfx() {
    x =x +map(noise(noiseF,random(200), random(200)),0,1,-2.5,3);
    noiseF += 0.023;
  }
  // get position
  float getX() {
    return x;
  }
  float getY() {
    return y;
  }
}

