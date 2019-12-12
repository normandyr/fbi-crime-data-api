'use strict';

var crimeslist = {};

function returnInfo(crime) {
	crimeslist = crime;
	/*
	console.log(crime);
	console.log(crimeslist);
	console.log(typeof crimeslist);
	console.log(crimeslist);
	console.log(crimeslist.state_abbr);
	console.log(crimeslist.population);
	console.log("End module =========");
	*/
	return crimeslist;
}

function getInfo() {
	return crimeslist;
};

exports.getInfo = getInfo;
exports.returnInfo = returnInfo;
