'use strict';

const submitInfo = function(state_abbr, id) {
	console.log(state_abbr, id + " this is top");
	const xhrPost = new XMLHttpRequest();
	var result;
	xhrPost.responseType = 'json';
	xhrPost.open('POST', '/result');
	xhrPost.setRequestHeader('Content-Type', 'application/json');
	

	xhrPost.addEventListener('load', function() {
		
		result = xhrPost.response;
		console.log(result)
		
		console.log(typeof(result) + " <== Check the type of returning data");
		console.log("Selected State: " + result.year + " <==== Check content of returning data");
		console.log("==================");
		console.log(result.burglary);
		
		let stateResult = document.querySelector('#stateResult');
		stateResult.innerHTML = '<div><strong> Crime report of the State ' + state_abbr + ' in the year of ' + result.year + '</strong></div>';
		
		let t1 = "Total population: ",
			t2 = "Total violent crime: ",
			t3 = "Total homicide: ",
			t4 = "Total rape legacy: ",
			t5 = "Total robbery: ",
			t6 = "Total aggravated assault: ",
			t7 = "Total property crime: ",
			t8 = "Total burglary: ",
			t9 = "Total larceny: ",
			t10 = "Total motor vehicle theft: ";
			

		let ul = document.querySelector('ul'),
			text1 = document.createTextNode(t1 + result.population + ' cases'),
			text2 = document.createTextNode(t2 + result.violent_crime + ' cases'),
			text3 = document.createTextNode(t3 + result.homicide + ' cases'),
			text4 = document.createTextNode(t4 + result.rape_legacy + ' cases'),
			text5 = document.createTextNode(t5 + result.robbery + ' cases'),
			text6 = document.createTextNode(t6 + result.aggravated_assault + ' cases'),
			text7 = document.createTextNode(t7 + result.property_crime + ' cases'),
			text8 = document.createTextNode(t8 + result.burglary + ' cases'),
			text9 = document.createTextNode(t9 + result.larceny + ' cases'),
			text10 = document.createTextNode(t10 + result.motor_vehicle_theft + ' cases'),
			li1 = document.createElement('li'),
			li2 = document.createElement('li'),
			li3 = document.createElement('li'),
			li4 = document.createElement('li'),
			li5 = document.createElement('li'),
			li6 = document.createElement('li'),
			li7 = document.createElement('li'),
			li8 = document.createElement('li'),
			li9 = document.createElement('li'),
			li10 = document.createElement('li');
		
		while (ul.firstChild){
			ul.removeChild(ul.firstChild);
		}
	
		li1.appendChild(text1);
		ul.appendChild(li1);
		li2.appendChild(text2);
		ul.appendChild(li2);		
		li3.appendChild(text3);
		ul.appendChild(li3);			
		li4.appendChild(text4);
		ul.appendChild(li4);			
		li5.appendChild(text5);
		ul.appendChild(li5);			
		li6.appendChild(text6);
		ul.appendChild(li6);			
		li7.appendChild(text7);
		ul.appendChild(li7);			
		li8.appendChild(text8);
		ul.appendChild(li8);			
		li9.appendChild(text9);
		ul.appendChild(li9);	
		li10.appendChild(text10);
		ul.appendChild(li10);			

	});

	xhrPost.addEventListener('error', function() {
		console.error('Error occured :( :((((');
	});


	/*xhrPost.timeout = 1 * 1000;
	xhrPost.addEventListener('timeout', function() {
		console.warn('Timeout');
	});*/

	xhrPost.send(JSON.stringify({state_abbr: state_abbr,
			year: id}));
};

