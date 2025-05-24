const BASE_URL = "http://localhost:5000";

function getAccessToken() {
    return localStorage.getItem("accessToken");
}

function getRefreshToken() {
    return localStorage.getItem("refreshToken");
}

function saveAccessToken(token) {
    localStorage.setItem("accessToken", token);
}

function clearTokens() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
}

// Fungsi fetch dengan auto refresh token
async function authorizedFetch(url, options = {}) {
    let accessToken = getAccessToken();

    let response = await fetch(url, {
        ...options,
        headers: {
            ...(options.headers || {}),
            Authorization: `Bearer ${accessToken}`
        }
    });

    // Jika token expired (401), coba refresh
    if (response.status === 401) {
        const refreshToken = getRefreshToken();

        const refreshRes = await fetch(`${BASE_URL}/token`, {
            method: "GET",
            headers: { Authorization: `Bearer ${refreshToken}` }
        });

        if (refreshRes.ok) {
            const data = await refreshRes.json();
            saveAccessToken(data.accessToken);

            // Ulangi request yang gagal
            return authorizedFetch(url, options);
        } else {
            clearTokens();
            alert("Session expired. Silakan login ulang.");
            window.location.href = "index.html";
            throw new Error("Refresh token invalid");
        }
    }

    return response;
}
