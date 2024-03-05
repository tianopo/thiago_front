import axios from "axios";
import { Form, FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { Textarea } from "src/components/Form/Textarea";
import { useHome } from "src/hooks/validation/useHome";
import { Section } from "../Section";
import { Input } from "src/components/Form/Input";

export const SectionContact = ({ id, title }: ISectionContact) => {
  const { context } = useHome();
  const { t: translator } = useTranslation();
  const t = (t: string) => translator(`contact.${t}`);

  const {
    formState: { errors },
    register,
    watch,
    reset,
  } = context;

  const onSubmit = async () => {
    try {
      const { mensagem, email, nome, contato } = watch();

      const dados = {
        accessKey: "dedff74d-dd09-4652-addf-c4b323291771",
        subject: `Contato de ${nome}`,
        message: `
        Nome: ${nome} <br>
        E-mail: ${email} <br>
        Contato: ${contato} <br>
        Mensagem: ${mensagem} <br>
        `,
      };

      const response = await axios.post("https://api.staticforms.xyz/submit", dados, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        toast.success(t("toastSucesso"));
        reset();
      }
    } catch (error) {
      toast.error(`${t("toastErro")}: ${error}`);
    }
  };

  return (
    <Section divisao={2} className="items-center p-10">
      <div className="w-full" id={id}>
        <h4 className="w-full text-start text-32 font-bold md:text-end">{title}</h4>
        <FormProvider {...context}>
          <Form onSubmit={onSubmit}>
            <Input
              register={register("nome")}
              title={t("nome")}
              placeholder="João da Silva"
              errors={errors.nome?.message}
              required
            />
            <Input
              register={register("email")}
              title={t("email")}
              typ="email"
              placeholder="x@x.com"
              errors={errors.email?.message}
              required
            />
            <Input
              register={register("contato")}
              title={t("contato")}
              placeholder="(XX) XXXXX-XXXX"
              typ="tel"
              errors={errors.contato?.message}
              required
            />
            <Textarea
              title={t("mensagem")}
              register={register("mensagem")}
              placeholder={t("mensagemPlaceholder")}
              errors={errors.mensagem?.message}
            />
            <button className={`button button-light m-10`}>{t("buttonEnviar")}</button>
            <input type="hidden" name="redirectTo" value={window.location.href}></input>
          </Form>
        </FormProvider>
      </div>
      <div className="hidden md:inline">
        <img src="/projeto/banner.webp" alt="Company Image" className="h-fit w-fit rounded-full" />
      </div>
    </Section>
  );
};
interface ISectionContact {
  id?: string;
  title?: string;
}