import usePromise from "react-fetch-hook/usePromise";
import XLSX from "xlsx";

//covid data från Folkhalsomyndigheten
//på https://www.folkhalsomyndigheten.se/smittskydd-beredskap/utbrott/aktuella-utbrott/covid-19/statistik-och-analyser/bekraftade-fall-i-sverige/
//kan man ladda hem en Excel fil med dagligt uppdaterad data:
const url =
  "https://www.arcgis.com/sharing/rest/content/items/b5e7488e117749c19881cce45db13f7e/data";

async function fetch_coviddata() {
  const data = await fetch(url)
    .then((res) => res.arrayBuffer())
    .then((buf) => new Uint8Array(buf));
  const workbook = XLSX.read(data, { type: "array" });
  const regionsheet = workbook.Sheets["Veckodata Region"];
  const arrayofarrays = XLSX.utils.sheet_to_json(regionsheet, { header: 1 });
  return arrayofarrays;
}

export default function useData() {
  return usePromise(() => fetch_coviddata());
}
