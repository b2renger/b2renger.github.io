
void setup() {
  size(docW, docH);
  frameRate(30);
  background(1);
  smooth();
}

void draw() {
  
  background(1); 
	
  if (mouseX< docW/3){
     fill(180);
     rect(0,0,docW/3,height,25);
  }
  if (mouseX>docW/3 && mouseX<docW*2/3){
    fill(180);
    rect(docW/3,0,docW/3,height,25);
  }
  if (mouseX> docW*2/3){
      fill(180);
      rect(docW*2/3,0,docW/3,height,25);
  }

}

void mousePressed(){
   if (mouseX< docW/3){
           patch.send("triggerS1",1);
           
    }

    if (mouseX>docW/3 && mouseX<docW*2/3){
           patch.send("triggerS2",1);
    }

    if (mouseX> docW*2/3){
           patch.send("triggerS3",1);
    }
}
