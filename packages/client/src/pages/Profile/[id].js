import { Box, Center, Flex, Heading, Spinner, VStack } from "@chakra-ui/react"
import { useState } from "react"
import Head from "next/head"
import Navbar from "../../component/navbars/Navbar"
import Image from 'next/image'
import banner from '../../asset/imgs/medicure-banner.png'
// import Footer from "../../component/footer"
import EditProfile from "../../component/profile/EditProfile"
import ProfilePictureCard from "../../component/profile/ProfilePictureCard"

export default function Profile(){
    
    
    const [isLoading, setIsLoading] = useState(false)


    return(
        <>
        {isLoading ?(
            <Center>
                <Spinner size={"lg"}/>
            </Center>
        ): (
            <>
            <Head>
                <title>Medicure</title>
            </Head>
            <Navbar/>

            <Box p={4} bgColor={"gray.100"}>
                <Heading size={"sm"} >
                    Profile ＞ Edit Profile
                </Heading>
            </Box>
            
            <Flex justify={"space-around"} flexDir="row">
                
            <Box display={"flex"} marginLeft={"15"}>
                {/* <Footer/> */}
                <ProfilePictureCard></ProfilePictureCard>
            </Box>

            <Box marginRight={"96"} display={"flex"} paddingTop={"5"}>
                <EditProfile />
            </Box>
            </Flex>
            </>
        )}
        </>
    )
}
