import { Resend } from "resend";
import { envs } from "../utils/envVariables";

const resend = new Resend(envs.EMAIL_PASSWORD);

export const sendVerificationCodeToEmail = async ({ to, code }: { to: string; code: string }) => {
  const siteToRedirect = `${envs.FRONTEND_URL}/verificar/${code}`;
  const { data, error } = await resend.emails.send({
    from: `MyStore<${envs.EMAIL_USER}>`,
    to,
    subject: "Verifica tu corre electronico (No Responder)",
    html: `<p>Gracias por registrarte en My Store App.<p/>
            <p>Para completar el proceso debes hacer click en el siguiente botón.<p/>
            <a href="${siteToRedirect}" style="display: inline-block;padding: 10px 20px;font-size: 16px;color: white;background-color: #007bff;text-decoration: none;border-radius: 5px" >Verificar Email<a/>
            <p>O copia y pega el siguiente enlace en tu navegador:<br>${siteToRedirect}<p/>`,
  });
  if(error) console.log(error)
};
