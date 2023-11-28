$.ajax({
  url: `../script/slide4.json`,
  dataType: "json",
  type: "GET",
  success: function (_data) {
    _data.limites.forEach(function (l, i) {
      $(".nav-resposta").append(
        `
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="tab${i}" data-bs-toggle="tab"
                    data-bs-target="#tabPane${i}" type="button" role="tab"
                    aria-controls="tabPane${i}" aria-selected="true">
                    ${l.botao}
                </button>
            </li>
            `
      );

      let respostas = '';

      l.respostas.forEach(function (r) {
        respostas +=
            `
                <li>
                    ${r}
                </li>
            `
      })

      $('.nav-content-resposta').append(
        `
            <div class="tab-pane fade" id="tabPane${i}" role="tabpanel"
                aria-labelledby="home-tab" tabindex="${i}">
                <table class="table-urgencia w-100">
                    <tbody>
                        <th>
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
      )
    });
  },
});
