var net = require('net');
var HOST = '0.0.0.0';
var PORT = 6969;

var count = 0;
var client = new net.Socket();
client.connect(PORT, HOST, function () {
    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    //Send StuID
    client.write('1234567890');
});

//Waiting For Response
client.on('data', function (data) {
    let answer = (Math.floor(Math.random() * 21)).toString()
    console.log('DATA: ' + data);
    
    //Check Response Word OK or WRONG for Send Random Number
    if(data.toString() === 'OK' || data.toString() === 'WRONG'){
        client.write(answer.toString())
        count++;
    }
    
    //Check and destroy when recieve word BINGO
    if(data.toString() === 'BINGO'){
        client.destroy();
    }
});

//Check event  Close Connect from server
client.on('close', function () {
    console.log('Connection closed by ' + count + " times");
    
});

//Check event error and log Error
client.on('error', (err)=>{
    console.log("Client Err is : " + err.message)
})