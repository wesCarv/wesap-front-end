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
  Text,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { MdPeopleAlt } from "react-icons/md";
import { ISignUp } from "../interfaces";
import { useCallback } from "react";
import instance from "../services/axios/instance";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../schemas/schemas";

const PageSignup = () => {
  const { register, handleSubmit, formState: {errors} } = useForm<ISignUp>({
    resolver: yupResolver(signupSchema),
  });
  const router = useRouter();
  const toast = useToast();

  const fetchApi = useCallback(
    (formData: ISignUp) => {
      async function signUp() {
        try {
          const resp = await instance.post("/users", formData);
          window.localStorage.setItem("name-user", resp.data.name);
          toast({
            title: "Cadastro realizado com sucesso",
            description: "Você será redirecionado em alguns instantes",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          router.push("/login");
        } catch (error) {
          toast({
            title: "OPS, algo deu errado",
            description: "Vocế será redirecionado em alguns instantes",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }
      signUp();
    },
    [toast, router]
  );

  return (
    <Flex
      direction={"column"}
      alignItems="center"
      justifyContent="center"
      w="100vw"
      h="100vh"
    >
      <Text fontSize={"4xl"}>Faça o seu Cadastro aqui:</Text>
      <FormControl
        display="flex"
        flexDirection="column"
        justifyContent="space-evenly"
        alignItems={"center"}
        w={500}
        h={650}
      >
        <InputGroup>
          <Icon as={MdPeopleAlt} color="teal" h={35} w="10%" />
          <InputLeftElement pointerEvents="none"></InputLeftElement>
          <Input
            type="text"
            placeholder="Nome"
            {...register("name")}
            id="name"
          />
        </InputGroup>
          <Text fontSize={'xl'} color={'red.700'}>{errors.name?.message}</Text>

        <InputGroup display="flex" alignItems="center" h="auto">
          <EmailIcon color="teal" h={35} w="10%" />
          <InputLeftElement
            pointerEvents="none"
            color="gray.300"
            fontSize="1.2em"
          />
          <Input
            type="tel"
            id="email"
            placeholder="Email"
            h="45px"
            w="90%"
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
            placeholder="Senha"
            type="password"
            id="password"
            h="45px"
            w="90%"
            {...register("password")}
          />
        </InputGroup>
          <Text fontSize={'xl'} color={'red.700'}>{errors.password?.message}</Text>
        <Flex w="90%" justify="space-between" margin="0 auto">
          <Button
            h="40px"
            fontSize={"2xl"}
            type="button"
            colorScheme="teal"
            variant="solid"
            onClick={() => {
              router.push("/login")
              toast({
                title: "Você está sendo direcionado a pagina de login",
                description: "Você será redirecionado em alguns instantes",
                status: 'loading',
                duration: 2000,
                isClosable: true,
              })
          }}
          >
            Login
          </Button>
          <Button
            fontSize={"2xl"}
            h="40px"
            loadingText="Submitting"
            colorScheme="teal"
            variant="outline"
            onClick={handleSubmit(fetchApi)}
          >
            Submit
          </Button>
        </Flex>
      </FormControl>
    </Flex>
  );
};

export default PageSignup;
