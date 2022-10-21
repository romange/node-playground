import { assert } from 'console';
import Redis from 'ioredis';

// Basic connection, will use defaults if object not provided.
const redis = new Redis({
    port: 6379,
    host: '127.0.0.1',
});

const nIter = 1000;

(async () => {
    let now = Date.now();
    let promises = [];
    for (let i = 0; i < nIter; ++i) {
        promises.push(redis.set("key" + i, String(i)));
        // console.log("send %d %s", i, foo);                
    }
    await Promise.all(promises); 
    console.log("After %d sets %dms", nIter, Date.now() - now);
    promises = [];

    let resparr = [];
    now = Date.now();
    for (let i = 0; i < nIter; ++i) {
        promises.push(redis.get("key" + i).then(resp => {
            assert(resp == String(i));
        }));        
    }
    await Promise.all(promises); 
    console.log("After %d gets %dms", nIter, Date.now() - now);

    redis.quit();
})();