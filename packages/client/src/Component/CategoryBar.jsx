import React, { useState } from "react";
import { Box, Button, Flex, SimpleGrid } from "@chakra-ui/react";

import NextLink from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

export const CategoryBar = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filterReducer);

  const handleClick = (param) => {
    dispatch({
      type: "SET_FILTER",
      payload: {
        category: param,
        banner: false,
        offset: 0,
      },
    });
    console.log(filter);
  };

  const router = useRouter();
  return (
    <Box
      px={4}
      align="center"
      bg="white"
      border={"1px"}
      borderColor={"gray.200"}
    >
      <SimpleGrid
        px={"30px"}
        sx={{
          maxW: "1440px",
          height: "75px",
          left: "0px",
          top: "0px",
        }}
        display="flex"
        justifyContent={"space-between"}
        columns={{ base: 1, md: 3, lg: 5 }}
      >
        <Button
          background="white"
          borderRadius={0}
          h="full"
          fontSize="16px"
          fontWeight={400}
          style={
            filter.category == "medication"
              ? {
                  textDecoration: "none",
                  borderBottomWidth: "4px",
                  borderBottomColor: "teal",
                }
              : { textDecoration: "none" }
          }
          _hover={{
            borderBottomWidth: "4px",
            borderBottomColor: "teal",
          }}
          onClick={() => {
            handleClick("medication");
          }}
        >
          Medication
        </Button>
        <Button
          background="white"
          borderRadius={0}
          h="full"
          fontSize="16px"
          fontWeight={400}
          style={
            filter.category == "vitamin-supplements"
              ? {
                  textDecoration: "none",
                  borderBottomWidth: "4px",
                  borderBottomColor: "teal",
                }
              : { textDecoration: "none" }
          }
          _hover={{
            borderBottomWidth: "4px",
            borderBottomColor: "teal",
          }}
          onClick={() => {
            handleClick("vitamin-supplements");
          }}
        >
          Vitamin & Supplements
        </Button>
        <Button
          background="white"
          borderRadius={0}
          h="full"
          fontSize="16px"
          fontWeight={400}
          style={
            filter.category == "women-health"
              ? {
                  textDecoration: "none",
                  borderBottomWidth: "4px",
                  borderBottomColor: "teal",
                }
              : { textDecoration: "none" }
          }
          _hover={{
            borderBottomWidth: "4px",
            borderBottomColor: "teal",
          }}
          onClick={() => {
            handleClick("women-health");
          }}
        >
          Women's Health
        </Button>
        <Button
          background="white"
          borderRadius={0}
          h="full"
          fontSize="16px"
          fontWeight={400}
          style={
            filter.category == "men-health"
              ? {
                  textDecoration: "none",
                  borderBottomWidth: "4px",
                  borderBottomColor: "teal",
                }
              : { textDecoration: "none" }
          }
          _hover={{
            borderBottomWidth: "4px",
            borderBottomColor: "teal",
          }}
          onClick={() => {
            handleClick("men-health");
          }}
        >
          Mens's Health
        </Button>
        <Button
          background="white"
          borderRadius={0}
          h="full"
          fontSize="16px"
          fontWeight={400}
          style={
            filter.category == "infant-children"
              ? {
                  textDecoration: "none",
                  borderBottomWidth: "4px",
                  borderBottomColor: "teal",
                }
              : { textDecoration: "none" }
          }
          _hover={{
            borderBottomWidth: "4px",
            borderBottomColor: "teal",
          }}
          onClick={() => {
            handleClick("infant-children");
          }}
        >
          Infant & Children
        </Button>
      </SimpleGrid>
    </Box>
  );
};
