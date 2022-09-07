import { Box, Image, SimpleGrid, Text, Flex } from "@chakra-ui/react";
import React from "react";

export const Banner = () => {
  return (
    <Box align="center">
      <Box maxW={"1440px"}>
        <Image src="/banner_1.png" />
        <Text fontSize={"3xl"} fontWeight={600} my={12}>
          Order Prescription in 3 Steps
        </Text>
        <SimpleGrid columns={{ base: 1, md: 3 }}>
          <Box>
            <Image src="/step1.png" />
            <Text py={10}>
              Upload your prescription item(s) and sign up to register your
              personal details if you don't have an account
            </Text>
          </Box>
          <Box>
            <Image src="/step2.png" />
            <Text py={10}>
              Our pharmacists will check and validate your uploaded prescription
            </Text>
          </Box>
          <Box>
            <Image src="/step3.png" />
            <Text py={10}>
              We will let you know when it's ready or on the way - ot's that
              easy
            </Text>
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
};
