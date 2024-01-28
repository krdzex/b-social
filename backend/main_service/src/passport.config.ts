import { PassportStatic } from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";

export default (passport: PassportStatic) => {
  passport.use(
    new JWTStrategy(
      {
        secretOrKey: process.env.JWT_SECRET!,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      async (token: any, done) => {
        return done(null, token.user);
      }
    )
  );
};
