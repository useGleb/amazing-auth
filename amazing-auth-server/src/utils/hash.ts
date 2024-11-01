import bcrypt from 'bcrypt';

export const passwordToHash = (plainTextPassword: string, saltRounds = 15): Promise<{ hash: string, salt: string }> => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, function(err: any, salt: string) {
      if (err) {
        return reject(err)
      }
      bcrypt.hash(plainTextPassword, salt, function (err: any, hash: string) {
        if (err) {
          return reject(err)
        }
        resolve({hash, salt})
      });
    });
  });
}

export const passwordToHashWithSalt = (plainTextPassword: string, salt: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(plainTextPassword, salt, function (err: any, hash: string) {
      if (err) {
        return reject(err)
      }
      return resolve(hash)
    }) 
  });
} 