/* @pjs preload="photos/plan-campus-netoyage.png"; */
/* @pjs preload="photos/photo1.jpg"; */
/* @pjs preload="photos/photo2.jpg"; */
/* @pjs preload="photos/photo3.jpg"; */
/* @pjs preload="photos/photo4.jpg"; */
/* @pjs preload="photos/photo5.jpg"; */
/* @pjs preload="photos/photo6.jpg"; */
/* @pjs preload="photos/logoElectronik.png"; */

/* @pjs font = "fonts/Decker.ttf,"fonts/DeckerB.ttf"; */

// some generic colors for the app
color colorBackground = color (95);
color colorBackground2 = color (255,120,120);
color colorFront = color (153, 217, 234);
color colorFront2 = color (153, 255, 153);

color colorHighlight = color (255, 75);

// some variables
int textSize = 18;
boolean releasedEvent=false;

// back of the app
PImage back,logo;

// anchors for menus
float xpos = 625;
float ypos =350;
float guiH =16;

// for menu1
PImage thumb1;
Slider  effetS1_1, effetS2_1,effetS3_1,effetS4_1, effetS5_1,effetS6_1;
Button effetB1_1, effetB2_1,effetB3_1, effetB4_1, effetB5_1,effetB6_1;
int lastB1_1, lastB2_1,lastB3_1,lastB4_1,lastB5_1, lastB6_1 =0;
int lastS2_1=0;
boolean lastp1 = false;

// for menu2
PImage thumb2;
Slider  effetS1_2, effetS2_2,effetS3_2,effetS4_2, effetS5_2,effetS6_2;
Button effetB1_2, effetB2_2,effetB3_2, effetB4_2, effetB5_2,effetB6_2;
int lastB1_2, lastB2_2,lastB3_2,lastB4_2,lastB5_2, lastB6_2 =0;
int lastS2_2=0;
boolean lastp2 = false;


// for menu3
PImage thumb3;
Slider  effetS1_3, effetS2_3,effetS3_3,effetS4_3, effetS5_3,effetS6_3;
Button effetB1_3, effetB2_3,effetB3_3, effetB4_3, effetB5_3,effetB6_3;
int lastB1_3, lastB2_3,lastB3_3,lastB4_3,lastB5_3, lastB6_3 =0;
int lastS2_3=0;
boolean lastp3 = false;

// for menu4
PImage thumb4;
Slider  effetS1_4, effetS2_4,effetS3_4,effetS4_4, effetS5_4,effetS6_4;
Button effetB1_4, effetB2_4,effetB3_4, effetB4_4, effetB5_4,effetB6_4;
int lastB1_4, lastB2_4,lastB3_4,lastB4_4,lastB5_4, lastB6_4 =0;
int lastS2_4=0;
boolean lastp4 = false;

// for menu5
PImage thumb5;
Slider  effetS1_5, effetS2_5,effetS3_5,effetS4_5, effetS5_5,effetS6_5;
Button effetB1_5, effetB2_5,effetB3_5, effetB4_5, effetB5_5,effetB6_5;
int lastB1_5, lastB2_5,lastB3_5,lastB4_5,lastB5_5, lastB6_5 =0;
int lastS2_5=0;
boolean lastp5 = false;

// for menu6
PImage thumb6;
Slider  effetS1_6, effetS2_6,effetS3_6,effetS4_6, effetS5_6,effetS6_6;
Button effetB1_6, effetB2_6,effetB3_6, effetB4_6, effetB5_6,effetB6_6;
int lastB1_6, lastB2_6,lastB3_6,lastB4_6,lastB5_6, lastB6_6 =0;
int lastS2_6=0;
boolean lastp6 = false;

// point on the map, you can interact with them
Point p1, p2, p3, p4, p5,p6;
/*, p6, p7, p8, p9, p10;*/
Point info;
Point help;

// track last active menu (if over point )
int active_menu =0;
PFont title = createFont("fonts/DeckerB.ttf", 24);

// AUTOPLAY MODE !!!
boolean autoplay = true;
float step =3000;
int time = 0;
float noiseFactor=0.5;
float noiseStep = 0.015;
float randomNumber = random(120);
float randomNumber2 = random(120);
Button autoplayB;

//==============================================================================================
void setup() {
  size(900, 560);
  frameRate(30);
  background(1);
  smooth();
  background(255);

  back = loadImage("photos/plan-campus-netoyage.png");
  back.resize(650, 560);
  logo = loadImage("photos/logoElectronik.png");

  textFont(title);

  construct_points();

  autoplayB = new Button(50, 20, 20, colorBackground2, colorFront, colorHighlight, "  ");

  // construct lateral menus
  construct_menu1();
  construct_menu2();
  construct_menu3();
  construct_menu4();
  construct_menu5();
  construct_menu6();
  
  time = millis();
}


