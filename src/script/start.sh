port=$1
world=$2
plugin=$3
configPath=$4
serverGroup=$5
serverName=$6

pathToServer=server/network/$serverName
pathToJars=jar

# Delete the server folder if it already exists cause I'm lazy
if [ -d $pathToServer ]; then
    rm -r -f $pathToServer
fi

# Make the server directory
mkdir $pathToServer

# Make server.properties file and put the properties in the file
touch $pathToServer/server.properties
echo "server-port=$port" >> $pathToServer/server.properties
echo "online-mode=false" >> $pathToServer/server.properties
echo "announce-player-achievements=false" >> $pathToServer/server.properties
echo "spawn-monsters=false" >> $pathToServer/server.properties
echo "allow-nether=false" >> $pathToServer/server.properties
echo "spawn-animals=false" >> $pathToServer/server.properties

# Disable making the end world
touch $pathToServer/bukkit.yml
echo "settings:" >> $pathToServer/bukkit.yml
echo "  allow-end: false" >> $pathToServer/bukkit.yml

# Enabling bungeecord
touch $pathToServer/spigot.yml
echo "settings:" >> $pathToServer/spigot.yml
echo "  bungeecord: true" >> $pathToServer/spigot.yml

# Copy server jar into new directory
cp server/$pathToJars/craftbukkit.jar $pathToServer/

# Make the plugins folder
mkdir $pathToServer/plugins

# Copy the main plugin to the server (either Hub or Arcade)
cp server/$pathToJars/$plugin $pathToServer/plugins

# Copy the world into the server
unzip server/world/$world -d $pathToServer/ > /dev/null

# Make the config file & edit it for the server group
mkdir $pathToServer/$configPath
touch $pathToServer/$configPath/config.yml
echo "serverstatus:" >> $pathToServer/$configPath/config.yml
echo "  group: $serverGroup" >> $pathToServer/$configPath/config.yml
echo "  name: $serverName" >> $pathToServer/$configPath/config.yml

cd $pathToServer

if ! screen -list | grep -q $serverName; then
    screen -dmS $serverName
    screen -S $serverName -X exec java -jar craftbukkit.jar
fi