#!/usr/bin/env bash

tmux new-window "nvim"
tmux split-window "npm run dev"

tmux new-window -n "firebase:emulators" "firebase emulators:start --only=auth,functions,firestore --import .firebase --export-on-exit ./.firebase"
