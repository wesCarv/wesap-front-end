"use client";
import { useContext, useEffect, useState } from "react";
import { ArrowRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import { SocketContext } from "../context/socket";
import { useForm } from "react-hook-form";
import { IMessage } from "../interfaces";
import instance from "../services/axios/instance";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { messagesSchema } from "../schemas/schemas";

const PageDashboard = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const socket = useContext(SocketContext);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<{ about: string }>({
    resolver: yupResolver(messagesSchema),
  });

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      socket.auth = {
        token: `Bearer ${window.localStorage.getItem("@wesap:token")}`,
      };
      socket.connect();
    }

    socket.on("createMessage", (data: IMessage) => {
      setMessages([data, ...messages]);
    });

    return () => {
      socket.off();
    };
  }, [socket, messages]);

  const sendMessage = (data: { about: string }) => {
    socket.emit("createMessage", data);
    setValue("about", "");
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleSubmit(sendMessage)();
    }
  };

  useEffect(() => {
    const loadMessages = async () => {
      try {
        if (typeof window !== "undefined") {
          const message = await instance.get("/messages", {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(
                "@wesap:token"
              )}`,
            },
          });

          setMessages(message.data);
        }
      } catch (error) {}
    };
    loadMessages();
  }, [setMessages, toast]);

  return (
    <Flex h="100vh" w="100vw" direction={"column"} alignItems={"center"}>
      <Flex
        width="100%"
        h="10%"
        bg="teal"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Box>
          <Text fontSize="" color={"white"} fontWeight="bold">
            WeSap
          </Text>
          <Text fontSize="2xl" color={"white"} fontWeight="bold">
            {typeof window !== "undefined" &&
              `Bem vindo ao chat, ${window.localStorage.getItem("name-user")}`}
          </Text>
        </Box>
        <Button
          color={"teal"}
          onClick={() => {
            router.push("/login");
            if (typeof window !== "undefined") {
              window.localStorage.clear();
            }
          }}
        >
          Back
        </Button>
      </Flex>
      <Flex
        w={"90%"}
        h={"90%"}
        justifyContent={"center"}
        direction={"column"}
        alignItems={"center"}
      >
        <Flex
          h={"90%"}
          w={"70%"}
          direction={"column"}
          gap={"20px"}
          padding={"10px"}
          overflowY="scroll"
          flexDirection="column-reverse"
        >
          {messages.map((message: IMessage) => {
            return (
              <Flex
                key={message.id}
                direction={"column"}
                border="2px solid #dedede"
                bg="#f1f1f1"
                borderRadius={"5px"}
                padding={"10px"}
                margin="0 0"
              >
                <Text fontSize={"lg"}>{message.user.name}</Text>
                <Text fontSize={"md"}>{message.about}</Text>
              </Flex>
            );
          })}
        </Flex>
        <FormControl display={"flex"} w={"50%"} h={"10%"} alignItems={"center"}>
          <InputGroup display="flex" alignItems="center" h="auto">
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
            ></InputLeftElement>
            <Input
              id="about"
              fontSize={"1.2rem"}
              placeholder="Mensagem"
              type="about"
              h="45px"
              w="100%"
              marginRight="20px"
              onKeyDown={handleKeyDown}
              {...register("about")}
            />
          </InputGroup>
          <Text fontSize={"xl"} color={"red.700"}>
            {errors.about?.message}
          </Text>
          <Button
            borderRadius={"50%"}
            bg="teal"
            h={"50px"}
            w={"50px"}
            onClick={() => {
              handleSubmit(sendMessage)();
            }}
          >
            <ArrowRightIcon color="white" />
          </Button>
        </FormControl>
      </Flex>
    </Flex>
  );
};

export default PageDashboard;
