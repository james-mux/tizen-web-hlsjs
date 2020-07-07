var pause = true;
var logMessages = 0;

window.onload = function() {

    // add eventListener for keydown
    document.addEventListener('keydown', function(e) {
        switch (e.keyCode) {
        	case 19: //pause
        		video.pause();
        		pause = true;
        		break;
        	case 415: //play
        		video.play();
        		pause = false;
        		break;
            case 37: //LEFT arrow
                break;
            case 38: //UP arrow
                break;
            case 39: //RIGHT arrow
                break;
            case 40: //DOWN arrow
                break;
            case 13: //OK button
                break;
            case 10009: //RETURN button
                tizen.application.getCurrentApplication().exit();
                break;
            case 10252: // Play/Pause button
            	if (pause) {
            		video.play();
            		pause = false;
            	} else {
            		video.pause();
            		pause = true;
            	}
            	break;
            default:
                console.log('Key code : ' + e.keyCode);
                break;
        }
    });

    // setup hls.js
    var video = document.getElementById('video');
    var videoSrc = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

    if (Hls.isSupported()) {
        // using MSE
        console.log('USING MSE PLAYBACK');
        var hls = new Hls();
        hls.loadSource(videoSrc);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
            // video.play();
        });
        
        // bind to all hls.js events (WARNING: heavy load!)
        Object.keys(Hls.Events).forEach(function (e) {
            hls.on(Hls.Events[e], log);
        });
        
        function log(e){
        	console.log(e);
        }
    }
    //Intercept the console.log
    if (typeof console != "undefined") 
        if (typeof console.log != 'undefined')
            console.olog = console.log;
        else
            console.olog = function() {};

    console.log = function(message) {
    	// clear out the div if it gets too full
    	if (logMessages > 50) {
    		document.getElementById('debug').innerHTML = '';
    		logMessages = 0;
    	}
        console.olog(message);
        document.getElementById('debug').innerHTML +=  message + ' ### ' ;
        logMessages++;
    };
    console.error = console.debug = console.info =  console.log
    
};


