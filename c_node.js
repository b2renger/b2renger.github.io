/* adapted from :
// M_6_1_01.pde
// Node.pde
// 
// Generative Gestaltung, ISBN: 978-3-87439-759-9
// First Edition, Hermann Schmidt, Mainz, 2009
// Hartmut Bohnacker, Benedikt Gross, Julia Laub, Claudius Lazzeroni
// Copyright 2009 Hartmut Bohnacker, Benedikt Gross, Julia Laub, Claudius Lazzeroni
//
// http://www.generative-gestaltung.de
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
*/

function Node(x,y,id, anchor, diam,type){
	// ------   properties ------
  // if needed, an ID for the node
  this.id = id;
  this.diameter = diam || 25  ;
  this.type = type || 0;

  this.minX = 0;
  this.maxX = windowWidth;
  this.minY = 0;
  this.maxY = windowHeight;
  this.minZ = -60000;
  this.maxZ = 60000;

  this.velocity = createVector(0,0,0);
  this.pVelocity = createVector(0,0,0);
  this.maxVelocity = 10;

  this.damping = 0.5;
  // radius of impact
  this.radius = diam*1.5;
  // strength: positive for attraction, negative for repulsion (default for Nodes)
  this.strength = 15;
  // parameter that influences the form of the function
  this.ramp = 1.0;
  
  this.location = createVector(x,y,0);

  this.overMe= false;
  this.page;

  this.displayLabel = true;
  this.anchor = anchor;

  this.alpha = 50;
  this.highlight = false;
}


Node.prototype.attract = function(theNode) {
    var d = dist(this.location.x, this.location.y, theNode.location.x, theNode.location.y);
   
    if (d > 0 && d < this.radius) {
      var s = pow(d / this.radius, 1 / this.ramp);
      var f = s * 9 * this.strength * (1 / (s + 1) + ((s - 3) / 4)) / d;
      var df = p5.Vector.sub(this.location, theNode.location);
      df.mult(f);

      this.velocity.x += df.x;
      this.velocity.y += df.y;
      this.velocity.z += df.z;      
    }
}


Node.prototype.update = function() {

  this.velocity.limit(this.maxVelocity);

  this.pVelocity.set(this.velocity);

  this.location.x += this.velocity.x;
  this.location.y += this.velocity.y;
  this.location.z += this.velocity.z;
  
  
    if (this.location.x < this.minX) {
      this.location.x = this.minX - (this.location.x - this.minX);
      this.velocity.x = -this.velocity.x;
    }
    if (this.location.x > this.maxX) {
      this.location.x = this.maxX - (this.location.x - this.maxX);
      this.velocity.x = -this.velocity.x;
    }

    if (this.location.y < this.minY) {
      this.location.y = this.minY - (this.location.y - this.minY);
      this.velocity.y = -this.velocity.y;
    }
    if (this.location.y > this.maxY) {
      this.location.y = this.maxY - (this.location.y - this.maxY);
      this.velocity.y = -this.velocity.y;
    }
    /*
    if (this.location.z < this.minZ) {
      this.location.z = this.minZ - (this.location.z - this.minZ);
      this.velocity.z = -this.velocity.z;
    }
    if (this.location.z > this.maxZ) {
      this.location.z = this.maxZ - (this.location.z - this.maxZ);
      this.velocity.z = -this.velocity.z;
    } */

  this.velocity.mult(1 - this.damping);

  if (this.highlight == true){
  	this.displayLabel = true;
  	this.pulse();

  }
  else{
  	this.alpha = 50;
  }
}

Node.prototype.pulse = function(){
	this.alpha = 50 + 100*abs(sin(t));

}

Node.prototype.display = function(){
  push();
  

  if(this.type == 0){
    noStroke();
    fill(248,252,193);
    ellipse(this.location.x, this.location.y, this.diameter/4, this.diameter/4);
    fill(248,252,193,this.alpha);
    ellipse(this.location.x, this.location.y, this.diameter, this.diameter);
    fill(248,252,193);
    if(this.displayLabel == true){
      textSize(20)
      text(this.id,this.location.x-this.diameter/2, this.location.y - this.diameter);
    }
  }
  else if(this.type == 1){
    rectMode(CENTER);
    noStroke();
    fill(44,147*2,167*2);
    rect(this.location.x, this.location.y, this.diameter/4, this.diameter/4);
    fill(22*2,147*2,167*2,this.alpha);
    rect(this.location.x, this.location.y, this.diameter*2/3, this.diameter*2/3);
    fill(22*2,147*2,167*2);
    if(this.displayLabel == true){
      text(this.id,this.location.x-this.diameter/2, this.location.y - this.diameter );
    }
  }
  else if(this.type == 2){
    noStroke();
    fill(230,120,30);
    this.tri(this.location.x, this.location.y, this.diameter/3, this.diameter/3);
    fill(230,120,30,this.alpha+25);
    this.tri(this.location.x, this.location.y, this.diameter, this.diameter);
    fill(230,120,30);
    if(this.displayLabel == true){
      text(this.id,this.location.x-this.diameter/2, this.location.y - this.diameter );
    }
  }
  else if(this.type == 3){
    rectMode(CENTER);
    noStroke();
    fill(204,24,100);
    this.star(this.location.x, this.location.y, this.diameter/3, this.diameter/3);
    fill(204,24,100,this.alpha+25);
    this.star(this.location.x, this.location.y, this.diameter*0.8, this.diameter*0.8);
    fill(204,24,100);
    if(this.displayLabel == true){
      text(this.id,this.location.x-this.diameter/2, this.location.y - this.diameter );
    }
  }
  pop();
}

Node.prototype.tri = function(x,y,w,h){
  beginShape();
  for (var i = -PI/2 ; i < PI/2+2*PI ; i+=2*PI/3){
      var xpos = x + w/2*cos(i);
      var ypos = y + w/2*sin(i);   
      vertex(xpos,ypos);
  }
   endShape();

}

Node.prototype.star = function(x,y,w,h){
   beginShape();
  for (var i = -PI/2 ; i < PI/2+2*PI ; i+=2*PI/6){
      var xpos = x + 2  *w*cos(i);
      var ypos = y + 2  *w*sin(i);   
      var xin1 = x + 2*w/3.5*cos(i);
      var yin1 = y + 2*w/3.5*sin(i);   
      var xin2 = x - 2*w/3.5*cos(i);
      var yin2 = y - 2*w/3.5*sin(i);  
      curveVertex(xin2,yin2); 
      curveVertex(xpos,ypos);
      curveVertex(xin1,yin1);
  }
   endShape();

}


Node.prototype.over = function(x,y){
  //println(this.id , this.snd.isPlaying());
  var delta = dist(x,y,this.location.x,this.location.y);
  if (this.anchor == false){
  	if (delta < 100){
  		this.displayLabel = true;
  	}
  	else{
  		this.displayLabel = false;
  	}
  }

  if (delta < 9 ){
    push();
    stroke(255);
    noFill();
    ellipse(this.location.x, this.location.y, this.diameter+10, this.diameter+10);
    pop();
    this.overMe = true;
  }
  else {
    this.overMe = false;
  }

  
}

Node.prototype.setProject = function(str){
  this.page = loadTable(str,dummy);
}

//to avoid console.logs with the above function
function dummy(){
}


