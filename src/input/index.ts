import prompt from 'prompt'
import CommandHandler from '../command/handler'
import colors from 'colors/safe'

class Input
{
   private commandHandler

   constructor()
   {
      this.commandHandler = new CommandHandler()

      prompt.start()
      prompt.message = colors.cyan('Input>')
      prompt.delimiter = ':'

      this.input()
   }
   /**
    * The base input method which gets called after a command
    * is done with the execution of its promise. 
    */
   async input()
   {
      prompt.get([':'], async (error, result) => 
      {
         /**
          * Check for errors, if there's any, we close the program and output the error(s). 
          */
         if (error)
         {
            console.log(error);
            process.exit(0)
         }
         /**
          * Casting the command and its args to an array of strings.
          */
         const args = result[':'].toString().split(' ')
         /**
          * All commands have a min and max of two arguments.
          */
         if (args.length != 2 && args[0] !== 'exit')
         {
            console.log(`${colors.red('error')}: Too ${args.length > 2 ? 'many' : 'few'} arguments`)
            this.input()
         }
         else
         {
            /** 
             * We've made all the checks, now we're gonna handle the
             * command and see if it's a registered command, if not,
             * we throw A friendly error telling the user to retry.
             */
            this.commandHandler.parse(args[0])

            .then(command => command.execute(args).then(() => this.input()))
            .catch(() => 
            {
               /** 
                * Tell the user that the command doesn't exist.
                */
               console.log(`${colors.red('error')}: This command does not exist`)
               this.input() 
            })
         }
      })
   }
}

export default Input