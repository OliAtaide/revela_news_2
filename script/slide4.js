let limites = [];
let questoes = [];

$.ajax({
  url: `../script/slide4.json`,
  dataType: "json",
  type: "GET",
  success: function (_data) {
    limites = _data.limites;
    questoes = _data.questoes;

    limites.forEach(function (l, i) {
      var botao = `
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="tab${i}" data-bs-toggle="tab"
                data-bs-target="#tabPane${i}" type="button" role="tab"
                aria-controls="tabPane${i}" aria-selected="true"
                style="background-color:${l.color} !important;"
                >
                ${l.botao}
            </button>
        </li>
        `;

      $(".nav-resposta").append(botao);

      let respostas = "";

      l.respostas.forEach(function (r) {
        respostas += `
                <li>
                    ${r}
                </li>
            `;
      });

      $(".nav-content-resposta").append(
        `
            <div class="tab-pane fade" id="tabPane${i}" role="tabpanel"
                aria-labelledby="home-tab" tabindex="${i}">
                <table class="table-urgencia w-100">
                    <tbody>
                        <th style="background-color:${l.color} !important;">
                            ${l.titulo}
                        </th>
                        <td>
                            ${l.tempo}
                        </td>
                        <td>
                            <ul>
                                ${respostas}
                            </ul>
                        </td>
                    </tbody>
                </table>
            </div>
        `
      );
    });

    $(".nav-item:first-child .nav-link").tab("show");

    questoes.forEach(function (q, i) {
      let respostas = [];
      var botoes = "";

      limites[q].respostas.forEach(function (r) {
        respostas += `
                    <li>
                        ${r}
                    </li>
                `;
      });

      limites.forEach(function (l, j) {
        botoes += `
            <li class="nav-item" role="presentation">
                <button type="button" data-btn="#btnSend${i}"  class="nav-link" style="background-color:${l.color} !important;" value=${j} data-index="${i}">
                    ${l.botao}
                </button>
            </li>
        `;
      });
      $(".swiper-wrapper .here").append(
        `
            <div class="swiper-slide">
                <div class="aviso">
                    <span class="mdi mdi-head-lightbulb"></span>
                    Caro aluno, leia com atenção a resposta clínica a seguir, depois selecione o seu
                    gatilho limiar, clicando nos botões na parte inferior da página, depois clique
                    em ‘Enviar’.
                </div>

                <div class="obs">
                    <div class="obs-title">
                        Resposta clínica ${i + 1} de 5
                    </div>
                    <ul>
                        ${respostas}
                    </ul>
                </div>

                <div class="dica d-flex mb-3">
                    <span class="mdi mdi-cursor-default-click"></span>
                    Selecione o gatilho limiar, clicando nos botões na parte inferior da página,
                    depois clique em ‘Enviar’:
                </div>
                
                <ul id="respostas${i}" class="nav nav-tabs nav-resposta opcao-resposta nav-justified gap-3 border-0 mb-4" data-index=${i}>
                    ${botoes}
                </ul>
                <div class="d-flex justify-content-end">
                    <button class="btn btn-primary btn-submit" data-index=${i} id="btnSend${i}" data-modal="#modalResposta${i}">ENVIAR</button>
                </div>
            </div>
        `
      );
      $(".slide4-modals").append(
        `
        <div class="modal fade modal-resposta" id="modalResposta${i}" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">
                            </h1>
                        </div>
                        <div class="modal-body">
                            <p>
                                A resposta clínica corresponde ao limiar de ${limites[q].botao}
                            </p>
                            <table class="table-urgencia">
                                <tbody>
                                    <th style="background-color:${limites[q].color} !important;">
                                        ${limites[q].titulo}
                                    </th>
                                    <td>
                                        ${limites[q].tempo}
                                    </td>
                                    <td>
                                        <ul>
                                            ${respostas}
                                        </ul>
                                    </td>
                                </tbody>
                            </table>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary btn-proximo">
                                CONTINUAR
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
    $(".swiper-wrapper .here").after($(".here .swiper-slide"));
    $(".swiper-wrapper .here").remove();
  },
});

$(document).on("click", ".opcao-resposta .nav-link", function () {
  const val = $(this).val();
  const btn = $(this).data("btn");
  const i = $(this).data("index");
  $(btn).val(val);

  $(`#respostas${i} .nav-link`).removeClass("selected");
  $(this).addClass("selected");
});

$(document).on("click", ".btn-submit", function () {
  const modal = $(this).data("modal");
  const val = $(this).val();
  const i = $(this).data("index");

  if (questoes[i] == val) {
    $(modal + " .modal-title").html("Correto");
  } else {
    $(modal + " .modal-title").html("Incorreto");
  }

  $(modal).modal("show");
});
