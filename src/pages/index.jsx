import React from "react";
import SEO from "../components/seo";
import Layout from "../components/Layout";

import useData from "../hooks/use-data";

export default function Index() {
  const data = useData();
  return (
    <>
      <SEO />
      {data.isLoading ? null : <Layout data={data.data} />}
    </>
  );
}
