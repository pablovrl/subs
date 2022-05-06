import {
  Box,
  Flex,
  IconButton,
  useDisclosure,
  Stack,
  HStack,
} from "@chakra-ui/react";
import NavbarLink from "./NavbarLink";
import { FaTimes, FaBars, FaShoppingBag, FaUserAlt } from "react-icons/fa";

const categories = [
  "Entretenimiento",
  "Comida",
  "Hombre",
  "Mujer",
  "Niños",
  "Libros",
  "Hogar",
  "Adultos",
];

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box px={2} mb={2}>
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Box>Logo</Box>
        <HStack spacing={"20px"}>
          <NavbarLink text="Vender" href="/" />
          <HStack>
            <NavbarLink text="Iniciar Sesión" href="/" icon={<FaUserAlt />} />
          </HStack>
          <IconButton
            bg={"white"}
            aria-label="Open Menu"
            icon={<FaBars />}
            onClick={onOpen}
          />
        </HStack>
        {isOpen ? (
          <Box bg="white" position="absolute" top={0} left={0} w="full" p={2}>
            <Box>
              <Flex justifyContent="end">
                <IconButton
                  bg={"white"}
                  size={"lg"}
                  aria-label="Close menu"
                  icon={<FaTimes />}
                  onClick={onClose}
                />
              </Flex>
            </Box>
            <Stack ml={8}>
              {categories.map((categorie) => (
                <NavbarLink text={categorie} href="/" fontSize={"2xl"} />
              ))}
            </Stack>
          </Box>
        ) : null}
      </Flex>
    </Box>
  );
}
