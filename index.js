const api_url =
  'https://young-gorge-47284.herokuapp.com/https://zenquotes.io/api/quotes/';

var myText;

async function getapi(url) {
  const response = await fetch(url);
  var data = await response.json();
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  function pack() {
    const d = new Date();
    let day = days[d.getDay()];
    const rndInt = Math.floor(Math.random() * 50) + 1;
    $('#text').html(`<p> &ldquo; ${data[rndInt].q} &rdquo;</p>`);
    $('#author').text(data[rndInt].a);
    $('#text').fadeOut(0).fadeIn('slow');
    $('#author').fadeOut(0).fadeIn('slow');
    $('.dater').text(
      `Generated on ${day} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    );
    $('#tweet-quote').attr(
      'href',
      'https://twitter.com/intent/tweet?hashtags=quotes&related=Dev_Obele&text=' +
        encodeURIComponent('"' + data[rndInt].q + '" —' + data[rndInt].a)
    );
    myText = {
      author: data[rndInt].a,
      quote: data[rndInt].q,
    };
  }
  pack();
  $('#new-quote').click(function () {
    pack();
  });
}
getapi(api_url);

$(document).ready(function () {
  // clipboard func
  function copyToClipboard() {
    var text = myText;
    var sampleTextarea = document.createElement('textarea');
    document.body.appendChild(sampleTextarea);
    sampleTextarea.value = `“${text.quote}” - ${text.author}`; //save main text in it
    sampleTextarea.select(); //select textarea contenrs
    document.execCommand('copy');
    document.body.removeChild(sampleTextarea);
  }
  // end of func
  // calling clipboard func
  $('.copy').click(function () {
    copyToClipboard();
  });
});

$(function () {
  $('.pushme').click(function () {
    $(this).text(function (i, text) {
      return text === 'PUSH ME' ? "DON'T PUSH ME" : 'PUSH ME';
    });
  });
});


$(document).ready(function () {
  
   $('.btn-close').click(function () {
      $('#liveToast').toggleClass('show');
   });
  $('#liveToastBtn').click(function () {
    $('#liveToastBtn').text(function (i, text) {
      return text == 'See Changes' ? 'Hide Changes' : 'See Changes';
    });
    $('#liveToast').toggleClass('show');
  });
});

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
    $('#new-quote').css('background-color', random_color);
    $('.tweet').css('background-color', random_color);
    $('.btn').css('background-color', `${random_color} !important`);
    $('.copy').css('background-color', random_color);
    $('body').css('background-color', random_color);
  };

  colorCode();

  $('#new-quote').click(function () {
    colorCode();
  });
});

const settings = {
  async: true,
  crossDomain: true,
  url: 'https://type.fit/api/quotes',
  method: 'GET',
};

$.ajax(settings).done(function (response) {
  const data = JSON.parse(response);
  var author = 'Thomas Edison';
  const filtered = data.filter( datum => datum.author == author);
  console.log(filtered);
});
