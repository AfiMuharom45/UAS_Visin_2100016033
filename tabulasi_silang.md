# Proses Pembuatan tabulasi Silang 

## 1. Bagian a

Saya Pertama yang saya lakukan adalah mengimprot data kedalam Spreadsheet, Setalah data sudah diimport kedalam spreadsheet masuk pada bagian Ektensi kemudian masuk kebagian Apps Script Kemudian Beri nama file yang dibutuhkan kemuadian masukkan file code ini : 

function causeAndYear() { 
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Penyebab Kematian di Indonesia yang Dilaporkan - Clean');
  let numberRows = sheet.getLastRow();
  let numberCols = sheet.getLastColumn();

  let data = sheet.getRange(2, 1, numberRows-1, numberCols).getValues();

  // Get unique causes and years
  let causes = [];
  let years = [];
  for (let i = 0; i < data.length; i++) {
    let cause = data[i][0];
    let year = data[i][2];
    if (causes.indexOf(cause) == -1) causes.push(cause);
    if (years.indexOf(year) == -1) years.push(year);
  }
  
  // Sort years in ascending order
  years.sort((a, b) => a - b);

  // Create new sheet
  let newSheet = ss.insertSheet('Penyebab Kematian di Indonesia');
  newSheet.getRange('A1').setValue('Cause');
  for (let i = 0; i < years.length; i++) {
    newSheet.getRange(1, i + 2).setValue(years[i]);
  }

  // Calculate totals and add to sheet
  for (let i = 0; i < causes.length; i++) {
    let cause = causes[i];
    newSheet.getRange(i + 2, 1).setValue(cause);
    for (let j = 0; j < years.length; j++) {
      let year = years[j];
      let totalDeaths = 0;
      for (let k = 0; k < data.length; k++) {
        if (data[k][0] == cause && data[k][2] == year) {
          totalDeaths += Number(data[k][4]);
        }
      }
      newSheet.getRange(i + 2, j + 2).setValue(totalDeaths);
    }
  }
}

<h3> Mari kita jelaskan bagaimana fungsi ini bekerja langkah demi langkah: </h3>

1. Mendapatkan akses ke lembar kerja (spreadsheet) aktif dengan menggunakan SpreadsheetApp.getActiveSpreadsheet().
2. Mengambil lembar kerja dengan nama 'Penyebab Kematian di Indonesia yang Dilaporkan - Clean' menggunakan ss.getSheetByName().
3. Mendapatkan jumlah baris dan kolom dari lembar kerja tersebut dengan getLastRow() dan getLastColumn().
4. Mengambil data dari lembar kerja, mengabaikan baris header, dan menyimpannya dalam bentuk array dua dimensi data menggunakan getRange().getValues(). Data ini berisi informasi tentang penyebab kematian, tahun, dan lain-lain.
5. Mendapatkan daftar penyebab unik dan daftar tahun unik dari data, dan menyimpannya dalam array causes dan years.
6. Mengurutkan tahun-tahun dalam array years secara berurutan dari kecil ke besar.
7. Membuat lembar kerja baru dengan nama 'Penyebab Kematian di Indonesia' menggunakan ss.insertSheet(). Lembar kerja baru ini akan digunakan untuk menampilkan data yang telah diproses.
8. Menempatkan label "Cause" pada sel 'A1' di lembar kerja baru menggunakan newSheet.getRange('A1').setValue('Cause').
9. Memasukkan tahun-tahun unik ke dalam baris pertama lembar kerja baru menggunakan loop for.
10. Menghitung jumlah total kematian untuk setiap penyebab pada setiap tahun dan memasukkan hasilnya ke dalam sel-sel yang sesuai di lembar kerja baru.

<h3> Struktur data yang digunakan dalam kode ini adalah sebagai berikut: </h3>

- data: Array dua dimensi yang berisi data dari lembar kerja asli. Setiap baris mewakili satu rekaman dengan informasi tentang penyebab kematian dan data lainnya.
- causes: Array yang menyimpan daftar penyebab kematian unik yang diekstraksi dari data.
- years: Array yang menyimpan daftar tahun unik yang diekstraksi dari data.

