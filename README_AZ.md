# GameVerse — Embed-ready update

## Nələr dəyişdi?
- Oyun kartına basanda başqa sayta dərhal keçmək əvəzinə GameVerse daxilində player pəncərəsi açılır.
- Oyun sahibinin icazə verdiyi birbaşa HTTPS embed ünvanı əlavə edilərsə, iframe player onu yükləməyə çalışır.
- İcazəli embed ünvanı yoxdursa, aydın xəbərdarlıq və rəsmi oyun səhifəsini açmaq üçün düymə göstərilir.
- Iframe boş qalarsa, saytın embed girişini bloklaya biləcəyi barədə xəbərdarlıq görünür.

## Vacib məhdudiyyət
Yandex Games və Poki-nin adi ana səhifəsi və ya oyun səhifəsi avtomatik olaraq embed URL sayılmır. CSP, X-Frame-Options, lisenziya və platforma qaydaları iframe-i bloklaya bilər. Sayt bu məhdudiyyətləri keçə bilməz.

Nümunə kataloqda `embedUrl: null` qəsdən saxlanılıb: konkret üçüncü tərəf oyunu üçün təsdiqlənmiş ictimai embed URL-si yoxlanmayıb. Yalnız oyun sahibi/platforma icazə verdikdə `embedUrl` əlavə et.

## İcazəli embed URL əlavə etmək
`app.js` faylında uyğun oyun obyektində `embedUrl` dəyərini oyun sahibinin verdiyi birbaşa HTTPS embed ünvanı ilə dəyiş. `url` rəsmi oyun səhifəsi olaraq qalır.

Nümunə (uydurma ünvan):
```js
{
  name: "Example",
  source: "Publisher",
  url: "https://publisher.example/game",
  embedUrl: "https://publisher.example/approved-embed"
}
```

## Android telefonundan yeniləmək
1. ZIP faylını yüklə və çıxart.
2. GitHub-da mövcud GameVerse repozitoriyanı aç.
3. `Add file` → `Upload files` seç.
4. ZIP-in içindəki faylları repozitoriyanın əsas qovluğuna yüklə və köhnə faylları əvəz et: `index.html`, `styles.css`, `app.js`, `manifest.webmanifest`, `sw.js`, `README_AZ.md`.
5. `Commit changes` bas.
6. GitHub Pages avtomatik yenilənəcək; sonra saytı yenilə.

## Rəsmi sənədlər
- Yandex Games SDK: https://yandex.com/dev/games/doc/en/sdk
- Poki Developer SDK: https://developers.poki.com/guide/sdk-html5

Bu SDK-lar oyun yaradıcıları üçündür; bütün platforma oyunlarını üçüncü tərəf saytında göstərən universal embed API deyil.
