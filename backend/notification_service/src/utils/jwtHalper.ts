import jwt from "jsonwebtoken";

class JwtHelper {
  static parseJWT(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
        if (err) {
          return reject(err);
        }
        return resolve(decoded);
      });
    });
  }
}

export default JwtHelper;
