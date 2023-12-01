'use client';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import './style.module.css'
import { useForm } from 'react-hook-form';


const PageLogin = () => {
  
  const {register, handleSubmit} = useForm({

  })

const onSubmit = (data: any) => {
  console.log(data)
}

  return (
    <Flex direction={'column'} alignItems='center' justifyContent='center' w='100vw' h='100vh'>
     
      <FormControl
        display='flex'
        flexDirection='column'
        justifyContent='space-evenly'
        alignItems={'center'}
        w={500}
        h={650}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1>Faça o seu login</h1>
        <InputGroup display='flex' alignItems='center' h='auto'>
          <EmailIcon color='teal' h={35} w='10%' />
          <InputLeftElement
            pointerEvents='none'
            color='gray.300'
            fontSize='1.2em'
          />
          <Input type='tel' placeholder='Email' h='45px' w='90%' />
        </InputGroup>

        <InputGroup display='flex' alignItems='center' h='auto'>
          <LockIcon color='teal' h={35} w='10%' />
          <InputLeftElement
            pointerEvents='none'
            color='gray.300'
            fontSize='1.2em'
          ></InputLeftElement>
          <Input placeholder='Senha' type='password' h='45px' w='90%' />
        </InputGroup>

        <Flex w='90%' justify='space-between' margin='0 auto'>
          <Button h='40px' colorScheme='teal' variant='solid'>
            Back
          </Button>
          <Button
            type='submit'
            h='40px'
            loadingText='Submitting'
            colorScheme='teal'
            variant='outline'
          >
            Submit
          </Button>
        </Flex>
      </FormControl>
    </Flex>
  );
};

export default PageLogin;
