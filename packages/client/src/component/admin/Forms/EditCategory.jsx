import { useToast } from "@chakra-ui/react"
import { useFormik } from "formik"
import { useState } from "react"
import { useRef } from "react"
import { axiosInstance } from "../../../lib/hoc/api"
import { 
    Box,
    Button, 
    Flex, 
    FormControl, 
    FormLabel, 
    Input, 
    Stack 
} 
from "@chakra-ui/react";
import {
    SettingsIcon,
} from "@chakra-ui/icons"
import { Modal, Group } from '@mantine/core'
export default function EditCategoryForm(props) {

    const {id_edit, init_name} = props 
    const [opened2, setOpened2] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    const toast = useToast()
    const inputFileRef = useRef(null)

    const handleFile = (event) => {
        setSelectedFile(event.target.files[0])
    }

  
    const formik = useFormik({
        initialValues:{
            name: init_name
        },
        onSubmit: async() => {
            const formData = new FormData()
            const { name } = formik.values
            
            formData.append("name", name)
            formData.append("category_img", selectedFile)

            console.log(formData)

            try{
                await axiosInstance.patch("/category/" + id_edit, formData).then(()=>{

                    toast({
                        title: "Category edited",
                        status: "success",
                        isClosable: true
                    })
                })
            } catch (err) {
                console.log(err)

                toast({
                    title: "Error",
                    status: "error",
                    description: "error editing",
                    isClosable: true
                })
            }

        }
    })
    return(
        <>
        <Modal opened={opened2}
        onClose={()=> setOpened2(false)}>
            <Box>
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
                                Update
                            </Button>
                        </FormControl>
                    </Stack>
                </Flex>
            </Box> 
        </Modal>
        <Group>
            <Button 
                onClick={() => setOpened2(true)}>
                    <SettingsIcon></SettingsIcon>
            </Button>
        </Group>
        </>
    )

}