import 'rtcmulticonnection-v3/dist/RTCMultiConnection.min';

const createWebRTC = () => {
  const connection = new window.RTCMultiConnection();
  connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';
  connection.session = {
    audio: true,
    video: true,
    data: true,
  };
  connection.socketMessageEvent = 'video-broadcast';

  connection.session.broadcast = true;
  connection.session.oneway = true;

  connection.onstream = (event) => {
    connection.mainContainer = document.getElementById('main-broadcast');
    connection.mainContainer.src = event.blobURL;
    connection.mainContainer.muted = false;
  };

  return connection;
};

export default createWebRTC;
