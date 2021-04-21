import child from 'child_process'
import mc from 'minecraft-server-util'
import { BungeeCord, ServerGroup} from './servergroup'
import { redisClient } from '../redis'
import colors from 'colors/safe'
/**
 * BungeeCord instance used to check its status.
 */
const bungeeCord: BungeeCord = new BungeeCord()
/**
 * Probably not gonna use this, use async await instead.
 */
export function wait(sec: number): Promise<PromiseConstructor>
{
   return new Promise(resolve => setTimeout(resolve, sec * 1000))  
}
/**
 * Execute a shell file from Typescript.
 */
export function shell(script: string): Promise<void>
{
   return new Promise<void>((res, rej) =>
   {
      child.exec(script, (error, stdout, stderr) => error || stderr ? rej() : res())
   })
}
/**
 * Check status of servers running locally.
 * @param server The server from which the information gets retrieved.
 * @returns A Promise for the completion of the callback.
 */
export async function status(server: ServerGroup | BungeeCord): Promise<boolean>
{
   return new Promise<boolean>((res, rej) =>
   {
      mc.status(server.publicAddr, { port: server.port }).then(() => res(true)).catch(() => res(false))
   })
}
/**
 * @param group the given group which will get generated.
 * @param groupArray The current array of all the server groups.
 */
export async function generateGroup(group: string, groupArray: ServerGroup[]): Promise<ServerGroup | null>
{
   return new Promise<ServerGroup | null>(res =>
   {
      redisClient().hgetall(`servergroups.${group}`, (error , map) =>
      {
         if (error)
         {
            console.error(error.message)
            res(null)
         }
      
         /* Get the last element of this group in groupArray. */
         const last = groupArray.filter(groupElement => groupElement.group === group).pop()
   
         res(new ServerGroup(
            process.env.LOCAL_IP!,
            last != undefined ? (last.port) + 1 : parseInt(map.portSection),
            map.worldZip,
            map.plugin,
            map.configPath,
            map.name,
            last != undefined ? (last.prefix + 1) : 1
         ))
      })
   })
}
/**
 * Returns a boolean whether BungeeCord is online or not.
 */
export function isBungeeOnline(): boolean
{
   return bungeeCord.isOnline()
}
/**
 * @param retry The current retry the method is on.
 * @param maxRetry The maximum retries allowed until exit.
 * @returns A Promise for the completion of the callback.
 */
function connectBungee(retry: number, maxRetry: number): Promise<boolean>
{
   return new Promise<boolean>(async res =>
   {
      /* BungeeCord is already running, so return success. */
      if (bungeeCord.isOnline()) res(true)

      /* Await the value of the status of BungeeCord. */
      const bungeeStatus = await status(bungeeCord)
    
      /* BungeeCord is running so we return true. */
      if (bungeeStatus)
      {
         console.log(colors.gray(`- Checking BungeeCord connectivity: ${colors.green(`${bungeeStatus}`)}\n`))
         res(true)
         return
      }

      /* If the max retries have reached, we close the program. */
      if (retry === maxRetry)
      {
         console.log(colors.red('Please run BungeeCord first, then run NodeMonitor.'))

         res(false)
         return
      }
     
      /* Tell the user that BungeeCord is not running. */
      console.log(colors.bgRed('===== BUNGEECORD IS NOT RUNNING ====='))
      console.log(colors.red(`Searching for: ${bungeeCord.publicAddr}:${bungeeCord.port}`))
      console.log(colors.bgRed('===== BUNGEECORD IS NOT RUNNING ====='))
      console.log(`Trying again in 5 seconds... (${maxRetry - retry} tries left)\n\n`)

      /* Retry in five seconds. */
      wait(5).then(() => res(false))
   })
}
/**
 * When the app initially starts, this gets executed.
 * @returns A Promise for the completion of the callback.
 */
export async function attemptConnectBungee(): Promise<boolean>
{
   return new Promise<boolean>(async res =>
   {
      for (let i = 1; i <= 5; i++)
      {
         if (await connectBungee(i, 5))
         {
            res(true)
            return
         }
      }

      res(false)
   })
}
/**
 * @param serverGroup The given group which got added or deleted.
 * @param action A boolean value which will tell the correct message.
 */
export function showInformation(serverGroup: ServerGroup, a: boolean): void
{
   const message = (a ? colors.green : colors.grey)(`ServerGroup of group[${serverGroup.group}] has been ${a ? 'added' : 'removed'}`)

   console.log('---------------------------------------------------')
   console.log(`    ${message}`)
   console.log('')
   console.log(`  - Server: ${colors.yellow(`${serverGroup.prefix}`)} ${colors.grey(`(${serverGroup.group})`)}`)
   console.log(`  - Public Address: ${colors.yellow(serverGroup.publicAddr)}`)
   console.log(`  - Port: ${colors.yellow(`${serverGroup.port}`)}`)
   console.log(`  - World Zip + Config: (${colors.yellow(serverGroup.worldZip)}) (${colors.yellow(serverGroup.configPath)})`)
   console.log('---------------------------------------------------')
}
/**
 * Artwork for when the app initially starts.
 */
import config from '../../package.json'
export const ASCII: string[] =
['',
'      =======================================================================================================',
'     ||   __    _  _______  ______   _______  __   __  _______  __    _  ___   _______  _______  ______     ||',
'     ||  |  |  | ||       ||      | |       ||  |_|  ||       ||  |  | ||   | |       ||       ||    _ |    ||',
'     ||  |   |_| ||   _   ||  _    ||    ___||       ||   _   ||   |_| ||   | |_     _||   _   ||   | ||    ||',
'     ||  |       ||  | |  || | |   ||   |___ |       ||  | |  ||       ||   |   |   |  |  | |  ||   |_||_   ||',
'     ||  |  _    ||  |_|  || |_|   ||    ___||       ||  |_|  ||  _    ||   |   |   |  |  |_|  ||    __  |  ||',
'     ||  | | |   ||       ||       ||   |___ | ||_|| ||       || | |   ||   |   |   |  |       ||   |  | |  ||',
'     ||  |_|  |__||_______||______| |_______||_|   |_||_______||_|  |__||___|   |___|  |_______||___|  |_|  ||',
'     ||                                                                                                     ||',
`      ===============================================(${colors.cyan(`v${config.version}`)})================================================`,
'']