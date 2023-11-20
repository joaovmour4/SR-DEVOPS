import React, { useState } from 'react';
import Carousel from '../componentes/Carousel';
import imgArrowDown from '../img/arrow_down.png';
import imgArrowUp from '../img/arrow_up.png';

export default function Home() {
  const [objetivo, setObjetivo] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <Carousel />

      <div className="max-w-2xl text-center w-3/4">
        <p className="text-justify pt-4">
          O Restaurante Universitário (RU) da Unifesspa está instalado na Unidade III do Campus de Marabá, localizado na Avenida dos Ipês, s/n, Loteamento Cidade Jardim.
        </p>

        <p className="text-justify pt-4">
          O objetivo do funcionamento do RU é fornecer refeições nutricionalmente equilibradas, seguras do ponto de vista higiênico-sanitário, adequadas às necessidades nutricionais dos usuários e à baixo custo, atuando como um dos instrumentos da política de permanência dos(as) discentes na educação superior pública federal, representando um eixo estratégico da Política Nacional de Assistência Estudantil (PNAES).
        </p>

        {objetivo ? null : (
          <p onClick={() => setObjetivo(true)} className='underline cursor-pointer'>
            <img
                src={imgArrowDown}
                alt=""
                className='inline-block h-8 w-8 mx-auto'
                style={{ filter: 'invert(18%) sepia(97%) saturate(1178%) hue-rotate(199deg) brightness(93%) contrast(83%)' }}
              />
          </p>
        )}

        {objetivo && (
          <div>
            <p className="text-justify pt-4">
              O preço das refeições é de R$13,00 (treze reais) para os servidores e público em geral e R$2,00 (dois reais) os discentes com direito a subsídios. Terão direito a refeição subsidiada no RU os(as) discentes de graduação com vínculo ativo na Unifesspa e que atendam a, pelo menos, uma das seguintes condições: (1) discentes que tenham ingressado na Unifesspa por meio das cotas renda, negros (pretos e pardos), quilombolas, índigenas e pessoas com deficiência; (2) discentes oriundos do Ensino médio da rede pública de Educação básica; (3) discentes quilombolas e indígenas ingressantes pelo Processo seletivo indígenas e quilombolas (PSIQ) da Unifesspa e (04) discentes com avaliação socioeconômica vigente em programas de Assistência Estudantil da Divisão de Assistência Estudantil da Proex/Unifesspa.
            </p>
            
            <p className="text-justify pt-4">
              Assim, o discente de graduação que se encaixar em qualquer uma das condições descritas acima poderá se dirigir ao caixa do RU, apresentando documento oficial com foto e pagar R$2,00.
            </p>

            <p onClick={() => setObjetivo(false)} className='underline cursor-pointer'>
            <img
                src={imgArrowUp}
                alt=""
                className='inline-block h-8 w-8 mx-auto'
                style={{ filter: 'invert(18%) sepia(97%) saturate(1178%) hue-rotate(199deg) brightness(93%) contrast(83%)' }}
              />
            </p>
          </div>
        )}

        <p className="text-justify pt-4 link-do-edital">
          Para mais informações, acesse a <a href="https://proex.unifesspa.edu.br/images/Instrucao_Normativa_02.2023_PROEX_-_institui_o_processo_de_subsidio_no_R.U_da_UNIFESSPA.pdf" target="_blank" rel="noopener noreferrer">Instrução Normativa n° 02/2023 PROEX</a> no site <a href="https://proex.unifesspa.edu.br" target="_blank" rel="noopener noreferrer">proex.unifesspa.edu.br</a>.
        </p>
      </div>
    </div>
  );
}
