import { getByPrefix } from '../../manager'
import mc from 'minecraft-server-util'
import colors from 'colors/safe'

class Fetch extends Command<boolean>
{
   constructor()
   {
      super(
         'fetch',
         '<server>',
         'Retrieve basic information of a server'
      )
   }
   /**
    * This is used to get basic information of a server.
    * @param args The name of the server which we'll ping.
    * @returns A Promise for the completion of the callback.
    */
   execute(args: string[])
   {
      return new Promise<boolean>(async res =>
      {
         const server = getByPrefix(args[1])
         /**
          * The server doesn't exist or isn't listed in the array.
          */
         if (server == null)
         {
            console.log(colors.red(`Server '${args[1]}' does not exist.`))
            res(true)
            return
         }
         /**
          * Make a ping to the server to get all 
          * the information back from translated bytes. 
          */
         mc.status(`${server.publicAddr}`, { port: server.port, enableSRV: true})

         .then(response => 
         {
            console.log('---------------------------------------------------')
            console.log(colors.cyan(`    Showing real-time information of ${server.group}-${server.prefix}`))
            console.log('')
            console.log(`  - Server: ${colors.yellow(server.prefix.toString())} ${colors.gray(`(${server.group})`)}`)
            console.log(`  - Listenig: ${colors.yellow(response.host)}:${colors.yellow(response.port.toString())}`)
            console.log(`  - Online Players: ${colors.yellow(response.onlinePlayers!.toString())}/${colors.yellow(response.maxPlayers!.toString())}`)
            console.log(`  - Protocol Version: ${colors.yellow(response.protocolVersion!.toString())}`)
            console.log('---------------------------------------------------')
            res(true)
         })
         /**
          * Catch error 
          */
         .catch(() => 
         {
           console.log(colors.red('We couldn\'t ping this server, which most likely'))
           console.log(colors.red('means that this server is offline.'))
           res(true)
         })
      })
   }
}

export default new Fetch()