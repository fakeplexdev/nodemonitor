abstract class Command<T>
{
   public command: string
   public usage: string
   public description: string
   /**
    * 
    * @param command The command name which will be used to execute.
    * @param usage How to use the command, what parameters and how many.
    * @param description A brief explanation of what the command does.
    */
   constructor(command: string, usage: string | null, description: string)
   {
      this.command = command
      this.usage = usage!
      this.description = description
   }
   /**
    * @abstract Gets called by its lower-class.
    * @param args The argument which will get used in its lower-class.
    * @returns A promise on completion of the callback.
    */
   execute(args?: string[])
   {
      return new Promise<T>(() => {})
   }
}