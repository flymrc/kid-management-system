#!/bin/sh

PATTERN="$1"
NAME=$2
WHITELIST=$3

FAILED=0

for i in "$( git grep "$NAME" -- "$PATTERN" | grep -E "$WHITELIST" -v )"; do
  if [ -n "$i" ]; then
    echo Illegal usage "$i"
    FAILED=1
  fi
done

exit $FAILED