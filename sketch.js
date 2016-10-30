
// add bounding box for nodes
// feature : add sound ! and button to mute it :)

// correct search bar
// beeter layout
// latest p5js version ?



var nodes = [];
var springs = [];

var tags = [];

var longdistance = 120 ;
var shortdistance = 45;

var selectedNode =null;
var selectedNodeX;
var selectedNodeY;


var cssTitle = "font-family: 'Open Sans Condensed', sans-serif; background-color:#000000; color:#FFFFFF; font-size:18pt; padding:10px;text-align: center;";
var cssButton = "font-family: 'Open Sans Condensed', sans-serif; background-color:#000000; color:#FFFFFF; font-size:17pt; padding:2px;text-align: center;";
var cssTags = "font-family: 'Open Sans Condensed', sans-serif; background-color:#000000; color:#FFFFFF; padding:10px;";
var cssParagraph = "font-family:monospace; background-color:#000000; color:#FFFFFF; padding:10px;";
var cssLink = "font-family: 'Open Sans Condensed', sans-serif;; background-color:#000000; color:#FFFFFF; font-size:10pt; padding:10px;";

var t = 0; // for pulsing nodes

var input, button;


function init(){

  setPage(nodes[0].page);
}

function setup() {
  	
  createCanvas(windowWidth/3  , 1080);
  smooth();

  textFont("Open Sans Condensed");

  nodes = [];
  springs = [];
  //0
  nodes.push(new Node((width*2/5),(height/12),'HOME',true));
  nodes[0].setProject("pages/home.csv");

  //1
  nodes.push(new Node(width*3/5,height/4,'WEB',true));
  addConnection(0,200);
  nodes[1].setProject("pages/Web.csv");
   //2
  nodes.push(new Node(width*3/5,height*2/4,'WEBPD',true));
  addConnection(1,150);
  nodes[2].setProject("pages/Web.csv");
  //3
  nodes.push(new Node(width*4/5,height/4,'P5JS',true));
  addConnection(1,150);
  nodes[3].setProject("pages/Web.csv");
  //4
  nodes.push(new Node(width*2/5,height/4,'ANDROID',true));
  addConnection(0,200);
  nodes[4].setProject("pages/Android.csv");
  //5
  nodes.push(new Node(width*1/6,random(height/8,height/3),'DESKTOP',true));
  addConnection(0,200);
  nodes[5].setProject("pages/Desktop.csv");

  // android
  nodes.push(new Node((nodes[4].location.x),(nodes[4].location.y+20),'DroidParty tutorials',false));
  addConnection(4,random(shortdistance,shortdistance+shortdistance/2));
  nodes[nodes.length-1].setProject("pages/droidparty_tuto.csv");

  nodes.push(new Node((nodes[4].location.x),(nodes[4].location.y+20),'Springs',false));
  addConnection(4,random(shortdistance,shortdistance+shortdistance/2));
  nodes[nodes.length-1].setProject("pages/springs.csv");

  nodes.push(new Node((nodes[4].location.x),(nodes[4].location.y+20),'Musicbox 3D',false));
  addConnection(4,random(shortdistance,shortdistance+shortdistance/2));
  nodes[nodes.length-1].setProject("pages/musicbox3d.csv");  

  nodes.push(new Node((nodes[4].location.x),(nodes[4].location.y+20),'Pendulum Phase',false));
  addConnection(4,random(shortdistance,shortdistance+shortdistance/2));
  nodes[nodes.length-1].setProject("pages/pendulum-phase.csv");  

    nodes.push(new Node((nodes[4].location.x),(nodes[4].location.y+20),'PPP',false));
  addConnection(4,random(shortdistance,shortdistance+shortdistance/2));
  nodes[nodes.length-1].setProject("pages/ppp.csv");  

  // desktop
  nodes.push(new Node((nodes[5].location.x),(nodes[5].location.y+20),'Data Sonification',false));
  addConnection(5,random(shortdistance,shortdistance+shortdistance/2));
  nodes[nodes.length-1].setProject("pages/datasonification.csv");  

  nodes.push(new Node((nodes[5].location.x),(nodes[5].location.y+20),'Blends and shaders',false));
  addConnection(5,random(shortdistance,shortdistance+shortdistance/2));
  nodes[nodes.length-1].setProject("pages/blends_n_shaders.csv");  

  nodes.push(new Node((nodes[5].location.x),(nodes[5].location.y+20),'Pure-Data Intro',false));
  addConnection(5,random(shortdistance,shortdistance+shortdistance/2));
  nodes[nodes.length-1].setProject("pages/cours-pd.csv");  

  nodes.push(new Node((nodes[5].location.x),(nodes[5].location.y+20),'Processing Intro',false));
  addConnection(5,random(shortdistance,shortdistance+shortdistance/2));
  nodes[nodes.length-1].setProject("pages/cours-processing.csv");  



  // web
 
  nodes.push(new Node((nodes[3].location.x),(nodes[3].location.y+20),'Happy Birthday codelab',false));
  addConnection(3,random(shortdistance,longdistance));
  addConnection(2,random(shortdistance,longdistance));
  nodes[nodes.length-1].setProject("pages/codelab_sonification.csv");  

  nodes.push(new Node((nodes[2].location.x),(nodes[2].location.y+20),'Webpd getting started',false));
  addConnection(2,random(shortdistance,shortdistance+shortdistance/2));
  nodes[nodes.length-1].setProject("pages/Webpd_getting_started.csv"); 

  nodes.push(new Node((nodes[2].location.x),(nodes[2].location.y+20),'Webpd experiments',false));
  addConnection(2,random(shortdistance,shortdistance+shortdistance/2));
  nodes[nodes.length-1].setProject("pages/Webpd_experiments.csv");    

  nodes.push(new Node((nodes[2].location.x),(nodes[2].location.y+20),'The midst ...',false));
  addConnection(2,random(shortdistance,shortdistance+shortdistance/2));
  nodes[nodes.length-1].setProject("pages/the_midst.csv");  

  nodes.push(new Node((nodes[2].location.x),(nodes[2].location.y+20),'Rennes soundscape',false));
  addConnection(2,random(shortdistance,shortdistance+shortdistance/2));
  nodes[nodes.length-1].setProject("pages/Electroni-k.csv");  


  nodes.push(new Node((nodes[3].location.x)+20,(nodes[3].location.y-50),'this website',false));
  addConnection(3,230);
  addConnection(0,230);
  nodes[nodes.length-1].setProject("pages/algae-DOM.csv");  

  nodes.push(new Node((nodes[3].location.x),(nodes[3].location.y+20),'P5js sound experiments',false));
  addConnection(3,random(shortdistance,shortdistance+shortdistance/2));
  nodes[nodes.length-1].setProject("pages/p5js_sound_experiments.csv");  

  nodes.push(new Node((nodes[1].location.x),(nodes[1].location.y-40),'Openprocessing - Reinetiere',false));
  addConnection(1,random(shortdistance,shortdistance+shortdistance/2));
  nodes[nodes.length-1].setProject("pages/reinetiere.csv");  
  
  
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

  input = createInput();
  input.position(0, 0);

  input.style("font-family: 'Open Sans Condensed', sans-serif; background-color:#000000; color:#FFFFFF; font-size:10pt; padding:2px;text-align: center;");
  input.size(600,AUTO);

  button = createButton('search');
  button.style("font-family: 'Open Sans Condensed', sans-serif; background-color:#000000; color:#FFFFFF; font-size:10pt; padding:2px;text-align: center;");
  button.size(AUTO,10);
  button.position(input.width, 0);
  button.mousePressed(search);

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
      image.size(350,200);
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
      p.size(400  ,AUTO);
      p.position(posX,posY);
  
      p.mouseOver(check);

      if (linebreak == 'True' || linebreak == ' True'){
        posY += p.height ;
        posX = 600;
      } else {
        posX += 150;
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
  }
}

function search(param){
  var name = input.value();
   for (var i = 0 ; i < nodes.length ; i++){
    var checkpage = nodes[i].page;
    nodes[i].highlight = false;
    for (var j = 0 ; j < checkpage.getRowCount() ; j++){
      var checkrow = checkpage.getRow(j);
      if(checkrow.getString(1).match(name) !=null){
          nodes[i].highlight = true;
      }
      else if (nodes[i].highlight != true){
      }
    }
  }

}


function addConnection(index,l){
  springs.push( new Spring(nodes[index], nodes[nodes.length-1],l));
}

