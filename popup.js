document.getElementById('start').onclick = function(element) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.executeScript(
			tabs[0].id,
			{file: 'track.js'}
        );
	});
};

document.getElementById('stop').onclick = function(element) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.executeScript(
			tabs[0].id,
			{code: 'StopMonitor()'}
        );
	});
};

document.getElementById('download').onclick = function(element) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.executeScript(
			tabs[0].id,
			{code: 'DownloadCSV()'}
        );
	});
};

