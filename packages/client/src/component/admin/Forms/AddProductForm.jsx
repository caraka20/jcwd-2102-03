import { Box, Button, Flex, FormControl, FormLabel, Input, InputGroup, InputLeftElement, NumberInput, NumberInputField, Select, Stack, Textarea, Image, list } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRef } from "react";
import { useState } from "react";
import { axiosInstance } from "../../../lib/hoc/api";
import { useToast, } from "@chakra-ui/react";
import { ref } from "yup";
import * as moment from "moment"
import NextImage from "next/image";
import qs from "querystring"
import { useEffect } from "react";
import { useSelector } from "react-redux";


export default function AddProductForm(){

    const [selectedFile, setSelectedFile] = useState(null)
    const toast = useToast()
    const inputFileRef = useRef(null)
    // const expired = moment().add(1, "year").fromNow()
    const [showImage, setShowImage] = useState(null)
    const [listUnit, setListUnit] = useState([])
    const [listCategory, setListCategory] = useState([])
    const renderDataCategory = useSelector((state) => state.category)
    const renderDataUnit = useSelector((state)=> state.unit)
    const [loadDataCategory, setLoadDataCategory] = useState(1)
    const [loadDataUnit, setLoadDataUnit] = useState(1)

    
    const fetchUnit = async () => {
        await axiosInstance.get("/unit").then((res)=>{
            setListUnit(res.data.results)
        }).catch((err) => {
            alert("error getting categories")
        })
    }

    const fetchCategory = async () => {
        await axiosInstance.get("/category").then((res)=>{
            setListCategory(res.data.results)
        }).catch((err) => {
            alert("error getting categories")
        })
    }

    useEffect(()=> {
        fetchCategory()
        fetchUnit()
    }, [])

    useEffect(()=>{
        if(renderDataCategory?.value !== undefined && renderDataUnit?.value !== undefined){
            setLoadDataCategory(loadDataCategory)
            setLoadDataUnit(loadDataUnit)
        }
    }, [renderDataCategory?.value, renderDataUnit?.value])

    const renderUnitOption = () => {
        return listUnit.map((val, index)=>{
            return(
                    <option value={val.id}>{val.unit_name}</option>
            )
        })
    }
    
    const renderCategoryOption = () => {
        return listCategory.map((val, index)=> {
            return(
                <option value={val.id}>{val.name}</option>
            )
        })
    }
    

    const handleFile = (event) => {
        setSelectedFile(event.target.files[0])
        const uploadedImage = event.target.files[0]
        setShowImage(URL.createObjectURL(uploadedImage))
    }

    const formik = useFormik({
        initialValues:{
            product_name: "",
            bpom_code: "",
            type: "",
            id_unit: "",
            category1: "",
            category2: "",
            category3: "",
            description: "",
            stock: "",
            init_price:"",
            sell_price:"",
            amount_per_stock: "",
            desc: "Created new product",
            type_hist: "Addition",
        },

        onSubmit: async () => {

            const { 
                product_name, 
                bpom_code, 
                type, 
                id_unit, 
                description, 
                stock, 
                init_price, 
                sell_price,
                amount_per_stock,
                category1,
                category2,
                category3,
                type_hist,
                desc,
            } = formik.values

            let body = {
                product_name: product_name,
                bpom_code: bpom_code,
                type: type,
                id_unit: id_unit,
                category1: category1,
                category2: category2,
                category3: category3,
                description: description,
                stock: stock,
                init_price: init_price,
                sell_price: sell_price,
                amount_per_stock: amount_per_stock,
                product_image: selectedFile,
                type_hist,
                desc,
            }

            try{

                await axiosInstance.post("/product/", qs.stringify(body)).then(() => {

                    toast({
                        title: "New category has been added",
                        status: "success",
                        isClosable: true,
                    })
                })

            } catch (err) {
                console.log(err)

                toast({
                    title: "Error",
                    status: "Error",
                    description: "Error creating category",
                    isClosable: true,
                })
            }
        }
    })

    return (
        <Flex flexDir={"row"} justify={"space-between"}>
            <Box flex={3} mr={"5"}>
                <Stack spacing={3}>
                    <FormControl>
                    <FormLabel>Type</FormLabel>
                    <Select onChange={(event) => formik.setFieldValue("type", event.target.value)}
                     placeholder="Select product type">
                        <option value="Medicine">Medicine</option>
                        <option value="Compound">Compound</option>
                    </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Product Name</FormLabel>
                        <Input onChange={(event) => formik.setFieldValue("product_name", event.target.value)} 
                        type={"text"}></Input>
                    </FormControl>
                    <FormControl>
                        <FormLabel>BPOM Number</FormLabel>
                        <Input onChange={(event) => formik.setFieldValue("bpom_code", event.target.value)} 
                        type={"text"}></Input>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Product Description</FormLabel>
                        <Textarea onChange={(event) => formik.setFieldValue("description", event.target.value)}>
                        </Textarea>
                    </FormControl>
                    <FormControl>
                    <FormLabel>Unit</FormLabel>
                    <Select onChange={(event) => formik.setFieldValue("id_unit", event.target.value)}
                    placeholder="Select product unit type">
                        {renderUnitOption()}
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel>Category 1</FormLabel>
                    <Select onChange={(event) => formik.setFieldValue("category1", event.target.value)}
                     placeholder="Select product category">
                        {renderCategoryOption()}
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel>Category 2</FormLabel>
                    <Select onChange={(event) => formik.setFieldValue("category2", event.target.value)} 
                    placeholder="Select product category">
                        {renderCategoryOption()}
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel>Category 3</FormLabel>
                    <Select onChange={(event) => formik.setFieldValue("category3", event.target.value)} 
                    placeholder="Select product category">
                        {renderCategoryOption()}
                    </Select>
                </FormControl>
                </Stack>
            </Box>

            <Box flex={3} mr={"5"}>
                <Stack spacing={0}>
                    <FormLabel>Stock</FormLabel>
                    <NumberInput defaultValue={0} min={1} max={99}>
                    <NumberInputField onChange={(event) => formik.setFieldValue("stock", event.target.value)}/>
                    </NumberInput>
                </Stack>
                <Stack spacing={4}>
                <FormControl mt={2.5}>
                    <FormLabel>Base Price</FormLabel>
                    <InputGroup>
                        <InputLeftElement
                        pointerEvents={'none'}
                        color={"gray"}
                        fontSize="sm"
                        children="Rp"/>
                        <Input onChange={(event) => formik.setFieldValue("init_price", event.target.value)}
                        placeholder="Enter amount"></Input>
                    </InputGroup>
                </FormControl>
                <FormControl mb={1}>
                    <FormLabel>Sell Price</FormLabel>
                    <InputGroup>
                        <InputLeftElement
                        pointerEvents={'none'}
                        color={"gray"}
                        fontSize="sm"
                        children="Rp"/>
                        <Input onChange={(event) => formik.setFieldValue("sell_price", event.target.value)}
                        placeholder="Enter amount"></Input>
                    </InputGroup>
                </FormControl>
                    <FormLabel>Contents Per Stock</FormLabel>
                    <NumberInput defaultValue={0}>
                        <NumberInputField />
                    </NumberInput>
                </Stack>
            <Box minW='400px' minH='300px' >
              <FormControl>
                <FormLabel> Image </FormLabel>
                <Flex>
                    <Box>
                        <Box w='400px' h='300px' rounded='lg' >
                            {showImage !==
                            <NextImage src={""} rounded='lg' />
                            && <Image src={showImage} objectFit='cover' w='400px' h='300px' rounded='lg' />}
                        </Box>
                        <Input type='file' onChange={handleFile} hidden
                            accept={"image/png, image/jpg, image/jpeg"} ref={inputFileRef} />
                        <Button background='#72FFFF' mt='5px' size='sm' onClick={() => inputFileRef.current.click()} >Upload Image</Button>
                        <Button size='sm' mt='5px' ml='5px' background='#FFB4B4' onClick={() => {
                            setShowImage(null)
                            setSelectedFile(null)
                        }}>Cancel</Button>
                    </Box>
                    <Box justifyContent={"center"} ml={"24"} mt={"28"}flex={5}>
                        <Button colorScheme={"whatsapp"} onClick={() => formik.handleSubmit()}>Create Product</Button>
                    </Box>
                </Flex>
              </FormControl>
            </Box>
            </Box>
        </Flex>
    )
}
{/* <Box>
    <Flex
    minH={"-moz-fit-content"}
    align={"center"}
    justify={"center"}>
        <Stack spacing={4}>
            <FormControl>
                <FormLabel>Image</FormLabel>
                <Input type={'file'} 
                display={"none"}
                onChange={handleFile}
                accept={"image/png, image/jpg, image/jpeg, image/gif"}
                ref={inputFileRef}></Input>
                <Button colorScheme={"teal"}
                onClick={() => inputFileRef.current.click()}>
                    Upload Image
                </Button>
            </FormControl>

            <FormControl>
                <FormLabel>Category Name</FormLabel>
                <Input onChange={(e)=>{
                    formik.setFieldValue("name", e.target.value)
                }}></Input>
            </FormControl>

            <FormControl align={"center"}>
                <Button colorScheme={"teal"}
                onClick={() => formik.handleSubmit()}>
                    Submit
                </Button>
            </FormControl>
        </Stack>
    </Flex>
</Box> */}