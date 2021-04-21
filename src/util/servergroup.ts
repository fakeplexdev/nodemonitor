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

   getName(): string
   {
      return `${this.group}-${this.prefix}`
   }

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