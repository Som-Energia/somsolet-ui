#!/bin/bash

GREEN='\033[0;32m' # Green
NC='\033[0m' # No Color

jq -r '.entrypoints[]' ../build/asset-manifest.json | while read file; do
  if [[ $file =~ ^static/(js|css)/main\.[A-Za-z0-9]*.(js|css)$ ]]; then
    dest=$(echo ${file} | sed 's/main\.[A-Za-z0-9]*\./main./g')
    echo -e ${GREEN}✔︎${NC} ${file} → ${dest}
    mv ../build/${file} ../build/${dest}
    mv ../build/${file}.map ../build/${dest}.map
  fi

  # yarn build format

  if [[ $file =~ ^static/js/runtime-main\.[A-Za-z0-9]*\.js$ ]]; then
    dest=$(echo ${file} | sed 's/runtime-main\.[A-Za-z0-9]*\./runtime-main./g')
    echo -e ${GREEN}✔︎${NC} ${file} → ${dest}
    mv ../build/${file} ../build/${dest}
    mv ../build/${file}.map ../build/${dest}.map
  fi
  
  if [[ $file =~ ^static/(js|css)/main\.[A-Za-z0-9]*\.chunk.(js|css)$ ]]; then
    dest=$(echo ${file} | sed 's/main\.[A-Za-z0-9]*\.chunk\./main./g')
    echo -e ${GREEN}✔︎${NC} ${file} → ${dest}
    mv ../build/${file} ../build/${dest}
    mv ../build/${file}.map ../build/${dest}.map
  fi

  if [[ $file =~ ^static/(js|css)/[0-9]{1,2}\.[A-Za-z0-9]*\.chunk.js$ ]]; then
    dest=$(echo ${file} | sed 's/[0-9]*\.[A-Za-z0-9]*\.chunk\./vendor./g')
    echo -e ${GREEN}✔︎${NC} ${file} → ${dest}
    mv ../build/${file} ../build/${dest}
    mv ../build/${file}.LICENSE.txt ../build/${dest}.LICENSE.txt
    mv ../build/${file}.map ../build/${dest}.map
  fi
done
