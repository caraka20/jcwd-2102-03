import { Box, Checkbox, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import React, { useState } from "react";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { FilterInput } from "../Component/FilterInput";
import { axiosInstance } from "../lib/api";
import { sortOptions } from "../lib/options";
import { ProductCardSkleton } from "../lib/Skleton/ProductCardSkleton";
import { ProductCard } from "../Component/ProductCard";
import { PagingList } from "../Component/PagingList";

export const ProductListContainer = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState();
  const filter = useSelector((state) => state.filterReducer);

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get(`product`, {
        params: filter,
      });
      const data = res.data.result;
      setProducts(data.products);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filter]);

  return (
    <Box px={4} align="center">
      <Box maxW={"1440px"} borderColor="white" display={{ md: "flex" }}>
        {/* Side Bar */}
        <Box minW={{ sm: "1rem", md: "10rem", lg: "15rem" }} m={"2.5rem"}>
          <Box shadow="md">
            <FilterInput />
          </Box>
          <Box
            border="1px"
            borderColor={"gray.100"}
            mt={"1rem"}
            borderRadius="lg"
            shadow="md"
            minH="25rem"
          >
            <Box display={"flex"} justifyContent="space-between" py={4} px={6}>
              <Checkbox>Select All</Checkbox>
              <Text>Clear</Text>
            </Box>
            <Stack py={4} px={6} gap={4}>
              <Checkbox>Blackmore</Checkbox>
              <Checkbox>Kalbe</Checkbox>
              <Checkbox>Panadol</Checkbox>
              <Checkbox>Tolak Angin</Checkbox>
              <Checkbox>Interbat</Checkbox>
            </Stack>
          </Box>
        </Box>
        <Box>
          <Box maxW={"15rem"} mt="2.5rem" mr={"auto"} shadow="md">
            <Select
              options={sortOptions}
              placeholder="Sort By..."
              focusBorderColor="teal.400"
              colorScheme="purple"
              onChange={(v) => {
                dispatch({
                  type: "SET_FILTER",
                  payload: {
                    ...filter,
                    ...v,
                    banner: false,
                  },
                });
                console.log(filter);
              }}
            />
          </Box>

          <SimpleGrid
            columns={{ sm: 1, md: 2, lg: 3 }}
            justifyContent={"space-between"}
            spacing={24}
            w="full"
            px={4}
            my="2rem"
          >
            {/* Product Card */}

            {products ? (
              products.map((val) => {
                return (
                  <ProductCard
                    name={val.name}
                    price={val.price}
                    key={val.id}
                    id={val.id}
                  />
                );
              })
            ) : (
              <ProductCardSkleton />
            )}
          </SimpleGrid>

          {/* Pagination */}
        </Box>
      </Box>
      <PagingList />
    </Box>
  );
};
