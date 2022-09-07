import React from "react";
import { Box, Stack, Skeleton } from "@chakra-ui/react";

export const ProductCardSkleton = () => {
  const arr = [1, 2, 3, 4, 5, 6];
  return (
    <>
      {arr.map((val) => {
        return (
          <div key={val}>
            <Stack w="20rem" h="25rem" shadow="md" p={2}>
              <Skeleton w="16rem" h="12rem" my={4}></Skeleton>
              <Skeleton w={"70%"} h={2}></Skeleton>
              <Skeleton w={"70%"} h={2}></Skeleton>
              <Skeleton w={"70%"} h={2}></Skeleton>
              <Box h="2rem"></Box>
              <Skeleton w="10rem" h="3rem"></Skeleton>
            </Stack>
          </div>
        );
      })}
    </>
  );
};
