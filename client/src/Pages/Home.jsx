import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  Button,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Spinner,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import axios from "axios";

const Home = () => {
  const [taskName, setTaskName] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: token,
      },
    };

    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://cognisite-assignment.onrender.com/tasks",
        config
      );
      setTasks(response.data.tasks);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleTaskSubmit = async () => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: token,
      },
    };

    const data = {
      taskName: taskName,
    };

    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://cognisite-assignment.onrender.com/add-task",
        data,
        config
      );
      setTaskName("");
      getTasks();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="100vh"
    >
      <Stack spacing={4} mt={8}>
        <Input
          type="text"
          placeholder="Enter task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          width="300px"
        />
        <Button
          colorScheme="blue"
          onClick={handleTaskSubmit}
          isLoading={isLoading}
        >
          Add Task
        </Button>
      </Stack>
      <Box mt={8} width="300px">
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Tasks:
        </Text>
        {isLoading ? (
          <Spinner />
        ) : (
          <List spacing={2}>
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <Box
                  key={task.taskId}
                  borderWidth="1px"
                  borderRadius="md"
                  padding={4}
                  display="flex"
                  alignItems="center"
                  backgroundColor="blue.200"
                >
                  <ListIcon
                    as={CheckCircleIcon}
                    color="green.500"
                    marginRight={2}
                  />
                  <Text>{task.taskName}</Text>
                </Box>
              ))
            ) : (
              <Text>No tasks found</Text>
            )}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default Home;
