import {
  useDisclosure,
  Flex,
  Heading,
  Avatar,
  Button,
  Text,
} from "@chakra-ui/react";
import { useSession, signIn } from "next-auth/client";
import { useRef } from "react";
import { LogoutAlert } from "./LogoutAlert";

export function Header() {
  const [session] = useSession();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  return (
    <>
      <Flex as="header" bg="gray.700" py="5" px="10" justify="space-between">
        <Heading>
          <Text color="purple.400" as="span">
            GL
          </Text>
          geek
        </Heading>

        {session ? (
          <Flex>
            <Avatar
              name={session.user.name}
              src={session.user.image}
              onClick={onOpen}
              cursor="pointer"
            />
            <Flex flexDir="column" ml="2">
              <Text fontWeight="bold">{session.user.name}</Text>
              <Text color="gray.400">{session.user.email}</Text>
            </Flex>
          </Flex>
        ) : (
          <Button onClick={() => signIn("google")}>Entrar</Button>
        )}
      </Flex>

      <LogoutAlert cancelRef={cancelRef} isOpen={isOpen} onClose={onClose} />
    </>
  );
}