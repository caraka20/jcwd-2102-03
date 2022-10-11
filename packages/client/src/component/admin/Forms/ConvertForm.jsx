import { Box, Button, Flex, FormControl, FormLabel, Input, InputGroup, InputLeftElement, NumberInput, NumberInputField, Select, Stack, Textarea, Image, list, Heading, HStack } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRef } from "react";
import { useState } from "react";
import { axiosInstance } from "../../../lib/hoc/api";
import { useToast, } from "@chakra-ui/react";
import NextImage from "next/image";
import { Modal, Group } from '@mantine/core'
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
    RepeatIcon,
} from "@chakra-ui/icons"
import qs from "querystring"

export default function ConvertProductConfirmation (props) {

    const [opened2, setOpened2] = useState(false)
    const toast = useToast()
    const [listUnit, setListUnit] = useState([])
    const { id, unit, stock, aps, sellP, initP, is_converted } = props


    const fetchUnit = async () => {
        await axiosInstance.get("/unit").then((res)=>{
            setListUnit(res.data.results)
        }).catch((err) => {
            alert("error getting categories")
        })
    }

    const renderUnitOption = () => {
        return listUnit.map((val, index)=>{
            if(unit == "1"){
                if(val.unit_name == "Sachet" && val.unit_name == "Tablet" && val.unit_name == "Bottle" && val.unit_name == "Kaplet"){
                    {null}
                }else{
                    return(
                            <option key={index} value={val.id}>{val.unit_name}</option>
                    )
                }
            } else if (unit == "4" || unit == "6") {
                if(val.unit_name == "Sachet" && val.unit_name == "Capsule" && val.unit_name == "Bottle" && val.unit_name == "Kaplet"){
                    {null}
                }else{  
                    return(
                        <option key={index} value={val.id}>{val.unit_name}</option>
                    )
                }
            } else {
                <option key={index} value={val.id}>{val.unit_name}</option>
            }
        })
    }

        const formik = useFormik({
            initialValues:{
                id_unit: unit,
                id_unit2: "",
                stock: stock,
                // id_product: id_prod,
                sell_price: sellP,
                init_price: initP,
                amount_per_stock: aps,
                is_converted: is_converted
            },
            onSubmit: async() => {

                const { id_unit2, } = formik.values

                // const formData = new FormData()

                let body = {
                    id_unit: unit,
                    id_unit2: id_unit2,
                    stock,
                    sell_price: sellP,
                    init_price: initP,
                    amount_per_stock: aps,
                    is_converted: is_converted,
                }
                
                // formData.append("id_unit", id_unit)
                // formData.append("id_unit2", id_unit2)
                // formData.append("stock", stock)
                // formData.append("amount_per_stock", amount_per_stock)
                // formData.append("sell_price", sell_p)
                // formData.append("init_price", init_p)
                // formData.append("is_converted", is_converted)
                // formData.append("id_product", id_prod)

            try{
                
                await axiosInstance.patch("/product/" + id, qs.stringify(body)).then(() => {                    
                    toast ({
                        title: "Converted",
                        description: "Product has been successfully converted",
                        status: "success",
                        isClosable: true
                    })
                })
                
            } catch (err) {
                console.log(err)
                
                toast({
                    title: "Error",
                    description: "There was an error converting product",
                    status:"error",
                    isClosable: true
                })
            }
        }
        })

        useEffect(()=> {
            fetchUnit()
        }, [])

        return (
            <>
            <Modal opened={opened2}
            onClose={()=> setOpened2(false)}>
                <Box>
                    <Flex
                    minH={"-moz-fit-content"}
                    align={"center"}
                    justify={"center"}>
                        <Stack spacing={4}>

                            <FormLabel>Unit</FormLabel>
                            <Select onChange={(event) => formik.setFieldValue("id_unit2", event.target.value)}
                            placeholder="Select product unit type">
                                {renderUnitOption()}
                            </Select>
    
                            <Heading fontSize={"xl"}>
                                Do you want to convert this product?
                            </Heading>
                            
                            <HStack>
                                <FormControl align={"center"}>
                                    <Button colorScheme={"teal"}
                                    onClick={() => setOpened2(false)}>
                                        No
                                    </Button>
                                </FormControl>
                                <FormControl align={"center"}>
                                    <Button colorScheme={"teal"}
                                    onClick={() => formik.handleSubmit()}>
                                        Yes
                                    </Button>
                                </FormControl>
                            </HStack>
                        </Stack>
                    </Flex>
                </Box> 
            </Modal>
            <Group>
                <Button 
                    onClick={() => setOpened2(true)}>
                        <RepeatIcon></RepeatIcon>
                </Button>
            </Group>
            </>
        )
    }

  

