const net = require('net');
const HOST = '0.0.0.0';
const PORT = 6969;
const server = net.createServer();
var countForDisconnect = 0;

server.listen(PORT, HOST, () => console.log('Server running on port : ' + PORT));
server.on('connection', (sock) => {

    //Function Random Number
    const answer = Math.floor(Math.random() * 21)

    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);

    //Check event data
    sock.on('data', (data) => {
        console.log('From Client IP is ==>' + sock.remoteAddress + ':' + sock.remotePort + " \nDATA is ==>" + data + "\n");

        //Check Student NUMBER
        if (data.length === 10) {
            sock.write('OK');
        }

        //Check Number and length
        if (data.toString() !== answer.toString() && data.length <= 2) {
            sock.write('WRONG');
        }

        //Check Number Eq
        if (data.toString() === answer.toString()) {
            sock.write('BINGO');
            sock.destroy()
        }

        //Check Wrong username or Number 1 or 2 length
        if (data.length < 10 && data.length !== 2 && data.length !== 1) {
            sock.write('WRONG username')
            sock.destroy();
        }

        //Set Count Until 5
        if (countForDisconnect === 5) {
            sock.destroy()
            countForDisconnect = 0;
        }

        //add Limit response Until 5
        countForDisconnect++;
    });

    //Capture Event on close
    sock.on('close', () => {
        console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
    })

    //Capture Event Error
    sock.on('error', (err) => {
        console.error("Error ==> " + sock.remoteAddress + ':' + sock.remotePort + ' Error is ' + err.message);
    })
})