//=================================================================================================================
void draw() {
  //println(mouseX +" "+mouseY);
  background(255); 
  image(back, 0, 0);

  pushMatrix();
  noFill();
  stroke(0);
  strokeWeight(8);
  rect(0,0,width,height);
  popMatrix();

  autoplayB.display();
  autoplayB.interact();
  textFont(title,14);
  fill(255);
  noStroke();
  triangle (55,25,55,35,65,30);
  //text("Jeu Automatique", 72,35);

  if (autoplayB.getValue()==0){
    autoplay = false;
  }
  else if (autoplayB.getValue()==1){
    autoplay = true;
  }
 

  if (active_menu == 1) {
    display_menu1();
    //releasedEvent= false;
  }
  else if (active_menu == 2) {
    display_menu2();
    //releasedEvent= false;
  }
  else if (active_menu == 3) {
    display_menu3();
    //releasedEvent= false;
  }
  else if (active_menu == 4) {
    display_menu4();
    //releasedEvent= false;
  }
  else if (active_menu == 5) {
    display_menu5();
    //releasedEvent= false;
  }
   else if (active_menu == 6) {
    display_menu6();
    
   
  }
  
  interact_points(); 
  releasedEvent= false;
  if (autoplay){
 
  noiseFactor += noiseStep;

  if(active_menu == 1){
    float target = noise(noiseFactor,10,20);
    if (randomNumber2 < 20) {
      effetS1_1.setValue(target);
    }
    else if (randomNumber2>20 && randomNumber2<40 && effetB2_1.getValue()==1){
      effetS2_1.setValue(target);
    }
    else if (randomNumber2>40 && randomNumber2<60  && effetB3_1.getValue()==1){
      effetS3_1.setValue(target);
    }
    else if (randomNumber2>60 && randomNumber2<80 && effetB4_1.getValue()==1){
      effetS4_1.setValue(target);
    }
    else if (randomNumber2>80 && randomNumber2<100  && effetB5_1.getValue()==1){
      effetS5_1.setValue(target);
    }
    else if (randomNumber2>100 && randomNumber2<120  && effetB6_1.getValue()==1){
      effetS6_1.setValue(target);
    }
  }

  if(active_menu == 2){
    float target = noise(noiseFactor,10,20);
    if (randomNumber2 < 20) {
      effetS1_2.setValue(target);
    }
    else if (randomNumber2>20 && randomNumber2<40  && effetB2_2.getValue()==1){
      effetS2_2.setValue(target);
    }
    else if (randomNumber2>40 && randomNumber2<60  && effetB3_2.getValue()==1){
      effetS3_2.setValue(target);
    }
    else if (randomNumber2>60 && randomNumber2<80  && effetB4_2.getValue()==1){
      effetS4_2.setValue(target);
    }
    else if (randomNumber2>80 && randomNumber2<100  && effetB5_2.getValue()==1){
      effetS5_2.setValue(target);
    }
    else if (randomNumber2>100 && randomNumber2<120  && effetB6_2.getValue()==1){
      effetS6_2.setValue(target);
    }
  }

  if(active_menu == 3){
    float target = noise(noiseFactor,10,20);
    if (randomNumber2 < 20) {
      effetS1_3.setValue(target);
    }
    else if (randomNumber2>20 && randomNumber2<40  && effetB2_3.getValue()==1){
      effetS2_3.setValue(target);
    }
    else if (randomNumber2>40 && randomNumber2<60  && effetB3_3.getValue()==1){
      effetS3_3.setValue(target);
    }
    else if (randomNumber2>60 && randomNumber2<80 && effetB4_3.getValue()==1){
      effetS4_3.setValue(target);
    }
    else if (randomNumber2>80 && randomNumber2<100 && effetB5_3.getValue()==1){
      effetS5_3.setValue(target);
    }
    else if (randomNumber2>100 && randomNumber2<120  && effetB6_3.getValue()==1){
      effetS6_3.setValue(target);
    }
  }

  if(active_menu == 4){
    float target = noise(noiseFactor,10,20);
    if (randomNumber2 < 20) {
      effetS1_4.setValue(target);
    }
    else if (randomNumber2>20 && randomNumber2<40  && effetB2_4.getValue()==1){
      effetS2_4.setValue(target);
    }
    else if (randomNumber2>40 && randomNumber2<60  && effetB3_4.getValue()==1){
      effetS3_4.setValue(target);
    }
    else if (randomNumber2>60 && randomNumber2<80  && effetB4_4.getValue()==1){
      effetS4_4.setValue(target);
    }
    else if (randomNumber2>80 && randomNumber2<100  && effetB5_4.getValue()==1){
      effetS5_4.setValue(target);
    }
    else if (randomNumber2>100 && randomNumber2<120 && effetB6_4.getValue()==1){
      effetS6_4.setValue(target);
    }
  }

  if(active_menu == 5){
    float target = noise(noiseFactor,10,20);
    if (randomNumber2 < 20) {
      effetS1_5.setValue(target);
    }
    else if (randomNumber2>20 && randomNumber2<40  && effetB2_5.getValue()==1){
      effetS2_5.setValue(target);
    }
    else if (randomNumber2>40 && randomNumber2<60  && effetB3_5.getValue()==1){
      effetS3_5.setValue(target);
    }
    else if (randomNumber2>60 && randomNumber2<80  && effetB4_5.getValue()==1){
      effetS4_5.setValue(target);
    }
    else if (randomNumber2>80 && randomNumber2<100  && effetB5_5.getValue()==1){
      effetS5_5.setValue(target);
    }
    else if (randomNumber2>100 && randomNumber2<120  && effetB6_5.getValue()==1){
      effetS6_5.setValue(target);
    }
  }

  if(active_menu == 6){
    float target = noise(noiseFactor,10,20);
    if (randomNumber2 < 20) {
      effetS1_6.setValue(target);
    }
    else if (randomNumber2>20 && randomNumber2<40  && effetB2_6.getValue()==1){
      effetS2_6.setValue(target);
    }
    else if (randomNumber2>40 && randomNumber2<60  && effetB3_6.getValue()==1){
      effetS3_6.setValue(target);
    }
    else if (randomNumber2>60 && randomNumber2<80  && effetB4_6.getValue()==1){
      effetS4_6.setValue(target);
    }
    else if (randomNumber2>80 && randomNumber2<100  && effetB5_6.getValue()==1){
      effetS5_6.setValue(target);
    }
    else if (randomNumber2>100 && randomNumber2<120  && effetB6_6.getValue()==1){
      effetS6_6.setValue(target);
    }
  }

  if (millis() > time+step){
    time = millis();

    randomNumber = random(120);
    randomNumber2 = random(120);
    //println(randomNumber);
    step = random (5000,20000);
    noiseStep = random(0.001,0.02);

    if(randomNumber < 20){
      active_menu = 1;

      if (effetB2_1.getValue()==0){
        effetB2_1.setValue(1);
        effetS2_1.setValue(random(1));
      }
      else if (effetB2_1.getValue() == 1){
        effetB2_1.setValue(0);
      }

      if (randomNumber2> 40 && randomNumber2<60){
        if (effetB3_1.getValue()==0){
          effetB3_1.setValue(1);
        }
        else if (effetB3_1.getValue() == 1){
          effetB3_1.setValue(0);
        }
      }
      else if (randomNumber2> 60 && randomNumber2<80){
        if (effetB4_1.getValue()==0){
          effetB4_1.setValue(1);
        }
        else if (effetB4_1.getValue() == 1){
          effetB4_1.setValue(0);
        }
      }
      else if (randomNumber2> 80 && randomNumber2<100){
        if (effetB5_1.getValue()==0){
          effetB5_1.setValue(1);
        }
        else if (effetB5_1.getValue() == 1){
          effetB5_1.setValue(0);
        }
      }
      else if (randomNumber2>100 && randomNumber2<120){
        if (effetB6_1.getValue()==0){
          effetB6_1.setValue(1);
        }
        else if (effetB6_1.getValue() == 1){
          effetB6_1.setValue(0);
        }
      }

    }


    else if (randomNumber >20 && randomNumber < 40){
      active_menu = 2;

      if (effetB2_2.getValue()==0){
        effetB2_2.setValue(1);
        effetS2_2.setValue(random(1));
      }
      else if (effetB2_2.getValue() == 1){
        float gate = random(100);
        if (gate>75){
        effetB2_2.setValue(0);
      }
      }

      if (randomNumber2> 40 && randomNumber2<60){
        if (effetB3_2.getValue()==0){
          effetB3_2.setValue(1);
        }
        else if (effetB3_2.getValue() == 1){
          effetB3_2.setValue(0);
        }
      }
      else if (randomNumber2> 60 && randomNumber2<80){
        if (effetB4_2.getValue()==0){
          effetB4_2.setValue(1);
        }
        else if (effetB4_2.getValue() == 1){
          effetB4_2.setValue(0);
        }
      }
      else if (randomNumber2> 80 && randomNumber2<100){
        if (effetB5_2.getValue()==0){
          effetB5_2.setValue(1);
        }
        else if (effetB5_2.getValue() == 1){
          effetB5_2.setValue(0);
        }
      }
      else if (randomNumber2>100 && randomNumber2<120){
        if (effetB6_2.getValue()==0){
          effetB6_2.setValue(1);
        }
        else if (effetB6_2.getValue() == 1){
          effetB6_2.setValue(0);
        }
      }
     
    }


    else if (randomNumber >40 && randomNumber < 60){
      active_menu = 3;
      
      if (effetB2_3.getValue()==0){
        effetB2_3.setValue(1);
        effetS2_3.setValue(random(1));
      }
      else if (effetB2_3.getValue() == 1){
        effetB2_3.setValue(0);
      }

      if (randomNumber2> 40 && randomNumber2<60){
        if (effetB3_3.getValue()==0){
          effetB3_3.setValue(1);
        }
        else if (effetB3_3.getValue() == 1){
          effetB3_3.setValue(0);
        }
      }
      else if (randomNumber2> 60 && randomNumber2<80){
        if (effetB4_3.getValue()==0){
          effetB4_3.setValue(1);
        }
        else if (effetB4_3.getValue() == 1){
          effetB4_3.setValue(0);
        }
      }
      else if (randomNumber2> 80 && randomNumber2<100){
        if (effetB5_3.getValue()==0){
          effetB5_3.setValue(1);
        }
        else if (effetB5_3.getValue() == 1){
          effetB5_3.setValue(0);
        }
      }
      else if (randomNumber2>100 && randomNumber2<120){
        if (effetB6_3.getValue()==0){
          effetB6_3.setValue(1);
        }
        else if (effetB6_3.getValue() == 1){
          effetB6_3.setValue(0);
        }
      }
    }


    else if (randomNumber >60 && randomNumber < 80){
      active_menu = 4;
      
      if (effetB2_4.getValue()==0){
        effetB2_4.setValue(1);
        effetS2_4.setValue(random(1));
      }
      else if (effetB2_4.getValue() == 1){
        effetB2_4.setValue(0);
      }

      if (randomNumber2> 40 && randomNumber2<60){
        if (effetB3_4.getValue()==0){
          effetB3_4.setValue(1);
        }
        else if (effetB3_4.getValue() == 1){
          effetB3_4.setValue(0);
        }
      }
      else if (randomNumber2> 60 && randomNumber2<80){
        if (effetB4_4.getValue()==0){
          effetB4_4.setValue(1);
        }
        else if (effetB4_4.getValue() == 1){
          effetB4_4.setValue(0);
        }
      }
      else if (randomNumber2> 80 && randomNumber2<100){
        if (effetB5_4.getValue()==0){
          effetB5_4.setValue(1);
        }
        else if (effetB5_4.getValue() == 1){
          effetB5_4.setValue(0);
        }
      }
      else if (randomNumber2>100 && randomNumber2<120){
        if (effetB6_4.getValue()==0){
          effetB6_4.setValue(1);
        }
        else if (effetB6_4.getValue() == 1){
          effetB6_4.setValue(0);
        }
      }


    }


    else if (randomNumber >80 && randomNumber < 100){
      active_menu = 5;
      
      if (effetB2_5.getValue()==0){
        effetB2_5.setValue(1);
        effetS2_5.setValue(random(1));
      }
      else if (effetB2_5.getValue() == 1){
        effetB2_5.setValue(0);
      }

      if (randomNumber2> 40 && randomNumber2<60){
        if (effetB3_5.getValue()==0){
          effetB3_5.setValue(1);
        }
        else if (effetB3_5.getValue() == 1){
          effetB3_5.setValue(0);
        }
      }
      else if (randomNumber2> 60 && randomNumber2<80){
        if (effetB4_5.getValue()==0){
          effetB4_5.setValue(1);
        }
        else if (effetB4_5.getValue() == 1){
          effetB4_5.setValue(0);
        }
      }
      else if (randomNumber2> 80 && randomNumber2<100){
        if (effetB5_5.getValue()==0){
          effetB5_5.setValue(1);
        }
        else if (effetB5_5.getValue() == 1){
          effetB5_5.setValue(0);
        }
      }
      else if (randomNumber2>100 && randomNumber2<120){
        if (effetB6_5.getValue()==0){
          effetB6_5.setValue(1);
        }
        else if (effetB6_5.getValue() == 1){
          effetB6_5.setValue(0);
        }
      }
     
    }


    else if (randomNumber >100 && randomNumber < 120){
      active_menu = 6;
      
      if (effetB2_6.getValue()==0){
        effetB2_6.setValue(1);
        effetS2_6.setValue(random(1));
      }
      else if (effetB2_6.getValue() == 1){
        effetB2_6.setValue(0);
      }

      if (randomNumber2> 40 && randomNumber2<60){
        if (effetB3_6.getValue()==0){
          effetB3_6.setValue(1);
        }
        else if (effetB3_6.getValue() == 1){
          effetB3_6.setValue(0);
        }
      }
      else if (randomNumber2> 60 && randomNumber2<80){
        if (effetB4_6.getValue()==0){
          effetB4_6.setValue(1);
        }
        else if (effetB4_6.getValue() == 1){
          effetB4_6.setValue(0);
        }
      }
      else if (randomNumber2> 80 && randomNumber2<100){
        if (effetB5_6.getValue()==0){
          effetB5_6.setValue(1);
        }
        else if (effetB5_6.getValue() == 1){
          effetB5_6.setValue(0);
        }
      }
      else if (randomNumber2>100 && randomNumber2<120){
        if (effetB6_6.getValue()==0){
          effetB6_6.setValue(1);
        }
        else if (effetB6_6.getValue() == 1){
          effetB6_6.setValue(0);
        }
      }


    }



  }
}



  



}

