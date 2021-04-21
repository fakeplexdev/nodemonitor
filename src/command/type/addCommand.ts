import { addGroup } from '../../manager'

class Add extends Command<boolean>
{
   constructor()
   {
      super(
         'add',
         '<group>',
         'Add a new server to given group'
      )
   }
   /**
    * Adds a server to the array and executes a Shell script.
    * @param args The name of the server according to Redis.
    * @returns A Promise for the completion of the callback.
    */
   execute(args: string[])
   {
      return new Promise<boolean>(async res =>
      {
         addGroup(args[1]).then(success => res(success))
      })
   }
}

export default new Add()