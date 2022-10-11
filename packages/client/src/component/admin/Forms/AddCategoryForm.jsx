import { Box, Button, Flex, FormControl, FormLabel, Image, Input, Stack } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRef } from "react";
import { useState } from "react";
import { axiosInstance } from "../../../lib/hoc/api";
import { useToast, } from "@chakra-ui/react";
import { ref } from "yup";
import NextImage from "next/image";


export default function AddCategoryForm(){

    const [selectedFile, setSelectedFile] = useState(null)
    const toast = useToast()
    const inputFileRef = useRef(null)
    const [showImage, setShowImage] = useState(null)

    const handleFile = (event) => {
        setSelectedFile(event.target.files[0])
    }

    const formik = useFormik({
        initialValues:{
            name: ""
        },
        onSubmit: async () => {
            const formData = new FormData()
            const { name } = formik.values

            formData.append("name", name)
            formData.append("category_img", selectedFile)

            try{

                await axiosInstance.post("/category/", formData).then(() => {

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
        <Box>
            <Flex
            minH={"-moz-fit-content"}
            align={"center"}
            justify={"center"}>
                <Stack spacing={4}>
                    <FormControl>
                        <FormLabel>Image</FormLabel>
                        <Box w='400px' h='300px' rounded="lg">
                            {showImage !== 
                            <NextImage src={""} rounded="lg"/>
                            && <Image src={showImage} alt="image" objectFit='cover' w={"400px"} h={"300px"} rounded="lg" />}
                        </Box>
                        <Input type={'file'} 
                        display={"none"}
                        onChange={handleFile}
                        accept={"image/png, image/jpg, image/jpeg, image/gif"}
                        ref={inputFileRef}></Input>
                        <Button colorScheme={"teal"}
                        onClick={() => inputFileRef.current.click()}>
                            Upload Image
                        </Button>
                        <Button size='sm' mt='5px' ml='5px' background='#FFB4B4' onClick={() => {
                            setShowImage(null)
                            setSelectedFile(null)
                        }}>Cancel</Button>
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
        </Box>
    )
}