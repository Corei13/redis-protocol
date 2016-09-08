# redis-protocol

[Node.js](http://nodejs.org/) package to encode a sequence of [Redis commands](http://redis.io/commands) into [Redis protocol](http://redis.io/topics/protocol), suitable for [mass insertion](http://redis.io/topics/mass-insert).

Adapted from [redis-mass](https://github.com/almeida/redis-mass).

## Installation

```bash
npm install -g Corei13/redis-protocol
```

## Usage

### Mass insertion on Redis

```bash
$ redis-protocol /path/to/input-file | redis-cli --pipe
# Or
$ cat /path/to/input-file | redis-protocol | redis-cli --pipe
```

### Output to console

```bash
$ redis-protocol /path/to/input-file
```

### Output to file

```bash
$ redis-protocol /path/to/input-file -o /path/to/output-file
```

## Examples

### Input file ([Redis Commands](http://redis.io/commands))

```
SET key1 value1
SADD key2 value1 "value2" "value3"
ZADD "key3" 1 "value3"
```

### Output ([Redis Protocol](http://redis.io/topics/protocol))

```
*3
$3
SET
$4
key1
$6
value1
*5
$4
SADD
$4
key2
$6
value1
$6
value2
$6
value3
*4
$4
ZADD
$4
key3
$1
1
$6
value3
```
