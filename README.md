# NodeMonitor
NodeMonitor is a more modern version of **ServerMonitor**

**NOTE**: the scripts are written in such a way to work in my version of Fakeplex. These scripts may not work for the original files. Of course you can edit all the code/scripts to work with your JAR file.

# Startup
By running the app, and not having BungeeCord on first, will give you this error:

![Bungee](https://i.imgur.com/phVVkSZ.png)

So make sure BungeeCord is on before running NodeMonitor.

# Shutdown
Don't ever just close the app with Ctrl + C! Always execute the "**exit**" command. This will close all servers one by one and then closes the app.

![Shutdown](https://i.imgur.com/Z8VqmdH.png)

# Commands

- "**add \<group\>**" - Add a new server with given group.

![Add](https://i.imgur.com/MMDAueP.png)

Note: You can only add groups that are also in Redis, otherwise:

![CannotAdd](https://i.imgur.com/AOhHDZq.png)

- "**remove \<group\>**" - Remove a server from the network.

![Remove](https://i.imgur.com/lBpKWBO.png)

- "**fetch \<server\>**" - Retrieve basic information of a server.

![Fetch](https://i.imgur.com/8yocOFF.png)

- "**list \<all/group\>**" - List all or a given group of servers.

![List](https://i.imgur.com/g0qEIEj.png)

## Credits
- [@randomdevlol](https://github.com/randomdevlol) - Made all the Shell scripts.

Note: the Shell scripts are a bit modified to work with Fakeplex, but you can use the original scripts too.
