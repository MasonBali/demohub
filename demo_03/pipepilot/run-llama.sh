#!/bin/bash

# Function to kill the process running on port 8080
kill_port_8080() {
  echo "Stopping any process running on port 8080..."
  lsof -ti tcp:8080 | xargs kill -9
}

# Stop any process running on port 8080
kill_port_8080

# Start the llama server in the background
echo "Starting llama server..."
./backend/llama.cpp/llama-server -m ./backend/llama.cpp/models/openhermes-2.5-mistral-7b.Q4_K_M.gguf &
