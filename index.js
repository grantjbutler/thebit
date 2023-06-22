const { default: OBSWebSocket } = require('obs-websocket-js');
const obs = new OBSWebSocket();
const io = require('socket.io-client');

const socket = io("http://localhost:8080");

socket.on("donation:save", () => {
  console.log("donation received")
})

// Declare some events to listen for.
obs.on('ConnectionOpened', () => {
  console.log('Connection Opened');
});

obs.on('Identified', () => {
	console.log('Identified, good to go!')
  socket.on("donation:save", () => {
    obs.call('GetSceneItemId', {sceneName: 'Test', sourceName: 'Color Source'}).then((data) => {
      obs.call('SetSceneItemTransform', 
      {
        sceneName: 'Test', 
        sceneItemId: data.sceneItemId, 
        sceneItemTransform: {scaleX: 0.5, scaleY: 0.5}})
    })
  })

});

obs.on('SwitchScenes', data => {
  console.log('SwitchScenes', data);
});

obs.connect('ws://172.17.128.1:4455', 'Bo8Ho959mwoFDVEF').then((info) => {
	console.log('Connected and identified', info)
}, () => {
	console.error('Error Connecting')
});
