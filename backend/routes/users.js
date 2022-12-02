import express from "express";
import * as UserController from "../controllers/user.js";
import {
  verifyAdmin,
  verifyUser,
} from "../middleware/verifyToken.middleware.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, async (req, res, next) => {
//   res.send("Hello, user. You are now logged in");
// });

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send(
//     "Hello user, you are now loggedIn and so you may delete your account now"
//   );
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send(
//     "Hello admin, you are now loggedIn and so you may delete all accounts now"
//   );
// });

// UPDATE USER

router.put("/:id", verifyUser, UserController.updateUser);

// DELETE USER
router.delete("/:id", verifyUser, UserController.deleteUser);

// GET USER
router.get("/:id", verifyUser, UserController.getUserById);

// GET USERS
router.get("/", verifyAdmin, UserController.getUsers);

export default router;