<h3> Jika code sudah dimasukkan kedalam apps Javascript kemudian tinggal jalankan. </h3>


# 1. Bagian b

Saya melakakan tabulasi pada nomer 1 bagian b hampir sama melakukannya dengan 1 bagian a, hanya beda menggunakan code, Ini adalah code pada no 1 bagian b :

function typeAndYear() {
  let ss = SpreadsheetApp.getActive();
  let sheet = ss.getSheetByName('Penyebab Kematian di Indonesia yang Dilaporkan - Clean');
  let numberRows = sheet.getDataRange().getNumRows();
  let numberCols = sheet.getLastColumn();

  let data = sheet.getRange(2, 1, numberRows - 1, numberCols).getValues();

  // Get unique years and types
  let years = [];
  let types = [];
  for (let i = 0; i < data.length; i++) {
    let year = data[i][2];
    let type = data[i][1];
    if (years.indexOf(year) == -1) years.push(year);
    if (types.indexOf(type) == -1) types.push(type);
  }

  // Sort years in ascending order
  years.sort((a, b) => a - b);

  // Create new sheet
  let newSheet = ss.insertSheet('Kematian Berdasarkan Tahun dan Tipe');
  newSheet.getRange('A1').setValue('Type');
  for (let i = 0; i < years.length; i++) {
    newSheet.getRange(1, i + 2).setValue(years[i]);
  }

  // Calculate totals and add to sheet
  for (let i = 0; i < types.length; i++) {
    let type = types[i];
    newSheet.getRange(i + 2, 1).setValue(type);
    for (let j = 0; j < years.length; j++) {
      let year = years[j];
      let totalDeaths = 0;
      for (let k = 0; k < data.length; k++) {
        if (data[k][2] == year && data[k][1] == type) {
          totalDeaths += Number(data[k][4]);
        }
      }
      newSheet.getRange(i + 2, j + 2).setValue(totalDeaths);
    }
  }
}

<h3> Mari kita jelaskan cara kerja fungsi ini langkah demi langkah: </h3>

1. Mendapatkan akses ke lembar kerja (spreadsheet) aktif dengan menggunakan SpreadsheetApp.getActive().
2. Mengambil lembar kerja dengan nama 'Penyebab Kematian di Indonesia yang Dilaporkan - Clean' menggunakan ss.getSheetByName().
3. Menghitung jumlah baris dan kolom dari lembar kerja tersebut dengan getDataRange().getNumRows() dan getLastColumn().
4. Mengambil data dari lembar kerja, mengabaikan baris header, dan menyimpannya dalam bentuk array dua dimensi data menggunakan getRange().getValues(). Data ini berisi informasi tentang tipe (jenis) kematian, tahun, dan lain-lain.
5. Mendapatkan daftar tahun unik dan daftar tipe unik dari data, dan menyimpannya dalam array years dan types.
6. Mengurutkan tahun-tahun dalam array years secara berurutan dari kecil ke besar.
7. Membuat lembar kerja baru dengan nama 'Kematian Berdasarkan Tahun dan Tipe' menggunakan ss.insertSheet(). Lembar kerja baru ini akan digunakan untuk menampilkan data yang telah diproses.
8. Menempatkan label "Type" pada sel 'A1' di lembar kerja baru menggunakan newSheet.getRange('A1').setValue('Type').
9. Memasukkan tahun-tahun unik ke dalam baris pertama lembar kerja baru menggunakan loop for.
10. Menghitung jumlah total kematian untuk setiap tipe pada setiap tahun dan memasukkan hasilnya ke dalam sel-sel yang sesuai di lembar kerja baru.

<h3> Struktur data yang digunakan dalam kode ini adalah sebagai berikut: </h3>

- data: Array dua dimensi yang berisi data dari lembar kerja asli. Setiap baris mewakili satu rekaman dengan informasi tentang tipe kematian, tahun, dan data lainnya.
- years: Array yang menyimpan daftar tahun unik yang diekstraksi dari data.
- types: Array yang menyimpan daftar tipe kematian unik yang diekstraksi dari data.

<h3> Setelah code sudah dimasukan ditinggal jalankan.</h3>