//=================================================================================================================
void mousePressed() {
  releasedEvent = true;
}

void construct_points() {
  p1 = new Point(150, 150, 20, 0, colorBackground, colorFront, colorHighlight, " ");
  p2 = new Point(350, 170, 20, 0, colorBackground, colorFront, colorHighlight, " ");
  p3 = new Point(276, 212, 20, 0, colorBackground, colorFront, colorHighlight, " ");
  p4 = new Point(450, 240, 20, 0, colorBackground, colorFront, colorHighlight, " ");
  p5 = new Point(340, 348, 20, 0, colorBackground, colorFront, colorHighlight, " ");
  p6 = new Point(210, 402, 20, 0, colorBackground, colorFront, colorHighlight, " ");

  info = new Point(30, 30, 25, 0, colorFront, colorHighlight, colorHighlight, " i ");
  help = new Point(30, 62, 25, 0, colorFront2, colorHighlight, colorHighlight, " ? ");
  /*
  p7 = new Point(307, 118, 20, 0, colorBackground, colorFront, colorHighlight, " ");
  p8 = new Point(206, 253, 20, 0, colorBackground, colorFront, colorHighlight, " ");
  p9 = new Point(298, 243, 20, 0, colorBackground, colorFront, colorHighlight, " ");
  p10 = new Point(303, 333, 20, 0, colorBackground, colorFront, colorHighlight, " ");
  */
}

