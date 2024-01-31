import jwt from "jsonwebtoken";

class JwtHelper {
  static parseJWT(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        "vlrBFKGpvTXpoPXlaAYCDeOhZ4Jfz8Kt4AEmPOQBILxnVjli2acddskWvyE+8KD8/x4pLt9Yd128qaILMwFmVQg4q78lApAJ2b3q5/eLhwHO9U0Y1oHL+Yzwppzs++3jnctnZO8eL+IMC5UmRFL7ceOrT2CQbXh8KQNWhYCXtZaJ0t/BR+OUQhzzj9sW92mL1LyS4uCTG4vW8cgDfs4RpZYlOWGb5ujxFWmw1X9q/KyX/X9r8pHtyiwtfT9IKsKiSJHlsMI2CR1lt7X9OxxTxF8fUBgEAQxgctJl/o/dnSOy2ieWSsaGszk3Uu/5Xb9T4G1PEattz/CqARAgUcQAmQ==",
        (err, decoded) => {
          if (err) {
            return reject(err);
          }
          return resolve(decoded);
        }
      );
    });
  }
}

export default JwtHelper;
