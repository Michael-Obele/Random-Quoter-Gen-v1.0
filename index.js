const api_url =
  'https://young-gorge-47284.herokuapp.com/https://zenquotes.io/api/quotes/';

var myText;
// Get Qoutes API
async function getapi(url) {
  const response = await fetch(url);
  $('.spinner-border').addClass('hider');
  var data = await response.json();
  console.log(data);
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  var list = [];
  function pack() {
    const d = new Date();
    let day = days[d.getDay()];
    var rndInt = Math.floor(Math.random() * 50) + 1;
    $('#text').html(`<p><q> ${data[rndInt].q} </q></p>`);
    $('#author').text(data[rndInt].a);
    $('.dater').text(
      `Generated ${day} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    );
    $('.tweet').click(function () {
      $('#tweet-quote').attr(
        'href',
        'https://twitter.com/intent/tweet?hashtags=quotes&related=Dev_Obele&text=' +
          encodeURIComponent('“' + data[rndInt].q + '” —' + data[rndInt].a)
      );
    });
    myText = {
      author: data[rndInt].a,
      quote: data[rndInt].q,
    };
  }
  pack();
  $('#new-quote').click(function () {
    $('#copy-quote').attr('data-bs-original-title', 'Copy this quote!');
    pack();
  });
}

var clickNum = 0;
$(document).ready(function () {
  getapi(api_url);
  $('#copy-quote').attr('data-bs-original-title', 'Copy this quote!');
  $('#new-quote').click(function () {
    clickNum = ++clickNum;
    if (clickNum == 20) {
      window.location.reload();
      clickNum = 0;
    }
    console.log(clickNum);
  });

  // clipboard func
  function copyToClipboard() {
    var text = myText;
    var sampleTextarea = document.createElement('textarea');
    document.body.appendChild(sampleTextarea);
    sampleTextarea.value = `“${text.quote}” — ${text.author}`; //save main text in it
    sampleTextarea.select(); //select textarea contenrs
    document.execCommand('copy');
    document.body.removeChild(sampleTextarea);
  }
  // end of func
  // calling clipboard func
  $('.copy').click(function () {
    copyToClipboard();
    $('#copy-quote').attr('data-bs-original-title', 'Copied!');
    $('#copy-quote').tooltip('show');
  });
  $('.altcls').click(function () {
    $('#copyToast').toggleClass('show');
  });
});

// See Changes Btn
$(document).ready(function () {
  $('.toclose').click(function () {
    $('#liveToastBtn').removeClass('vis');
    $('#liveToast').toggleClass('show');
  });
  $('#liveToastBtn').click(function () {
    $('#liveToast').toggleClass('show');
    $('#liveToastBtn').addClass('vis');
  });
});

//Toast function
$(document).ready(function () {
  // Initialize tooltips
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl, 200000);
  });
});
// Change Font Func
$(document).ready(function () {
  var fontList = [];
  var randomFont = (font) => {
    for (let i = 0; i < font.length; i++) {
      fontList.push(randomFont[i]);
    }
  };
  randomFont = [
    'Permanent Marker',
    'Rock Salt',
    'Raleway',
    'PT Sans',
    'Lora',
    'Roboto Condensed',
    'Oswald',
    'Open Sans Condensed',
    'Merriweather',
    'Ubuntu',
    'Yanone Kaffeesatz',
    'Roboto',
    'Alegreya',
    'Dancing Script',
    'EB Garamond',
    'Amatic SC',
    'Josefin Sans',
    'Droid Seri',
    'Playfair Display',
    'Alice',
    'Lato',
    'Grand Hotel',
    'Abel',
    'Coustard',
    'Leckerli On',
  ];

  var changeFont = () => {
    var random_font = randomFont[Math.floor(Math.random() * randomFont.length)];
    $('.Dqoute').css('font-family', random_font);
  };
  changeFont();
  $('#new-quote').click(function () {
    changeFont();
  });
});
// End Change Font Func

// Change Colors
$(document).ready(function () {
  var colors = ['#ff0000'];
  var genColor = (color) => {
    for (let i = 0; i < color.length; i++) {
      colors.push('#' + color[i]);
    }
  };
  genColor([
    '39C0ED',
    '1266F1',
    'B23CFD',
    '00B74A',
    'FFA900',
    '262626',
    '283593',
    '004D40',
    'FB8C00',
    'BF360C',
    '263238',
    'FF3D00',
    'F93154',
    '212121',
    '3E2723',
    'FF6D00',
    '00C853',
    '33691E',
    '1B5E20',
    '004D40',
    '006064',
    '6200EA',
    '4A148C',
    '311B92',
  ]);
  const colorCode = () => {
    var random_color = colors[Math.floor(Math.random() * colors.length)];
    $('.card').css('color', random_color);
    $('.list-group').css('color', random_color);
    $('#new-quote').css('background-color', random_color);
    $('.tweet').css('background-color', random_color);
    $('.btn').css('background-color', `${random_color} !important`);
    $('.copy').css('background-color', random_color);
    $('body').css('background-color', random_color);
    $('.badgeCol').css('background-color', random_color);
  };

  colorCode();

  $('#new-quote').click(function () {
    colorCode();
  });
});
// end of Change Colors

// For the Search Qoute
const settings = {
  async: true,
  crossDomain: true,
  url: 'https://type.fit/api/quotes',
  method: 'GET',
};

$.ajax(settings).done(function (response) {
  const data = JSON.parse(response);
  var authorList = (data) => {
    var authors = [];
    for (let i = 0; i < data.length; i++) {
      authors.push(data[i].author);
      //
    }
    var SetAuthor = new Set(authors);
    var ArrAuthor = Array.from(SetAuthor);
    ArrAuthor.map((x) => {
      $('#datalistOptions').append(`<option value="${x}">`);
    });
  };
  authorList(data);

  $('#searchBtn').click(function () {
    var author = $('input').val();
    filtered = data.filter((datum) => datum.author == author);
    $('.deList').text('');
    filtered.map((x) =>
      $('.deList').append(
        `<li class="list-group-item d-flex justify-content-between align-items-start">
      <div class="ms-2 me-auto tag"> ${x.text}  — ${x.author}  </div>
      </li>`
      )
    );
  });
});

// use when you have strength to finish this...
$(document).ready(function () {
  function copyToClipboard() {
    /* Get the text field */
    var copyText = document.getElementsByClassName('tag');

    /* Select the text field */
    copyText.text();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);
  }
  $('.badgeCol').click(function () {
    $('.tag').addClass('coping');
    copyToClipboard();
  });
});
// might add later
{
  /* <button class="badge badgeCol"><a>
            <i class="fa fa-copy"></i>
          </a></button> */
}