void interact_points(){
  p1.over_p();
  p1.display();
  p1.interact();
  if (p1.over){
    active_menu = 1;
  }
  
  p2.over_p();
  p2.display();
  p2.interact();
  if (p2.over){
    active_menu = 2;
  }
   
  p3.over_p();
  p3.display();
  p3.interact();
  if (p3.over){
    active_menu = 3;
  }
  
  p4.over_p();
  p4.display();
  p4.interact();
  if (p4.over){
    active_menu = 4;
  }
  
  p5.over_p();
  p5.display();
  p5.interact();
  if (p5.over){
    active_menu = 5;
  }
  
  p6.over_p();
  p6.display();
  p6.interact();
  if (p6.over){
    active_menu = 6;
  }

   // information about the app
  info.over_p();
  info.display();
  // long text 
  if(info.over){
    pushStyle();
    fill(230, 230);
    noStroke();
    rect(45,45,465,495);
    //logo.resize(48, 48);
    image(logo,250,50);
    fill(0);
    textFont(title,18);
    text("CARTE POSTALE SONORE #13 -  Avril 2013",55,110);
    textFont(title,14);
    text("CAMPUS VILLEJEAN, RENNES 2 - Bérenger Recoules",55,140);

     textFont(title,14);
     text(" Pour leur treizième carte postale, Electroni-[k] m'a sollicité",60,180);
     text(" afin de travailler sur le campus universitaire de Rennes 2. ",60,200);
     text(" J'ai pu alors parcourir le campus guidé par des étudiants du ",60,220);
     text(" master Arts et Technologies Numériques et de la License de  ",60,240);
     text(" Musicologie ainsi que des bénévoles de l'association, à la  ",60,260);
     text(" recherche de 'bruits de couloirs', d'ambiances, de l'empreinte",60,280);
     text(" sonore de ce lieu. ",60,300);

     text(" Dans cette application web, plusieurs lieux du campus sont  ",60,340);
     text(" représentés par des points gris. En passant la souris au dessus,  ",60,360);
     text(" vous pourrez découvrir une photo, et en cliquant dessus vous ",60,380);
     text(" démarrerez la lecture d'un son.",60,400);
     text(" Sous la photo est disposé un panneau de controle qui vous permettra ",60,440);
     text(" de modifier le son joué en temps réel, à l'aide de différents effets. ",60,460);
     text(" Le carré permet d'activer / désactiver l'effet, la barre horizontale ",60,480);
     text(" permet d'ajuster l'importance de la modification apportée au son. ",60,500);


    popStyle();
  }
  help.over_p();
  help.display();
  // long text 
  if(help.over){
    pushStyle();
    fill(230, 230);
    noStroke();
    rect(45,45,465,495);
    textFont(title,18);
    fill(0);
    text("MODE D'EMPLOI",55,110);
    
    textFont(title,14);
    text("Pour faire apparaitre le panneau de controle sonore d'un",60,140);
     text("lieu, il suffit de passer la souris au dessus de ce point.",60,160);

     text("Il existe deux façon de lire les différents sons :",60,200);
     text(" 1) en boucle, en cliquant sur le point qui représente ",60,230);
     text("le son sur la carte. Le son sera donc joué en intégralité",60,250);
     text("puis bouclé jusqu'à ce que l'on 'déclique' le point ",60,270);
     text(" 2) aléatoirement, en activant l'effet 'hachoir' dans le",60,290);
     text("panneau de contrôle sous la photo. Cliquer sur le carré ",60,310);
     text("permet d'activer l'effet, la barre horizontale permet ",60,330);
     text("d'ajuster la taille des bouts de sons qui sont joués",60,350);

     text("Chaque son dispose de son propre contrôle de volume ",60,380);
     text("indépendant, puis de quatre effets permettant de le  ",60,400);
     text("transformer en temps réel ",60,420);

     text("Si jamais tout cela ne vous parle pas, vous pouvez toujours",60,450);
     text("opter pour le mode automatique ! Le programme se déroulera en ",60,470);
     text("sélectionnant les sons et ajustant lui même les effets. Pour cela ",60,490);
     text("il vous suffit de cliquer sur le bouton 'Play' (triangle blanc sur ",60,510);
     text("fond rouge). ",60,530);
popStyle();




  }
  pushStyle();
  fill(255);
  textFont(title,14);
  text("i",27,35);
  text("?",26,67);
  popStyle();

  /*
  p7.over_p();
  p7.display();
  p7.interact();
  if (p7.over){
    active_menu = 7;
  }
  
  p8.over_p();
  p8.display();
  p8.interact();
  if (p8.over){
    active_menu = 8;
  }
  
  p9.over_p();
  p9.display();
  p9.interact();
  if (p9.over){
    active_menu = 9;
  }
  
  p10.over_p();
  p10.display();
  p10.interact();
  if (p10.over){
    active_menu = 10;
  }
  */
}

void construct_menu1() {
  // menu is made of a title, a photo, a text, and a bunch of slider
  thumb1 = loadImage("photos/photo1.jpg");
  //thumb1.resize(250, 177);

  effetS1_1 = new Slider(xpos, ypos, 250, guiH, 0, 1, colorBackground, colorFront, colorHighlight, " ");
  effetS2_1 = new Slider(xpos, ypos + guiH*2, 250, guiH, 125, 800, colorBackground, colorFront, colorHighlight, " ");
  effetS3_1 = new Slider(xpos, ypos + guiH*4, 250, guiH, 0, 100, colorBackground, colorFront, colorHighlight, " ");
  effetS4_1 = new Slider(xpos, ypos + guiH*6, 250, guiH, 0, 100, colorBackground, colorFront, colorHighlight, " ");
  effetS5_1 = new Slider(xpos, ypos + guiH*8, 250, guiH, 0, 100, colorBackground, colorFront, colorHighlight, " ");
  effetS6_1 = new Slider(xpos, ypos + guiH*10, 250, guiH, 0, 100, colorBackground, colorFront, colorHighlight, " ");

  effetB2_1 = new Button(xpos -guiH-5, ypos+guiH*2, guiH, colorBackground, colorFront, colorHighlight, " ");
  effetB3_1 = new Button(xpos -guiH-5, ypos+guiH*4, guiH, colorBackground, colorFront, colorHighlight, " ");
  effetB4_1 = new Button(xpos -guiH-5, ypos+guiH*6, guiH, colorBackground, colorFront, colorHighlight, " ");
  effetB5_1 = new Button(xpos -guiH-5, ypos+guiH*8, guiH, colorBackground, colorFront, colorHighlight, " ");
  effetB6_1 = new Button(xpos -guiH-5, ypos+guiH*10, guiH, colorBackground, colorFront, colorHighlight, " ");
}

void display_menu1() {
  fill(0);
  textFont(title,20);
  text("Le Tambour", 640, 40);

  //thumb1.resize(250, 177);
  image(thumb1, 640, 50);
  
  fill(50);
  textFont(title,12);
  text("Volume ", xpos - guiH -75, ypos +10);
  text("Hachoir ", xpos - guiH -75, ypos +10 + guiH*2);
  text("Filtre  ", xpos - guiH -75, ypos +10 + guiH*4);
  text("Distortion ", xpos - guiH -75, ypos +10+ guiH*6);
  text("Modulation ", xpos - guiH -75, ypos +10+ guiH*8);
  text("Reverb  ", xpos - guiH -75, ypos +10+guiH *10);

  if (p1.active && !lastp1){
    patch.send("pjssample1_on",1);
    lastp1= true;
  }
  else if (!p1.active && lastp1){
    patch.send("pjssample1_on",0);
    lastp1=false;
  }

  effetS1_1.display();
  effetS1_1.interact();
  patch.send("pjsvol1",effetS1_1.getValue());

  effetS2_1.display();
  effetS2_1.interact();
  if (effetS2_1.getValue() != lastS2_1){
  patch.send("pjssize1",effetS2_1.getValue());
  lastS2_1 = effetS2_1.getValue();
  }

  effetS3_1.display();
  effetS3_1.interact();
  patch.send("pjsfilter1",effetS3_1.getValue());

  effetS4_1.display();
  effetS4_1.interact();
  patch.send("pjsdisto1",effetS4_1.getValue());

  effetS5_1.display();
  effetS5_1.interact();
  patch.send("pjsringmod1",effetS5_1.getValue());

  effetS6_1.display();
  effetS6_1.interact();
  patch.send("pjsreverb1",effetS6_1.getValue());

  effetB2_1.display();
  effetB2_1.interact();
  if (effetB2_1.getValue() != lastB2_1){
  patch.send("pjscut1_on",effetB2_1.getValue());
  lastB2_1 = effetB2_1.getValue();
  }

  effetB3_1.display();
  effetB3_1.interact(); 
  if (effetB3_1.getValue() != lastB3_1){
  patch.send("pjsfilter_on1",effetB3_1.getValue());
  lastB3_1 = effetB3_1.getValue();
  }

  effetB4_1.display();
  effetB4_1.interact();
  if (effetB4_1.getValue() != lastB4_1){
  patch.send("pjsdisto_on1",effetB4_1.getValue());
  lastB4_1 = effetB4_1.getValue();
  }

  effetB5_1.display();
  effetB5_1.interact();
  if (effetB5_1.getValue() != lastB5_1){
  patch.send("pjsringmod_on1",effetB5_1.getValue());
  lastB5_1 = effetB5_1.getValue();
  }

  effetB6_1.display();
  effetB6_1.interact();  
  if (effetB6_1.getValue() != lastB6_1){
  patch.send("pjsreverb_on1",effetB6_1.getValue());
  lastB6_1 = effetB6_1.getValue();
  }
}

