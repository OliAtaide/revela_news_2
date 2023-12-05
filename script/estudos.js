labels = [
  "Frequência respiratória",
  "Saturação de oxigênio",
  "Oxigênio suplementar",
  "Pressão arterial sistólica",
  "Pulso",
  "Consciência",
  "Temperatura",
];

function printMenu() {
  $.ajax({
    url: `/script/estudos.json`,
    dataType: "json",
    type: "GET",
    success: function (_data) {
      _data.forEach(function (v, i) {
        var rows = "";
        var rows2 = "";

        for (let j = 0; j < labels.length; j++) {
          rows += `
                <tr>
                    <th>
                        ${labels[j]}
                    </th>
                    <th>
                        ${v.dados[j]}
                    </th>
                    <td>
                        <input type="number" min="0">
                    </td>
                </tr>
            `;
          rows2 += `
                <tr>
                    <th>
                        ${labels[j]}
                    </th>
                    <th class="text-end">
                        ${v.respostas[j]}
                    </th>
                </tr>
            `;
        }

        $(".swiper-wrapper").append(
          `
                <div class="swiper-slide">
                    <div class="estudo-de-caso">
                        <div class="row">
                            <div class="col">
                                <h3 class="estudo-titulo">
                                    Estudo de Caso ${i + 1}
                                </h3>
                                <div class="estudo-descricao">
                                    <p>
                                        ${v.texto}
                                    </p>
                                    <p>
                                        As observações mostradas à direita são relatadas:
                                    </p>
                                </div>
                                <div class="dica d-flex mb-3">
                                    <span class="mdi mdi-cursor-default-click"></span>
                                    Usando o gráfico de pontuação do NEWS 2, preencha cada um dos
                                    parâmetros
                                    individuais
                                    no quadro do lado oposto e clique em enviar.
                                </div>
                            </div>
                            <div class="col">
                                <table class="table estudo-tabela">
                                    ${rows}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="estudo-de-caso">
                        <div class="row">
                            <div class="col">
                                <p>
                                    A pontuação gravada de NEWS 2 para
                                    parâmetros individuais e a pontuação total de NEWS 2 estão à
                                    direita. Agora, selecione o gatilho
                                    inicial clicando no botão correto abaixo:
                                </p>

                                <ul class="nav nav-tabs nav-resposta nav-justified gap-3 border-0 mb-4"
                                    id="myTab" role="tablist">

                                </ul>
                                <div class="tab-content nav-content-resposta" id="myTabContent">


                                </div>
                            </div>
                            <div class="col">
                                <table class="table estudo-tabela">
                                    ${rows2}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            `
        );
      });
    },
  });
}

printMenu();
