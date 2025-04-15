import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";

const generateUserId = (password) => {
   const hash = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
   const numericId = parseInt(hash.substring(0, 8), 16);

   return numericId;
};

export default defineEventHandler(async (event) => {
   try {
      const { email, password } = await readBody(event);

      const token = jwt.sign(
         {
            id: generateUserId(password),
            email: email,
         },
         process.env.JWT_SECRET,
         { expiresIn: "24h" },
      );

      setCookie(event, "token", token, {
         httpOnly: false,
         maxAge: 60 * 60 * 24,
         path: "/",
         sameSite: "strict",
      });

      return {
         status: 200,
         message: "Авторизация успешна",
      };
   } catch (error) {
      createError({
         statusCode: 500,
         statusMessage: "Ошибка сервера: " + error.message,
      });
   }
});
