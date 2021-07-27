import crypto from 'crypto'
import fs from 'fs'

function randomString(length: number, chars: string) {
  if (!chars) {
    throw new Error('Argument \'chars\' is undefined');
  }
  
  var charsLength = chars.length;
  if (charsLength > 256) {
    throw new Error('Argument \'chars\' should not have more than 256 characters' + ', otherwise unpredictability will be broken');
  }
  
  var randomBytes = crypto.randomBytes(length);
  var result = new Array(length);
  
  var cursor = 0;
  for (var i = 0; i < length; i++) {
    cursor += randomBytes[i];
    result[i] = chars[cursor % charsLength];
  }

  return result.join('');
}
  
/** Sync */
export function randomAsciiString(length: number) {
  return randomString(length, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
}

export function fileHash(filename : string, algorithm = 'sha1') {
  return new Promise((resolve, reject) => {
    let shasum = crypto.createHash(algorithm);
    try {
      let s = fs.createReadStream(filename)
      s.on('data', function (data) {
        shasum.update(data)
      })
      // making digest
      s.on('end', function () {
        const hash = shasum.digest('hex')
        return resolve(hash);
      })
    } catch (error) {
      return reject('calc fail');
    }
  });
}