import redis, { AggregateError, AbortError, RedisClient } from 'redis'
import colors from 'colors/safe'
import assert from 'assert'
import dotenv from 'dotenv'
dotenv.config()

let client: RedisClient | null = null 
/**
 * Repository for managing the Redis connection.
 */
export function attemptConnectRedis(): void
{
   //Authenticate
   client = redis.createClient(6379, process.env.REDIS_IP!);
   client.auth(process.env.REDIS_PASSWORD!)

   //Assert errors
   client.on('error', error =>
   {
      assert(error instanceof Error)
      assert(redis instanceof AggregateError)
      assert(redis instanceof AbortError)
   
      // The set and get are aggregated in here v
      assert.strictEqual(error.message.length, 2)
      assert.strictEqual(error.name, 'NR_CLOSED')
   })

   console.log(colors.gray(`- Checking Redis connectivity: ${colors.green(`${client != null}`)}`))
}
/**
 * @returns The instance of the Redis connection.
 */
export function redisClient(): RedisClient
{
   return client != null ? client : process.exit(0)
}

export default client