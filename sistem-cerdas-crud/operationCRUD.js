/**
 * Author: Yoga Dwi Prasetyo
 * License: Apache-2.0 License
 * Source Code: https://github.com/himti-divisi-iptek/himti-divisi-iptek.github.io/tree/main/sistem-cerdas-crud
 */

// Variable Global FORM
const form = document.getElementById("form");
const titleForm = document.getElementById("title-form");
const buttonForm = document.getElementById("btn_cu");

// Variable Global ALERT
const alertWarning = document.getElementById("a-warning");
const alertSuccess = document.getElementById("a-success");

// Variable Global TABLE
const sectionTable = document.getElementById("section-table");
const captionTable = document.getElementById("caption-table");
const tableBody = document.getElementsByTagName("tbody")[0];
const dataInTable = document.getElementsByClassName("data");

// daftar property yang ada di data objek.
const propertyObj = ["npm", "nama", "email", "universitas", "jurusan", "ipk"];

// tempat penyimpanan seluruh data
const dataStore = [
  {
    npm: "197064516017",
    nama: "Yoga",
    email: "yoga@gmail.com",
    universitas: "Universitas Nasional",
    jurusan: "Informatika",
    ipk: "3.95",
  },
  {
    npm: "177064516100",
    nama: "Mawar",
    email: "mawar@gmail.com",
    universitas: "Universitas Indonesia",
    jurusan: "Ilmu Komunikasi",
    ipk: "3.85",
  },
  {
    npm: "187064516112",
    nama: "Indah",
    email: "indah@gmail.com",
    universitas: "Universitas Tri Sakti",
    jurusan: "Hukum",
    ipk: "3.88",
  },
];

// tempat penyimpanan satu data
let data = {};

// Run Function to read all data.
readData(dataStore);

// ====================================== SUPPORT FUNCTION =======================================

/**
 * Kosongkan objek penyimpanan satu data.
 * untuk menyimpan data yang lain.
 */
function resetObjData() {
  data = {};
}

/**
 * Menyembunyikan seluruh element alert
 */
function hideAllAlert() {
  const action = "none";
  handlingContent(alertWarning, action);
  handlingContent(alertSuccess, action);
}

/**
 * Tampil atau sembunyi-kan element alert.
 *
 * @param object alertElem
 * @param string msgAlert
 * @param string action default is "block".
 */
function handlingAlert(alertElem, msgAlert, action = "block") {
  setText(alertElem, msgAlert);
  handlingContent(alertElem, action);
}

/**
 * Tampil atau sembunyi-kan element html.
 *
 * @param object element
 * @param string action "block" | "none"
 */
function handlingContent(element, action) {
  element.style.display = action;
}

/**
 * Memberikan text ke element html.
 *
 * @param object element
 * @param string text
 */
function setText(element, text = "") {
  element.innerText = text;
}

/**
 * Membuat data objek baru dari value form.
 *
 * @param object elements
 */
function makeDataObj(elements) {
  for (let i = 0; i < elements.length - 1; i++) {
    data[elements[i].name] = elements[i].value;
  }
}

/**
 * Menghapus history input form.
 */
function removeHistoryInput() {
  for (let i = 0; i < form.length - 1; i++) {
    form[i].value = "";
  }
}

/**
 * Mengecek apakah isi penyimpanan data kosong.
 *
 * @returns boolean
 */
function isDataStoreEmpty() {
  return dataStore.length === 0;
}

/**
 * Pengecekan input value,
 * jika value ada yang kosong, return true,
 * jika value terisi semua, return false.
 *
 * @returns boolean
 */
function isInputEmpty() {
  let isEmpty = false;
  for (let i = 0; i < form.length - 1; i++) {
    if (form[i].value === "") {
      isEmpty = true;
      break;
    }
  }

  return isEmpty;
}

/**
 * Mengambil sebuah data mahasiswa yang ingin diupdate.
 *
 * @param integer indexUser
 */
function getOldValue(indexUser) {
  for (let i = 0; i < form.length - 1; i++) {
    form[i].value = dataStore[indexUser][propertyObj[i]];
  }
}

/**
 * Memperbarui satu data mahasiswa.
 *
 * @param integer indexUser
 */
function savingUpdate(indexUser) {
  for (let i = 0; i < form.length - 1; i++) {
    dataStore[indexUser][propertyObj[i]] = form[i].value;
  }
}

// ====================================== CRUD FUNCTION ============================================

/**
 * Membuat data baru dan menyimpannya.
 *
 * @param array dataStoreParams
 */
