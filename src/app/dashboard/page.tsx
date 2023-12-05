"use client";
import { useCallback, useContext, useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import { SocketContext } from "../context/socket";
import { useForm } from "react-hook-form";
import { IMessage } from "../interfaces";
import instance from "../services/axios/instance";

const PageDashboard = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const socket = useContext(SocketContext);

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    socket.auth = {
      token: `Bearer ${window.localStorage.getItem("@wesap:token")}`,
    };
    socket.connect();

    socket.on("createMessage", (data: IMessage) => {
      console.log(data);
      setMessages([...messages, data]);
    });

    return () => {
      socket.off();
    };
  }, [socket, messages]);

  const token = localStorage.getItem("@wesap:token");
 
  const sendMessage = () => {
    // funcao pra mandar msg
    socket.emit("createMessage", { about: 'message' });
  };

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const message = await instance.get("/messages", {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              "@wesap:token"
            )}`,
          },
        });
        setMessages(message.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadMessages();
  }, [setMessages]);

  const fetchApi = useCallback((formData: any) => {
    async function messageChat() {
      try {
        await instance.post("/messages", formData);
      } catch (error) {
        console.log(error);
      }
    }
    messageChat();
  }, []);

  return (
    <Flex h="100vh" w="100vw" direction={"column"} alignItems={"center"}>
      <Flex
        width="100%"
        h="10%"
        bg="teal"
        direction="column"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Text fontSize="2xl" color={"white"} fontWeight="bold">
          Chat Geral
        </Text>
        <Text fontSize="2xl" color={"white"} fontWeight="bold">
          Bem vindo ao chat
        </Text>
      </Flex>

      <Flex
        w={"90%"}
        h={"90%"}
        justifyContent={"center"}
        direction={"column"}
        alignItems={"center"}
      >
        <Flex h={"90%"} w={"70%"} direction={"column"} gap={"20px"}>
          {messages.map((message: IMessage) => {
            return (
              <Flex
                key={message.id}
                direction={"column"}
                border="2px solid #dedede"
                bg={token ? '#f1f1f1' : '#ccc'}
                borderRadius={"5px"}
                padding={"10px"}
                margin="10px 0"
              >
                <Text fontSize={"4xl"}>{message.user.name}</Text>
                <Text fontSize={"3xl"}>{message.about}</Text>
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
              {...register("about")}
            />
          </InputGroup>
          <Button
            borderRadius={"50%"}
            bg="teal"
            h={"50px"}
            w={"50px"}
            onClick={() => {
              handleSubmit(sendMessage);
            }}
            // onClick={sendMessage}
          >
            <ArrowRightIcon color="white" />
          </Button>
        </FormControl>
      </Flex>
    </Flex>
  );
};

export default PageDashboard;
