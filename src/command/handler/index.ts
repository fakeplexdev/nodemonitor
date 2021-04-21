import Add from '../type/addCommand'
import Remove from '../type/removeCommand'
import Fetch from '../type/fetchCommand'
import List from '../type/listCommand'
import Close from '../type/closeCommand'

class CommandHandler
{
   /**
    * An array of all commands which are executable from the input.
    */
   private commands: Command<boolean | void>[] = []

   constructor()
   {
      /**
       * Add all the commands to the array.
       */
      this.commands.push
      (
         Add, Remove, Fetch, List, Close
      )
   }
   /**
    * Find the correct command executor and return it to the input.
    * @param type The command which corresponds to the executor.
    * @returns The command executor which gets executed after it resolves.
    */
   parse(type: string): Promise<Command<boolean | void>>
   {
      return new Promise<Command<boolean | void>>((res, rej) =>
      {
         let command: any

         for (command in this.commands)
         {
            /* Cast it as a Command and resolve it. */
            const ce: Command<boolean | void> = command
            if (ce.command === type)
            {
               res(ce)
               return
            }
         }

         rej()
      })
   }
}

export default CommandHandler