let statusText=document.getElementById("status")
let statusAlarmDetected=0;
let closeBussines=true;


function getVideoWebCam(callback){
    navigator.getMedia = ( navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);

        navigator.getMedia(
            {
              video: true,
              audio: false
            },
            function(stream) {
              if (navigator.mozGetUserMedia) {
                video.mozSrcObject = stream;
              } else {
                var vendorURL = window.URL || window.webkitURL;
                video.srcObject = stream;
              }
              video.play();
              callback(video)
            },
            function(err) {
              console.log("An error occured! " + err);
            }
          );
}

getVideoWebCam((video)=>{
    detectionModel(video)
})

function detectionModel(video){
    cocoSsd.load().then(model=>{
    setInterval(() => {
        model.detect(video).then(predictions=>{
            if(predictions.length){
                if((predictions[0].class ='person' && predictions[0].score>0.6)&&closeBussines){
                    if(!statusAlarmDetected){
                        statusAlarmDetected=1;
                        callProtocolsAlarm()   
                    }
                }
            } else{
                statusText.innerText='INACTIVE ALARM'
                console.log("INACTIVE")
                statusAlarmDetected=0;
            }
        })
    }, 1000);
    })
}



function callProtocolsAlarm(){
    statusText.innerText='ACTIVE ALARM'
    let data={
        status:'active',
        date:new Date
    }
    let options={
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
          },
        body:JSON.stringify(data)
    }
    fetch("/alert",options).then((res)=>{
        console.log("Send Data Active Alarm Server")
    }).catch((err)=>{
        console.log("Err Send Data Active Alarm Server")
    })
}

document.getElementById('btn').addEventListener('click',callProtocolsAlarm)