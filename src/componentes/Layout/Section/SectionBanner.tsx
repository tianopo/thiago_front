import { ReactNode } from "react";
import { BotaoOnClick } from "src/componentes/Botoes/BotaoOnClick";
import { Section } from "../Section";

export const SectionBanner = ({
  id,
  children,
  imagem,
  titulo,
  descricao,
  botao,
  rota,
}: ISectionBanner) => {
  const handleButtonClick = () => {
    window.location.href = rota || "";
  };

  return (
    <Section id={id}>
      <div className="relative h-96 bg-fixed" style={{ backgroundImage: `url('${imagem}')` }}>
        <div className="absolute inset-0 flex min-w-0 flex-col items-end justify-end gap-3 p-12 text-center text-white">
          <img src="/projeto/logo.svg" alt={titulo} className="h-20 w-24" />
          {titulo && <h1 className="mb-4 text-justify text-36 font-bold">{titulo}</h1>}
          {descricao && (
            <p className="mb-6 max-w-full overflow-hidden text-ellipsis whitespace-pre-line text-justify text-18 md:whitespace-break-spaces">
              {descricao}
            </p>
          )}
          {botao && rota && (
            <BotaoOnClick className="text-white" onClick={handleButtonClick}>
              {botao}
            </BotaoOnClick>
          )}
        </div>
        {children}
      </div>
    </Section>
  );
};

interface ISectionBanner {
  id?: string;
  children?: ReactNode;
  imagem: string;
  titulo?: string;
  descricao?: string;
  botao?: string;
  rota?: string;
}
