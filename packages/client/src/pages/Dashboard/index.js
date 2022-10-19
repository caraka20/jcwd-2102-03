import { Box, Center, Divider, Flex, Heading, Spinner, VStack, Text, Avatar } from "@chakra-ui/react"
import { useState } from "react"
import Head from "next/head"
import AdminNav from "../../component/navbars/AdminNavbar"
import Image from 'next/image'
import banner from '../../asset/imgs/medicure-banner.png'
import { useEffect } from "react"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import Sidebar from "../../component/admin/ResponsiveSidebar"
import TableCategory from "../../component/admin/Tables/TableCategory"
import { Header } from "@mantine/core"

export default function Dashboard(){
    
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()
    const userSelector = useSelector((state)=>state.auth)
    const [showTable, setShowTable] = useState([])

    useEffect(() => {
        if (!userSelector?.is_admin) {
          setIsLoading(false);
          router.push("/Homepage");
        }
        else{
            setIsLoading(false);
        }
      }, [userSelector?.is_admin, router]);


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

            <AdminNav></AdminNav>
            <Flex flexDir={"row"}>
                <Box flex={2}>
                    <Sidebar/>
                </Box>
                <Box flex={10}>
                    <Heading as="h2" size="lg" letterSpacing="tight">
                    Admin Dashboard
                </Heading>
                </Box>
            </Flex>


            </>
        )}
        </>
    )
}
