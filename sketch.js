let font;
let reset = false;
let message, reply, emotion;
let currentid = 1;
// let currentback = 0;
let next, rizz, shock, bkg, people;
let backs = [];
let emote = [];
let emote1 = [];
let aarya;
let rest, charn,charh,chara,parka,parkn,parkh;
function preload() {
  font = loadFont('fonts/Acme-Regular.ttf');
  message = loadTable('convos/message.csv', 'csv', 'header');
  reply = loadTable('convos/replies.csv', 'csv', 'header');
  emotions = loadTable('convos/emotions.csv', 'csv', 'header');
  next = new Audio("sounds/next.mp3");
  rizz = new Audio("sounds/rizz.mp3");
  shock = new Audio("sounds/shock.mp3");
  people = createAudio(" sounds/people.mp3 ");
  bkg = createAudio(" sounds/bkg.mp3 ");
  rest = loadImage(" backgrounds/Restaurant_B.png ");
  park = loadImage(" backgrounds/Temple_Spring_Day.png ");
  park2 = loadImage(" backgrounds/Temple_Summer_Afternoon.png ");

  parksong = createAudio(" sounds/parksong.mp3 ");

  // char1 = loadImage(" characters/char1.png ");
  charn = loadImage(" characters/charneutral.png ");
  chara = loadImage(" characters/charangry.png ");
  charh = loadImage(" characters/charhappy.png ");
  parkn = loadImage(" characters/char2n.png ");
  parka = loadImage(" characters/char2a.png ");
  parkh = loadImage(" characters/char2h.png");
}
let messages = [];
let replies = [];


function populate(){
  let idreply = reply.getColumn('id');
  let messagereply = reply.getColumn('message');
  let idnextreply = reply.getColumn('idnext');
  
  for(let i = 0; i < idreply.length; i++){
    replies.push(new Options(messagereply[i], idreply[i], idnextreply[i]));
  } 
  let idmessage = message.getColumn('id');
  let messagesq = message.getColumn('message');
  let idleft = message.getColumn('idleft');
  let idright = message.getColumn('idright');
  
  for(let i = 0; i < idmessage.length; i++){
    messages.push(new Messages(messagesq[i], idmessage[i], idleft[i], idright[i]));
  } 
  emotion = emotions.getColumn('emotion');
  emote[0] = charn;
  emote[1] = charh;
  emote[2] = chara;
  aarya = new Dater(emote);
  emote1[0] = parkn;
  emote1[1] = parkh;
  emote1[2] = parka;
  aarya1 = new Dater(emote1);
  print(emotion);
  print(replies);
  print(messages);
}

function countOccurrences(inputString, phrase) {
  // Initialize a counter to keep track of occurrences
  let count = 0;

  // Start searching for the phrase from the beginning of the string
  let position = inputString.indexOf(phrase);

  // Use a while loop to find and count all occurrences
  while (position !== -1) {
    count++;
    // Continue searching for the phrase from the position after the last occurrence
    position = inputString.indexOf(phrase, position + 1);
  }

  return count;
}

function addbreaks(inputString, dist){
  count = 0;
  breaks = "";
  for (let i = 0; i < inputString.length; i++){
    charac = inputString[i];
    count += 1;
    if(charac == " "){
       if(count > dist){
          breaks += "\n";
          count = 0;
        }else{
          breaks += inputString[i];
        }
    }else{
       breaks += inputString[i];
    }
  }
  return breaks;
}


function setup() {
  createCanvas(900, 700);
  textFont(font);
  chara.resize(480 *1.5,660*1.5);
  charh.resize(480 *1.5,660*1.5);
  charn.resize(480 *1.5,660*1.5);
  parka.resize(480 *1.5,660*1.5);
  parkh.resize(480 *1.5,660*1.5);
  parkn.resize(480 *1.5,660*1.5);
  populate();
  rest.resize(900, 700);
  park.resize(900,700);
  park2.resize(900,700);
  people.loop();
  people.play();
  people.volume(0.1);
  bkg.loop();
  bkg.play();
  bkg.volume(0.3);
  parksong.volume(0.3);
  parksong.loop();
  parksong.play();
  parksong.volume(0);
  parksong.stop();  
}

