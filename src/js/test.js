const fetch = require("node-fetch");
const XLSX = require("./node_modules/xlsx/xlsx.js")

async function fetch_swe_covid_exceldata() {
	//covid data från Folkhalsomyndigheten
	//på https://www.folkhalsomyndigheten.se/smittskydd-beredskap/utbrott/aktuella-utbrott/covid-19/statistik-och-analyser/bekraftade-fall-i-sverige/
	//kan man ladda hem en Excel fil med dagligt uppdaterad data:
	const url = "https://www.arcgis.com/sharing/rest/content/items/b5e7488e117749c19881cce45db13f7e/data"
	const data = await fetch(url).then(res=>res.arrayBuffer()).then(buf=>new Uint8Array(buf));
	const workbook = XLSX.read(data, {type:"array"});
	return workbook
}

const regions = ["Blekinge",
"Dalarna",
"Gotland",
"Gävleborg",
"Halland",
"Jämtland",
"Härjedalen",
"Jönköping",
"Kalmar",
"Kronoberg",
"Norrbotten",
"Skåne",
"Stockholm",
"Sörmland",
"Uppsala",
"Värmland",
"Västerbotten",
"Västernorrland",
"Västmanland",
"Västra Götaland",
"Örebro",
"Östergötland"];

function getregion(data, region) {
	const columnheadings = data[0];
	for (let k=0; k<columnheadings.length; k++) {
		console.log(k, columnheadings[k])	
	}

	const index_veckonummer = columnheadings.indexOf('veckonummer');
	const index_Region = columnheadings.indexOf("Region");
	const index_Kum_fall_100000inv = columnheadings.indexOf('Kum_fall_100000inv');
	const index_Antal_fall_100000inv_vecka = columnheadings.indexOf('Antal_fall_100000inv_vecka');
	

	let week = [];
	let casesper100k = [];
	let casesper100kthisweek = [];
	for (row of data) {
		if (row[index_Region] === region) {
			week.push(row[index_veckonummer]);
			casesper100k.push(row[index_Kum_fall_100000inv])
			casesper100kthisweek.push(row[index_Antal_fall_100000inv_vecka])
		}
	}
	return [week,casesper100k,casesper100kthisweek];
}

function last(v) {
	return v[v.length-1]
}

fetch_swe_covid_exceldata().then(workbook=>{
	console.log(last(workbook.SheetNames))
	//console.log("workbook: ",workbook)
	const regionsheet = workbook.Sheets["Veckodata Region"]
	const data = XLSX.utils.sheet_to_json(regionsheet, {header:1});
	
	const [week,casesper100k,casesper100kthisweek] = getregion(data, regions[0])
	console.log(week)
	console.log(casesper100kthisweek)
	console.log(casesper100k)
})
