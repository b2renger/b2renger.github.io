
var springs = [];
var massSlider, dampingSlider, kSlider;

//var reverb;
//var reverbTime, reverDecayRate;


function setup() {

  frameRate(25);
  
  createCanvas(windowWidth, windowHeight);

  reverb = new p5.Reverb();

  for (var i=0; i<8; i++) {
  	s1 = new Spring( 50+ windowWidth*i/8, windowHeight/2,  20, 0.98, 1.0);
  	s1.audio();
  	s1.set_note(60 + i);
  	//s1.gui( windowWidth*i/12, windowHeight - 50 , 'midi note' + i);
    springs.push(s1);

    //reverb.process(springs[i].osc,6,0.2);
    //reverb.amp(2);
  }

  
  	
  massSlider = createSlider(10, 500, 50);
  massSlider.position(20, 20);

  dampingSlider = createSlider(0, 100, 50);
  dampingSlider.position(20, 50);

  kSlider = createSlider(0, 100, 50);
  kSlider.position(20, 80);

  create_gui();

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


   // reverb.process(springs[i].osc, 6 , 0.2);
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

function create_gui(){ 
    input0 = createInput();
    input0.position(windowWidth*0/8,windowHeight-50);
    input0.size(30,21);
    button0 = createButton('Note 0');
    button0.position(windowWidth*0/8+30,windowHeight-50);
    button0.mousePressed(change_note);

    input1 = createInput();
    input1.position(windowWidth*1/8,windowHeight-50);
    input1.size(30,21);
    button1 = createButton('Note 1');
    button1.position(windowWidth*1/8+30,windowHeight-50);
    button1.mousePressed(change_note);

    input2 = createInput();
    input2.position(windowWidth*2/8,windowHeight-50);
    input2.size(30,21);
    button2 = createButton('Note 2');
    button2.position(windowWidth*2/8+30,windowHeight-50);
    button2.mousePressed(change_note);

    input3 = createInput();
    input3.position(windowWidth*3/8,windowHeight-50);
    input3.size(30,21);
    button3 = createButton('Note 3');
    button3.position(windowWidth*3/8+30,windowHeight-50);
    button3.mousePressed(change_note);

    input4 = createInput();
    input4.position(windowWidth*4/8,windowHeight-50);
    input4.size(30,21);
    button4 = createButton('Note 4');
    button4.position(windowWidth*4/8+30,windowHeight-50);
    button4.mousePressed(change_note);

    input5 = createInput();
    input5.position(windowWidth*5/8,windowHeight-50);
    input5.size(30,21);
    button5 = createButton('Note 5');
    button5.position(windowWidth*5/8+30,windowHeight-50);
    button5.mousePressed(change_note);

    input6 = createInput();
    input6.position(windowWidth*6/8,windowHeight-50);
    input6.size(30,21);
    button6 = createButton('Note 6');
    button6.position(windowWidth*6/8+30,windowHeight-50);
    button6.mousePressed(change_note);

    input7 = createInput();
    input7.position(windowWidth*7/8,windowHeight-50);
    input7.size(30,21);
    button7 = createButton('Note 7');
    button7.position(windowWidth*7/8+30,windowHeight-50);
    button7.mousePressed(change_note);
}

function change_note(){
 // this.set_note(this.tinput.value());
 springs[0].set_note(input0.value());
 springs[1].set_note(input1.value());
 springs[2].set_note(input2.value());
 springs[3].set_note(input3.value());
 springs[4].set_note(input4.value());
 springs[5].set_note(input5.value());
 springs[6].set_note(input6.value());
 springs[7].set_note(input7.value());
}



