import { Flex, Spinner, Button, Text, Link, Icon, Box, Center } from '@chakra-ui/react'
import { axiosInstance } from '../../lib/hoc/api';
import { useRouter } from 'next/router';
import { useState, useRef, useEffect } from "react";
import { AiOutlineHome } from "react-icons/ai";
import Image from 'next/image'
// import invalidToken from '../../assets/imgs/invalid.gif'
import ForgotPasswordForm from '../../component/auth/ForgotPasswordForm';
import ChangePasswordForm from "../../component/auth/ChangePasswordForm"

export default function ResetPassword() {
  const [verified, setVerified] = useState(false)
  const router = useRouter()
  const { resetToken } = router.query
  const url = "http://localhost:3000" + router.query;

  useEffect(() => {
    async function checkToken() {
      const res = await axiosInstance.post("/user/resetPassword/" + resetToken)
      console.log(res);
      if (res.data) {
        const check = res.data.check
        console.log(check)
        setVerified(check)
      }
    }
    setTimeout(() => {
      resetToken ? 
      checkToken() : null
    }, 1000); 
  }, [router.isReady])


  return (
    <>
        <Flex minH={'80vh'} minW='480px' justifyContent={'center'} padding={'30px'}>
          {router.isReady ?
            <>
              {verified ? <ChangePasswordForm /> :
                <Box align="center">
                  <Image width='460px' height='460px' />
                  <Text fontSize='5xl'>Invalid Token</Text>
                  <Link href='/' style={{ textDecoration: "none" }}>
                    <Button colorScheme='green' href='/Homepage'> <Icon boxSize='6' as={AiOutlineHome} mr='5px' />
                      <Text >Back To Home</Text> </Button>
                  </Link>
                </Box>}
            </>
            :
            <>
              < Spinner thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl' /> &nbsp; loading...
            </>
          }
        </Flex>
    </>
  )
}