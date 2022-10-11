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
import AddProductForm from "../Forms/AddProductForm"
import EditProductForm from "../Forms/EditProduct"
import DeleteProductConfirmation from "../Forms/DeleteProduct"
import { useFormik } from "formik"
import ConvertProductConfirmation from "../Forms/ConvertForm"


export default function TableProduct (props) {
    
    const dispatch = useDispatch()
    const router = useRouter()
    const date = moment(new Date()).format("LLLL")
    const toast = useToast()
    const [opened2, setOpened2] = useState(false)
    const renderData = useSelector((state) => state.category)
    const [listProduct, setListProduct] = useState([])
    const [loadData, setLoadData] = useState(1)
    const [listCategory, setListCategory] = useState([])
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [totalProduct, setTotalProduct] = useState(0)
    const [limitProduct, setLimitProduct] = useState(5)
    const [orderBy, setOrderBy] = useState("createdAt")
    const [sortBy, setSortBy] = useState("ASC")
    const [category, setCategory] = useState(0)

    const formik = useFormik({
      initialValues: {
        order: orderBy,
        sort: sortBy,
        category,        
      },
      onSubmit: async () => {
        const {
          order,
          sort,
          category,
        } = formik.values

        if(order !== ""){
          setOrderBy(order)
        }
        if(sort !== ""){
          setSortBy(sort)
        }

        if(category !== null){
          setCategory(category)
          console.log("masuk cat")
        }

        setPage(1)

        console.log(order)
        console.log(sort)
        console.log(category)

        fetchProduct(order, sort, category)
      }
    })

    async function fetchProduct() {

      try{
          await axiosInstance.get(`/product?limit=9999&page=1&orderby=${orderBy}&sort=${sortBy}`).then((res)=>{
            const data = res.data.results
            setTotalProduct(data.length)
            setTotalPage(Math.ceil(data.length / limitProduct))
            console.log("this is total product" + data.length)
            console.log("this is total page" + totalPage)
            console.log(data)
        })

        if (category == 0){
        await axiosInstance.get(`/product?limit=${limitProduct}&page=${page}&orderby=${orderBy}&sort=${sortBy}`).then((res)=>{
          const data = res.data.results
          setListProduct(data)
        }) 

        } else {
          await axiosInstance.get(`/product?limit=${limitProduct}&page=${page}&orderby=${orderBy}&sort=${sortBy}&category=${category}`).then((res)=>{
            const data = res.data.results
            setTotalProduct(data.length)
            setTotalPage(Math.ceil(data.length / limitProduct))
            setListProduct(data)
          }) 
        }
      } catch (err) {
        console.log("Error getting product")

      }
      
    }


    const fetchCategory = async () => {
      await axiosInstance.get("/category").then((res)=>{
        console.log(res.data.results);
        setListCategory(res.data.results)
        
      }).catch((err)=> {
        alert("error fetching category")
      })
    }

    const renderCategoryOption = () => {
      return listCategory.map((val, index)=> {
          return(
              <option key={index} value={val.id}>{val.name}</option>
          )
      })
  }
  
    async function resetFilter () {
      setCategory(0)
      setSortBy("ASC")
      setOrderBy("createdAt")
      fetchProduct(orderBy, sortBy, category)
    }

    useEffect(()=> {
        fetchProduct()
        fetchCategory()
        page
    }, [])

    useEffect(() => {
        if (renderData?.value !== undefined){
            setLoadData(loadData)
            fetchProduct()
            // console.log(listProduct)
        }
    }, [renderData?.value]) 

    useEffect(()=> {
      fetchProduct()
  }, [category, page, limitProduct])

    const renderTable = () => {
        return listProduct.map((val, index) => {
            return (
                <Tr key={index}>
                    <Td>{val.id}</Td>
                    <Td>
                        <Img src={`${val.ProductImages[0]?.product_image}`}
                        w={"100px"}
                        h={"50px"}>
                        </Img>
                    </Td>
                    <Td>
                        {val.bpom_code}
                    </Td>
                    <Td>
                        {val.product_name}
                    </Td>
                    <Td>
                        {val.Units[0].ProductStock?.stock}
                    </Td>
                    <Td>
                        {val.Units[0].unit_name}
                    </Td>
                    <Td>
                      Rp {val.Units[0].ProductStock?.init_price}
                    </Td>
                    <Td>
                       Rp {val.Units[0].ProductStock?.sell_price}
                    </Td>
                    <Td>
                      <EditProductForm 
                      key={index}
                      id={val?.id}
                      product_name={val.product_name}
                      product_image={val.ProductImages[0]?.product_image}
                      bpom_code={val.bpom_code}
                      stock={val.Units[0].ProductStock?.stock}
                      unit={val.Units[0].id}
                      aps={val.Units[0].ProductStock?.amount_per_stock}
                      initP={val.Units[0].ProductStock?.init_price}
                      sellP={val.Units[0].ProductStock?.sell_price}
                      category={val.Categories[0].id}
                      description={val.ProductDescription.description}
                      />
                    </Td>
                    {val.Units[0].ProductStock?.amount_per_stock ? (
                      <Td>
                        <ConvertProductConfirmation
                        key={index}
                        id={val.id}
                        unit={val.Units[0].id}
                        stock={val.Units[0].ProductStock?.stock}
                        aps={val.Units[0].ProductStock?.amount_per_stock}
                        initP={val.Units[0].ProductStock?.init_price}
                        sellP={val.Units[0].ProductStock?.sell_price}
                        id_prod={val.Units[0].ProductStock?.id_product}
                        is_converted={val.Units[0].ProductStock?.is_converted}
                        />
                      </Td>
                    ) : (
                    <Td>
                      Already Converted
                    </Td>
                    )
                    }
                    <Td>
                    <DeleteProductConfirmation
                      key={index}
                      id={val?.id}
                      unit={val.Units[0].id}
                      />
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
              <Button bg={"gainsboro"} onClick={() => router.push("/Product/History")}>History</Button>
              </HStack>
          </Box>
          
          <Heading fontSize={"md"}> 
            Filters
          </Heading>
          <Flex>

          <FormLabel paddingTop={5}>
            Filter by Category
          <Select onChange={(event) => formik.setFieldValue("category", event.target.value)} placeholder={"Select Category"}>
            {renderCategoryOption()}
          </Select>
          </FormLabel>

          <FormLabel paddingTop={5}>
            Sort
          <Select onChange={(event) => formik.setFieldValue("sort", event.target.value)} placeholder={"Sort by"}>
            <option value={"ASC"}>Ascending</option>
            <option value={"DESC"}>Descending</option>
          </Select>
          </FormLabel>


          <FormLabel paddingTop={5}>
            Order
          <Select onChange={(event) => formik.setFieldValue("order", event.target.value)} placeholder={"Order by"}>
            <option value={"product_name"}>Name</option>
            <option value={"sell_price"}>Price</option>
          </Select>
          </FormLabel>

          <Flex paddingTop={"44px"}>
          <Button onClick={()=>formik.handleSubmit()} colorScheme={"teal"}>
            Filter Product
          </Button>
          </Flex>

          <Flex paddingTop={"44px"} paddingLeft={2}>
          <Button onClick={()=>resetFilter()}>
            Reset Filter
          </Button>
          </Flex>

          </Flex>
  
          <Flex justifyContent="space-between" mt={8}>
            <Flex align="flex-end">
              <Heading as="h2" size="lg" letterSpacing="tight">
                PRODUCT LIST
              </Heading>
              <Text fontSize="small" color="gray" ml={4}>
                {date}
              </Text>
             
            </Flex>

            <AddProductForm/>

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
                    <Th>Initial Price</Th>
                    <Th>Sell Price</Th>
                    <Th>Edit</Th>
                    <Th>Convert</Th>
                    <Th>Delete</Th>
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