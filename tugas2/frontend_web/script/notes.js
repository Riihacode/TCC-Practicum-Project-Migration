// const token = localStorage.getItem("token");
// const BASE_URL = "http://localhost:5000";
//const BASE_URL = "https://backend-api-136536138076.us-central1.run.app";
// const BASE_URL = "https://backend-api-prak-tcc-task6-136536138076.us-central1.run.app";

// Tampilkan Semua Notes
function fetchNotes() {
    // fetch(`${BASE_URL}/notes`, {
    //     method: "GET",
    //     headers: { "Authorization": `Bearer ${token}` },
    // })
    authorizedFetch(`${BASE_URL}/notes`)
    .then(response => response.json())
    .then(data => {
        console.log("Response dari API /notes:", data); // Debug response API

        let notesContainer = document.getElementById("notesContainer");
        notesContainer.innerHTML = "";

        let notes = data.data;  // Ambil array dari `data.data`

        if (Array.isArray(notes)) {  // Pastikan ini adalah array sebelum `forEach()`
            notes.forEach(note => {
                notesContainer.innerHTML += `
                    <div class="note-card">
                        <h3>${note.title}</h3>
                        <p>${note.content}</p>
                        <div class="button-container">
                            <a href="edit.html?id=${note.id}" class="edit-button">Edit</a>
                            <button class="delete-button" onclick="deleteNote('${note.id}')">Hapus</button>
                        </div>
                    </div>
                `;
            });
        } else {
            console.error("Data bukan array:", notes);
        }
    })
    .catch(error => console.error("Error:", error));
}

// Tambah Notes
function addNote() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    // fetch(`${BASE_URL}/notes`, {
    authorizedFetch(`${BASE_URL}/notes`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json"
            // "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title, content }),
    })
    .then(() => fetchNotes());
}

// Hapus Notes
function deleteNote(id) {
    // fetch(`${BASE_URL}/notes/${id}`, {
    //     method: "DELETE",
    //     headers: { "Authorization": `Bearer ${token}` },
    // })
    // .then(() => fetchNotes());
    authorizedFetch(`${BASE_URL}/notes/${id}`, {
        method: "DELETE"
    }).then(() => fetchNotes());
}

// Logout
function logout() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}

fetchNotes();