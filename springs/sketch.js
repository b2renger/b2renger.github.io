
var springs = [];
var gui,sp;
 
function setup() {

  createCanvas(windowWidth, windowHeight);
  frameRate(25);
  smooth(); 
  
  for (var i=0; i<8; i++) {
  	s1 = new Spring( 50+ windowWidth*i/8, windowHeight/2,  20, 0.98, 1.0);
  	s1.audio();
  	s1.set_note(60 + i);
    springs.push(s1);
  }

   sp = new sharedParameters();
   gui = new dat.GUI();
   initGui();
}


function draw() {

  background(0);
  fill(255);
  
  for (var i=0; i<springs.length; i++) {
    springs[i].update();
    springs[i].audio_update();
    springs[i].display();

  	springs[i].set_mass(sp.Mass);
  	springs[i].set_damping(sp.Damping);
  	springs[i].set_k(sp.K);
  }  
}


function mousePressed(){
	for (var i=0; i<springs.length; i++) {
    	springs[i].pressed(); 
	} 
}

function mouseReleased(){
  for (var i=0; i<springs.length; i++) {
    	springs[i].released(); 
	} 
}


function change_note(){
 springs[0].set_note(sp.Spring_0);
 springs[1].set_note(sp.Spring_1);
 springs[2].set_note(sp.Spring_2);
 springs[3].set_note(sp.Spring_3);
 springs[4].set_note(sp.Spring_4);
 springs[5].set_note(sp.Spring_5);
 springs[6].set_note(sp.Spring_6);
 springs[7].set_note(sp.Spring_7);
}


var sharedParameters = function() {
  this.Spring_0 = 60;
  this.Spring_1 = 62;
  this.Spring_2 = 63;
  this.Spring_3 = 65;
  this.Spring_4 = 67;
  this.Spring_5 = 68;
  this.Spring_6 = 70;
  this.Spring_7 = 72; 

  this.Mass = 1 ;
  this.Damping = 0.90 ;
  this.K = 0.2;
};

var initGui = function() {
  var f1 = gui.addFolder('Tuning (Midi notes)');
  f1.add(sp, 'Spring_0',0,127);
  f1.add(sp, 'Spring_1',0,127);
  f1.add(sp, 'Spring_2',0,127);
  f1.add(sp, 'Spring_3',0,127);
  f1.add(sp, 'Spring_4',0,127);
  f1.add(sp, 'Spring_5',0,127);
  f1.add(sp, 'Spring_6',0,127);
  f1.add(sp, 'Spring_7',0,127);

  var f2 = gui.addFolder('Simulation parameters');
  f2.add(sp, 'Mass',1,50);
  f2.add(sp, 'Damping',0,1);
  f2.add(sp, 'K',0,1);  
};
    

