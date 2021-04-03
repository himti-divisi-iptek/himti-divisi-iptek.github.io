// CRUD

// Deklarasi variabel global
const form = document.getElementById("form");
const titleForm = document.getElementById("title-form");
const sectionTable = document.getElementById("section-table");
const captionTable = document.getElementById("caption-table");
const buttonForm = document.getElementById("btn_cu");
const alertWarning = document.getElementById("a-warning");
const alertSuccess = document.getElementById("a-success");
const tableBody = document.getElementsByTagName("tbody")[0];
const dataInTable = document.getElementsByClassName("data");

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
    universitas: "Universitas Nasional",
    jurusan: "Ilmu Komunikasi",
    ipk: "3.85",
  },
  {
    npm: "187064516112",
    nama: "Indah",
    email: "indah@gmail.com",
    universitas: "Universitas Nasional",
    jurusan: "Hukum",
    ipk: "3.88",
  },
];

// tempat penyimpanan satu data
let data = {};

// Run function Read all data.
readData(dataStore);

// Hide all alert
function hideAllAlert() {
  const action = "none";
  handlingContent(alertWarning, action);
  handlingContent(alertSuccess, action);
}

// handling alert warning and success
function handlingAlert(alertElem, msgAlert, action = "block") {
  setText(alertElem, msgAlert);
  handlingContent(alertElem, action);
  return;
}

// handling content show & hide
function handlingContent(element, action) {
  element.style.display = action;
}

// set text button form
function setText(element, text = "") {
  element.innerText = text;
}

// mengambil value dari form
// dan set kedalam object variable data.
function setValue(elements) {
  for (let i = 0; i < elements.length - 1; i++) {
    data[elements[i].name] = elements[i].value;
  }
}

// menghapus property object jika value kosong.
function valueIsEmptyDeleted(obj) {
  for (let key in obj) {
    let isValueEmpty = obj[key] === "";
    if (isValueEmpty) {
      delete obj[key];
    }
  }
}

// mengecek value form kosong,
// kalau kosong "alert bahwa form tidak boleh kosong".
function isValueFormAvailable(obj) {
  // check value property object data
  valueIsEmptyDeleted(obj);

  // daftar key yang ada di data.
  const keyData = ["npm", "nama", "email", "universitas", "jurusan", "ipk"];

  // di cek apakah propertynya lengkap.
  let result = false;
  for (let i = 0; i < keyData.length; i++) {
    result = obj.hasOwnProperty(keyData[i]);
    if (!result) {
      break;
    }
  }

  // hasil cek property objek.
  return result;
}

// hapus history input form create
function removeHistoryInput() {
  for (let i = 0; i < form.length - 1; i++) {
    form[i].value = "";
  }
}

// check total data yang disimpan
function isDataStoreEmpty() {
  return dataStore.length === 0;
}

// get old data value.
function getOldValue(indexUser, keyDataParams) {
  // ambil semua data dari satu user.
  for (let i = 0; i < form.length - 1; i++) {
    form[i].value = dataStore[indexUser][keyDataParams[i]];
  }
}

// set old data value.
function setNewValue(indexUser, keyDataParams) {
  // ambil semua data dari satu user.
  for (let i = 0; i < form.length - 1; i++) {
    dataStore[indexUser][keyDataParams[i]] = form[i].value;
  }
}

// membuat data
function createData(dataStoreParams) {
  // tutup bagian tabel dan tampilkan bagian form
  hideAllAlert();
  removeHistoryInput();
  handlingContent(sectionTable, "none");
  handlingContent(form, "block");

  // set text button form and title form
  setText(buttonForm, "Create");
  setText(titleForm, "Membuat data mahasiswa");

  // ketika button diklik, buat data
  buttonForm.onclick = function () {
    setValue(form);

    // jika Object mempunyai property lengkap, object disimpan
    if (!isValueFormAvailable(data)) {
      const message = "Form tidak boleh kosong!";
      handlingAlert(alertWarning, message);
      return;
    }

    // data form disimpan ke array.
    dataStoreParams.push(data);

    // kosongkan input value.
    removeHistoryInput();

    // tampilkan data.
    readData(dataStoreParams);
  };

  // tutup alert warning.
  handlingContent(alertWarning, "none");
}

