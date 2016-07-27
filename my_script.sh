#!/bin/bash

curpath=`pwd`
while [ -n $curpath ] && [ `basename $curpath` != "chat-app" ]; do
    curpath=`dirname $curpath`
done

be_pid=0

refresh_backend() {
   if [ $be_pid -ne 0 ]; then
      kill $be_pid
   fi
   npm start &
   be_pid=$!
}

route_notification() {
   refresh_backend
}

trap "{ kill $be_pid; }" INT

route_notification
# pushd $curpath/react
$(npm bin)/webpack --watch &
webpackid=$!
# popd

refresh_backend

fswatch -r -o -e "$curpath/public/javascripts"  | (while read; do route_notification; done;)
