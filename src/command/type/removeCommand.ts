import { removeGroup } from '../../manager'
import Command from '../'

class Remove extends Command<boolean>
{
   constructor()
   {
      super(
         'remove',
         '<group>',
         'Remove a server of given group'
      )
   }
   /**
    * Removes a server from the array and executes a Shell script.
    * @param args The name of the server according to Redis.
    * @returns A Promise for the completion of the callback.
    */
   execute(args: string[])
   {
      return new Promise<boolean>(async res =>
      {
         removeGroup(args[1]).then(success => res(success))
      })
   }
}

export default new Remove()