#!/bin/bash

GREEN='\033[0;32m' # Green
BLUE='\033[0;34m' # Blue
NC='\033[0m' # No Color
die() {
	echo -e $RED"$*"$NC >&2
	exit -1
}
step() {
	echo -e $BLUE"$*"$NC >&2
}

REPOPATH=$(dirname $0)/..
BUILD=${REPOPATH}/build
TARGET=${REPOPATH}/../oficinavirtual/src/front/static/somsolet

[ -d $(dirname $TARGET) ] || die "Target directory $(dirname $TARGET) should exist"

step "Removing existing $TARGET"
rm -rf "${TARGET}"
mkdir "${TARGET}"
step "Copying resources to $TARGET"
cp -r "${BUILD}/static" "$TARGET"

step "Renaming resources in $TARGET"

jq -r '.entrypoints[]' ${BUILD}/asset-manifest.json | while read file; do
  if [[ $file =~ ^static/(js|css)/main\.[A-Za-z0-9]*.(js|css)$ ]]; then
    dest=$(echo ${file} | sed 's/main\.[A-Za-z0-9]*\./main./g')
    echo -e ${GREEN}✔︎${NC} ${file} → ${dest}
    mv ${TARGET}/${file} ${TARGET}/${dest}
    mv ${TARGET}/${file}.map ${TARGET}/${dest}.map
  fi

  # yarn build format

  if [[ $file =~ ^static/js/runtime-main\.[A-Za-z0-9]*\.js$ ]]; then
    dest=$(echo ${file} | sed 's/runtime-main\.[A-Za-z0-9]*\./runtime-main./g')
    echo -e ${GREEN}✔︎${NC} ${file} → ${dest}
    mv ${TARGET}/${file} ${TARGET}/${dest}
    mv ${TARGET}/${file}.map ${TARGET}/${dest}.map
  fi
  
  if [[ $file =~ ^static/(js|css)/main\.[A-Za-z0-9]*\.chunk.(js|css)$ ]]; then
    dest=$(echo ${file} | sed 's/main\.[A-Za-z0-9]*\.chunk\./main./g')
    echo -e ${GREEN}✔︎${NC} ${file} → ${dest}
    mv ${TARGET}/${file} ${TARGET}/${dest}
    mv ${TARGET}/${file}.map ${TARGET}/${dest}.map
  fi

  if [[ $file =~ ^static/(js|css)/[0-9]{1,2}\.[A-Za-z0-9]*\.chunk.js$ ]]; then
    dest=$(echo ${file} | sed 's/[0-9]*\.[A-Za-z0-9]*\.chunk\./vendor./g')
    echo -e ${GREEN}✔︎${NC} ${file} → ${dest}
    mv ${TARGET}/${file} ${TARGET}/${dest}
    mv ${TARGET}/${file}.LICENSE.txt ${TARGET}/${dest}.LICENSE.txt
    mv ${TARGET}/${file}.map ${TARGET}/${dest}.map
  fi
done
