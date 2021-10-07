// config passport-jwt
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const passport = require("passport");

const { User } = require("../models");

// config jwt strategy options
const options = {
  // define key to verify token
  //JWT_SECRET_KEYชื่อต้องเหมือนไฟล์.env
  secretOrKey: process.env.JWT_SECRET_KEY,
  // define where to extract jwt from
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

// verify token
// if success execute callback function (payload, done) => payload is token payload, done is callback function
// if ivolid token sent response with status 401 and message Unautorized
const jwtStrategy = new JwtStrategy(options, async (payload, done) => {
  try {
    console.log(payload);
    const user = await User.findOne({ where: { id: payload.id } });
    if (!user) {
      return done(null, false);
    }

    // done has 2 parameters: err, user
    done(null, "Success Token Verification"); // req.user = 'Success Token Verification'; next(); // เหมือนการสั่ง next ไปที่ niddleware ต่อถัดไป
  } catch (err) {
    done(err, false);
  }
});

//apply strategy to passport
passport.use("jwt", jwtStrategy);
