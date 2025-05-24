const BASE_URL = "http://localhost:5000";
//const BASE_URL = "https://backend-api-136536138076.us-central1.run.app";
// const BASE_URL = "https://backend-api-prak-tcc-task6-136536138076.us-central1.run.app";

// Register
document.getElementById("registerForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
    })
    .then(response => response.json())
    .then(data => {
        alert("Registrasi Berhasil! Silakan Login.");
        window.location.href = "index.html";
    })
    .catch(error => console.error("Error:", error));
});

// Login
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log("Mengirim data login:", { email, password }); // Debug: Cek data login

    fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    })
    .then(response => {
        console.log("Response Status:", response.status); // Debug: Cek status response
        return response.json();
    })
    .then(data => {
        console.log("Response Status:", data.status);
        console.log("Response dari server:", data);

        // Periksa apakah token tersedia di dalam `data.data.token`
        if (data.status === "success") {
            // localStorage.setItem("token", data.data.token);
            localStorage.setItem("accessToken", data.data.accessToken); // ubah jadi accessToken
            localStorage.setItem("refreshToken", data.data.refreshToken); // tambahkan ini
            alert("Login Berhasil!");
            window.location.href = "dashboard.html"; // Redirect ke halaman notes
        } else {
            alert("Login gagal! Cek email & password.");
        }
    })
    .catch(error => console.error("Error:", error));
});
