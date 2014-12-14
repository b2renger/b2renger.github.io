
var springs = [];
var massSlider, dampingSlider, kSlider;


function setup() {

  frameRate(25);
  
  createCanvas(900, 600);

  for (var i=0; i<12; i++) {
  	s1 = new Spring( 50+ 800*i/10, 600/2,  20, 0.98, 1.0);
  	s1.audio();
  	s1.set_note(60 + i);
  	s1.gui(1000, 50+ 600 * i / 20 , 'midi note' + i);
    springs.push(s1);
  }
  	
  massSlider = createSlider(10, 500, 50);
  massSlider.position(20, 20);

  dampingSlider = createSlider(0, 100, 50);
  dampingSlider.position(20, 50);

  kSlider = createSlider(0, 100, 50);
  kSlider.position(20, 80);

  smooth(); 

}


function draw() {
  background(0);

  fill(255);
  
  var mass = massSlider.value()/20;
  var damping = dampingSlider.value()/100;
  var k = kSlider.value()/20;
  
  for (var i=0; i<springs.length; i++) {
    springs[i].update();
    springs[i].audio_update();
    springs[i].display();

  	springs[i].set_mass(mass);
  	springs[i].set_damping(damping);
  	springs[i].set_k(k);
  }

  fill(255);
  stroke(255);
  textSize(14);
  text("mass", 165, 35);
  text("damping", 165, 65);
  text("k", 165, 95);
  
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



