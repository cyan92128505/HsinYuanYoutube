const YoutubeMp3Downloader = require("youtube-mp3-downloader");

const path = require('path');
const fs = require('fs-extra');
const Async = require('async');

const ffmpegPath = path.join(process.cwd(), 'ffmpeg', 'ffmpeg.exe');
const outputPath = path.join(process.cwd(), 'output');
const sourceList = [
	"Epu-R_csDHs",
	"5zEFsOHs2Pc",
	"FQ6ZqEpIWS0",
	"ABR1p-b4f_o",
	"1VYE7WOj2kI",
	"fgsjrFuetLg",
	"bBQLKQUqqTQ",
	"wjYrew7n3Xk"
];

var ydGenerator = function ydGenerator() {
	//Configure YoutubeMp3Downloader with your settings
	return new YoutubeMp3Downloader({
		"ffmpegPath": ffmpegPath, // Where is the FFmpeg binary located?
		"outputPath": outputPath, // Where should the downloaded and encoded files be stored?
		"youtubeVideoQuality": "highest", // What video quality should be used?
		"queueParallelism": 2, // How many parallel downloads/encodes should be started?
		"progressTimeout": 2000 // How long should be the interval of the progress reports
	}); ;
}

module.exports = function () {
	console.log(JSON.stringify(sourceList, null, 4));
	Async.map(sourceList, (item,
			unitCallback) => {
		var yd = ydGenerator();
		yd.download(item);
		yd.on("finished", function (err, data) {
			console.log(JSON.stringify(data));
			unitCallback(null, item);
		});
	}, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Done <3');
		}
	});
}
