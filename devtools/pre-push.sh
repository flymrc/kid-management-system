#!/bin/sh
echo "start pre-push"

checkGradle() {
  cmd="./gradlew $1"
  $cmd

  if [ $? -eq 0   ]; then
    echo "$cmd OK"
  else
    echo "pre-push Failed, please run $cmd"
    exit 1
  fi
}


isDirty=$(git status -s)

if [ ! -z "$isDirty" ]; then
  echo 'Current working tree is dirty'
  exit 1
fi

# Blacklist certain keyword.
checkRun './devtools/verify-reference.sh server/*.kt System.getenv EnvironmentStore|AppInitListener'

checkGradle spotlessCheck
checkGradle :server:test
