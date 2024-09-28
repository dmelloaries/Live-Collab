import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Socket, io } from "socket.io-client";
import axios from "axios";
import {
  Box,
  Button,
  Text,
  useToast,
  Flex,
  Select,
  IconButton,
  VStack,
  Heading,
  HStack,
} from "@chakra-ui/react";
import {
  Play,
  Code as CodeIcon,
  Terminal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import problems from "../utils/problems"; // Importing your problem JSON

const SAVE_INTERVAL_MS = 2000;
const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

type File = {
  name: string;
  language: string;
  value: string;
};

type Files = {
  [key: string]: File;
};
const files: Files = {
  Cpp: {
    name: "C++",
    language: "cpp",
    value: `#include <iostream>\n\nint main() {\n    std::cout << "Hello, world!" << std::endl;\n    return 0;\n}`,
  },
  Javascript: {
    name: "javascript",
    language: "javascript",
    value: "console.log('Hello, From javascript!');",
  },
  Typescript: {
    name: "typescript",
    language: "typescript",
    value: "console.log('Hello, from Typescript');",
  },
  Python: {
    name: "python",
    language: "python",
    value: "print('Hello, world from python!')",
  },
  Java: {
    name: "java",
    language: "java",
    value: `public class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello, world from python!");\n\t}\n}`,
  },
  Rust: {
    name: "rust",
    language: "rust",
    value: `fn main() {\n    println!("Hello, World from rust!");\n}`,
  },
  
};


function Code() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [fileName, setFileName] = useState<string>("Javascript");
  const file = files[fileName];
  const [editorContent, setEditorContent] = useState<string | undefined>(
    file.value
  );
  const [output, setOutput] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentProblemIndex, setCurrentProblemIndex] = useState<number>(0); // Track current problem index
  const [selectedProblem, setSelectedProblem] = useState(problems[0]); // Start with the first problem
  const toast = useToast();

  useEffect(() => {
    const socket = io(`${import.meta.env.VITE_BACKEND_URL}`);
    setSocket(socket);

    socket.on("receive-code", (data) => {
      setEditorContent(data);
    });

    socket.on("receive-output", (outputData) => {
      setOutput(outputData);
      setIsError(false);
    });

    return () => {
      socket.disconnect();
      setSocket(null);
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    const interval = setInterval(() => {
      if (editorContent) {
        socket.emit("save-code", editorContent);
      }
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [socket, editorContent]);

  const handleEditorChange = (value: string | undefined) => {
    socket?.emit("send-code", value);
    setEditorContent(value);
  };

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newLanguage = event.target.value;
    setFileName(newLanguage);
    setEditorContent(files[newLanguage].value);
  };

  const runCode = async () => {
    const sourceCode = editorContent;
    if (!sourceCode) return;
    try {
      setIsLoading(true);
  
      // Adjust the filename for C++
      const filename = file.language === "cpp" ? "main.cpp" : "main";
  
      const response = await API.post("/execute", {
        language: file.language, // Pass correct language identifier
        version: "*",
        files: [{ name: filename, content: sourceCode }], // Use proper file name for C++
      });
  
      const result = response.data;
  
      // Capture output or error
      const runOutput = result.run.output || result.run.stderr;
      setOutput(runOutput);
  
      // Set error state based on the presence of stderr
      setIsError(!!result.run.stderr);
  
      socket?.emit("send-output", runOutput);
    } catch (error) {
      console.error(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const goToPreviousProblem = () => {
    if (currentProblemIndex > 0) {
      const newIndex = currentProblemIndex - 1;
      setCurrentProblemIndex(newIndex);
      setSelectedProblem(problems[newIndex]);
    }
  };

  const goToNextProblem = () => {
    if (currentProblemIndex < problems.length - 1) {
      const newIndex = currentProblemIndex + 1;
      setCurrentProblemIndex(newIndex);
      setSelectedProblem(problems[newIndex]);
    }
  };

return (
  <Flex direction="column" h="100vh" bg="gray.900" color="white">
    {/* Top bar */}
    <Flex
      justifyContent="space-between"
      alignItems="center"
      p={4}
      borderBottom="1px solid"
      borderColor="gray.700"
    >
      <Flex alignItems="center">
        <CodeIcon size={24} className="mr-4" />
        <Select
          value={fileName}
          onChange={handleLanguageChange}
          width="200px"
          variant="filled"
          bg="gray.800"
          color="white"
          borderColor="gray.700"
          _hover={{ borderColor: "gray.600" }}
          size="lg"
        >
          {Object.keys(files).map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </Select>
      </Flex>
      <Button
        leftIcon={<Play size={20} />}
        colorScheme="green"
        onClick={runCode}
        isLoading={isLoading}
        loadingText="Running"
        size="lg"
      >
        Run Code
      </Button>
    </Flex>

    <Flex flex={1} overflow="hidden">
      {/* Left panel: Problem description */}
      <Box
        width="25%"
        p={6}
        borderRight="1px solid"
        borderColor="gray.700"
        overflowY="auto"
      >
        <VStack align="stretch" spacing={4}>
        <h1 className="font-bold">Question</h1>
        <hr></hr>
          <Heading size="xl">{selectedProblem.title}</Heading>
          <Text fontSize="md">{selectedProblem.description}</Text>
          <Box bg="gray.800" p={4} borderRadius="md">
            
            <Text fontWeight="bold" mb={2}>
              Input:
            </Text>
            <Text>{JSON.stringify(selectedProblem.input)}</Text>
          </Box>
          <Box bg="gray.800" p={4} borderRadius="md">
            <Text fontWeight="bold" mb={2}>
              Expected Output:
            </Text>
            <Text>{JSON.stringify(selectedProblem.expected_output)}</Text>
          </Box>
          <HStack justifyContent="space-between">
            <IconButton
              icon={<ChevronLeft />}
              aria-label="Previous problem"
              onClick={goToPreviousProblem}
              isDisabled={currentProblemIndex === 0}
              size="lg"
            />
            <IconButton
              icon={<ChevronRight />}
              aria-label="Next problem"
              onClick={goToNextProblem}
              isDisabled={currentProblemIndex === problems.length - 1}
              size="lg"
            />
          </HStack>
        </VStack>
      </Box>

      {/* Middle panel: Code editor */}
      <Box flex={1} borderRight="1px solid" borderColor="gray.700">
        <Editor
          height="100%"
          defaultLanguage="typescript"
          language={file.language}
          theme="vs-dark"
          value={editorContent}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            fontSize: 16,
            lineNumbers: "on",
            roundedSelection: true,
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </Box>

      {/* Right panel: Output */}
      <Box width="25%" p={6}>
        <VStack align="stretch" height="100%" spacing={4}>
          <Flex alignItems="center">
            <Terminal size={24} className="mr-2" />
            <Heading size="md">Output</Heading>
          </Flex>
          <Box
            flex={1}
            bg="gray.800"
            p={4}
            borderRadius="md"
            overflowY="auto"
          >
            {output ? (
              <Text
                whiteSpace="pre-wrap"
                fontFamily="monospace"
                fontSize="md"
                color={isError ? "red.400" : "green.400"}
              >
                {output}
              </Text>
            ) : (
              <Text color="gray.500">
                Run your code to see the output here
              </Text>
            )}
          </Box>
        </VStack>
      </Box>
    </Flex>
  </Flex>
);
}

export default Code;