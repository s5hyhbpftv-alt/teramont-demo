/* Заводская аналитика из копии вырезана, но код страницы обращается
   к её объекту напрямую и без него падает. Ставим пустышку: любой вызов
   принимается и ничего не делает. */
window.sensors = new Proxy(function () {}, {
  get: function () { return window.sensors },
  apply: function () { return undefined },
  construct: function () { return window.sensors },
});

/* Роутер приложения смотрит на адрес страницы: на `/tiguanlepro/index.html`
   он не находит маршрута и уходит в свою страницу ошибки. Подменяем адрес
   до того, как приложение стартует, — файл тот же, путь ожидаемый. */
(function () {
  if (/\/index\.html$/.test(location.pathname)) {
    history.replaceState(null, '', location.pathname.replace(/index\.html$/, '') + location.search + location.hash);
  }
})();

/* Копия страницы берёт содержимое из соседних файлов, а не с завода.
   Приложение ходит за ним через axios, то есть через XMLHttpRequest, —
   здесь мы подменяем адрес запроса на локальный json. Ответ уходит в
   приложение как есть: формат тот же, что отдаёт завод. */
(function () {
  var КАРТА = [
    [/\/rest\/portal-cms-adapter\/cms\/getData\/([^/]+)\/(?:prd|dev)\/(?:mo|app)/, '/tiguanlepro/api/$1.json'],
    [/\/rest\/portal-integration\/config\/getSeriesList.*/, '/tiguanlepro/api/getSeriesList.json'],
    // Подбор дилера в копии не работает: это заводской сервис с чужого
    // хоста, к нему браузер и не пустит. Отдаём пустой ответ, чтобы
    // страница не спотыкалась об ошибку сети.
    [/\/rest\/portal-integration\/district\/children.*/, '/tiguanlepro/api/district-children.json'],
    [/\/rest\/portal-integration\/district\/searchDealers.*/, '/tiguanlepro/api/dealers.json'],
  ];
  var открыть = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (метод, адрес) {
    if (typeof адрес === 'string') {
      for (var i = 0; i < КАРТА.length; i++) {
        var m = адрес.match(КАРТА[i][0]);
        if (m) {
          адрес = КАРТА[i][1].replace('$1', m[1] || '');
          arguments[1] = адрес;
          arguments[0] = 'GET';
          break;
        }
      }
    }
    return открыть.apply(this, arguments);
  };
})();
