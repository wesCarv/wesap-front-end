"use client";
import { Button, Flex, FormControl, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form';
import instance from "../services/axios/instance";
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import Link from 'next/link';


function Login2() {

  const { register, handleSubmit, formState: { errors }, watch, } = useForm();

const fetchApi = useCallback((formData: any) => {
    console.log('FETCH API')
    async function login() {
      try {
        await instance.post('/auth/login', formData);
      } catch (error) {
        console.log(error)
      }
    }
    login();
  }, []);

  return (
    <Flex
      direction={"column"}
      alignItems="center"
      justifyContent="center"
      w="100vw"
      h="100vh"
    >
      <FormControl
        display="flex"
        flexDirection="column"
        justifyContent="space-evenly"
        alignItems={"center"}
        w={500}
        h={650}
        // onSubmit={handleSubmit(fetchApi)}
      >
        <h1>Faça o seu login</h1>
        <InputGroup display="flex" alignItems="center" h="auto">
          <EmailIcon color="teal" h={35} w="10%" />
          <InputLeftElement
            pointerEvents="none"
            color="gray.300"
            fontSize="1.2em"
          />
          <Input
            type="tel"
            placeholder="Email"
            id="email"
            h="45px"
            w="90%"
            {...register("email")}
          />
        </InputGroup>

        <InputGroup display="flex" alignItems="center" h="auto">
          <LockIcon color="teal" h={35} w="10%" />
          <InputLeftElement
            pointerEvents="none"
            color="gray.300"
            fontSize="1.2em"
          ></InputLeftElement>
          <Input
            id="password"
            placeholder="Senha"
            type="password"
            h="45px"
            w="90%"
            {...register("password")}
          />
        </InputGroup>

        <Flex w="90%" justify="space-between" margin="0 auto">
          <Button h="40px" colorScheme="teal" variant="solid">
            <Link href='/signup' />Back
          </Button>
          <Button
            type="submit"
            h="40px"
            loadingText="Submitting"
            colorScheme="teal"
            variant="outline"
             onClick={() => {
              console.log('TESTE')
              handleSubmit(fetchApi)()
            }}
          >
            Submit
          </Button>
        </Flex>
      </FormControl>
       <Button
            type="submit"
            h="40px"
            loadingText="Submitting"
            colorScheme="teal"
            variant="outline"
            onClick={() => {
              console.log('TESTE')
              handleSubmit(fetchApi)()
            }}
          >
            TESTE
          </Button>
    </Flex>
    )
  }

  export default Login2