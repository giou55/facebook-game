var person, info1, info2, info3, info4, info5, info6, x, i, win, unknown_img, xmlDoc, q, questions;

var face = document.getElementById('face');
var front = document.getElementById("front");
var back = document.getElementById("back");
var about = document.getElementById("about");

var sound1 = document.getElementById("sd1");
var sound2 = document.getElementById("sd2");

var myForm = document.getElementById("f");
var message = document.getElementById("w");
var sub_btn = document.getElementById("btn");
var next_btn = document.getElementById("next_btn");
var answ = document.getElementById("answer1");

var dd = document.getElementsByClassName("num");

//about time progress bar
var elem = document.getElementById("myBar");
var label = document.getElementById("label");
var myProgress = document.getElementById("myProgress");
var height;
var sec;
var id;

//about modal window
var msg1 = document.getElementById("msg1");
var msg2 = document.getElementById("msg2");
var win_msg = ["Μπράβο Κερδίσατε!", "ΞΑΝΑΠΑΙΞΤΕ"];
var loose_msg = ["Δυστυχώς χάσατε!", "ΞΑΝΑΠΑΙΞΤΕ"];
var welcome_msg = ["Στο παιχνίδι αυτό πρέπει να βρείτε τα 11 κρυμμένα πρόσωπα μέσα σε 110 δευτερόλεπτα!", "ΠΑΙΞΤΕ"];


var UpperCaser = { 
   MAP: {'ά':'α', 'έ':'ε', 'ό':'ο', 'ώ':'ω', 'ύ':'υ', 'ί':'ι', 'ή':'η', 'ς':'σ', 'Ά':'Α', 'Ό':'Ο', 'Έ':'Ε' 
   }, 
   toUpper: function(text) { 
      if (!text) return ''; 
      var i, c; 
      for(i = 0; i < text.length; i++) { 
         c = text[i]; 
         if (this.MAP[c]) { 
            text = this.replaceAt(text, i, this.MAP[c]); 
         } 
      } 
      return text.toUpperCase(); 
   }, 
   replaceAt: function(text, index, char) { 
      return text.substr(0, index) + char + text.substr(index+char.length); 
   } 
} 

								 
if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp = new XMLHttpRequest();
  }
