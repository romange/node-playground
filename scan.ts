import Redis from 'ioredis';
import { resolve } from 'path';
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'


(async () => {
    const args = await yargs(hideBin(process.argv)).option('address', {
        alias: 'a',
        type: 'string',
        description: 'server address',
        default: 'localhost:6379',
    }).parse();
    console.log(args);
    var [host, port] = args.address.split(':');

    const redis = new Redis({
        port: parseInt(port),
        host: host,
    });

    let now = Date.now();
    let stream = redis.scanStream({
        match: 'foo*'
    })

    await new Promise<void>((resolve) => {
        stream.on('data', (keys) => {
            keys.forEach((key: string) => {
                console.log(key);
            });
            resolve();
        });

        stream.on('end', () => {
            return resolve();
        }
        );
    });
    console.log("Finish after %dms", Date.now() - now);
    redis.quit();
})();