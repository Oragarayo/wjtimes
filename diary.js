// Replace this with your Firebase configuration object
const firebaseConfig = {
    apiKey: "your_api_key",
    authDomain: "your_auth_domain",
    projectId: "your_project_id",
    storageBucket: "your_storage_bucket",
    messagingSenderId: "your_messaging_sender_id",
    appId: "your_app_id",
    databaseURL: "your_database_url"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function toggleDiaryForm() {
    const diaryForm = document.getElementById('diaryForm');
    // Toggle form visibility
    diaryForm.style.display = diaryForm.style.display === 'none' || diaryForm.style.display === '' ? 'block' : 'none';
}

function saveEntry() {
    const title = document.getElementById("diaryTitle").value;
    const content = document.getElementById("diaryEntry").value;
    const timestamp = new Date().toLocaleString();

    if (title && content) {
        const entry = { title, content, timestamp };

        // Save entry to Firebase
        firebase.database().ref('entries/').push(entry);

        // Clear the form and refresh entries
        document.getElementById("diaryTitle").value = "";
        document.getElementById("diaryEntry").value = "";
        document.getElementById("diaryForm").style.display = 'none';
        displayEntries();
    }
}

function displayEntries() {
    const diaryEntries = document.getElementById('diaryEntries');
    diaryEntries.innerHTML = '<h2>Diary Entries</h2>';

    firebase.database().ref('entries/').once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const entry = childSnapshot.val();
            const div = document.createElement('div');
            div.classList.add('entry');
            div.innerHTML = `
                <h3>${entry.title}</h3>
                <p>${entry.content.replace(/\n/g, '<br>')}</p>
                <small><i>${entry.timestamp}</i></small>
            `;
            diaryEntries.appendChild(div);
        });
    });
}

function deleteEntry(index) {
    const entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
    entries.splice(index, 1);
    localStorage.setItem('diaryEntries', JSON.stringify(entries));
    displayEntries();
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('saveEntryBtn').addEventListener('click', saveEntry);
    displayEntries(); // Display stored entries when the page loads
});