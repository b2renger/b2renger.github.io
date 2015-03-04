// add bounding box for nodes
// feature : add sound ! and button to mute it :)

// content :ressources desktop (processing + pure-data)
// content : android : pendulum phases (vid + description +tba)
// content : desktop : tuto and abstraction for pd
// content : desktop : initiation processing
// content : this website + tuto+ repo dedicated (description + link + tuto in readme.md)


var nodes = [];
var springs = [];

var tags = [];

var longdistance = 120 ;
var shortdistance = 90;

var selectedNode =null;
var selectedNodeX;
var selectedNodeY;


var cssTitle = "font-family: 'Open Sans Condensed', sans-serif; background-color:#000000; color:#FFFFFF; font-size:18pt; padding:10px;text-align: center;";
var cssTags = "font-family: 'Open Sans Condensed', sans-serif; background-color:#000000; color:#FFFFFF; padding:10px;text-align: center;";
var cssParagraph = "font-family:monospace; background-color:#000000; color:#FFFFFF; padding:10px;";
var cssLink = "font-family: 'Open Sans Condensed', sans-serif;; background-color:#000000; color:#FFFFFF; font-size:10pt; padding:10px;";

var t = 0; // for pulsing nodes



function init(){

  setPage(nodes[0].page);
}

function setup() {
  	
  createCanvas(600, 1280);
  smooth();

  textFont("Open Sans Condensed");

  nodes = [];
  springs = [];
  //0
  nodes.push(new Node((width/2),(height/2),'HOME',true));
  nodes[0].setProject("pages/home.csv");

  //1
  nodes.push(new Node(random(width),random(height),'WEB',true));
  addConnection(0,random(longdistance,longdistance+longdistance/2));
  nodes[1].setProject("pages/Web.csv");
  //2
  nodes.push(new Node(random(width),random(height),'ANDROID',true));
  addConnection(0,random(longdistance,longdistance+longdistance/2));
  nodes[2].setProject("pages/Android.csv");
  //3
  nodes.push(new Node(random(width),random(height),'DESKTOP',true));
  addConnection(0,random(longdistance,longdistance+longdistance/2));
  nodes[3].setProject("pages/Desktop.csv");

  // android
  nodes.push(new Node((nodes[2].location.x),(nodes[2].location.y),'DroidParty tutorials',false));
  addConnection(2,random(shortdistance,shortdistance+shortdistance/2));
  nodes[nodes.length-1].setProject("pages/droidparty_tuto.csv");

  nodes.push(new Node((nodes[2].location.x),(nodes[2].location.y),'Springs',false));
  addConnection(1,random(shortdistance,shortdistance+shortdistance/2));
  addConnection(2,random(shortdistance,shortdistance+shortdistance/2));
  nodes[nodes.length-1].setProject("pages/springs.csv");

  nodes.push(new Node((nodes[2].location.x),(nodes[2].location.y),'Musicbox 3D',false));
  addConnection(1,random(shortdistance,shortdistance+shortdistance/2));
  addConnection(2,random(shortdistance,shortdistance+shortdistance/2));
  nodes[nodes.length-1].setProject("pages/musicbox3d.csv");  

  // desktop
  nodes.push(new Node((nodes[3].location.x),(nodes[3].location.y),'Data Sonification',false));
  addConnection(3,random(shortdistance,shortdistance+shortdistance/2));
  nodes[nodes.length-1].setProject("pages/datasonification.csv");  

  nodes.push(new Node((nodes[3].location.x),(nodes[3].location.y),'Blends and shaders',false));
  addConnection(3,random(shortdistance,shortdistance+shortdistance/2));
  nodes[nodes.length-1].setProject("pages/blends_n_shaders.csv");  


  // web
  nodes.push(new Node((nodes[1].location.x),(nodes[1].location.y),'Flock',false));
  addConnection(1,random(shortdistance,shortdistance+shortdistance/2));
  nodes[nodes.length-1].setProject("pages/flock_sonification.csv");

  nodes.push(new Node((nodes[1].location.x),(nodes[1].location.y),'Sid Lee',false));
  addConnection(1,random(shortdistance,shortdistance+shortdistance/2));
  nodes[nodes.length-1].setProject("pages/sidlee_sonification.csv");  

  nodes.push(new Node((nodes[1].location.x),(nodes[1].location.y),'Webpd getting started',false));
  addConnection(1,random(shortdistance,shortdistance+shortdistance/2));
  nodes[nodes.length-1].setProject("pages/Webpd_getting_started.csv"); 

  nodes.push(new Node((nodes[1].location.x),(nodes[1].location.y),'Snow Night',false));
  addConnection(1,random(shortdistance,shortdistance+shortdistance/2));
  nodes[nodes.length-1].setProject("pages/snow_night.csv");  

  nodes.push(new Node((nodes[1].location.x),(nodes[1].location.y),'Bouncing Sequencer',false));
  addConnection(1,random(shortdistance,shortdistance+shortdistance/2));
  nodes[nodes.length-1].setProject("pages/bouncing_sequencer.csv");    

  nodes.push(new Node((nodes[1].location.x),(nodes[1].location.y),'FM Culture',false));
  addConnection(1,random(shortdistance,shortdistance+shortdistance/2));
  nodes[nodes.length-1].setProject("pages/fm_culture.csv");    

  nodes.push(new Node((nodes[1].location.x),(nodes[1].location.y),'The midst ...',false));
  addConnection(1,random(shortdistance,shortdistance+shortdistance/2));
  nodes[nodes.length-1].setProject("pages/the_midst.csv");  

  nodes.push(new Node((nodes[1].location.x),(nodes[1].location.y),'Rennes 2 soundscape',false));
  addConnection(1,random(shortdistance,shortdistance+shortdistance/2));
  nodes[nodes.length-1].setProject("pages/Electroni-k.csv");  

  nodes.push(new Node((nodes[1].location.x),(nodes[1].location.y),'this website',false));
  addConnection(1,random(shortdistance,shortdistance+shortdistance/2));
  addConnection(0,random(shortdistance,shortdistance+shortdistance/2));
  nodes[nodes.length-1].setProject("pages/algae-dom.csv");  
  
  selectedNode = nodes[0];

}


