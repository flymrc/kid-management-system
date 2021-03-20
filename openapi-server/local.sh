#!/bin/sh

eval $(lean env | grep export)

../gradlew bootRun
