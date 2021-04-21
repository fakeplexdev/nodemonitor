serverName = $1

pathToServer = server/network/$serverName

# Stop
screen -S $serverName -X kill
screen -S $serverName -X quit

sleep 2

# Delete
rm -r -f $pathToServer