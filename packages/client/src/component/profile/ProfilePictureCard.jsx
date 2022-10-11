import {
    Heading,
    Avatar,
    Center,
    Text,
    Stack,
    Button,
    Link,
    Badge,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { 
    Box, 
    Flex, 
    FormControl, 
    FormLabel, 
    Input, 
    Modal, 
    ModalContent, 
    ModalOverlay, 
    Radio, 
    RadioGroup, 
    useDisclosure, 
    useToast 
  } from "@chakra-ui/react";
import { axiosInstance } from "../../lib/hoc/api";
import { useSelector } from 'react-redux';
import ProfilePicture from './EditProfilePict';
  
  export default function ProfilePictureCard() {

    const userSelector = useSelector((state) => (state.auth))
    const { isOpen: isOpenPP, onOpen: onOpenPP, onClose: onClosePP } = useDisclosure()

    return (
    
      <Center py={6}>
        <Box
          maxW={'320px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'lg'}
          p={6}
          textAlign={'center'}>
          <Avatar
            size={'xl'}
            src={
              'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
            }
            alt={'Avatar Alt'}
            mb={4}
            pos={'relative'}
            _after={{
              content: '""',
              w: 4,
              h: 4,
              bg: 'green.300',
              border: '2px solid white',
              rounded: 'full',
              pos: 'absolute',
              bottom: 0,
              right: 3,
            }}
          />
          <Text
            textAlign={'center'}
            color={useColorModeValue('gray.700', 'gray.400')}
            px={3}>
            File max size 1 MB
          </Text>
          <Text
            textAlign={'center'}
            color={useColorModeValue('gray.700', 'gray.400')}
            px={3}>
            File must be in .JPG, .PNG, and .GIF format
          </Text>
  
          <Stack mt={8} direction={'row'} spacing={4}>
            <Button onClick={onOpenPP} colorScheme={"messenger"}>
            Change Picture
            </Button>
            <Modal isOpen={isOpenPP} onClose={onClosePP}>
                <ModalOverlay />
                <ModalContent>
                    <ProfilePicture onClose={onClosePP} />
                </ModalContent>
            </Modal>
            <Button
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}
            _focus={{
              bg: 'blue.500',
            }}>
            Change Password
          </Button>
          </Stack>
        </Box>
      </Center>
    );
  }