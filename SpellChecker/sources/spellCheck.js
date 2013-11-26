﻿var sockjs = require('sockjs'),
	nodehun = require('nodehun'),
	config = require('./config.json'),
	logger = require('./../../Common/sources/logger');
var arrDictionaries = {};

(function() {
	// Read dictionaries
	var arrDictionariesConfig = config['dictionaries'];
	var oDictTmp = null, pathTmp = '', oDictName = null;
	for (var indexDict = 0, lengthDict = arrDictionariesConfig.length; indexDict < lengthDict; ++indexDict) {
		oDictTmp = arrDictionariesConfig[indexDict];
		oDictName = oDictTmp.name;
		pathTmp = __dirname + '/../Dictionaries/' + oDictName + '/' + oDictName + '.';
		arrDictionaries[oDictTmp.id] = new nodehun.Dictionary(pathTmp + 'aff', pathTmp + 'dic');
	}
})();

/*function CheckDictionary (dict, correct, uncorect) {
	if (dict) {
		dict.spellSuggest(correct, function (a, b) {
			if(!a)
				logger.error('Error: spelling correct word %s failed!', correct);
		});

		dict.spellSuggestions(uncorect, function (a, b) {
			if(a)
				logger.error('Error: spelling uncorect word %s failed!', uncorect);
		});
	} else {
		logger.error('Error: no dictionary');
	}
}
CheckDictionary(arrDictionaries[0x0409], 'color', 'calor');*/
 
exports.install = function (server, callbackFunction) {
	'use strict';
	var sockjs_opts = {sockjs_url:"http://cdn.sockjs.org/sockjs-0.3.min.js"},
		sockjs_echo = sockjs.createServer(sockjs_opts),
		dataHandler;

	sockjs_echo.on('connection', function (conn) {
		if (null == conn) {
			logger.error ("null == conn");
			return;
		}
		conn.on('data', function (message) {
			try {
				var data = JSON.parse(message);
				dataHandler[data.type](conn, data);
			} catch (e) {
				logger.error("error receiving response:" + e);
			}

		});
		conn.on('error', function () {
			logger.error("On error");
		});
		conn.on('close', function () {
			logger.info("Connection closed or timed out");
		});
	});

	function sendData(conn, data) {
		conn.write(JSON.stringify(data));
	}

	dataHandler = (function () {
		function spellCheck(conn, data) {
			function checkEnd() {
				if (0 === data.usrWordsLength) {
					//data.end = new Date();
					//console.log("time - " + (data.end.getTime() - data.start.getTime()));
					sendData(conn, { type:"spellCheck", spellCheckData:JSON.stringify(data) });
				}
			}
			function spellSuggest(index, word, lang) {
				var oDictionary = arrDictionaries[lang];
				if (undefined === oDictionary) {
					data.usrCorrect[index] = false;
					--data.usrWordsLength;
					checkEnd();
				} else if ("spell" === data.type) {
					oDictionary.spellSuggest(word, function (a, b) {
						data.usrCorrect[index] = a;
						--data.usrWordsLength;
						checkEnd();
					});
				} else if ("suggest" === data.type) {
					oDictionary.spellSuggestions(word, function (a, b) {
						data.usrSuggest[index] = b;
						--data.usrWordsLength;
						checkEnd();
					});
				}
			}

			data = JSON.parse(data.spellCheckData);
			// Ответ
			data.usrCorrect = [];
			data.usrSuggest = [];
			data.usrWordsLength = data.usrWords.length;

			//data.start = new Date();
			for (var i = 0, length = data.usrWords.length; i < length; ++i) {
				spellSuggest(i, data.usrWords[i], data.usrLang[i]);
			}
		}

		return {
			spellCheck:spellCheck
		};
	}());

	sockjs_echo.installHandlers(server, {prefix:'/doc/[0-9-.a-zA-Z_=]*/c', log:function (severity, message) {
		//TODO: handle severity
		logger.info(message);
	}});

	callbackFunction();
};