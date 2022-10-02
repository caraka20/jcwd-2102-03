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
    HStack
} from "@chakra-ui/react"
import {
    SettingsIcon,
    DeleteIcon,
    PlusSquareIcon,
    EditIcon,
} from "@chakra-ui/icons"
import { Modal, Group } from '@mantine/core'
import { axiosInstance } from "../../../lib/hoc/api"
import * as moment from "moment"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import { useState } from "react"
import { useEffect } from "react"
import { useToast } from "@chakra-ui/react"
import AddCategoryForm from "../Forms/AddCategoryForm"
import EditCategoryForm from "../Forms/EditCategory"
import AddProductForm from "../Forms/AddProductForm"
import Image from "next/image"


export default function TableProduct (props) {
    
    const dispatch = useDispatch()
    const router = useRouter()
    const [opened, setOpened] = useState(false)
    const [opened2, setOpened2] = useState(false)
    const date = moment(new Date()).format("LLLL")
    const toast = useToast()
    const renderData = useSelector((state) => state.category)
    const [listProduct, setListProduct] = useState([])
    const [loadData, setLoadData] = useState(1)
    const {id, name, category_img} = props

    const fetchProduct = async () => {
        await axiosInstance.get("/product/").then((res)=>{
            console.log(res)
            const data = res.data.results
            console.log("this is category " + data)
            setListProduct(res.data.results)
        }).catch((err) => {
            alert("error getting categories")
        })
    }

    useEffect(()=> {
        fetchProduct()
    }, [])

    useEffect(() => {
        if (renderData?.value !== undefined){
            setLoadData(loadData)
            fetchCategory()
            console.log(listProduct)
        }
    }, [renderData?.value]) 

    async function deleteProduct(id){
        try{
            await axiosInstance.delete("/product/" + id)
            
            toast ({
                title: "Deleted",
                description: "Category has been successfully deleted",
                status: "success",
                isClosable: true
            })
        } catch (err) {
            console.log(err)
            
            toast({
                title: "Error",
                description: "There was an error deleting category",
                status:"error",
                isClosable: true
            })
        }
    }
    
    // async function confirmDelete(id) {

    //     return(
    //             <Box>
    //                 <Flex minH={"-moz-fit-content"}
    //                 align={"center"}
    //                 justify={"center"}>
    //                     <Text>
    //                         Are you sure you want to delete this category?
    //                     </Text>
    //                     <HStack>
    //                     <Button>Yes</Button>
    //                     <Button>No</Button>
    //                     </HStack>
    //                 </Flex>
    //             </Box>
    //     )
    // }

    const renderCategoryTable = () => {
        return listProduct.map((val, index) => {
            return (
                <Tr>
                    <Td>{val.id}</Td>
                    <Td>
                       {/* <Image 
                        src={`${val.ProductImages[0].product_image}`} 
                        width={100} 
                        height={100}/> */}
                        <Img src={`${val.Product.ProductImages[0].product_image}`}
                        w={"100px"}
                        h={"50px"}>
                        </Img>
                    </Td>
                    <Td>
                        {val.Product.bpom_code}
                    </Td>
                    <Td>
                        {val.Product.product_name}
                    </Td>
                    <Td>
                        {val.stock}
                    </Td>
                    <Td>
                        {val.Unit.unit_name}
                    </Td>
                    <Td>
                        {val.amount_per_stock}
                    </Td>
                    <Td>
                      Rp {val.init_price}
                    </Td>
                    <Td>
                       Rp {val.sell_price}
                    </Td>
                    <Td>
                        <EditCategoryForm key={index}
                        id_edit={val.id}></EditCategoryForm>
                    </Td>
                    <Td>
                        <Button>
                            <DeleteIcon
                            key={index}
                            id={val?.id}
                            onClick={() => deleteProduct(val.id)}>
                            </DeleteIcon>
                        </Button>
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
        {/* Column 1 */}
  
        {/* --------------Column 2------------- */}
        <Flex
          w={["100%", "100%", "60%", "60%", "55%"]}
          p="2%"
          flexDir="column"
          overflow="auto"
          minH="full"
          minW="full"
        >
          {/* <Heading fontWeight="normal" mb={4} letterSpacing="tight">
            Welcome back, {""}
            <Flex display="inline-flex" fontWeight="bold">
              {userSelector.username}
            </Flex>
          </Heading> */}
  
          {/* -------------CATEGORY------------ */}
  
          <Flex justifyContent="space-between" mt={8}>
            <Flex align="flex-end">
              <Heading as="h2" size="lg" letterSpacing="tight">
                PRODUCTS
              </Heading>
              <Text fontSize="small" color="gray" ml={4}>
                {date}
              </Text>
             
            </Flex>

                <Button leftIcon={<PlusSquareIcon />} colorScheme='teal' variant='solid'>
                Add Product
                </Button>
      
                <Modal opened={opened}
                onClose={()=> setOpened(false)}>
                    <AddProductForm />
                </Modal>
                <Group>
                    <Button bgColor="gray.200" 
                    onClick={()=> setOpened(true)}>
                        Add Product
                    </Button>
                </Group>
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
                <TableCaption>List of Products</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Id</Th>
                    <Th>Image</Th>
                    <Th>BPOM Code</Th>
                    <Th>Name</Th>
                    <Th>Stock</Th>
                    <Th>Unit</Th>
                    <Th>Amount per Stock</Th>
                    <Th>Initial Price</Th>
                    <Th>Sell Price</Th>
                    <Th>Edit</Th>
                    <Th>Convert</Th>
                  </Tr>
                </Thead>
                {/* ------------PRODUCT DATA--------- */}
                <Tbody>{renderCategoryTable()}</Tbody>
                <Tfoot>
                  {/* <Tr>
                    <Th>To convert</Th>
                    <Th>into</Th>
                    <Th>multiply by</Th>
                  </Tr> */}
                </Tfoot>
              </Table>
            </TableContainer>
          </Box>
        </Flex>
        {/* --------------Column 3------------ */}
      </Flex>
    )
}