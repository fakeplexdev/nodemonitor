/**
 * @description NodeMonitor is a more modern version of ServerMonitor.
 */
import Input from './input'
import { attemptConnectRedis } from './redis'
import { attemptConnectBungee, ASCII } from './util'

/* Print the intro in ASCII-artwork. */
console.log(ASCII.join('\n'));

/* Create client and check if Redis is running. */
attemptConnectRedis()

/* Check if BungeeCord is running. */
attemptConnectBungee()

/* Run input or exit out. */
.then(success => success ? new Input() : process.exit(0))
