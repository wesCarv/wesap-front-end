"use client";
import {
  Button,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import instance from "../services/axios/instance";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { loginSchema } from "../schemas/schemas";
import { yupResolver } from "@hookform/resolvers/yup";


function Login() {
  const { register, handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const router = useRouter()
  const toast = useToast()

  const fetchApi = useCallback((formData: any) => {
    async function login() {
      try {
        const resp = await instance.post("/auth/login", formData);
        window.localStorage.setItem("@wesap:token", resp.data.accessToken);
        window.localStorage.setItem("name-user", resp.data.user.name)
        router.push('/dashboard')
        toast({
          title: "Login realizado com sucesso",
          description: "Você será redirecionado em alguns instantes",
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      } catch (e) {
        toast({
          title: "OPS, algo deu errado",
          description: "Verifique seu email e senha e tente novamente",
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    }
    login();
  }, [router, toast]);

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
      >
        <Text fontSize={"4xl"}>Faça o seu login</Text>
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
            errorBorderColor='red.300'
            {...register("email")}
          />
        </InputGroup>
          <Text fontSize={'xl'} color={'red.700'}>{errors.email?.message}</Text>
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
        <Text fontSize={'xl'} color={'red.700'}>{errors.password?.message}</Text>
        <Flex w="90%" justify="space-between" margin="0 auto">
          <Button
            fontSize={"2xl"}
            h="40px"
            colorScheme="teal"
            variant="solid"
            onClick={() => {
              router.push('/signup')
              toast({
                title: "Você está sendo direcionado a pagina de cadastro",
                description: "Você será redirecionado em alguns instantes",
                status: 'loading',
                duration: 2000,
                isClosable: true,
              })
            }}
          >
            SignUp
          </Button>
          <Button
            fontSize={"2xl"}
            h="40px"
            loadingText="Submitting"
            colorScheme="teal"
            variant="outline"
            onClick={() => {
              handleSubmit(fetchApi)();
            }}
          >
            Submit
          </Button>
        </Flex>
      </FormControl>
    </Flex>
  );
}

export default Login;
