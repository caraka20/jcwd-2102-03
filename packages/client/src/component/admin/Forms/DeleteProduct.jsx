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
    DeleteIcon,
} from "@chakra-ui/icons"

export default function DeleteProductConfirmation (props) {

    const [opened2, setOpened2] = useState(false)
    const toast = useToast()
    const { id, unit } = props

        const formik = useFormik({
            initialValues:{
                id_unit: unit
            },
            onSubmit: async() => {

                const { id_unit } = formik.values

                const formData = new FormData()
                
                formData.append("id_unit", id_unit)
    
                console.log(formData)

            try{
                
                await axiosInstance.delete("/product/" + id, formData).then(() => {                    
                    toast ({
                        title: "Deleted",
                        description: "Product has been successfully deleted",
                        status: "success",
                        isClosable: true
                    })
                })
                
            } catch (err) {
                console.log(err)
                
                toast({
                    title: "Error",
                    description: "There was an error deleting product",
                    status:"error",
                    isClosable: true
                })
            }
        }
        })

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
    
                            <Heading fontSize={"xl"}>
                                Do you want to delete this product?
                            </Heading>
                            
                            <HStack>
                                <FormControl align={"center"}>
                                    <Button colorScheme={"teal"}
                                    onClick={() => formik.handleSubmit()}>
                                        Yes
                                    </Button>
                                </FormControl>
                                <FormControl align={"center"}>
                                    <Button colorScheme={"teal"}
                                    onClick={() => setOpened2(false)}>
                                        No
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
                        <DeleteIcon></DeleteIcon>
                </Button>
            </Group>
            </>
        )
    }

  

