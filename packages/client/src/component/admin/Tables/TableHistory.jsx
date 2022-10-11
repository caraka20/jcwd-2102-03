import {
    Flex,
    Heading,
    Text,
    Icon,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Tfoot,
    Box,
    TableContainer,
    TableCaption,
    Img,
    Button,
    HStack,
    FormControl,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Select,
    FormLabel
} from "@chakra-ui/react"
import { axiosInstance } from "../../../lib/hoc/api"
import * as moment from "moment"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import { useState } from "react"
import { useEffect } from "react"
import { useToast } from "@chakra-ui/react"


export default function TableHistory (props) {
    
    const dispatch = useDispatch()
    const router = useRouter()
    const date = moment(new Date()).format("LLLL")
    const toast = useToast()
    const [opened2, setOpened2] = useState(false)
    const renderData = useSelector((state) => state.category)
    const [listHistory, setListHistory] = useState([])
    const [loadData, setLoadData] = useState(1)
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [totalHistory, setTotalHistory] = useState(0)
    const [limit, setLimit] = useState(5)
    const [orderBy, setOrderBy] = useState("createdAt")
    const [sortBy, setSortBy] = useState("DESC")
    

    async function fetchHistory() {

      try{
          await axiosInstance.get(`/history?limit=9999&page=1&orderby=${orderBy}&sort=${sortBy}`).then((res)=>{
            const data = res.data.results
            setTotalHistory(data.length)
            setTotalPage(Math.ceil(data.length / limit))
            console.log("this is total product " + data.length)
            console.log("this is total page " + totalPage)
            console.log(data)
        })

        await axiosInstance.get(`/history?limit=${limit}&page=${page}&orderby=${orderBy}&sort=${sortBy}`).then((res)=>{
          const data = res.data.results
          setListHistory(data)
        }) 

      } catch (err) {
        console.log("Error getting product")

      }
      
    }

    useEffect(()=> {
        fetchHistory()
        page
    }, [])

    useEffect(() => {
        if (renderData?.value !== undefined){
            setLoadData(loadData)
            fetchHistory()
        }
    }, [renderData?.value]) 

    useEffect(()=> {
      fetchHistory()
  }, [ page, limit])

    const renderTable = () => {
        return listHistory.map((val, index) => {
            return (
                <Tr key={index}>
                    <Td>{val.createdAt}</Td>
                    <Td>
                        {val.Product?.id}
                    </Td>
                    <Td>
                        {val.Unit?.id}
                    </Td>
                    <Td>
                        {val.qty}
                    </Td>
                    <Td>
                       {val.type}
                    </Td>
                    <Td>
                        {val.desc}
                    </Td>

                </Tr>
            )
        })
    }

    return (
        <Flex
        h={[null, null, "300vh"]}
        maxW="2000px"
        flexDir={["column", "column", "row"]}
        overflow="hidden"
      >

        <Flex
          w={["100%", "100%", "60%", "60%", "55%"]}
          p="2%"
          flexDir="column"
          overflow="auto"
          minH="full"
          minW="full"
        >

          <Box p={4}>
              <HStack spacing={5} align={"center"} justifyContent={"space-evenly"}>
              <Button bg={"gainsboro"} onClick={() => router.push("/Product/Category")}>Category</Button>
              <Button bg={"gainsboro"} onClick={() => router.push("/Product")}>Product</Button>
              </HStack>
          </Box>
          
  
          <Flex justifyContent="space-between" mt={8}>
            <Flex align="flex-end">
              <Heading as="h2" size="lg" letterSpacing="tight">
                STOCK HISTORY LIST
              </Heading>
              <Text fontSize="small" color="gray" ml={4}>
                {date}
              </Text>
             
            </Flex>
          </Flex>
          <Box
            mt={5}
            borderRadius={5}
            // bgColor={"#e3e3e3"}
            minH="40vh"
            minW="80vh"
            boxShadow={"dark-lg"}
            border={2}
          >
            {/* -----------TABLE CATEGORY---------- */}
            <TableContainer>
              <Table variant="striped">
                <TableCaption>Stock History</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Date</Th>
                    <Th>Product</Th>
                    <Th>Unit</Th>
                    <Th>Qty</Th>
                    <Th>Type</Th>
                    <Th>Desc</Th>
                  </Tr>
                </Thead>
                {/* ------------PRODUCT DATA--------- */}
                <Tbody>{renderTable()}</Tbody>
                <Tfoot justifyContent={"center"}>
                </Tfoot>
              </Table>
            </TableContainer>
            <Box display='flex' justifyContent='center' alignContent='center'>
            <Button onClick={() => setPage(page == 1 ? 1 : page - 1)} size='sm' m='3px' colorScheme={"teal"}>Previous Page</Button>
            <Button onClick={() => setPage(totalPage == page ? page : page + 1)} size='sm' m='3px' colorScheme={"teal"}>Next Page</Button>
          </Box>
          </Box>
        </Flex>
      </Flex>
    )
}