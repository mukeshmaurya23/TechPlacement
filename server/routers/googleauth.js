const express = require("express");
const router = express.Router();
const { User } = require("../modals/user");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const HttpError = require("../modals/HttpError");

const client = new OAuth2Client(
  "617486206171-1o3mn3oc51vhhsev3hmek3prr5474jvk.apps.googleusercontent.com"
);
//google login with email
//617486206171-im3u11o29us070jhadntud7pk4qbjqi7.apps.googleusercontent.com
router.post("/", async (req, res) => {
  const { tokenId } = req.body;
  client
    .verifyIdToken({
      idToken: tokenId,
      audience:
        "617486206171-im3u11o29us070jhadntud7pk4qbjqi7.apps.googleusercontent.com",
    })
    .then((response) => {
      // const {email_verified,name,email} = response.payload;
      const payload = response.getPayload();
      console.log(payload);
      const { email_verified, name, email } = payload;
      // const email_verified = response.profileObj.email_verified;
      if (email) {
        User.findOne({ email }).exec((err, user) => {
          console.log("errorUser", err, user);
          if (err == null && user == null) {
            //throw new HttpError("User not found", 404);
            return res.status(400).json({
              message: "User not found",
            });
            //return res.status(401).send({ message: "Please Register First" });
          } else {
            if (user) {
              const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
                expiresIn: "7d",
              });
              const { picture } = payload;

              const { _id, firstName, email, role, abc } = user;
              console.log(
                "toBe Return",
                _id,
                firstName,
                email,
                role,
                abc,
                token,
                picture
              );
              return res.json({
                token,
                user: { _id, firstName, email, role, picture, abc },
              });
            }
          }
        });
      }
    });
});

module.exports = router;
