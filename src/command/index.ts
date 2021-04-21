abstract class Command<T>
{
   public command: string
   public usage: string
   public description: string

   constructor(command: string, usage: string | null, description: string)
   {
      this.command = command
      this.usage = usage!
      this.description = description
   }

   /**
    * @abstract Gets called by its 
    * @param args 
    * @returns 
    */
   execute(args?: string[])
   {
      return new Promise<T>(() => {})
   }
}