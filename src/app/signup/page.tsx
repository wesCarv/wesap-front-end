"use client";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import {  useForm } from "react-hook-form";
import { MdPeopleAlt } from "react-icons/md";
import { ISignUp } from "../interfaces";
import { toast } from "react-toastify";
import { useCallback } from "react";
import instance from "../services/axios/instance";
import Link from "next/link";

const PageSignup = () => {
  const { register, handleSubmit } = useForm<ISignUp>();

  const fetchApi = useCallback((formData: ISignUp) => {
    async function signUp() {
      try {
        await instance.post("/user", formData);
        toast.success("Login realizado com sucesso");

        
      } catch (error) {
        toast.error(
          "OPS, algo deu errado, verifique seu email e senha e tente novamente"
        );
      }
    }
    signUp();
  }, []);

  return (
    <Flex
      direction={"column"}
      alignItems="center"
      justifyContent="center"
      w="100vw"
      h="100vh"
    >
      <h1>Faça o seu Cadastro aqui:</h1>
      <FormControl
        display="flex"
        flexDirection="column"
        justifyContent="space-evenly"
        alignItems={"center"}
        w={500}
        h={650}
        onSubmit={handleSubmit(fetchApi)}
      >
        <InputGroup>
          <Icon as={MdPeopleAlt} color="teal" h={35} w="10%" />
          <InputLeftElement pointerEvents="none"></InputLeftElement>
          <Input type="text" placeholder="Nome" />
        </InputGroup>

        <InputGroup display="flex" alignItems="center" h="auto">
          <EmailIcon color="teal" h={35} w="10%" />
          <InputLeftElement
            pointerEvents="none"
            color="gray.300"
            fontSize="1.2em"
          />
          <Input type="tel" placeholder="Email" h="45px" w="90%" />
        </InputGroup>
        <InputGroup display="flex" alignItems="center" h="auto">
          <LockIcon color="teal" h={35} w="10%" />
          <InputLeftElement
            pointerEvents="none"
            color="gray.300"
            fontSize="1.2em"
          ></InputLeftElement>
          <Input placeholder="Senha" type="password" h="45px" w="90%" />
        </InputGroup>
        <Flex w="90%" justify="space-between" margin="0 auto">
          <Button h="40px" type="button" colorScheme="teal" variant="solid">
            <Link href='/'/>
            Back
          </Button>
          <Button
            type="submit"
            h="40px"
            loadingText="Submitting"
            colorScheme="teal"
            variant="outline"
          >
            Submit
          </Button>
        </Flex>
      </FormControl>
    </Flex>
  );
};

export default PageSignup;
