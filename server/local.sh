#!/bin/sh

set -ex

eval $(lean env | grep export)
../gradlew appRunWar