function create(dataStoreParams) {
  hideAllAlert();
  removeHistoryInput();

  handlingContent(sectionTable, "none");
  handlingContent(form, "block");

  setText(buttonForm, "Membuat Data");
  setText(titleForm, "Membuat data mahasiswa");

  // Ketika button diklik, membuat data baru atau tampilkan alert.
  buttonForm.onclick = function () {
    if (isInputEmpty()) {
      const message = "Form tidak boleh kosong!";
      handlingAlert(alertWarning, message);
      return;
    }

    // Membuat new data object.
    makeDataObj(form);

    // Menyimpan data.
    dataStoreParams.push(data);

    resetObjData();
    removeHistoryInput();

    // tampilkan data dan alert success.
    readData(dataStoreParams);
    handlingAlert(alertSuccess, "Data berhasil dibuat!");
  };

  handlingContent(alertWarning, "none");
}

/**
 * Membaca seluruh data dari penyimpanan.
 *
 * @param array dataStoreParams
 * @returns void
 */
function read(dataStoreParams) {
  handlingContent(form, "none");
  setText(captionTable);

  // jika data store empty tampilkan alert warning
  // dan sembunyikan bagian tabel.
  if (isDataStoreEmpty()) {
    const message = "Data belum ada! Silahkan membuatnya.";
    handlingAlert(alertWarning, message);
    handlingContent(sectionTable, "none");
    return;
  }

  // Elements untuk table row.
  const openTableRow = '<tr class="data">';
  const closeTableRow = "</tr>";

  // Elements untuk table head.
  const openTableHead = '<th scope="row">';
  const closeTableHead = "</th>";

  // Elements untuk table data.
  const openTableData = "<td>";
  const closeTableData = "</td>";

  // Penggabungan seluruh element table, seperti tr, th, dan td.
  let allElementsTable = "";

  for (let index in dataStoreParams) {
    // mengubah awal data menjadi 1.
    let nomerData = parseInt(index) + 1;

    // Penggabungan element tr dan th
    allElementsTable += openTableRow;
    allElementsTable += `${openTableHead}${nomerData}${closeTableHead}`;

    // Looping satu data pada index tertentu.
    // Penggabungan element td ke tr dan th.
    for (let key in dataStoreParams[index]) {
      let valueData = dataStoreParams[index][key];
      allElementsTable += `${openTableData}${valueData}${closeTableData}`;
    }

    // Menggabung seluruh element tr, th, dan td.
    allElementsTable += closeTableRow;
  }

  // tempelkan semua element table ke table body.
  tableBody.innerHTML = allElementsTable;

  handlingContent(sectionTable, "block");
}

/**
 * Memperbarui spesifik suatu data di penyimpaan.
 *
 * @param array dataStoreParams
 */
function updated(dataStoreParams) {
  hideAllAlert();
  readData(dataStoreParams);
  setText(captionTable, "Klik data untuk memperbarui!");

  for (let i = 0; i < dataInTable.length; i++) {
    // Ketika salah satu data diklik,
    // tampilkan form dan value dari data yang dipilih.
    dataInTable[i].onclick = function () {
      // ambil index dari data yang ingin diupdate.
      const indexUser = parseInt(dataInTable[i].firstChild.innerText) - 1;

      handlingContent(sectionTable, "none");
      handlingContent(form, "block");

      setText(buttonForm, "Memperbarui Data");
      setText(titleForm, "Memperbarui data mahasiswa");

      getOldValue(indexUser);

      // Melakukan update data atau menampilkan alert warning.
      buttonForm.onclick = function () {
        if (isInputEmpty()) {
          const message = "Form tidak boleh kosong!";
          handlingAlert(alertWarning, message);
          return;
        }

        // Simpan data baru.
        savingUpdate(indexUser);

        const message = "Data berhasil diperbarui!";
        handlingAlert(alertSuccess, message);

        removeHistoryInput();

        // Menampilkan data yang sudah di-update.
        readData(dataStoreParams);
      };
    };
  }
}

/**
 * Menghapus spesifik suatu data, dari penyimpanan.
 *
 * @param array dataStoreParams
 */
function deleted(dataStoreParams) {
  hideAllAlert();
  readData(dataStoreParams);
  setText(captionTable, "Klik data untuk menghapus!");

  for (let i = 0; i < dataInTable.length; i++) {
    // Ketika salah satu data diklik, tampilkan confirm penghapusan.
    dataInTable[i].onclick = function () {
      // Jika batal, tetap di penghapusan action.
      const answer = confirm("Hapus data ?");
      if (answer !== true) {
        deleteData(dataStoreParams);
        return;
      }

      // ambil index data yang ingin dihapus.
      const userIndex = parseInt(dataInTable[i].firstChild.innerText) - 1;

      // melakukan penghapusan data dari penyimpanan.
      dataStoreParams.splice(userIndex, 1);

      handlingAlert(alertSuccess, "Data berhasil dihapus!");
      readData(dataStoreParams);
    };
  }
}
