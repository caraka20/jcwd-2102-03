import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Textarea,
  FormHelperText,
  Box,
  RadioGroup,
  Radio,
  useToast,
  useDisclosure,
  Modal,
} from "@chakra-ui/react";

import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../lib/api";
import UplaodAvatar from "./UploadAvatar";
import * as Yup from "yup";

const ProfileEdit = () => {
  const [genderValue, setGenderValue] = useState();
  const [userData, setUserData] = useState([]);
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

  const renderSelector = useSelector((state) => state.renderReducer);

  const toast = useToast();
  const router = useRouter();
  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get(`/users/3`);
      const data = res.data.result[0];
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const { full_name, username, email, image_url, phone, birth_date, gender } =
    userData;

  const formik = useFormik({
    initialValues: {
      full_name,
      username,
      phone,
      birth_date,
      email,
      gender,
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Input proper email")
        .required("Email is required"),
      username: Yup.string()
        .required("Username is required")
        .min(8, "username min 8 characters")
        .trim("Username must not include spaces"),
      full_name: Yup.string()
        .required("Fullname is required")
        .min(6, "username min 6 characters"),
      birth_date: Yup.date().required("Birth date is required"),
    }),
    validateOnChange: false,
    onSubmit: async () => {
      try {
        const res = await axiosInstance.patch(`/users/3`, formik.values);
        console.log("res");
        console.log(res);
        if (res.status != 200) {
          const errors = res.response.data.error.messages.errors[0].message;
          toast({
            title: errors,
            status: "error",
            isClosable: true,
          });
          return;
        }
        dispatch({
          type: "FETCH_DATA",
          payload: {
            value: !renderSelector.value,
          },
        });
        toast({
          title: "User Updated",
          status: "success",
          isClosable: true,
        });
      } catch (error) {
        console.log(error);
        toast({
          title: `Error `,
          status: "error",
          isClosable: true,
        });
      }

      formik.setSubmitting(false);
    },
  });

  const handleSubmit = () => {
    formik.setFieldValue(
      "full_name",
      document.querySelector("#full_name").value
    );
    formik.setFieldValue("username", document.querySelector("#username").value);
    formik.setFieldValue("phone", document.querySelector("#phone").value);
    formik.setFieldValue("email", document.querySelector("#email").value);
    formik.setFieldValue("gender", genderValue);
    formik.setFieldValue(
      "birth_date",
      document.querySelector("#birth_date").value
      // "2022-10-01"
    );
    formik.handleSubmit();
  };

  useEffect(() => {
    fetchUser();
  }, [renderSelector.value]);

  return (
    <>
      {userData ? (
        <Stack
          spacing={4}
          bg={useColorModeValue("white", "gray.700")}
          p={6}
          minH="100vh"
        >
          <Box display="flex" alignItems="center" py={2}>
            <Heading pl={2}>Edit Profile</Heading>
          </Box>
          <FormControl id="image_url">
            <FormLabel>User Icon</FormLabel>
            <Stack direction={["column", "row"]} spacing={6}>
              <Center>
                <Avatar size="xl" src={image_url}>
                  <AvatarBadge
                    as={IconButton}
                    size="sm"
                    rounded="full"
                    top="-10px"
                    colorScheme="red"
                    aria-label="remove Image"
                    icon={<AiOutlineClose />}
                  />
                </Avatar>
              </Center>
              <Center>
                <Button onClick={onToggle} borderWidth={2}>
                  Change Avatar
                </Button>
                <Modal isOpen={isOpen} onClose={onClose} isCentered>
                  <UplaodAvatar onToggle={onToggle} />
                </Modal>
              </Center>
            </Stack>
          </FormControl>
          <FormControl id="full_name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              defaultValue={full_name}
              placeholder="Name"
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
            <FormHelperText color="red">
              {formik.errors.full_name}
            </FormHelperText>
          </FormControl>
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              defaultValue={username}
              placeholder="userName"
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
            <FormHelperText>
              In most cases, you'll be able to change your username back to
              previus username for another 14 days. Learn more
            </FormHelperText>
          </FormControl>
          <FormControl id="email" isRequired>
            <FormHelperText fontWeight={"bold"}>
              Personal information
            </FormHelperText>
            <FormHelperText>
              Provide your personal information, even if the account is used for
              a business, pet or something else. This won't be part of your
              public profile.
              <FormLabel mt={4}>Email address</FormLabel>
            </FormHelperText>
            <Input
              defaultValue={email}
              placeholder="your-email@example.com"
              _placeholder={{ color: "gray.500" }}
              type="email"
            />
            <FormHelperText>
              In most cases, you'll be able to change your username back to
              pakrirama for another 14 days. Learn more
            </FormHelperText>
          </FormControl>
          <FormControl id="phone" isRequired>
            <FormLabel>Phone Number</FormLabel>
            <Input
              defaultValue={phone}
              placeholder="08xxxxxxxxxx"
              _placeholder={{ color: "gray.500" }}
              type="number"
            />
          </FormControl>
          <FormControl id="birth_date" isRequired>
            <FormLabel>Birth Date</FormLabel>
            <Input
              defaultValue={birth_date}
              _placeholder={{ color: "gray.500" }}
              type="date"
            />
          </FormControl>
          <FormControl id="gender">
            <FormLabel>Gender {gender}</FormLabel>
            <RadioGroup
              onChange={(value) => {
                setGenderValue(value);
              }}
            >
              <Stack direction="row">
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              bg={"red.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "red.500",
              }}
            >
              Cancel
            </Button>
            <Button
              bg={"blue.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "blue.500",
              }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      ) : (
        <></>
      )}
    </>
  );
};

export default ProfileEdit;
