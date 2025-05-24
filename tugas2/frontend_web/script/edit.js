// const BASE_URL = "http://localhost:5000";
//const BASE_URL = "https://backend-api-136536138076.us-central1.run.app";
// const BASE_URL = "https://backend-api-prak-tcc-task6-136536138076.us-central1.run.app";
// const token = localStorage.getItem("token");

// Ambil parameter ID dari URL
const urlParams = new URLSearchParams(window.location.search);
const noteId = urlParams.get("id");

// Jika tidak ada ID, kembali ke dashboard
if (!noteId) {
    window.location.href = "dashboard.html";
}

// Ambil data catatan berdasarkan ID langsung dari API
// fetch(`${BASE_URL}/notes/${noteId}`, {
//     method: "GET",
//     headers: { "Authorization": `Bearer ${token}` }
// })
authorizedFetch(`${BASE_URL}/notes/${noteId}`)
.then(response => response.json())
.then(responseData => { // Ubah nama variabel agar tidak tertukar
    console.log("Response dari API /notes/{id}:", responseData); // Debugging response API

    if (!responseData.data || !responseData.data.id) {
        alert("Catatan tidak ditemukan!");
        window.location.href = "dashboard.html";
        return;
    }

    let note = responseData.data; // Ambil objek `data` dari `responseData.data`

    // Isi form dengan data yang ditemukan
    document.getElementById("noteId").value = note.id;
    document.getElementById("title").value = note.title;
    document.getElementById("content").value = note.content;
})
.catch(error => {
    console.error("Error:", error);
    alert("Terjadi kesalahan saat mengambil data catatan!");
});

// Fungsi untuk menyimpan perubahan
function updateNote() {
    const id = document.getElementById("noteId").value;
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    if (!id) {
        alert("ID catatan tidak ditemukan!");
        return;
    }

    console.log(`Mengirim update untuk ID: ${id}`); // Debugging

    // fetch(`${BASE_URL}/notes/${id}`, {
    authorizedFetch(`${BASE_URL}/notes/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
            // "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title, content }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Catatan diperbarui:", data);
        alert("Catatan berhasil diperbarui!");
        window.location.href = "dashboard.html"; // Kembali ke halaman utama
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Terjadi kesalahan saat memperbarui catatan!");
    });
}

function cancelEdit() {
    window.location.href = "dashboard.html";
}