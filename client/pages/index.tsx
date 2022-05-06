import { Box, Flex, Text } from "@chakra-ui/react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Box>
      <Flex justifyContent={"center"}>
        <Text fontSize={"3xl"}>Index</Text>
      </Flex>
    </Box>
  );
};

export default Home;
