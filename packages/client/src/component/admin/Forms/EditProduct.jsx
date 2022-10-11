import { Box, Button, Flex, FormControl, FormLabel, Input, InputGroup, InputLeftElement, NumberInput, NumberInputField, Select, Stack, Textarea, Image, list } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRef } from "react";
import { useState } from "react";
import { axiosInstance } from "../../../lib/hoc/api";
import { useToast, } from "@chakra-ui/react";
import NextImage from "next/image";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
    EditIcon,
    SettingsIcon,
} from "@chakra-ui/icons"
import { Modal, Group } from '@mantine/core'


export default function EditProductForm(props){

    const { 
        id,
        // id_prod,
        product_name,
        product_image,
        bpom_code,
        stock,
        unit,
        aps,
        initP,
        sellP,
        category,
        description
    } = props   

    const [selectedFile, setSelectedFile] = useState(null)
    const toast = useToast()
    const inputFileRef = useRef(null)
    // const expired = moment().add(1, "year").fromNow()
    const [showImage, setShowImage] = useState(product_image)
    const [listUnit, setListUnit] = useState([])
    const [listCategory, setListCategory] = useState([])
    const renderDataCategory = useSelector((state) => state.category)
    const renderDataUnit = useSelector((state)=> state.unit)
    const [loadDataCategory, setLoadDataCategory] = useState(1)
    const [loadDataUnit, setLoadDataUnit] = useState(1)
    const [opened, setOpened] = useState(false)
    
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
                    <option key={index} value={val.id}>{val.unit_name}</option>
            )
        })
    }
    
    const renderCategoryOption = () => {
        return listCategory.map((val, index)=> {
            return(
                <option key={index} value={val.id}>{val.name}</option>
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
            id: id,
            product_name: product_name,
            bpom_code: bpom_code,
            // type: "",
            id_unit: unit,
            category1: category,
            description: description,
            stock: stock,
            init_price: initP,
            sell_price: sellP,
            amount_per_stock: aps,
            desc: "Update",
            type_hist: "Update Stock",
        },

        onSubmit: async () => {

            const formData = new FormData()

            const { 
                id,
                // id_product,
                product_name, 
                bpom_code, 
                // type, 
                id_unit, 
                description, 
                stock, 
                init_price, 
                sell_price,
                amount_per_stock,
                category1,
                type_hist,
                desc,
            } = formik.values

            formData.append("product_name", product_name)
            formData.append("bpom_code", bpom_code)
            formData.append("id", id)
            // formData.append("id_prod", id_prod)
            // formData.append("type", type)
            formData.append("id_unit", id_unit)
            formData.append("category1", category1)
            formData.append("description", description)
            formData.append("stock", stock)
            formData.append("init_price", init_price)
            formData.append("sell_price", sell_price)
            formData.append("amount_per_stock", amount_per_stock)
            formData.append("product_image", selectedFile)
            formData.append("type_hist", type_hist)
            formData.append("desc", desc)

            try{

                await axiosInstance.patch("/product/", formData).then(() => {

                    toast({
                        title: "Product Edited",
                        status: "success",
                        isClosable: true,
                    })
                })

            } catch (err) {
                console.log(err)

                toast({
                    title: "Error",
                    status: "Error",
                    description: "Error editing product",
                    isClosable: true,
                })
            }
        }
    })

    return (
        <>
        <Modal size={"full"} opened={opened}
        onClose={()=> setOpened(false)}>
            <Flex flexDir={"row"} justify={"space-between"}>
                <Box flex={3} mr={"5"}>
                    <Stack spacing={3}>
                        {/* <FormControl>
                        <FormLabel>Type</FormLabel>
                        <Select onChange={(event) => formik.setFieldValue("type", event.target.value)}
                        placeholder="Select product type">
                            <option value="Medicine">Medicine</option>
                            <option value="Compound">Compound</option>
                        </Select>
                        </FormControl> */}
                        <FormControl>
                            <FormLabel>Product Name</FormLabel>
                            <Input placeholder={product_name} onChange={(event) => formik.setFieldValue("product_name", event.target.value)} 
                            type={"text"}></Input>
                        </FormControl>
                        <FormControl>
                            <FormLabel>BPOM Number</FormLabel>
                            <Input placeholder={bpom_code} onChange={(event) => formik.setFieldValue("bpom_code", event.target.value)} 
                            type={"text"}></Input>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Product Description</FormLabel>
                            <Textarea placeholder={description} onChange={(event) => formik.setFieldValue("description", event.target.value)}>
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
                    </Stack>
                </Box>

                <Box flex={3} mr={"5"}>
                    <Stack spacing={0}>
                        <FormLabel>Stock</FormLabel>
                        <NumberInput defaultValue={stock} min={1} max={99}>
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
                            />
                            <Input defaulValue={initP} onChange={(event) => formik.setFieldValue("init_price", event.target.value)}
                            placeholder={initP}></Input>
                        </InputGroup>
                    </FormControl>
                    <FormControl mb={1}>
                        <FormLabel>Sell Price</FormLabel>
                        <InputGroup>
                            <InputLeftElement
                            pointerEvents={'none'}
                            color={"gray"}
                            fontSize="sm"
                            />
                            <Input onChange={(event) => formik.setFieldValue("sell_price", event.target.value)}
                            placeholder={sellP}></Input>
                        </InputGroup>
                    </FormControl>
                        <FormLabel>Contents Per Stock</FormLabel>
                        <NumberInput defaultValue={aps}>
                            <NumberInputField onChange={(event) => formik.setFieldValue("amount_per_stock", event.target.value)}/>
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
                            <Button background='#72FFFF' mt='5px' size='sm' onClick={() => inputFileRef.current.click()}>Upload Image</Button>
                            <Button size='sm' mt='5px' ml='5px' background='#FFB4B4' onClick={() => {
                                setShowImage(product_image)
                                setSelectedFile(product_image)
                            }}>Cancel</Button>
                        </Box>
                        <Box justifyContent={"center"} ml={"24"} mt={"28"}flex={5}>
                            <Button colorScheme={"whatsapp"} onClick={() => formik.handleSubmit()}>Save</Button>
                        </Box>
                    </Flex>
                </FormControl>
                </Box>
                </Box>
            </Flex>
        </Modal>
        <Group>
            <Button>
                <EditIcon onClick={() => setOpened(true)}/>
            </Button>
        </Group>
    </>        
    )
}