function draw() {
  t+=0.1;
  background(0);

  for (var i = 0 ; i < springs.length ; i++){
    springs[i].update();
    springs[i].display();
  }

  for (var i = 0 ; i < nodes.length ; i++){
    nodes[i].update();
    nodes[i].display();

    nodes[i].over(mouseX,mouseY);
    
    for (var j = 0 ; j < nodes.length ; j++){
      if (i!=j) nodes[i].attract(nodes[j]);
    }
  }

  noFill();
  stroke(255);
  ellipse(selectedNode.location.x,selectedNode.location.y,25,25);

}

function mouseDragged(){
  if (selectedNode != null) {    
    selectedNode.location.x = mouseX;
    selectedNode.location.y = mouseY;
  }
}

function mouseMoved() {
  var maxDist = 10; 
  if(mouseX<590){ // stay in our canvas range
    for (var i = 0; i < nodes.length; i++) {
      var d = dist(mouseX, mouseY, nodes[i].location.x, nodes[i].location.y);
      if (d < maxDist && nodes[i].overMe == false) {      
        selectedNode = nodes[i];
        setPage(selectedNode.page); // set the page with a custom parser function      
      }      
    }
  }
}



function setPage(project){

  removeElements();
  tags = [];

  var row ;
  var str ;
  var type ;
  var linebreak;
  var posY = -20; // keep track of where we're at building the page
  var posX = 600;

  for (var i = 1 ; i < project.getRowCount(); i++){
    row = project.getRow(i);
    type = row.getString(0);
    str = row.getString(1); 
    linebreak = row.getString(2);

    if (type == 'Title'){
      var title = createElement('h1',str);
      title.style(cssTitle);
      title.position(posX,posY);

      if (linebreak == 'True' || linebreak == ' True'){
        posY += title.height  ;
        posX = 600;
      } else {
        posX += title.width;
      }
    }

    else if (type == 'Video'){

      vid = createDiv(str,dummy);
      vid.style(cssTitle);
      vid.position(posX,posY);

      if (linebreak == 'True' || linebreak == ' True'){
        posY += vid.height ;
        posX = 600;
      } else {
        posX += vid.width;
      }
    }

    else if (type == 'Paragraph'){
      var description = createP(str);
      description.style(cssParagraph);
      description.size(720,AUTO);
      description.position(posX,posY);

      if (linebreak == 'True' || linebreak == ' True'){
        posY += description.height ;
        posX = 600;
      } else {
        posX += description.width;
      }
    }

    else if (type == 'Image'){
      var image = createImg(str);
      image.style(cssParagraph);
      image.size(AUTO,200);
      image.position(posX,posY);

      if (linebreak == 'True' || linebreak == ' True'){
        posY += image.height;
        posX = 600;
      } else {
        posX += image.width;
      }
    }

    else if (type == 'Tags'){
      var p = createP(str);
      p.style(cssTags);
      p.size(140,AUTO);
      p.position(posX,posY);
  
      p.mouseOver(check);

      if (linebreak == 'True' || linebreak == ' True'){
        posY += p.height ;
        posX = 600;
      } else {
        posX += p.width;
      }
    }

    else if (type == 'Icon'){
      var ic = createImg(str);
      ic.size(AUTO,38);
      ic.position(posX,posY);

       if (linebreak == 'True' || linebreak == ' True'){
        posY += ic.height  ;
        posX = 600;
      } else{
        posX += ic.width;
      }
    }
    else if (type =='Jump'){
      posY+=25;
    }
    else {
      var link = createA(str,row.getString(0)); // create an anchor element 
      link.style(cssLink);
      link.size(AUTO,18);
      link.position(posX,posY);

      if (linebreak == 'True'|| linebreak == ' True'){
        posY += link.height  ;
        posX = 600;
      } else {
        posX += link.width;
      }
    }
  }

  //console.log("new page loaded");
}

function check(param){
  console.log("over " + param.currentTarget.innerHTML);
 

  for (var i = 0 ; i < nodes.length ; i++){
    var checkpage = nodes[i].page;
    nodes[i].highlight = false;
    //println(checkpage.getRowCount());
    for (var j = 0 ; j < checkpage.getRowCount() ; j++){
      var checkrow = checkpage.getRow(j);
      //println(checkrow.getString(1));

      if(checkrow.getString(0) == 'Tags'){
        if(checkrow.getString(1) == param.currentTarget.innerHTML){
          nodes[i].highlight = true;
        }
        else if (nodes[i].highlight != true){

        }

      }
    }
    /*
    if (nodes[i].highlight == true){
      nodes[i].col = color(255,0,0);
      nodes[i].displayLabel = true;
    }
    else {
      nodes[i].col = color(255);
    }
    */

  }

  /*
  var tags = getElement('#processing');
  //println(tags.length);
  
  for (var i=0; i<tags.length; i++) {
    println(" "+tags[i].elt().value());
  }*/

}


function addConnection(index,l){
  springs.push( new Spring(nodes[index], nodes[nodes.length-1],l));
}