var states = [{"name": "Alabama", "abbreviation": "AL"}, {"name": "Alaska","abbreviation": "AK"},{"name": "American Samoa","abbreviation": "AS"},{"name": "Arizona","abbreviation": "AZ"},{"name": "Arkansas","abbreviation": "AR"},{"name": "California","abbreviation": "CA"},{"name": "Colorado","abbreviation": "CO"},{"name": "Connecticut","abbreviation": "CT"},{"name": "Delaware","abbreviation": "DE"},{"name": "District Of Columbia","abbreviation": "DC"},{"name": "Federated States Of Micronesia","abbreviation": "FM"},{"name": "Florida","abbreviation": "FL"},{"name": "Georgia","abbreviation": "GA"},{"name": "Hawaii","abbreviation": "HI"},{"name": "Idaho","abbreviation": "ID"},{"name": "Illinois","abbreviation": "IL"},{"name": "Indiana","abbreviation": "IN"},{"name": "Iowa","abbreviation": "IA"},{"name": "Kansas","abbreviation": "KS"},{"name": "Kentucky","abbreviation": "KY"},{"name": "Louisiana","abbreviation": "LA"},{"name": "Maine","abbreviation": "ME"},{"name": "Marshall Islands","abbreviation": "MH"},{"name": "Maryland","abbreviation": "MD"},{"name": "Massachusetts","abbreviation": "MA"},{"name": "Michigan","abbreviation": "MI"},{"name": "Minnesota","abbreviation": "MN"},{"name": "Mississippi","abbreviation": "MS"},{"name": "Missouri","abbreviation": "MO"},{"name": "Montana","abbreviation": "MT"},{"name": "Nebraska","abbreviation": "NE"},{"name": "Nevada","abbreviation": "NV"},{"name": "New Hampshire","abbreviation": "NH"},{"name": "New Jersey","abbreviation": "NJ"},{"name": "New Mexico","abbreviation": "NM"},{"name": "New York","abbreviation": "NY"},{"name": "North Carolina","abbreviation": "NC"},{"name": "North Dakota","abbreviation": "ND"},{"name": "Northern Mariana Islands","abbreviation": "MP"},{"name": "Ohio","abbreviation": "OH"},{"name": "Oklahoma","abbreviation": "OK"},{"name": "Oregon","abbreviation": "OR"},{"name": "Pennsylvania","abbreviation": "PA"},{"name": "Puerto Rico","abbreviation": "PR"},{"name": "Rhode Island","abbreviation": "RI"},{"name": "South Carolina","abbreviation": "SC"},{"name": "South Dakota","abbreviation": "SD"},{"name": "Tennessee","abbreviation": "TN"},{"name": "Texas","abbreviation": "TX"},{"name": "Utah","abbreviation": "UT"},{"name": "Vermont","abbreviation": "VT"},{"name": "Virgin Islands","abbreviation": "VI"},{"name": "Virginia","abbreviation": "VA"},{"name": "Washington","abbreviation": "WA"},{"name": "West Virginia","abbreviation": "WV"},{"name": "Wisconsin","abbreviation": "WI"},{"name": "Wyoming","abbreviation": "WY"}],
	years = [{"id": "1995"},{"id": "1996"},{"id": "1997"},{"id": "1998"},{"id": "1999"},{"id": "2000"},{"id": "2001"},{"id": "2002"},{"id": "2003"},{"id": "2004"},{"id": "2005"},{"id": "2006"},{"id": "2007"},{"id": "2008"},{"id": "2009"},{"id": "2010"},{"id": "2011"},{"id": "2012"},{"id": "2013"},{"id": "2014"},{"id": "2015"},{"id": "2016"},{"id": "2017"}];

document.querySelector('#selectYear').addEventListener('change', function(evt) {
	evt.preventDefault();
	
	const inputYear = document.querySelector('#selectYear'),
		year_id = inputYear.value;
	const inputState = document.querySelector('#selectState'),
		state_name = inputState.value;
		console.log(state_name + " this is state name queryselctor")
	
	inputYear.value = '';
	console.log(year_id);
	inputState.value = '';
	console.log(state_name);
		
	for(let i = 0; i < years.length; i++) {
		if (year_id === years[i].id) {
			var id = years[i].id;    
		}
	}
	console.log(id + " <== This is the selected year");
	for(let i = 0; i < states.length; i++) {
		console.log(state_name + " this is state name in for");
		console.log(states[i].name + " this si state list name");
		console.log(states[i].abbreviation)
		if (state_name == states[i].name) {
			console.log(state_name + " this is state name in for");
			console.log(states[i].name + " this si state list name");
			var state_abbr = states[i].abbreviation;    
			console.log(state_abbr + " <==== UE ");
			break;
		}
	}
	console.log(state_abbr + " OOKKK");
	console.log(id);
	submitInfo(state_abbr, id);
});
