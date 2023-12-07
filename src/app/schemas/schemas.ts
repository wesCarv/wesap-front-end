import * as yup from "yup";

const loginSchema = yup.object({
  email: yup.string().required("Deve ser um email valido"),
  password: yup.string().required("Campo senha deve ser inserido"),
});

const signupSchema = yup.object({
  name: yup.string().required("Campo nome é obrigatório"),
  email: yup.string().required("Email é obrigatório"),
  password: yup.string().required("Senha é obrigatoria"),
});

const messagesSchema = yup.object({
  about: yup.string().required("O campo mensagem é obrigatório")
})
export { loginSchema, signupSchema, messagesSchema };