void construct_menu2() {
  // menu is made of a title, a photo, a text, and a bunch of slider
  thumb2 = loadImage("photos/photo2.jpg");
  //thumb2.resize(250, 177);

  effetS1_2 = new Slider(xpos, ypos, 250, guiH, 0, 1, colorBackground, colorFront, colorHighlight, " ");
  effetS2_2 = new Slider(xpos, ypos + guiH*2, 250, guiH, 125, 800, colorBackground, colorFront, colorHighlight, " ");
  effetS3_2 = new Slider(xpos, ypos + guiH*4, 250, guiH, 0, 100, colorBackground, colorFront, colorHighlight, " ");
  effetS4_2 = new Slider(xpos, ypos + guiH*6, 250, guiH, 0, 100, colorBackground, colorFront, colorHighlight, " ");
  effetS5_2 = new Slider(xpos, ypos + guiH*8, 250, guiH, 0, 100, colorBackground, colorFront, colorHighlight, " ");
  effetS6_2 = new Slider(xpos, ypos + guiH*10, 250, guiH, 0, 100, colorBackground, colorFront, colorHighlight, " ");
  
  effetB2_2 = new Button(xpos -guiH-5, ypos+guiH*2, guiH, colorBackground, colorFront, colorHighlight, " ");
  effetB3_2 = new Button(xpos -guiH-5, ypos+guiH*4, guiH, colorBackground, colorFront, colorHighlight, " ");
  effetB4_2 = new Button(xpos -guiH-5, ypos+guiH*6, guiH, colorBackground, colorFront, colorHighlight, " ");
  effetB5_2 = new Button(xpos -guiH-5, ypos+guiH*8, guiH, colorBackground, colorFront, colorHighlight, " ");
  effetB6_2 = new Button(xpos -guiH-5, ypos+guiH*10, guiH, colorBackground, colorFront, colorHighlight, " ");
}

void display_menu2() {
 fill(0);
  textFont(title,20);
  text("Bibliothèque Universitaire", 650, 40);

  //thumb2.resize(250, 177);
  //tint(180,0,0,150);
  image(thumb2, 675, 50);
  
  fill(50);
  textFont(title,12);
  text("Volume ", xpos - guiH -75, ypos +10);
  text("Hachoir ", xpos - guiH -75, ypos +10 + guiH*2);
  text("Filtre  ", xpos - guiH -75, ypos +10 + guiH*4);
  text("Distortion ", xpos - guiH -75, ypos +10+ guiH*6);
  text("Modulation ", xpos - guiH -75, ypos +10+ guiH*8);
  text("Reverb  ", xpos - guiH -75, ypos +10+guiH *10);

  if (p2.active && !lastp2){
    patch.send("pjssample2_on",1);
    lastp2= true;
  }
  else if (!p2.active && lastp2){
    patch.send("pjssample2_on",0);
    lastp2=false;
  }

  effetS1_2.display();
  effetS1_2.interact();
  patch.send("pjsvol2",effetS1_2.getValue());

   effetS2_2.display();
  effetS2_2.interact();
  if (effetS2_2.getValue() != lastS2_2){
  patch.send("pjssize2",effetS2_2.getValue());
  lastS2_2 = effetS2_2.getValue();
  }

  effetS3_2.display();
  effetS3_2.interact();
  patch.send("pjsfilter2",effetS3_2.getValue());

  effetS4_2.display();
  effetS4_2.interact();
  patch.send("pjsdisto2",effetS4_2.getValue());

  effetS5_2.display();
  effetS5_2.interact();
  patch.send("pjsringmod2",effetS5_2.getValue());

  effetS6_2.display();
  effetS6_2.interact();
  patch.send("pjsreverb2",effetS6_2.getValue());

  effetB2_2.display();
  effetB2_2.interact();
  if (effetB2_2.getValue() != lastB2_2){
  patch.send("pjscut2_on",effetB2_2.getValue());
  lastB2_2 = effetB2_2.getValue();
  }

  effetB3_2.display();
  effetB3_2.interact(); 
  if (effetB3_2.getValue() != lastB3_2){
  patch.send("pjsfilter_on2",effetB3_2.getValue());
  lastB3_2 = effetB3_2.getValue();
  }

  effetB4_2.display();
  effetB4_2.interact();
  if (effetB4_2.getValue() != lastB4_2){
  patch.send("pjsdisto_on2",effetB4_2.getValue());
  lastB4_2 = effetB4_2.getValue();
  }

  effetB5_2.display();
  effetB5_2.interact();
  if (effetB5_2.getValue() != lastB5_2){
  patch.send("pjsringmod_on2",effetB5_2.getValue());
  lastB5_2 = effetB5_2.getValue();
  }

  effetB6_2.display();
  effetB6_2.interact();  
  if (effetB6_2.getValue() != lastB6_2){
  patch.send("pjsreverb_on2",effetB6_2.getValue());
  lastB6_2 = effetB6_2.getValue();
  } 
}

void construct_menu3() {
  // menu is made of a title, a photo, a text, and a bunch of slider
  thumb3 = loadImage("photos/photo3.jpg");
  //thumb3.resize(250, 177);

  effetS1_3 = new Slider(xpos, ypos, 250, guiH, 0, 1, colorBackground, colorFront, colorHighlight, " ");
  effetS2_3 = new Slider(xpos, ypos + guiH*2, 250, guiH, 125, 800, colorBackground, colorFront, colorHighlight, " ");
  effetS3_3 = new Slider(xpos, ypos + guiH*4, 250, guiH, 0, 100, colorBackground, colorFront, colorHighlight, " ");
  effetS4_3 = new Slider(xpos, ypos + guiH*6, 250, guiH, 0, 100, colorBackground, colorFront, colorHighlight, " ");
  effetS5_3 = new Slider(xpos, ypos + guiH*8, 250, guiH, 0, 100, colorBackground, colorFront, colorHighlight, " ");
  effetS6_3 = new Slider(xpos, ypos + guiH*10, 250, guiH, 0, 100, colorBackground, colorFront, colorHighlight, " ");

  effetB2_3 = new Button(xpos -guiH-5, ypos+guiH*2, guiH, colorBackground, colorFront, colorHighlight, " ");
  effetB3_3 = new Button(xpos -guiH-5, ypos+guiH*4, guiH, colorBackground, colorFront, colorHighlight, " ");
  effetB4_3 = new Button(xpos -guiH-5, ypos+guiH*6, guiH, colorBackground, colorFront, colorHighlight, " ");
  effetB5_3 = new Button(xpos -guiH-5, ypos+guiH*8, guiH, colorBackground, colorFront, colorHighlight, " ");
  effetB6_3 = new Button(xpos -guiH-5, ypos+guiH*10, guiH, colorBackground, colorFront, colorHighlight, " ");
}

