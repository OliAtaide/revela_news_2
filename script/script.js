const swiper = new Swiper(".swiper", {
  loop: true,

  direction: "horizontal",

  navigation: {
    nextEl: ".btn-proximo",
    prevEl: ".btn-anterior",
  },
});

$(".btn-voltar").click(function () {
  $(".swiper").show();
  $(".btn-anterior, .btn-proximo").show();
  $(".pf_menu").hide();
  $(this).hide();
});

function createModal(modal) {
  var modalstr = "";

  modal.texto.forEach((mt) => {
    modalstr += "<p>" + mt + "</p>";
  });

  $("#modals").append(
    `
        <div class="modal modal-escala fade" tabindex="-1" id="${modal.id}">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${modal.titulo}</h5>
                    </div>
                    <div class="modal-body">
                    ${modalstr}
                    </div>
                    <div class="modal-footer">
                        <button data-bs-dismiss="modal" type="button" class="btn btn-primary">
                            Continua
                            <svg class="chevron-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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
}

function printParam(n) {
  $.ajax({
    url: `../script/slide${n}.json`,
    dataType: "json",
    type: "GET",
    success: function (_data) {
      _data.parametros_fisiologicos.forEach(function (pf, i) {
        $("#parametrosFisiologicos").append(
          `
                    <div class="col-sm-4">
                        <button type="button" class="pf_button" data-target="#pfMenu${i}">
                            <i class="hi-${pf.icone}"></i>
                            <h6 class="text-center">
                                ${pf.titulo}
                            </h6>
                        </button>
                    </div>
                    `
        );
        var str = "";
        pf.texto.forEach((t) => {
          str += `
                        <p>
                        ${t}
                        </p>
                        `;
        });
        var modais = "";

        if (pf.modais != undefined) {
          pf.modais.forEach((m) => {
            createModal(m);

            modais += `
                            <button class="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#${m.id}">
                            ${m.titulo}
                            </button>
                            <br>
                            `;
          });
        }

        var ncp = "";

        if (pf.ncp != undefined) {
          pf.ncp.forEach((n) => {
            createModal(n);

            ncp += `
                            <div class="col">
                                <button type="button" data-bs-toggle="modal" data-bs-target="#${n.id}">
                                    <span class="letter">
                                        ${n.letra}
                                    </span>
                                    <span class="text">
                                        ${n.placeholder}
                                    </span>
                                </button>
                            </div>
                        `;
          });
        }
        $("#main").append(
          `
                    <div class="pf_menu" id="pfMenu${i}">
                        <div class="d-flex mb-3 pf_titulo">
                            <i class="hi-${pf.icone}"></i>
                            <h3>
                            ${pf.titulo}
                            </h3>
                        </div>
                        ${str}
                        ${
                          pf.dica != undefined
                            ? `<div class=" dica d-flex mb-3">
                            <span class="mdi mdi-cursor-default-click">
                            </span>` +
                              pf.dica +
                              "</div>"
                            : ""
                        }            
                        
                            ${modais}
                        <div class="row row_nc">
                            ${ncp}
                        </div>
                    </div>
                    `
        );
      });
    },
  });
}

function printDec(n) {
  $.ajax({
    url: `../script/slide${n}.json`,
    dataType: "json",
    type: "GET",
    success: function (_data) {
      _data.table.forEach(function (t, i) {
        $(".pf_declaracoes tbody").append(
          `
                    <tr>
                        <th scope="row">${t}</th>
                        <td>
                            <label for="rb1${i}">
                                <input type="radio" title="verdadeiro" name="radio${i}" id="rb1${i}">
                                <div class="btn-radio"></div>
                            </label>
                        </td>
                        <td>
                            <label for="rb0${i}">
                                <input type="radio" title="falso" name="radio${i}" id="rb0${i}">
                                <div class="btn-radio"></div>
                            </label>
                        </td>
                    </tr>`
        );
      });
    },
  });
}

$(document).on("click", ".pf_button", function () {
  var id = $(this).data("target");
  console.log($(id));
  $(".swiper").hide();
  $(".btn-anterior, .btn-proximo").hide();
  $(id).show();
  $(".btn-voltar").show();
});

$(".pf_button").click(function () {
  var id = $(this).data("target");
  console.log($(id));
  $(".swiper").hide();
  $(".btn-anterior, .btn-proximo").hide();
  $(id).show();
  $(".btn-voltar").show();
});

function printMenu() {
  $.ajax({
    url: `../script/menu.json`,
    dataType: "json",
    type: "GET",
    success: function (_data) {
      _data.items.forEach(function (v, i) {
        var active = false;

        console.log(window.location.pathname);

        if(window.location.pathname == v.slug){
          active = true;
        }

        $('.nav-pagination').append(
          `
          <button class="nav-link ${active ? 'active' : ''}" onclick="window.location.href='${v.slug}'">
              ${v.titulo}
          </button>
          `
        )
      });
    },
  });
}

printMenu()