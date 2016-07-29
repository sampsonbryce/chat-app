#!/bin/bash

curpath=`pwd`
while [ -n $curpath ] && [ `basename $curpath` != "chat-app" ]; do
    curpath=`dirname $curpath`
done

be_pid=0
wp_pid=0

refresh_backend() {
   if [ $be_pid -ne 0 ]; then
      kill $be_pid
   fi
   echo "starting server"
   npm start &
   be_pid=$!
}

route_notification() {
   refresh_backend
}

killstuff(){
    echo 'killing stuff'
    kill $be_pid
    kill $wp_pid
    lsof -t -i tcp:8080 | xargs kill;
    # kill $(ps aux | grep '[p]ython csp_build.py' | awk '{print $2}')
}

trap killstuff INT


route_notification
# pushd $curpath/react
$(npm bin)/webpack --watch &
wp_pid=$!
# popd

refresh_backend

echo 'curpath $curpath'
fswatch -r -o -e "$curpath/public/javascripts"  | (while read; do route_notification; done;) &
wait
