import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import React from "react";
import { ChevronRightIcon } from "@chakra-ui/icons";

export const BreadCrumb = (props) => {
  const { data } = props;
  return (
    <Box border="1px" borderColor={"gray.200"}>
      <Breadcrumb
        mx={"auto"}
        h="75px"
        w="1440px"
        spacing="8px"
        pl={"90px"}
        pt="30px"
        fontSize="lg"
        separator={<ChevronRightIcon color="gray.500" />}
      >
        {data.map((val, idx) => {
          return (
            <BreadcrumbItem key={idx}>
              <BreadcrumbLink href={val[0]}>{val[1]}</BreadcrumbLink>
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
    </Box>
  );
};
