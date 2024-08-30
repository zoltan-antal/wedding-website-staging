import { Request, Response, NextFunction } from 'express';
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

interface CustomRequest extends Request {
  cookies: {
    authToken?: string;
  };
}

const opts: StrategyOptionsWithoutRequest = {
  // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req: CustomRequest) => req.cookies.authToken || null,
  ]),
  secretOrKey: JWT_SECRET,
  algorithms: ['HS256'],
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

type RequestHandler = (req: Request, res: Response, next: NextFunction) => void;
const authenticateJwt: RequestHandler = passport.authenticate('jwt', {
  session: false,
}) as RequestHandler;

export default configurePassport;
export { authenticateJwt };