function scene(trigger){
  if(trigger == 0 ){
    let repid = messages[currentid-1].idleft;
    if(repid != 0){
      currentid = replies[repid -1].idnext;
    }
  }else if(trigger == 1){
    let repid = messages[currentid-1].idright;
    if(repid != 0){
      currentid = replies[repid -1].idnext;
      console.log(currentid);
    }
  }
}
function draw() {
  noStroke();
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  background("white");
  push();
  imageMode(CENTER);
  if(currentid < 30){
    parksong.volume(0);
    // parksong.stop();
    image(rest, width/2, height/2);
  }
  if(currentid == 30){
    background("black")
    // bkg.volume(0);
    // people.volume(0);
    people.stop();
    bkg.stop();
  }
  if(currentid > 30 && currentid < 66){
    image(park, width/2, height/2);
    // bkg.volume(0);
    // people.volume(0);
    people.stop();
    bkg.stop();

  }

  if(currentid > 34 && currentid < 46){
      push();
      noStroke();
      rectMode(CORNER);
      fill(0,0,0,120);
      rect(0,0,900,700);
      pop();
      parksong.volume(0);
      parksong.stop();
    }
  if(currentid > 49 && currentid < 55){
      aarya1.place();
  }
  if(currentid >= 66){

    image(park2, width/2, height/2);
  }
  if(currentid > 59 && currentid < 73){
      aarya1.place();
  }
  if(currentid > 73 && currentid < 76){
      aarya1.place();
  }

  if(currentid > 6 && currentid < 28){
    aarya.place();
  }
  if(currentid >= 66){
      push();  
      rectMode(CORNER);
      fill(253,94,83,50);
      rect(0,0,900,700);
      pop();
  }
  pop();
  textSize(25);
  messages[currentid-1].read();
  messages[currentid-1].kids();
  push();
  fill('black');
  noStroke();
  circle(mouseX, mouseY, 5);
  textSize(10);
  mousepos =  int(mouseX) + ", " + int(mouseY);

  text(mousepos, mouseX - 10, mouseY - 10);
  pop();
}
//737 max text length

function mouseMoved(){
    fill('black');
    noStroke();
    circle(mouseX, mouseY, 5);
    textSize(10);
    mousepos =  mouseX + ", " + mouseY;
    text(mousepos, mouseX - 10, mouseY - 10);
}
function keyPressed() {
  if (keyCode === 32) {
    if(currentid != 1){
      currentid = currentid -1;
    }
  }
  reset = true;
  if(keyCode == 82){
    currentid = 1;
  }
  if (keyCode == LEFT_ARROW){
    scene(0);
    next.play();
  }
  if (keyCode == RIGHT_ARROW){
    if(currentid == 1){
       bkg.play();
       people.play();
    }
    if(currentid == 30){
      parksong.loop();
      parksong.play();
      parksong.volume(0.3);

    }
    if(currentid == 45){
      parksong.play();
      parksong.volume(0.3);
    }
    scene(1);
    next.play();
  }
}


function maketextbox(x, y, note){
    noStroke();
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    textSize(25);
    let iters = countOccurrences(note, "\n");
    push();
    push();
    fill(0,100,100,173);
    rect(x + 5, y + 5, textWidth(note) + 50, 60 + 30*iters, 3);
    pop();
    fill(0,0,0,120);
    rect(x, y, textWidth(note) + 50, 60 + 30*iters, 3);
    push();
    stroke("white");
    strokeWeight(2);
    noFill();
    rect(x, y, textWidth(note) + 40, 50 + 30*iters, 2);
    pop();
    fill("white");
    text(note, x, y);
    pop();
}

class Messages{
  constructor(note, id, idleft, idright){
    this.note = note;
    this.note = addbreaks(this.note, 70);
    this.id = id;
    this.idleft = idleft;
    this.idright = idright;
  }
  read(){
    maketextbox(width/2, height*5/7, this.note);
  }
  kids(){
    if(this.idleft != 0){
      replies[this.idleft - 1].read(0);
    }
    if(this.idright != 0){
      replies[this.idright - 1].read(1);
    }
  }
}

class Options{
  constructor(note, id, nextid){
    this.note = note;
    this.note = addbreaks(this.note, 30);
    this.id = id;
    this.idnext = nextid;
  }
  read(lor){
    if(lor == 0){
      maketextbox(width/4, height*7/8, this.note);

    }else{
      maketextbox(width*3/4, height*7/8, this.note);
    }
  }
}

class Dater{
  constructor(emotion){
    this.x = width/2;
    this.y = height/2;
    this.emotion = emotion;
  }
  place(){
    push();
    imageMode(CENTER);
    let emotenum = emotion[currentid-1];
    maketextbox(140,420, "AARYA");
    image(this.emotion[emotenum], width/2, height/2 +200);
    pop();
  }

}