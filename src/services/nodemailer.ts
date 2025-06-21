import { createTransport } from "nodemailer";
import { envs } from "../utils/envVariables";

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: envs.EMAIL_USER,
    pass: envs.EMAIL_PASSWORD,
  },
});

export const sendVerificationCodeToEmail = async ({
  to,
  code,
}: {
  to: string;
  code: string;
}) => {
  const siteToRedirect = `${envs.FRONTEND_URL}/verificar/${code}`;

  transporter.sendMail({
    from: `MyStore <${envs.EMAIL_USER}>`,
    to,
    subject: "Verifica tu corre electronico (No Responder)",
    html: `<p>Gracias por registrarte en My Store App.<p/>
          <p>Para completar el proceso debes hacer click en el siguiente botón.<p/>
          <a href="${siteToRedirect}" style="display: inline-block;padding: 10px 20px;font-size: 16px;color: white;background-color: #007bff;text-decoration: none;border-radius: 5px" >Verificar Email<a/>
          <p>O copia y pega el siguiente enlace en tu navegador:<br>${siteToRedirect}<p/>`,
  });
};
