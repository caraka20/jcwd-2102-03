import React from "react";
import {
  Button,
  Heading,
  Stack,
  useColorModeValue,
  Text,
  Box,
  Spacer,
  useToast,
  Flex,
  SimpleGrid,
  Modal,
  useDisclosure,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../lib/api";
import { FiTrash } from "react-icons/fi";
import AddressEdit from "./AddressEdit";
import AddresAdd from "./AddressAdd";

export const ListAddress = () => {
  const toast = useToast();

  const [addressData, setAddressData] = useState([]);
  const dispatch = useDispatch();

  const renderSelector = useSelector((state) => state.renderReducer);

  const handleDelete = async (params) => {
    try {
      const res = await axiosInstance.delete(`/address/${params}`);
      if (res.status != 200) {
        throw new Error(res.message);
      }
      toast({
        title: "Address Deleted",
        status: "success",
        isClosable: true,
      });
      fetchAddress();
    } catch (err) {
      toast({
        title: `Error ${err}`,
        status: "error",
        isClosable: true,
      });
    }
  };

  const setId = (params) => {
    dispatch({
      type: "SET_ADDRESS",
      payload: {
        id: params,
      },
    });
  };

  const fetchAddress = async () => {
    try {
      const res = await axiosInstance.get(`/address/user/3`);
      const data = res.data.result;
      setAddressData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);
  useEffect(() => {
    fetchAddress();
  }, [renderSelector.value]);

  return (
    <>
      <SimpleGrid columns={{ base: 2 }} gap={8} px={4}>
        {addressData?.map((val, idx) => {
          return (
            <Box
              p={8}
              border="1px"
              rounded="lg"
              borderColor={"gray.200"}
              fontSize={"md"}
              key={idx}
              // _hover={{ borderColor: "teal.100", borderWidth: "1px" }}
              _hover={{ bgGradient: "linear(to-tr, teal.100, teal.300)" }}
            >
              <Text fontWeight={"bold"} pt={2}>
                Address {idx + 1}
              </Text>
              <Stack>
                <Text>
                  {val.address}, {val.city}, {val.province}
                </Text>
                <Text>{val.postal_code}</Text>
              </Stack>
              <Box display="flex" gap={2}>
                <Spacer />

                <AddressEdit id={val.id} />
                <Box
                  fontSize={"2xl"}
                  color="red"
                  cursor="pointer"
                  onClick={() => {
                    handleDelete(val.id);
                  }}
                >
                  <FiTrash />
                </Box>
              </Box>
            </Box>
          );
        })}
      </SimpleGrid>
      <Flex m={8}>
        <Spacer />
        {/* ADD Address */}
        <AddresAdd />
      </Flex>
    </>
  );
};