void display_menu3() {
 fill(0);
  textFont(title,20);
  text("CIREF", 675, 40);
 // tint(255,125,125,10);
  //thumb3.resize(250, 177);
  image(thumb3, 675, 50);
  
  fill(50);
   textFont(title,12);
   text("Volume ", xpos - guiH -75, ypos +10);
  text("Hachoir ", xpos - guiH -75, ypos +10 + guiH*2);
  text("Filtre  ", xpos - guiH -75, ypos +10 + guiH*4);
  text("Distortion ", xpos - guiH -75, ypos +10+ guiH*6);
  text("Modulation ", xpos - guiH -75, ypos +10+ guiH*8);
  text("Reverb  ", xpos - guiH -75, ypos +10+guiH *10);

  if (p3.active && !lastp3){
    patch.send("pjssample3_on",1);
    lastp3= true;
  }
  else if (!p3.active && lastp3){
    patch.send("pjssample3_on",0);
    lastp3=false;
  }

  effetS1_3.display();
  effetS1_3.interact();
  patch.send("pjsvol3",effetS1_3.getValue());

  effetS2_3.display();
  effetS2_3.interact();
  if (effetS2_3.getValue() != lastS2_3){
  patch.send("pjssize3",effetS2_3.getValue());
  lastS2_3 = effetS2_3.getValue();
  }

  effetS3_3.display();
  effetS3_3.interact();
  patch.send("pjsfilter3",effetS3_3.getValue());

  effetS4_3.display();
  effetS4_3.interact();
  patch.send("pjsdisto3",effetS4_3.getValue());

  effetS5_3.display();
  effetS5_3.interact();
  patch.send("pjsringmod3",effetS5_3.getValue());

  effetS6_3.display();
  effetS6_3.interact();
  patch.send("pjsreverb3",effetS6_3.getValue());

  effetB2_3.display();
  effetB2_3.interact();
  if (effetB2_3.getValue() != lastB2_3){
  patch.send("pjscut3_on",effetB2_3.getValue());
  lastB2_3 = effetB2_3.getValue();
  }

  effetB3_3.display();
  effetB3_3.interact(); 
  if (effetB3_3.getValue() != lastB3_3){
  patch.send("pjsfilter_on3",effetB3_3.getValue());
  lastB3_3 = effetB3_3.getValue();
  }

  effetB4_3.display();
  effetB4_3.interact();
  if (effetB4_3.getValue() != lastB4_3){
  patch.send("pjsdisto_on3",effetB4_3.getValue());
  lastB4_3 = effetB4_3.getValue();
  }

  effetB5_3.display();
  effetB5_3.interact();
  if (effetB5_3.getValue() != lastB5_3){
  patch.send("pjsringmod_on3",effetB5_3.getValue());
  lastB5_3 = effetB5_3.getValue();
  }

  effetB6_3.display();
  effetB6_3.interact();  
  if (effetB6_3.getValue() != lastB6_3){
  patch.send("pjsreverb_on3",effetB6_3.getValue());
  lastB6_3 = effetB6_3.getValue();
  }
}

void construct_menu4() {
  // menu is made of a title, a photo, a text, and a bunch of slider
  thumb4 = loadImage("photos/photo4.jpg");
  //thumb4.resize(250, 177);

  effetS1_4 = new Slider(xpos, ypos, 250, guiH, 0, 1, colorBackground, colorFront, colorHighlight, " ");
  effetS2_4 = new Slider(xpos, ypos + guiH*2, 250, guiH, 125, 800, colorBackground, colorFront, colorHighlight, " ");
  effetS3_4 = new Slider(xpos, ypos + guiH*4, 250, guiH, 0, 100, colorBackground, colorFront, colorHighlight, " ");
  effetS4_4 = new Slider(xpos, ypos + guiH*6, 250, guiH, 0, 100, colorBackground, colorFront, colorHighlight, " ");
  effetS5_4 = new Slider(xpos, ypos + guiH*8, 250, guiH, 0, 100, colorBackground, colorFront, colorHighlight, " ");
  effetS6_4 = new Slider(xpos, ypos + guiH*10, 250, guiH, 0, 100, colorBackground, colorFront, colorHighlight, " ");

  effetB2_4 = new Button(xpos -guiH-5, ypos+guiH*2, guiH, colorBackground, colorFront, colorHighlight, " ");
  effetB3_4 = new Button(xpos -guiH-5, ypos+guiH*4, guiH, colorBackground, colorFront, colorHighlight, " ");
  effetB4_4 = new Button(xpos -guiH-5, ypos+guiH*6, guiH, colorBackground, colorFront, colorHighlight, " ");
  effetB5_4 = new Button(xpos -guiH-5, ypos+guiH*8, guiH, colorBackground, colorFront, colorHighlight, " ");
  effetB6_4 = new Button(xpos -guiH-5, ypos+guiH*10, guiH, colorBackground, colorFront, colorHighlight, " ");
}

void display_menu4() {
 fill(0);
  textFont(title,20);
  text("Gymnase", 640, 40);

  //thumb4.resize(250, 177);
  image(thumb4, 640, 50);
  
  fill(50);
   textFont(title,12);
  text("Volume ", xpos - guiH -75, ypos +10);
  text("Hachoir ", xpos - guiH -75, ypos +10 + guiH*2);
  text("Filtre  ", xpos - guiH -75, ypos +10 + guiH*4);
  text("Distortion ", xpos - guiH -75, ypos +10+ guiH*6);
  text("Modulation ", xpos - guiH -75, ypos +10+ guiH*8);
  text("Reverb  ", xpos - guiH -75, ypos +10+guiH *10);

  if (p4.active && !lastp4){
    patch.send("pjssample4_on",1);
    lastp4= true;
  }
  else if (!p4.active && lastp4){
    patch.send("pjssample4_on",0);
    lastp4=false;
  }

  effetS1_4.display();
  effetS1_4.interact();
  patch.send("pjsvol4",effetS1_4.getValue());

  effetS2_4.display();
  effetS2_4.interact();
  if (effetS2_4.getValue() != lastS2_4){
  patch.send("pjssize4",effetS2_4.getValue());
  lastS2_4 = effetS2_4.getValue();
  }

  effetS3_4.display();
  effetS3_4.interact();
  patch.send("pjsfilter4",effetS3_4.getValue());

  effetS4_4.display();
  effetS4_4.interact();
  patch.send("pjsdisto4",effetS4_4.getValue());

  effetS5_4.display();
  effetS5_4.interact();
  patch.send("pjsringmod4",effetS5_4.getValue());

  effetS6_4.display();
  effetS6_4.interact();
  patch.send("pjsreverb4",effetS6_4.getValue());

  effetB2_4.display();
  effetB2_4.interact();
  if (effetB2_4.getValue() != lastB2_4){
  patch.send("pjscut4_on",effetB2_4.getValue());
  lastB2_4 = effetB2_4.getValue();
  }

  effetB3_4.display();
  effetB3_4.interact(); 
  if (effetB3_4.getValue() != lastB3_4){
  patch.send("pjsfilter_on4",effetB3_4.getValue());
  lastB3_4 = effetB3_4.getValue();
  }

  effetB4_4.display();
  effetB4_4.interact();
  if (effetB4_4.getValue() != lastB4_4){
  patch.send("pjsdisto_on4",effetB4_4.getValue());
  lastB4_4 = effetB4_4.getValue();
  }

  effetB5_4.display();
  effetB5_4.interact();
  if (effetB5_4.getValue() != lastB5_4){
  patch.send("pjsringmod_on4",effetB5_4.getValue());
  lastB5_4 = effetB5_4.getValue();
  }

  effetB6_4.display();
  effetB6_4.interact();  
  if (effetB6_4.getValue() != lastB6_4){
  patch.send("pjsreverb_on4",effetB6_4.getValue());
  lastB6_4 = effetB6_4.getValue();
  }
}

