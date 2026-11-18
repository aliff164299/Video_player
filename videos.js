/* ===== ADD YOUR VIDEOS HERE =====
   Paste the YouTube video ID (the part after youtu.be/ or v=, before the ?).
   Thumbnails and titles load automatically. */
var VIDEOS = [
  { id: '4Bgg4P-xnHY', title: 'WWE' },
  { id: 'Foo68FWpv24', title: 'Beast in the East' }
];

var PLAY_SVG = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';

function thumb(id) {
  return "url('https://i.ytimg.com/vi/" + id + "/maxresdefault.jpg'),url('https://i.ytimg.com/vi/" + id + "/hqdefault.jpg')";
}
function ytUrl(id) { return 'https://www.youtube.com/watch?v=' + id; }
function pageUrl(id) { return 'watch.html?v=' + encodeURIComponent(id); }

function cardHTML(v, badge) {
  return '<a class="card" href="' + pageUrl(v.id) + '" style="background-image:' + thumb(v.id) + '">' +
    (badge ? '<span class="new">' + badge + '</span>' : '') +
    '<div class="pi"><i>' + PLAY_SVG + '</i></div>' +
    '<div class="ttl" data-t="' + v.id + '">' + v.title + '</div></a>';
}

function addRow(container, title, inner) {
  var s = document.createElement('section');
  s.className = 'row';
  s.innerHTML = '<h2>' + title + '</h2><div class="track">' + inner + '</div>';
  container.appendChild(s);
}

/* Fetch real titles from YouTube, then call onTitle(video) for each */
function loadTitles(onTitle) {
  VIDEOS.forEach(function (v) {
    fetch('https://www.youtube.com/oembed?format=json&url=' + encodeURIComponent(ytUrl(v.id)))
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (!d.title) return;
        v.title = d.title;
        document.querySelectorAll('[data-t="' + v.id + '"]').forEach(function (el) { el.textContent = d.title; });
        if (onTitle) onTitle(v);
      })
      .catch(function () {});
  });
}

/* Header turns solid on scroll */
addEventListener('scroll', function () {
  var h = document.getElementById('hdr');
  if (h) h.classList.toggle('solid', scrollY > 60);
});
