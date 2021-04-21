import { shell, showInformation, generateGroup } from '../util'
import { redisClient } from '../redis'
import { ServerGroup } from '../util/servergroup'
import colors from 'colors/safe'
/**
 * A set of all servers that are running.
 */
export let serverGroups: ServerGroup[] = []
/**
 * @param group The given group by the user.
 * @returns A promise on completion of the callback.
 */
export function addGroup(group: string): Promise<boolean>
{
   return new Promise<boolean>(async res =>
   {
      const serverGroup = await generateGroup(group, serverGroups)

      /* The server could not get added, therefore we return false and return */
      if (serverGroup == null)
      {
         console.log(colors.red(`The server with group: ${group} could not be added!`))
         console.log(colors.red(`You probably don't have 'servergroups.${group}' in Redis`))
         res(false)
         return
      }

      /* We're gonna check if the generated serverGroup already exists. */
      if (getByPrefix(serverGroup.getName()))
      {
         console.log(colors.red(`Attempting to add '${serverGroup.getName()}', but it already exists.`))
         res(false)
         return
      }

      /* We performed all checks, now it's time to add the actual server through a Shell script */
      shell(`./script/start.sh ${serverGroup.getParams()}`)

      .then(() => 
      {
         /* Let's push the group to the array. */
         serverGroups.push(serverGroup)

         /* Show information about the newly added server. */
         showInformation(serverGroup, true)

         /* Resolve the generated server. */
         res(true)
      })
      /* Catch error, this cannot happen unless you change the Shell script. */
      .catch(() =>
      {
         console.log(colors.red(`Something went wrong whilst adding '${serverGroup.getName()}'.`))
         res(false)
      })
   })  
}
/**
 * @param group The given group by the user.
 * @returns A promise on completion of the callback.
 */
export function removeGroup(group: string): Promise<boolean>
{
   return new Promise<boolean>(res =>
   {
      const serverGroup = serverGroups.filter(groupElement => group === groupElement.group).pop()

      /* The user is trying to remove a server of a group that doesn't exist. */
      if (serverGroup == undefined)
      {
         console.log(colors.red(`There are no servers running with group '${group}'.`))
         res(true)
         return
      }

      shell(`./script/kill ${serverGroup.getName()}`)

      .then(() =>
      {
         /* Tell Redis that the server has been deleted in the back-end. */
         redisClient().del(`serverstatus.minecraft.${serverGroup.getName()}`)
         redisClient().zrem(`serverstatus.mineraft`, serverGroup.getName())

         /* Show information about the newly added server. */
         showInformation(serverGroup, false)

         /* Remove the server from the array */
         serverGroups.splice(serverGroups.indexOf(serverGroup), 1)

         /* Resolve true because the server got deleted successfully. */
         res(true)
      })

      /* Catch error, this cannot happen unless you change the Shell script. */
      .catch(() =>
      {
         console.log(colors.red(`Something went wrong whilst removing '${serverGroup.getName()}'.`))
         res(false)
      })
   })  
}
/**
 * 
 */
export function getByPrefix(server: string): ServerGroup | null
{
   let serverGroup: ServerGroup | null = null

   serverGroups.forEach(group => 
   {
      if (group.getName() === server)
      {
         serverGroup = group
      }
   })

   return serverGroup
}