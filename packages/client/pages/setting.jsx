/* eslint-disable react/no-unescaped-entities */
import {
  Button,
  Heading,
  Stack,
  useColorModeValue,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Text,
  Box,
  Spacer,
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbItem,
  Flex,
  Image,
  FormLabel,
  Input,
  FormControl,
  useDisclosure,
  useToast,
  FormHelperText,
  RadioGroup,
  Radio,
  Modal,
} from "@chakra-ui/react";

import { Layout } from "../src/layout";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { BreadCrumb } from "../src/Component/BreadCrumb";
import { axiosInstance } from "../src/lib/api";
import UplaodAvatar from "../src/Profile/UploadAvatar";
import { ListAddress } from "../src/Profile/AddressList";

const Setting = () => {
  const [tabIndex, setTabIndex] = useState();
  const [changePanel, setChangePanel] = useState("list");

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
            setting: !renderSelector.setting,
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
    );
    formik.handleSubmit();
  };

  useEffect(() => {
    fetchUser();
  }, [renderSelector.value]);

  return (
    <>
      <Layout>
        <BreadCrumb
          data={[
            ["#", "Profile"],
            ["#", "Account&Address"],
          ]}
        />
        <Flex w="1440px" mx="auto" px="128px">
          {/* Profile Picture */}

          <Box w="280px" h="500px" align="center" py="50px">
            <Image
              mb={4}
              borderRadius="full"
              boxSize="200px"
              src={image_url}
              alt="Profile picture"
            />
            <Button my={"10"} colorScheme={"teal"} onClick={onToggle}>
              Change Image Picture
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
              <UplaodAvatar onToggle={onToggle} />
            </Modal>
          </Box>
          {/* Profile Form */}
          <Box w="full" p={10} fontSize="xl">
            <Text mb={12}>Account Information</Text>
            <FormControl py={2} id="full_name" display="flex">
              <FormLabel w="30%">Name</FormLabel>
              <Input
                defaultValue={full_name}
                placeholder="Name"
                _placeholder={{ color: "gray.500" }}
                type="text"
              />
            </FormControl>
            <FormControl py={2} id="username" display="flex">
              <FormLabel w="30%">Username</FormLabel>
              <Input
                defaultValue={username}
                placeholder="userName"
                _placeholder={{ color: "gray.500" }}
                type="text"
              />
            </FormControl>
            <FormControl py={2} id="email" display="flex">
              <FormLabel w="30%">Email</FormLabel>
              <Input
                defaultValue={email}
                placeholder="your-email@example.com"
                _placeholder={{ color: "gray.500" }}
                type="email"
              />
            </FormControl>
            <FormControl py={2} id="phone" display="flex">
              <FormLabel w="30%">Phone Number</FormLabel>
              <Input
                defaultValue={phone}
                placeholder="08xxxxxxxxxx"
                _placeholder={{ color: "gray.500" }}
                type="number"
              />
            </FormControl>
            <FormControl py={2} id="birth_date" display="flex">
              <FormLabel w="30%">Birth Date</FormLabel>
              <Input
                defaultValue={birth_date}
                _placeholder={{ color: "gray.500" }}
                type="date"
              />
            </FormControl>
            <FormControl py={2} id="gender" display="flex">
              <FormLabel w="30%">Gender {gender}</FormLabel>
              <RadioGroup
                onChange={(value) => {
                  setGenderValue(value);
                }}
              >
                <Stack direction="row">
                  <Radio colorScheme={"teal"} value="male">
                    Male
                  </Radio>
                  <Radio colorScheme={"teal"} value="female">
                    Female
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <Flex>
              <Spacer />
              <Button colorScheme={"teal"} onClick={handleSubmit}>
                Save Chaange
              </Button>
            </Flex>
          </Box>
        </Flex>
        {/* Address */}
        <Flex w="1440px" p={10} mx="auto" fontSize="xl">
          <Box w="280px" />
          <Box w="full" px={24} py={8}>
            <hr />
            <Text my={12}>Address Information</Text>
            <ListAddress />
          </Box>
        </Flex>

        <Spacer />
      </Layout>
    </>
  );
};

export default Setting;
