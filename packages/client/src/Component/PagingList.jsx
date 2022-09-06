import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
export const PagingList = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filterReducer);
  const handleClick = (task) => {
    let param = task;
    let offset = 0;
    if (param == "next") {
      offset = filter.offset + 9;
    } else if (param == "previous") {
      offset = filter.offset - 9;
    }
    if (offset <= 0) {
      offset = 0;
    }
    dispatch({
      type: "SET_FILTER",
      payload: {
        ...filter,
        offset,
      },
    });
  };
  return (
    <Box gap="1.5rem" h="3rem" w="12rem" display={"flex"} my="2rem">
      <Image src="/icon/arrow/left2.png" style={sxImage} />
      <Image
        src="/icon/arrow/left1.png"
        style={sxImage}
        onClick={() => {
          handleClick("previous");
          console.log(filter);
        }}
      />

      <Box mb="8px" display="flex" gap="1.5rem" fontSize={"1.2rem"}>
        <Text cursor="pointer">1</Text>
        <Text cursor="pointer">2</Text>
        <Text cursor="pointer">3</Text>
        <Text cursor="pointer">4</Text>
        <Text cursor="pointer">...</Text>
        <Text cursor="pointer">10</Text>
      </Box>
      <Image
        src="/icon/arrow/right1.png"
        style={sxImage}
        onClick={() => {
          handleClick("next");
          console.log(filter);
        }}
      />
      <Image src="/icon/arrow/right2.png" style={sxImage} />
    </Box>
  );
};

const sxImage = {
  height: "24px",
  width: "15px",
  paddingTop: "5px",
  cursor: "pointer",
};
