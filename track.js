var csvContent = "data:text/csv;charset=utf-8,Name,Date,From,To,Duration\n";
var state = "offline";
var currName =  "";
var currImg = "";
var defImg = 'https://img.icons8.com/ios-filled/50/000000/whatsapp.png'
var startTime;
var endTime;

console.log("Mulai");

function GetOnline(){
   let main = document.getElementById("main");
   if(main != null || main != undefined){
      let name  = main.childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[0].innerText;
      
      if(name != currName){
         state = "offline";
         currName = name;   
         let img = main.childNodes[1].childNodes[0].childNodes[0].childNodes[0].src;
         currImg = (img != undefined ) ? img : defImg;
      }

      let objOnline = main.querySelectorAll('span[title="online"]');
      let objTyping = main.querySelectorAll('span[title="typing…"]')
     
      if((objOnline.length != 0 || objTyping.length != 0) && state == "offline"){
         state = "online";
         startTime = new Date().getTime();
         console.log("=== "+name+" === ");
         
         new Notification(`${name} Online`, {
            icon: currImg,
			body: `Time: ${DateFormat(startTime)}\n`
         });
        
         console.log(">> Mulai Online     : "+DateFormat(startTime));
      }else if((objOnline.length == 0 && objTyping.length == 0)  && state == "online" ){
         state = "offline";
         endTime = new Date().getTime();
         
         let diff = parseInt((endTime-startTime)/1000);
         let duration = `${parseInt(diff/60)} Menit ${diff%60} Detik`;
         
         csvContent += `${name},${new Date(startTime).toLocaleDateString()},${new Date(startTime).toLocaleTimeString()},${new Date(endTime).toLocaleTimeString()},${duration}\n`;
         
         new Notification(`${name} Offline`, {
            icon: currImg,
			body: `Dari ${new Date(startTime).toLocaleDateString()},  ${new Date(startTime).toLocaleTimeString()} sampai ${new Date(endTime).toLocaleTimeString()}\n Durasi: ${duration}`
         });
                
         console.log(">> Terakhir Online  : "+DateFormat(endTime)+", Durasi "+duration);
         console.log("===================")
      }
   }
}

var intervalID = setInterval(function(){GetOnline()}, 1000);

function StopMonitor(){
   console.log("Selesai");
   clearInterval(intervalID);
}

function DateFormat(date){
    return new Date(date).toLocaleDateString()+" "+new Date(date).toLocaleTimeString()
}

function DownloadCSV() {
	data = encodeURI(csvContent);
	let link = document.createElement("a");
	link.setAttribute("href", data);
	link.setAttribute("download", "stalk_data.csv");
	document.body.appendChild(link);
	link.click();
}
