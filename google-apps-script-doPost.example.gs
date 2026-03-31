/**
 * Copia este doPost en tu proyecto de Google Apps Script (editor.appscript.google.com).
 * El orden de appendRow DEBE coincidir con las columnas de tu hoja, de izquierda a derecha:
 *
 * A createdAt | B nombre | C correo | D whatsapp | E profesion | F ciudad | G nivelExperiencia | H source
 *
 * Si cambias el orden en la hoja, ajusta el array en appendRow en el mismo orden.
 */
var SPREADSHEET_ID = 'TU_ID_DE_LA_HOJA';
var SHEET_NAME = 'formulariofitv';

function doPost(e) {
  var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheets()[0];
  }

  // Algunos POST desde el navegador rellenan bien e.parameter; si falla, parseamos el cuerpo.
  var p = e.parameter || {};
  if ((!p.nombre && !p.correo) && e.postData && e.postData.contents) {
    p = parseFormUrlEncoded_(e.postData.contents);
  }

  sheet.appendRow([
    p.createdAt || new Date().toISOString(),
    p.nombre || '',
    p.correo || '',
    p.whatsapp || '',
    p.profesion || '',
    p.ciudad || '',
    p.nivelExperiencia || '',
    p.source || '',
  ]);

  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

/** Parse application/x-www-form-urlencoded (UTF-8) */
function parseFormUrlEncoded_(body) {
  var out = {};
  var pairs = body.split('&');
  for (var i = 0; i < pairs.length; i++) {
    var idx = pairs[i].indexOf('=');
    if (idx === -1) continue;
    var key = decodeURIComponent(pairs[i].substring(0, idx).replace(/\+/g, ' '));
    var val = decodeURIComponent(pairs[i].substring(idx + 1).replace(/\+/g, ' '));
    out[key] = val;
  }
  return out;
}
