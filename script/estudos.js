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
                        <input class="ms-auto" type="number" min="0">
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

        $(".swiper-wrapper .estudos").append(
          `
                <div class="swiper-slide">
                    <div class="estudo-de-caso">
                        <div class="row">
                            <div class="col">
                                <div class="d-flex flex-column h-100">
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
                                    <div class="balao balao-4 w-75 mt-auto">
                                        E usar os botões na parte
                                        inferior direita da tela para navegar através do curso.
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <table class="table estudo-tabela">
                                    ${rows}
                                    <tr>
                                        <th class="bg-white">
                                        </th>
                                        <th class="bg-white">
                                        </th>
                                        <td class="btn-primary">
                                            <h6 class="my-auto text-white">Cálculo</h6>
                                            <input class="ms-auto" type="number" min="0">
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="swiper-slide swiper-slide-modal-trigger" data-index=${i}>
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
                                    <tr>
                                        <th class="bg-white">
                                        </th>
                                        <td class="btn-primary">
                                            <h6 class="my-auto text-white">NEWS 2 Total</h6>
                                            <input class="ms-auto" type="number" min="0">
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#respostaModal${i}">
                        Launch demo modal
                    </button>
                    
                </div>
                
            `
        );
        $("body").append(
          `
            <div class="modal fade modal-resposta estudo-de-caso" id="estudoModal${i}" tabindex="-1" aria-labelledby="estudoModal${i}Label"
                        aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="estudoModal${i}Label">
                                            Pense em Sepse
                                        </h1>
                                    </div>
                                    <div class="modal-body">
                                        <div class="row">
                                            <div class="col-sm-5">
                                                <table class="table estudo-tabela">
                                                    ${rows2}
                                                    <tr>
                                                        <th class="bg-white">
                                                        </th>
                                                        <td class="btn-primary">
                                                            <h6 class="my-auto text-white">NEWS 2 Total</h6>
                                                            <input class="ms-auto" type="number" min="0">
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                            <div class="col-sm-7">
                                                <p>
                                                    Baseada na pontuação individual e total do NEWS 2, sepse deveria ser considerada?
                                                </p>
                                                <h6>
                                                    Faça a escolha abaixo
                                                </h6>
                                                <div class="row row-escolhas my-3">
                                                    <div class="col">
                                                        <button class="btn btn-primary text-center w-100">
                                                            Sim
                                                        </button>
                                                    </div>
                                                    <div class="col">
                                                        <button class="btn btn-primary text-center w-100">
                                                            Não
                                                        </button>
                                                    </div>
                                                </div>
                                                <p>
                                                    Sim, pense em sepse!
                                                </p>
                                                <p>
                                                    Para uma pontuação total de 5 ou mais, sepse deve ser considerada
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button class="nav-item btn btn-primary btn-proximo">
                                            PRÓXIMO
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <title>chevron-right</title>
                                                <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
`
        );
      });

      $(".swiper-wrapper .estudos").after($(".estudos .swiper-slide"));
      $(".swiper-wrapper .estudos").remove();
    },
  });
}

printMenu();

$(document).on("click", ".btn-modal", function (v, i) {
  const index = $(".swiper-slide-active").data("index");
  $("#estudoModal" + index).modal("show");
});
