import React, { useState, useRef, useEffect } from "react";
import { Container, Typography, Box } from "@material-ui/core";
import Link from "./Link";

import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import covid from "../js/covid";

import Highcharts from "highcharts";

const fhlink =
  "https://www.folkhalsomyndigheten.se/smittskydd-beredskap/utbrott/aktuella-utbrott/covid-19/statistik-och-analyser/bekraftade-fall-i-sverige/";

function per100k_to_per100(vec) {
  //show percent instead of percent*1000 which is what per100k means
  return vec.map((v) => v / 1000);
}

function makeoptions(region, regiondata) {
  return {
    chart: {
      type: "line",
      backgroundColor: "rgba(0,0,0,0)",
    },
    title: null,
    xAxis: {
      title: {
        text: "week",
      },
      categories: regiondata.week,
    },
    yAxis: {
      title: {
        text: null,
      },
    },
    series: [
      {
        name: "percent",
        data: per100k_to_per100(regiondata.casesper100k),
      },
    ],
    credits: {
      enabled: false,
    },
    legend: { enabled: false },
    tooltip: {
      formatter: function () {
        return Math.round(this.y * 100) / 100 + "%";
      },
    },
  };
}

function last(v) {
  return v[v.length - 1];
}

function aspercent(multiplier, casesper100k) {
  return Math.round(((multiplier * last(casesper100k)) / 1000) * 10) / 10;
}

export default function Index(props) {
  const containerref = useRef();
  const [region, setRegion] = useState("Västmanland");
  const [regiondata, setRegiondata] = useState(
    covid.getregion(props.data, region)
  );

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
    setRegiondata(covid.getregion(props.data, e.target.value));
  };

  useEffect(() => {
    const container = containerref.current;
    const plot = new Highcharts.chart(
      container,
      makeoptions(region, regiondata)
    );
  }, [region, regiondata]);

  return (
    <Container>
      <Box my={3}>
        <Typography variant="h5">
          A simple overview of Covid-19 cases in Sweden. Using official data
          from <Link to={fhlink}>Folkhälsomyndigheten</Link>.
        </Typography>
      </Box>

      <Box align="center">
        <FormControl>
          <InputLabel>Region</InputLabel>
          <Select value={region} onChange={handleRegionChange}>
            {covid.regions.map((r, i) => (
              <MenuItem key={i} value={r}>
                {r}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography align="center" variant="h5">
          % of people with confirmed covid19 diagnosis
        </Typography>
      </Box>
      <Box ref={containerref} my={0} />
    </Container>
  );
}
