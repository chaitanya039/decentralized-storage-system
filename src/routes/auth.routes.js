const express = require("express");
const passport = require("passport");
const { register, login, logout } = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");
const generateToken = require("../utils/generateToken");

const router = express.Router();

/* ======================
   MANUAL AUTH (POSTMAN)
   ====================== */

// ✅ REGISTER (manual)
router.post("/register", register);

// ✅ LOGIN (manual)
router.post("/login", login);

// ✅ LOGOUT (manual)
router.post("/logout", protect, logout);

// ✅ PROTECTED TEST ROUTE
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "User is authenticated",
    userId: req.userId
  });
});

/* ======================
   GOOGLE OAUTH (SEPARATE)
   ====================== */

router.get(
  "/oauth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/oauth/google/callback", (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, user, info) => {
    if (err) {
      console.error("Passport error:", err);
      return res.redirect("http://localhost:3000/oauth-failure?error=" + encodeURIComponent(err.message || "server_error"));
    }

    if (!user) {
      console.error("Authentication failed, info:", info);
      const message = (info && info.message) || (typeof info === 'string' && info) || 'no_user_returned';
      return res.redirect("http://localhost:3000/oauth-failure?error=" + encodeURIComponent(message));
    }

    try {
      const token = generateToken(user._id);
      return res.redirect(`http://localhost:3000/oauth-success?token=${token}`);
    } catch (e) {
      console.error("Token generation error:", e);
      return res.redirect("http://localhost:3000/oauth-failure?error=" + encodeURIComponent("token_error"));
    }
  })(req, res, next);
});

module.exports = router;
