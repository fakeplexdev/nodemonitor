import { ServerGroup } from '../../util/servergroup'
import { serverGroups, removeGroup } from '../../manager'
import colors from 'colors/safe'

class Close extends Command<boolean>
{
   constructor()
   {
      super(
         'close',
         null,
         'Stop all servers and exit NodeMonitor'
      )
   }
   /**
    * Shuts down all running servers and deletes them from Redis.
    * @returns A Promise for the completion of the callback.
    */
   execute()
   {
      return new Promise<boolean>(() =>
      {
         let countDeleted: number = 0
         let serverGroup: any

         for (serverGroup in serverGroups)
         {
            /* Cast it as a ServerGroup and delete the server */
            const server: ServerGroup = serverGroup
            removeGroup(server.group)
            countDeleted++
         }

         console.log(colors.green(`\nA total of ${countDeleted} servers got stopped`))
         console.log(colors.bgCyan('Thank you for using NodeMonitor on your network.'))
         process.exit(1)
      })
   }
}

export default new Close()