void construct_menu5() {
  // menu is made of a title, a photo, a text, and a bunch of slider
  thumb5 = loadImage("photos/photo5.jpg");
  //thumb5.resize(250, 177);

  effetS1_5 = new Slider(xpos, ypos, 250, guiH, 0, 1, colorBackground, colorFront, colorHighlight, " ");
  effetS2_5 = new Slider(xpos, ypos + guiH*2, 250, guiH, 125, 800, colorBackground, colorFront, colorHighlight, " ");
  effetS3_5 = new Slider(xpos, ypos + guiH*4, 250, guiH, 0, 100, colorBackground, colorFront, colorHighlight, " ");
  effetS4_5 = new Slider(xpos, ypos + guiH*6, 250, guiH, 0, 100, colorBackground, colorFront, colorHighlight, " ");
  effetS5_5 = new Slider(xpos, ypos + guiH*8, 250, guiH, 0, 100, colorBackground, colorFront, colorHighlight, " ");
  effetS6_5 = new Slider(xpos, ypos + guiH*10, 250, guiH, 0, 100, colorBackground, colorFront, colorHighlight, " ");

  effetB2_5 = new Button(xpos -guiH-5, ypos+guiH*2, guiH, colorBackground, colorFront, colorHighlight, " ");
  effetB3_5 = new Button(xpos -guiH-5, ypos+guiH*4, guiH, colorBackground, colorFront, colorHighlight, " ");
  effetB4_5 = new Button(xpos -guiH-5, ypos+guiH*6, guiH, colorBackground, colorFront, colorHighlight, " ");
  effetB5_5 = new Button(xpos -guiH-5, ypos+guiH*8, guiH, colorBackground, colorFront, colorHighlight, " ");
  effetB6_5 = new Button(xpos -guiH-5, ypos+guiH*10, guiH, colorBackground, colorFront, colorHighlight, " ");
}

void display_menu5() {
 fill(0);
  textFont(title,20);
  text("Erève", 640, 40);

  //thumb5.resize(250, 177);
  image(thumb5, 640, 50);
  
  fill(50);
  textFont(title,12);
  text("Volume ", xpos - guiH -75, ypos +10);
  text("Hachoir ", xpos - guiH -75, ypos +10 + guiH*2);
  text("Filtre  ", xpos - guiH -75, ypos +10 + guiH*4);
  text("Distortion ", xpos - guiH -75, ypos +10+ guiH*6);
  text("Modulation ", xpos - guiH -75, ypos +10+ guiH*8);
  text("Reverb  ", xpos - guiH -75, ypos +10+guiH *10);

  if (p5.active && !lastp5){
    patch.send("pjssample5_on",1);
    lastp5= true;
  }
  else if (!p5.active && lastp5){
    patch.send("pjssample5_on",0);
    lastp5=false;
  }

  effetS1_5.display();
  effetS1_5.interact();
  patch.send("pjsvol5",effetS1_5.getValue());

  effetS2_5.display();
  effetS2_5.interact();
  if (effetS2_5.getValue() != lastS2_5){
  patch.send("pjssize5",effetS2_5.getValue());
  lastS2_5 = effetS2_5.getValue();
  }

  effetS3_5.display();
  effetS3_5.interact();
  patch.send("pjsfilter5",effetS3_5.getValue());

  effetS4_5.display();
  effetS4_5.interact();
  patch.send("pjsdisto5",effetS4_5.getValue());

  effetS5_5.display();
  effetS5_5.interact();
  patch.send("pjsringmod5",effetS5_5.getValue());

  effetS6_5.display();
  effetS6_5.interact();
  patch.send("pjsreverb5",effetS6_5.getValue());

  effetB2_5.display();
  effetB2_5.interact();
  if (effetB2_5.getValue() != lastB2_5){
  patch.send("pjscut5_on",effetB2_5.getValue());
  lastB2_5 = effetB2_5.getValue();
  }

  effetB3_5.display();
  effetB3_5.interact(); 
  if (effetB3_5.getValue() != lastB3_5){
  patch.send("pjsfilter_on5",effetB3_5.getValue());
  lastB3_5 = effetB3_5.getValue();
  }

  effetB4_5.display();
  effetB4_5.interact();
  if (effetB4_5.getValue() != lastB4_5){
  patch.send("pjsdisto_on5",effetB4_5.getValue());
  lastB4_5 = effetB4_5.getValue();
  }

  effetB5_5.display();
  effetB5_5.interact();
  if (effetB5_5.getValue() != lastB5_5){
  patch.send("pjsringmod_on5",effetB5_5.getValue());
  lastB5_5 = effetB5_5.getValue();
  }

  effetB6_5.display();
  effetB6_5.interact();  
  if (effetB6_5.getValue() != lastB6_5){
  patch.send("pjsreverb_on5",effetB6_5.getValue());
  lastB6_5 = effetB6_5.getValue();
  }
}


void construct_menu6() {
  // menu is made of a title, a photo, a text, and a bunch of slider
  thumb6 = loadImage("photos/photo6.jpg");
 // thumb6.resize(250, 177);

  effetS1_6 = new Slider(xpos, ypos, 250, guiH, 0, 1, colorBackground, colorFront, colorHighlight, " ");
  effetS2_6 = new Slider(xpos, ypos + guiH*2, 250, guiH, 125, 800, colorBackground, colorFront, colorHighlight, " ");
  effetS3_6 = new Slider(xpos, ypos + guiH*4, 250, guiH, 0, 100, colorBackground, colorFront, colorHighlight, " ");
  effetS4_6 = new Slider(xpos, ypos + guiH*6, 250, guiH, 0, 100, colorBackground, colorFront, colorHighlight, " ");
  effetS5_6 = new Slider(xpos, ypos + guiH*8, 250, guiH, 0, 100, colorBackground, colorFront, colorHighlight, " ");
  effetS6_6 = new Slider(xpos, ypos + guiH*10, 250, guiH, 0, 100, colorBackground, colorFront, colorHighlight, " ");

  effetB2_6 = new Button(xpos -guiH-5, ypos+guiH*2, guiH, colorBackground, colorFront, colorHighlight, " ");
  effetB3_6 = new Button(xpos -guiH-5, ypos+guiH*4, guiH, colorBackground, colorFront, colorHighlight, " ");
  effetB4_6 = new Button(xpos -guiH-5, ypos+guiH*6, guiH, colorBackground, colorFront, colorHighlight, " ");
  effetB5_6 = new Button(xpos -guiH-5, ypos+guiH*8, guiH, colorBackground, colorFront, colorHighlight, " ");
  effetB6_6 = new Button(xpos -guiH-5, ypos+guiH*10, guiH, colorBackground, colorFront, colorHighlight, " ");
}

