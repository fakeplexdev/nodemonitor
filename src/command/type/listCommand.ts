import colors from 'colors/safe'
import { serverGroups } from '../../manager'
import Command from '../'

class List extends Command<boolean>
{
   constructor()
   {
      super(
         'list',
         '<all/group>',
         'List all or a given group of servers'
      )
   }

   execute(args: string[])
   {
      return new Promise<boolean>(res =>
      {
         /**
          * Retrieve the list of all running servers.
          */
         if (args[1] === 'all')
         {
            if (serverGroups.length === 0)
            {
               console.log(colors.yellow('There are currently no servers running.'))
               res(true)
               return
            }
            /**
             * Listing all servers.
             */
            console.log('Listing all servers:')
            serverGroups.forEach(serverGroup => console.log(`- ${colors.yellow(serverGroup.getName())}`))

            res(true)
            return
         }
         /**
          * Attempting to now look for the server with the same group.
          */
         const foundGroups = serverGroups.filter(group => group.group === args[1])
         /**
          * Either it doesn't exist or it doesn't have any servers online. 
          */
         if (foundGroups == undefined || foundGroups.length === 0)
         {
            console.log(colors.yellow(`There are no servers online from group: ${args[1]}`))
            res(true)
            return
         }
         /**
          * Showing all servers of given group.
          */
         console.log(`Listing all servers with group '${args[1]}':`)
         foundGroups.forEach(group => console.log(`- ${colors.yellow(group.getName())}`))
      })
   }
}

export default new List()