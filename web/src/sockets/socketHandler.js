var net = require('net');
// const http = require('http');
// const socketIo = require('socket.io');

// Create an HTTP server
// const server = http.createServer();
// const io = socketIo(server);

// // Listen for incoming connections
// io.on('connection', (socket) => {
//     console.log('A client connected');

//     // Listen for 'Update' event from client
//     socket.on('UPDATE', (data) => {
//         console.log('Received update:', data);
//         var client = new net.Socket();
//         client.connect(80, 'pixelsketch.local', function() {
//             console.log('Arduino Connected');
//             client.write(data);
//             client.destroy();
//         });
//     });

//     // Handle disconnection
//     socket.on('disconnect', () => {
//         console.log('Client disconnected');
//     });
// });

// // Start the server on port 3000
// server.listen(9080, () => {
//     console.log('Server is running on port 9080');
// });

const generateRandomImage = () => {
    let imageString = ''
    let startPixel = Math.floor(Math.random() * 256);
    let endPixel = Math.floor(Math.random() * 256);


    for (let i = Math.min(startPixel, endPixel); i < Math.max(startPixel, endPixel); i++) {
        imageString += `[${i}:${Math.floor(Math.random() * 8)}]`
    }

    return imageString;
}

var client = new net.Socket();
client.connect(80, 'pixelsketch.local', async function () {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
    console.log('Arduino Connected');
    client.write(flag);
    await sleep(10000)
    while (true) {
        client.write(generateRandomImage());
        await sleep(5000)
    }
    // client.write(generateRandomImage());
    // client.destroy();
});

const flag = '[0:3][1:3][2:3][3:3][4:3][5:3][6:3][7:5][8:5][9:3][10:3][11:3][12:3][13:3][14:3][15:3][16:3][17:3][18:3][19:3][20:3][21:3][22:5][23:5][24:5][25:5][26:3][27:3][28:3][29:3][30:3][31:3][32:3][33:3][34:3][35:3][36:3][37:5][38:5][39:5][40:5][41:5][42:5][43:3][44:3][45:3][46:3][47:3][48:3][49:3][50:3][51:3][52:5][53:4][54:4][55:4][56:4][57:4][58:4][59:5][60:3][61:3][62:3][63:3][64:3][65:3][66:3][67:5][68:4][69:4][70:4][71:4][72:4][73:4][74:4][75:4][76:5][77:3][78:3][79:3][80:3][81:3][82:5][83:4][84:4][85:4][86:4][87:4][88:4][89:4][90:1][91:4][92:4][93:5][94:3][95:3][96:3][97:5][98:5][99:4][100:4][101:4][102:4][103:4][104:4][105:4][106:4][107:4][108:4][109:5][110:5][111:3][112:5][113:5][114:5][115:1][116:1][117:1][118:1][119:1][120:1][121:1][122:1][123:1][124:1][125:5][126:5][127:5][128:5][129:5][130:5][131:4][132:4][133:4][134:4][135:4][136:4][137:4][138:4][139:4][140:4][141:5][142:5][143:5][144:3][145:5][146:5][147:4][148:4][149:4][150:1][151:4][152:4][153:4][154:4][155:4][156:4][157:5][158:5][159:3][160:3][161:3][162:5][163:4][164:4][165:1][166:4][167:1][168:4][169:4][170:4][171:1][172:4][173:5][174:3][175:3][176:3][177:3][178:3][179:5][180:4][181:4][182:1][183:4][184:4][185:4][186:4][187:4][188:5][189:3][190:3][191:3][192:3][193:3][194:3][195:3][196:5][197:4][198:1][199:4][200:4][201:4][202:4][203:5][204:3][205:3][206:3][207:3][208:3][209:3][210:3][211:3][212:3][213:5][214:5][215:5][216:5][217:5][218:5][219:3][220:3][221:3][222:3][223:3][224:3][225:3][226:3][227:3][228:3][229:3][230:5][231:5][232:5][233:5][234:3][235:3][236:3][237:3][238:3][239:3][240:3][241:3][242:3][243:3][244:3][245:3][246:3][247:5][248:5][249:3][250:3][251:3][252:3][253:3][254:3][255:3]';
