import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

export const FilterInput = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState();
  const filter = useSelector((state) => state.filterReducer);
  return (
    <InputGroup>
      <Input
        value={state}
        focusBorderColor="teal.400"
        placeholder="Filter"
        onChange={(e) => {
          setState(e.target.value);
        }}
      />
      <InputRightElement
        px={2}
        color={"white"}
        onClick={() => {
          dispatch({
            type: "SET_FILTER",
            payload: {
              ...filter,
              filter: state,
              banner: false,
              offset: 0,
            },
          });
          setState("");
          console.log(state);
        }}
        cursor="pointer"
        bg="teal.400"
        _hover={{ bg: "teal.500" }}
        borderRightRadius="md"
        w="3.5rem"
      >
        <FaSearch />
      </InputRightElement>
    </InputGroup>
  );
};