// membaca data
function readData(dataStoreParams) {
  // tutup semua form dan ubah caption table
  // hideAllAlert();
  handlingContent(form, "none");
  setText(captionTable);

  // jika data store empty tampilkan alert warning.
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

  // Elements untuk table row.
  const openTableData = "<td>";
  const closeTableData = "</td>";

  // Seluruh element table, seperti tr, th, dan td.
  let allElementsTable = "";

  // Jika data store mempunyai data, tampilkan semuanya.
  // looping untuk membuat element baru.
  for (let index in dataStoreParams) {
    // mengubah awal data menjadi 1.
    let nomerData = parseInt(index) + 1;

    // gabung open element table row dan table head ke semua element tabel.
    allElementsTable += openTableRow;
    allElementsTable += `${openTableHead}${nomerData}${closeTableHead}`;

    // Looping untuk mengambil value.
    for (let key in dataStoreParams[index]) {
      // mengambil value dari dataStoreParams
      let valueData = dataStoreParams[index][key];

      // gabung table data ke table row.
      allElementsTable += `${openTableData}${valueData}${closeTableData}`;
    }

    // gabung semua element table row, head, dan data.
    allElementsTable += closeTableRow;
  }

  // tempelkan semua element table ke table body.
  tableBody.innerHTML = allElementsTable;

  // tampilkan data/table data
  handlingContent(sectionTable, "block");
}

// memperbarui data
function updateData(dataStoreParams) {
  // tampilkan data dan ubah text caption table.
  hideAllAlert();
  readData(dataStoreParams);
  setText(captionTable, "Klik data untuk memperbarui!");

  // looping semua data
  for (let i = 0; i < dataInTable.length; i++) {
    // ketika data yang dipilih diklik show form.
    dataInTable[i].onclick = function () {
      // ambil index dari data yang ingin diupdate.
      var indexUser = parseInt(dataInTable[i].firstChild.innerText) - 1;

      // hide bagin table dan tampilkan form.
      // set text untuk button form, menjadi update.
      handlingContent(sectionTable, "none");
      handlingContent(form, "block");
      setText(buttonForm, "Update");
      setText(titleForm, "Memperbarui data mahasiswa");

      // daftar key yang ada di data.
      const keyData = ["npm", "nama", "email", "universitas", "jurusan", "ipk"];

      // get old value.
      getOldValue(indexUser, keyData);

      buttonForm.onclick = function () {
        // set new value to dataStore
        setNewValue(indexUser, keyData);

        // jika data yang dipilih mempunyai property lengkap, data disimpan
        if (!isValueFormAvailable(dataStoreParams[indexUser])) {
          const message = "Form tidak boleh kosong!";
          handlingAlert(alertWarning, message);
          return;
        }

        // data diupdate
        const message = "Data berhasil diperbarui!";
        handlingAlert(alertSuccess, message);

        // kosongkan input value
        removeHistoryInput();

        // tampilkan data
        readData(dataStoreParams);
        // updateData(dataStoreParams);
      };
    };
  }
}

// menghapus data
function deleteData(dataStoreParams) {
  // tampilkan data dan ubah text caption table
  hideAllAlert();
  readData(dataStoreParams);
  setText(captionTable, "Klik data untuk menghapus!");

  // looping semua data
  for (let i = 0; i < dataInTable.length; i++) {
    // ketika data yang dipilih diklik, tampilkan confirm
    dataInTable[i].onclick = function () {
      const answer = confirm("Hapus data ?");
      // jika ok lakukan hapus data
      if (answer === true) {
        // ambil index data yang ingin dihapus.
        const userIndex = parseInt(dataInTable[i].firstChild.innerText) - 1;

        // melakukan penghapusan data dari penyimpanan.
        dataStoreParams.splice(userIndex, 1);
        dataInTable[i].remove();

        // Tampilkan alert success hapus data.
        handlingAlert(alertSuccess, "Data berhasil dihapus!");

        // jika isi data 0, hanya jalankan fungsi read data
        const isDataEmpty = dataStoreParams.length === 0;
        if (isDataEmpty) {
          const message = "Data belum ada! Silahkan buat terlebih dahulu.";
          handlingAlert(alertWarning, message);
        }

        readData(dataStoreParams);
        // deleteData(dataStoreParams);
      }
    };
  }
}
