const regions = [
  "Blekinge",
  "Dalarna",
  "Gotland",
  "Gävleborg",
  "Halland",
  "Jämtland Härjedalen",
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
  "Östergötland",
];

function getregion(data, region) {
  const c = data[0]; //columnheadings

  const index_veckonummer = c.indexOf("veckonummer");
  const index_Region = c.indexOf("Region");
  const index_casesper100k = c.indexOf("Kum_fall_100000inv");
  const index_casesper100kthisweek = c.indexOf("Antal_fall_100000inv_vecka");

  let week = [];
  let casesper100k = [];
  let casesper100kthisweek = [];
  for (let row of data) {
    if (row[index_Region] === region) {
      week.push(row[index_veckonummer]);
      casesper100k.push(row[index_casesper100k]);
      casesper100kthisweek.push(row[index_casesper100kthisweek]);
    }
  }
  return { region, week, casesper100k, casesper100kthisweek };
}

export default { regions, getregion };
