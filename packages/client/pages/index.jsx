import { Stack, SimpleGrid, Center, Box, Button } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Banner } from "../src/Banner/Banner";
import { CategoryBar } from "../src/Component/CategoryBar";

import { Layout } from "../src/layout";
import { ProductListContainer } from "../src/Product/ListContainer";

const IndexPage = () => {
  const filter = useSelector((state) => state.filterReducer);

  return (
    <Layout>
      <CategoryBar />
      {filter.banner == false ? <></> : <Banner />}
      <ProductListContainer />
    </Layout>
  );
};

export default IndexPage;
