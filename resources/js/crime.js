'use strict';

function state() {
    open("/state","_self");
}

function crime() {
    open("/crime","_self");
}

function back() {
    history.back();
}

function selectState() {
    let states = [{"name": "Alabama", "abbreviation": "AL"}, {"name": "Alaska","abbreviation": "AK"},{"name": "Arizona","abbreviation": "AZ"},{"name": "Arkansas","abbreviation": "AR"},{"name": "California","abbreviation": "CA"},{"name": "Colorado","abbreviation": "CO"},{"name": "Connecticut","abbreviation": "CT"},{"name": "Delaware","abbreviation": "DE"},{"name": "District Of Columbia","abbreviation": "DC"},{"name": "Florida","abbreviation": "FL"},{"name": "Georgia","abbreviation": "GA"},{"name": "Hawaii","abbreviation": "HI"},{"name": "Idaho","abbreviation": "ID"},{"name": "Illinois","abbreviation": "IL"},{"name": "Indiana","abbreviation": "IN"},{"name": "Iowa","abbreviation": "IA"},{"name": "Kansas","abbreviation": "KS"},{"name": "Kentucky","abbreviation": "KY"},{"name": "Louisiana","abbreviation": "LA"},{"name": "Maine","abbreviation": "ME"},{"name": "Marshall Islands","abbreviation": "MH"},{"name": "Maryland","abbreviation": "MD"},{"name": "Massachusetts","abbreviation": "MA"},{"name": "Michigan","abbreviation": "MI"},{"name": "Minnesota","abbreviation": "MN"},{"name": "Mississippi","abbreviation": "MS"},{"name": "Missouri","abbreviation": "MO"},{"name": "Montana","abbreviation": "MT"},{"name": "Nebraska","abbreviation": "NE"},{"name": "Nevada","abbreviation": "NV"},{"name": "New Hampshire","abbreviation": "NH"},{"name": "New Jersey","abbreviation": "NJ"},{"name": "New Mexico","abbreviation": "NM"},{"name": "New York","abbreviation": "NY"},{"name": "North Carolina","abbreviation": "NC"},{"name": "North Dakota","abbreviation": "ND"},{"name": "Ohio","abbreviation": "OH"},{"name": "Oklahoma","abbreviation": "OK"},{"name": "Oregon","abbreviation": "OR"},{"name": "Pennsylvania","abbreviation": "PA"},{"name": "Puerto Rico","abbreviation": "PR"},{"name": "Rhode Island","abbreviation": "RI"},{"name": "South Carolina","abbreviation": "SC"},{"name": "South Dakota","abbreviation": "SD"},{"name": "Tennessee","abbreviation": "TN"},{"name": "Texas","abbreviation": "TX"},{"name": "Utah","abbreviation": "UT"},{"name": "Vermont","abbreviation": "VT"},{"name": "Virginia","abbreviation": "VA"},{"name": "Washington","abbreviation": "WA"},{"name": "West Virginia","abbreviation": "WV"},{"name": "Wisconsin","abbreviation": "WI"},{"name": "Wyoming","abbreviation": "WY"}];
    let select = document.getElementById('selectState');        
    for(let i = 0; i < states.length; i++) {
        let opt = states[i].name;
        let el = document.createElement('option');
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }
}

function selectYear() {
    let years = [{"id": "1995"},{"id": "1996"},{"id": "1997"},{"id": "1998"},{"id": "1999"},{"id": "2000"},{"id": "2001"},{"id": "2002"},{"id": "2003"},{"id": "2004"},{"id": "2005"},{"id": "2006"},{"id": "2007"},{"id": "2008"},{"id": "2009"},{"id": "2010"},{"id": "2011"},{"id": "2012"},{"id": "2013"},{"id": "2014"},{"id": "2015"},{"id": "2016"},{"id": "2017"}];
    let select = document.getElementById('selectYear');        
    for(let i = 0; i < years.length; i++) {
        let opt = years[i].id;
        let el = document.createElement('option');
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }
}

function showYear() {
    document.querySelector('#selectState').addEventListener('change', function() {
        console.log("Viet cai gi do vao day");
        document.querySelector('#hidden1').removeAttribute("hidden");
    });
}

function showResult() {
    document.querySelector('#selectYear').addEventListener('change', function() {
        console.log("Result o day nay");
        document.querySelector('#hidden2').removeAttribute("hidden");
    });
}

function refreshPage(){
    window.location.reload();
} 

//refreshPage();
showYear();
showResult();
selectYear(); 
selectState();
