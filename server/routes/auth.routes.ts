import Router from "express-promise-router";
import {
  loginHandler,
  profileHandler,
  signupHandler,
  updateProfile,
  deleteProfile,
} from "../controllers/auth.controller";
import { requireAuth } from "../middlewares/requireAuth";
import { validateSchema } from "../middlewares/validateShema";
import { loginSchema, signupSchema } from "../schemas/user.schema";

const router = Router();

router.post("/register", validateSchema(signupSchema), signupHandler);

router.post("/login", validateSchema(loginSchema), loginHandler);

router.get("/profile", requireAuth, profileHandler);

router.put("/:id", validateSchema(signupSchema.partial()), updateProfile);
router.delete("/:id", deleteProfile);

export default router;
