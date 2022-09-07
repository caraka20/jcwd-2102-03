import { Button, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import Router from "next/router";

export const ProductCard = ({ name, price, id }) => {
  return (
    <Stack
      gap={2}
      shadow="md"
      pb={4}
      px={4}
      _hover={{ shadow: "xl", cursor: "pointer" }}
      onClick={() => {
        Router.push(`product/${id}`);
      }}
    >
      <Image src="https://picsum.photos/200" w="16rem" h="16rem" />
      <Text fontWeight={"bold"}>{name}</Text>
      <Text>{"Rp " + price.toLocaleString("id-ID")}</Text>
      <Button colorScheme={"teal"} w="70%" gap={2} fontSize="lg">
        <FiShoppingCart />
        Add To Cart
      </Button>
    </Stack>
  );
};
