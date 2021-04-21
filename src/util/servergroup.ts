import dotenv from 'dotenv'
dotenv.config()

export class ServerGroup
{
   public publicAddr: string
   public port: number
   public worldZip: string
   public pluginName: string
   public configPath: string
   public group: string
   public prefix: number
   /**
    * 
    * @param publicAddr The public address that the server is running on.
    * @param port The portSection what the server is allowed to use.
    * @param worldZip The path of the zipped world folder used to unzip in Shell.
    * @param pluginName The plugin name used to copy from the plugins folder.
    * @param configPath The config path of the plugin used to place the plugin.
    * @param group The group of the server used to identify itself in Redis.
    * @param prefix The prefix of the server used to format a parent-group.
    */
   constructor(publicAddr: string, port: number, worldZip: string, pluginName: string, configPath: string, group: string, prefix: number)
   {
      this.publicAddr = publicAddr
      this.port = port
      
      this.worldZip = worldZip
      this.pluginName = pluginName
      this.configPath = configPath 
      this.group = group
      this.prefix = prefix
   }
   /**
    * @returns The group followed by a hyphen and its prefix.
    */
   getName(): string
   {
      return `${this.group}-${this.prefix}`
   }
   /**
    * @returns The paramters that are used when executing a Shell script.
    */
   getParams(): string
   {
      return `${this.port} ${this.worldZip} ${this.pluginName} ${this.configPath} ${this.group} ${this.getName()}`
   }
}

export class BungeeCord
{
   public publicAddr: string
   public port: number
   public online: boolean

   /**
    * Default values:
    * - publicAddr: 127.0.0.1
    * - port: 25565
    */
   constructor()
   {
      this.publicAddr = process.env.BUNGEE_IP!
      this.port = parseInt(process.env.BUNGEE_PORT!)
      this.online = false
   }

   isOnline(): boolean
   {
      return this.online
   }
}