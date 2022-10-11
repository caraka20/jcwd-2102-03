import {
    Box, Text, Stack, Heading, Button, InputGroup, Icon, FormHelperText, Progress,
    InputRightElement, FormControl, FormLabel, Input, Center, propNames
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import Image from 'next/image';
  import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
  import { useFormik } from 'formik';
  import * as Yup from 'yup';

  import { axiosInstance } from '../../lib/hoc/api';
  import { useRouter } from "next/router";
  import qs from 'qs';
import { Modal } from '@mantine/core';
  
  export default function ChangePasswordForm() {
    const [viewPassword, setViewPassword] = useState(false);
    const [viewPassword2, setViewPassword2] = useState(false);
    const router = useRouter()
    const [opened2, setOpened2] = useState(false)
    const { id } = props
  
    const formik = useFormik({
      initialValues: {
        password: "",
        retype_password: "",
      },
      validationSchema: Yup.object().shape({
        password: Yup.string().required("Password is required")
          .min(8, 'Password should be of minimum 8 characters length')
          .matches(/\w*[a-z]\w*/, "Must contain min 8 Characters, UPPERCASE, lowercase, number and special character") // lower
          .matches(/\w*[A-Z]\w*/, "Must contain min 8 Characters, UPPERCASE, lowercase, number and special character") // upper
          .matches(/\d/, "Must contain min 8 Characters, UPPERCASE, lowercase, number and special character") //must have number
          .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Must contain min 8 Characters, UPPERCASE, lowercase, number and special character"), //special char
        repassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords do not match')
          .required('Confirm password is required'),
      }),
      validateOnChange: false,
      onSubmit: async () => {
        const { password } = formik.values
        const { id } = router.query
        try {
          let body = {
            password: password,
          };
          const res = await axiosInstance.patch(`/user/changePassword/`+ id_user, qs.stringify(body));
          console.log(res)
  
        } catch (err) {
          console.log(err);
        }
      },
    })
  
    return (
    <>
    <Modal opened={opened2}
    onClose={()=> setOpened2(false)}>
      <Center>
        <Stack display='flex' minH='450px' maxW={'500px'} justifyContent={'center'} boxShadow='xl' bg='#ffffff' borderWidth='1px' borderRadius="6" >
          <Box align={"center"} m={'30px'} mb={'10px'} mt='10px'>
          </Box>
  
          <Stack display='flex' mt={'10px'} mb={'0'} align={"center"} >
            <Heading fontSize={"2xl"}>Reset Password</Heading>
            <Text>Please input your new password</Text>
          </Stack>
  
          <Stack align={"center"}>
            <Box m={'20px'} width={'300px'}>
              <FormControl id="password" marginTop={'20px'} mb={'7px'} isInvalid={formik.errors.password}>
                <InputGroup >
                  <Input required className="inputText" maxLength={'30'}
                    type={passwordView ? "text" : "password"}
                    onChange={(event) =>
                      formik.setFieldValue("password", event.target.value)}
                  />
                  <FormLabel>&nbsp; Password &nbsp;</FormLabel>
                  <InputRightElement>
                    <Icon
                      fontSize="xl"
                      onClick={() => setPasswordView(!passwordView)}
                      as={passwordView ? IoMdEye : IoMdEyeOff}
                      sx={{ _hover: { cursor: "pointer" } }}
                    />
                  </InputRightElement>
                </InputGroup>
                {formik.values.password.length > 7 && formik.values.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/) ?
                  <>
                    <Text fontWeight='semibold' color='green'>Strong</Text></> :
                  (formik.values.password.length > 5 && formik.values.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])|(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])/) ?
                    <>
                      <Text fontWeight='semibold' color={"lightblue"}>Medium</Text></> :
                    (formik.values.password.length > 4 && formik.values.password.match(/^(?=.*[a-z])(?=.*[A-Z])|(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/) ?
                      <>
                        <Text fontWeight='semibold' color='orange'>Weak</Text></> :
                      (formik.values.password.length > 0 && formik.values.password.match(/^(?=.*[a-z])/) ?
                        <>
                          <Text fontWeight='semibold' color='red'>Very weak</Text></> : <></>)))}
                <FormHelperText color='red'>{formik.errors.password}</FormHelperText>
              </FormControl>
  
              <FormControl marginTop={'20px'} isInvalid={formik.errors.retype_password}>
                <InputGroup >
                  <Input required maxLength={'30'}
                    type={passwordViewRep ? "text" : "password"}
                    onChange={(event) =>
                      formik.setFieldValue("retype_password", event.target.value)}
                  />
                  <FormLabel className="labelText">&nbsp; Repeat Password &nbsp;</FormLabel>
                  <InputRightElement>
                    <Icon
                      fontSize="xl"
                      onClick={() => setViewPassword2(true)}
                      as={viewPassword2 ? IoMdEye : IoMdEyeOff}
                      sx={{ _hover: { cursor: "pointer" } }}
                    />
                  </InputRightElement>
                </InputGroup>
                <FormHelperText color='red'>{formik.errors.retype_password}</FormHelperText>
              </FormControl>
            </Box>
          </Stack>
          <Box>
            <Button onClick={formik.handleSubmit} colorScheme='teal' mb={'20px'} ml={'20px'}>Change Password</Button>
          </Box>
        </Stack>
      </Center>
      </Modal>
        <Group>
            <Button 
                onClick={() => setOpened2(true)}>
                    Change Password
            </Button>
        </Group>
    </>
    )
  }