else {// code for IE6, IE5
  xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.open("GET","persons.xml",false);
xmlhttp.send();
xmlDoc = xmlhttp.responseXML; 
x = xmlDoc.getElementsByTagName("person");

								 
function resetPersons() {
	i = 0;
    info1 = x[i].getElementsByTagName("s1")[0].childNodes[0].nodeValue;
    info2 = x[i].getElementsByTagName("s2")[0].childNodes[0].nodeValue;
    info3 = x[i].getElementsByTagName("s3")[0].childNodes[0].nodeValue;
    info4 = x[i].getElementsByTagName("fname")[0].childNodes[0].nodeValue;
    info5 = x[i].getElementsByTagName("lname")[0].childNodes[0].nodeValue;
    info6 = x[i].getElementsByTagName("pic")[0].childNodes[0].nodeValue;
	txt = "1) " + info1 + "<br>2) " + info2 + "<br>3) "+ info3;
    about.innerHTML = txt;
	front.style.backgroundImage = "url('images/unknown.jpg')";
}
								 
function resetNumbers() {
	$("#numbers").find("p").removeClass("selected");
    $("#numbers").find("p").removeClass("win");
	$("#numbers").find("p").addClass("num");
    $("#numbers").find("p").eq(i).addClass("selected");
}
								 
function resetTime() {
	height = 0;
    sec = 0;
    elem.style.height = 0;
    label.innerHTML = 0;
	myProgress.style.backgroundColor = "#4CAF50";
}

function init() {
    resetPersons();
    resetNumbers();
	resetTime();
    win = false;
    unknown_img = true;
    questions = [0,1,2,3,4,5,6,7,8,9,10];
    msg1.innerHTML = welcome_msg[0];
    msg2.innerHTML = welcome_msg[1];
    modal.style.display = "block";
    msg2.style.cursor = "pointer";
    msg2.addEventListener("click", playGame);
}
								 
function frame() {
	if (height < 550) {
       if (height == 500) {
             document.getElementById("myProgress").style.backgroundColor = "#f00";
       }
       height = height + 5;
       sec++;
       elem.style.height = height + "px";
       label.innerHTML = sec;
    } else {
            clearInterval(id);
            msg1.innerHTML = loose_msg[0];
            msg2.innerHTML = loose_msg[1];
            msg2.addEventListener("click", playGame);
            modal.style.display = "block";
    } 
}
								 
function playGame() {
	resetPersons();
    resetNumbers();
    resetTime();
    win = false;
    questions = [0,1,2,3,4,5,6,7,8,9,10];
	myForm.reset();
    answ.focus();
    next_btn.disabled = false;
    message.innerHTML = "Πληκτρολογήστε το όνομα που πιστεύετε οτι είναι η σωστή απάντηση:";
    modal.style.display = "none";
    msg2.removeEventListener("click", playGame);
	if (unknown_img == false) {
        $("#face").toggleClass("flipped");
		unknown_img = true;
    }
    id = setInterval(frame, 1000);
}
							 
function next() {
     if (i < questions.length-1) {
          i++;
          q = questions[i];
     } else {
             i = 0;
             q = questions[i];
            }
     info1 = (x[q].getElementsByTagName("s1")[0].childNodes[0].nodeValue);
     info2 = (x[q].getElementsByTagName("s2")[0].childNodes[0].nodeValue);
     info3 = (x[q].getElementsByTagName("s3")[0].childNodes[0].nodeValue);
     info4 = (x[q].getElementsByTagName("fname")[0].childNodes[0].nodeValue);
     info5 = (x[q].getElementsByTagName("lname")[0].childNodes[0].nodeValue);
     info6 = (x[q].getElementsByTagName("pic")[0].childNodes[0].nodeValue);
     txt = "1) " + info1 + "<br>2) " + info2 + "<br>3) "+ info3;
     about.innerHTML = txt;
     // style the numbers
     if (q == questions[0]) {
          $("#numbers").find("p").eq(questions[0]).addClass("selected");
          $("#numbers").find("p").eq(questions[questions.length - 1]).removeClass("selected");
     } else {
         $("#numbers").find("p").eq(questions[i]).addClass("selected");
         $("#numbers").find("p").eq(questions[i-1]).removeClass("selected");
         $("#numbers").find("p").eq(questions[i-1]).addClass("num");
     }
     myForm.reset();
	 answ.focus();
     message.innerHTML = "Πληκτρολογήστε το όνομα που πιστεύετε οτι είναι η σωστή απάντηση:";
     if (win) {
        $("#face").toggleClass("flipped");
        win = false;
     }
	 unknown_img = true;
     sub_btn.disabled = false;
}

function submit_answer() {
   if (document.myForm.answer.value!=="") {
	  var answer = document.myForm.answer.value;
	  if (UpperCaser.toUpper(answer) == UpperCaser.toUpper(info4) || UpperCaser.toUpper(answer) == UpperCaser.toUpper(info5)) {
	      message.innerHTML = "<span>ΣΩΣΤΗ ΑΠΑΝΤΗΣΗ! "+info4+"</span>";
          back.style.backgroundImage = info6;
          $("#face").toggleClass("flipped");
          sub_btn.disabled = true;
          win = true;
		  unknown_img = false;
          $("#numbers").find("p").eq(questions[i]).removeClass("selected");
          $("#numbers").find("p").eq(questions[i]).addClass("win");
          questions.splice(i, 1);
          i = i-1;
          sound1.play();
	      document.myForm.answer.value="";
		  if (questions.length==1) {
				next();
				$("#numbers").find("p").eq(questions[i]).addClass("selected");
				next_btn.disabled = true;
		  }
          if (questions.length==0) {
			  clearInterval(id);
			  msg1.innerHTML = win_msg[0];
		      msg2.innerHTML = win_msg[1];
              modal.style.display = "block";
			  msg2.addEventListener("click", playGame);
          }
	  }
      else {
		 message.innerHTML = "<span>ΛΑΘΟΣ ΑΠΑΝΤΗΣΗ. Προσπαθήστε ξανά!</span><br>";
		 front.style.backgroundImage = "url('images/unknown.jpg')";
		 answ.focus();
         sound2.currentTime = 2;
         sound2.play();
      }
   }
}

