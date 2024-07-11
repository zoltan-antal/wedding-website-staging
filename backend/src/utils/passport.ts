import passport from 'passport';
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptionsWithoutRequest,
} from 'passport-jwt';
import { Guest } from '../models';
import { JWT_SECRET } from './config';

interface JwtPayload {
  id: number;
}

const opts: StrategyOptionsWithoutRequest = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

const configurePassport = (passport: passport.PassportStatic) => {
  passport.use(
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    new JwtStrategy(opts, async (jwtPayload: JwtPayload, done) => {
      try {
        const userId = jwtPayload.id;
        if (!userId || typeof userId !== 'number') {
          return done(null, false);
        }

        const guest = await Guest.findByPk(userId);
        if (!guest) {
          return done(null, false);
        }
        return done(null, guest);
      } catch (err) {
        return done(err, false);
      }
    })
  );
};

export default configurePassport;