void display_menu6() {
 fill(0);
  textFont(title,20);
  text("Salle de cours", 675, 40);

  //thumb6.resize(250, 177);
  image(thumb6, 675, 50);
  
  fill(50);
   textFont(title,12);
  text("Volume ", xpos - guiH -75, ypos +10);
  text("Hachoir ", xpos - guiH -75, ypos +10 + guiH*2);
  text("Filtre  ", xpos - guiH -75, ypos +10 + guiH*4);
  text("Distortion ", xpos - guiH -75, ypos +10+ guiH*6);
  text("Modulation ", xpos - guiH -75, ypos +10+ guiH*8);
  text("Reverb  ", xpos - guiH -75, ypos +10+guiH *10);

  if (p6.active && !lastp6){
    patch.send("pjssample6_on",1);
    lastp6= true;
  }
  else if (!p6.active && lastp6){
    patch.send("pjssample6_on",0);
    lastp6=false;
  }

  effetS1_6.display();
  effetS1_6.interact();
  patch.send("pjsvol6",effetS1_6.getValue());

  effetS2_6.display();
  effetS2_6.interact();
  if (effetS2_6.getValue() != lastS2_6){
  patch.send("pjssize6",effetS2_6.getValue());
  lastS2_6 = effetS2_6.getValue();
  }

  effetS3_6.display();
  effetS3_6.interact();
  patch.send("pjsfilter6",effetS3_6.getValue());

  effetS4_6.display();
  effetS4_6.interact();
  patch.send("pjsdisto6",effetS4_6.getValue());

  effetS5_6.display();
  effetS5_6.interact();
  patch.send("pjsringmod6",effetS5_6.getValue());

  effetS6_6.display();
  effetS6_6.interact();
  patch.send("pjsreverb6",effetS6_6.getValue());

  effetB2_6.display();
  effetB2_6.interact();
  if (effetB2_6.getValue() != lastB2_6){
  patch.send("pjscut6_on",effetB2_6.getValue());
  lastB2_6 = effetB2_6.getValue();
  }

  effetB3_6.display();
  effetB3_6.interact(); 
  if (effetB3_6.getValue() != lastB3_6){
  patch.send("pjsfilter_on6",effetB3_6.getValue());
  lastB3_6 = effetB3_6.getValue();
  }

  effetB4_6.display();
  effetB4_6.interact();
  if (effetB4_6.getValue() != lastB4_6){
  patch.send("pjsdisto_on6",effetB4_6.getValue());
  lastB4_6 = effetB4_6.getValue();
  }

  effetB5_6.display();
  effetB5_6.interact();
  if (effetB5_6.getValue() != lastB5_6){
  patch.send("pjsringmod_on6",effetB5_6.getValue());
  lastB5_6 = effetB5_6.getValue();
  }

  effetB6_6.display();
  effetB6_6.interact();  
  if (effetB6_6.getValue() != lastB6_6){
  patch.send("pjsreverb_on6",effetB6_6.getValue());
  lastB6_6 = effetB6_6.getValue();
  }
}


//===========================================================================================================================
class Point {
  int xpos, ypos;
  int size;
  int id;
  boolean active;
  boolean over;
  color pColorB, pColorF, pColorH, currentColor, activeColor;
  String label;

  Point (int xpos, int ypos, int size, int id, color pColorB, color pColorF, color pColorH, String label) {
    this.xpos=xpos;
    this.ypos=ypos;
    this.size = size;
    this.id = id;
    this.pColorB = pColorB; 
    this.pColorF = pColorF;
    this.pColorH = pColorH;
    this.label = label;
    currentColor = pColorB;
    activeColor = pColorB;
    active = false;
    over = false;
  }

  void display() {
    pushMatrix();
    pushStyle();
    noStroke();
    translate(xpos, ypos);
    fill(activeColor);
    ellipse(0, 0, size, size);
    fill(currentColor);
    ellipse(0, 0, size, size);
    popStyle();
    popMatrix();
  }

  void interact() {
    if (over) {
      currentColor = pColorH;
      size = 25;
      if (releasedEvent && !active) {
        active = true;
        activeColor = pColorF;
      }
      else if (releasedEvent && active) {
        active = false;
        activeColor = pColorB;
      }
      else if (active) {
        animate();
      }
    }
    else {
      size = 20;
      if (active) {
        currentColor = pColorF;
        animate();
      }
      else if (!active) {
        currentColor = pColorB;
      }
    }
  }

  void over_p() {
    if (dist(mouseX, mouseY, xpos, ypos)<size) {
      over = true;
    }
    else {
      over = false;
    }
  }

  void animate() {
    size = size + cos(frameCount/10)*10;
  }

  int getId() {
    return id;
  }
}

//==============================================================================================
class Slider {

  int xpos, ypos, sWidth, sHeight;
  int min, max;
  float value, pos;
  color sColorB, sColorF, sColorH, currentColor;
  String label;  

  Slider( int xpos, int ypos, int sWidth, int sHeight, int min, int max, color sColorB, color sColorF, color sColorH, String label) {
    value = 0.5;
    pos = 50;
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

    this.label=label;
  }

  void display() {
    pushStyle();
    pushMatrix();
    noStroke();

    translate(xpos, ypos);
    fill(sColorB);
    rect(0, 0, sWidth, sHeight, 10);
    fill(sColorF);  
    rect(0, 0, pos, sHeight, 10);
    fill(currentColor);  
    rect(0, 0, pos, sHeight, 10);
    fill(sColorB);
    //text (label, 0, sHeight + textSize +5);

    popMatrix();
    popStyle();
  }

  void interact() {
    if (mouseX>xpos && mouseX<xpos+sWidth && mouseY>ypos && mouseY<ypos+sHeight) {
      currentColor = sColorH;
      if (mousePressed) {
        pos = mouseX-xpos;
        float newValue = map(pos, 0,  sWidth, min, max);
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

  void setValue(float newValue){
    value = map(newValue,0,1,min,max);
    pos = map (value,min,max,0,0+sWidth);
  }
}

//========================================================================================================
class Button {
  int xpos, ypos, size;
  color bColorB, bColorF, bColorH, currentColor, activeColor;
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
    rect(0, 0, size, size, 5);
    fill(currentColor);
    rect(0, 0, size, size, 5);

    stroke(255);
    fill(255);
    //text(label, 0, ypos+size+textSize+5);

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

  void setValue(int newvalue){
    value = newvalue;
    if (newvalue == 1){
      pressed = true;
    }
    else{
      pressed = false;
    }
  }
}


