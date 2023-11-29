$.ajax({
  url: `../script/slide4.json`,
  dataType: "json",
  type: "GET",
  success: function (_data) {
    let limites = _data.limites;
    var botoes = "";

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

      botoes += `
            <li class="nav-item" role="presentation">
                <button class="nav-link" style="background-color:${l.color} !important;">
                    ${l.botao}
                </button>
            </li>
        `;

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

    _data.questoes.forEach(function (q, i) {
      let respostas = [];

      limites[q].respostas.forEach(function (r) {
        respostas += `
                    <li>
                        ${r}
                    </li>
                `;
      });

      $(".swiper-wrapper").append(
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
                
                <ul class="nav nav-tabs nav-resposta opcao-resposta nav-justified gap-3 border-0 mb-4" data-index=${i}>
                    ${botoes};
                </ul>
            </div>
        `
      );
    });
  },
});
