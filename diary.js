function toggleDiaryForm() {
    const diaryForm = document.getElementById('diaryForm');
    // Toggle form visibility
    diaryForm.style.display = diaryForm.style.display === 'none' || diaryForm.style.display === '' ? 'block' : 'none';
}

function saveEntry() {
    const title = document.getElementById("diaryTitle").value;
    const content = document.getElementById("diaryContent").value;
    const timestamp = new Date().toLocaleString();

    if (title && content) {
        // Replace newlines for display
        const formattedContent = content.replace(/\n/g, "<br>");

        // Save to localStorage
        const entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
        entries.push({ title, content: formattedContent, timestamp });
        localStorage.setItem('diaryEntries', JSON.stringify(entries));

        // Display the updated list
        displayEntries();

        // Clear input fields and hide the form
        document.getElementById("diaryTitle").value = "";
        document.getElementById("diaryContent").value = "";
        document.getElementById("diaryForm").style.display = "none";
    }
}

function displayEntries() {
    const entriesContainer = document.getElementById('diaryEntries');
    entriesContainer.innerHTML = '<h2>Diary Entries</h2>'; // Reset contents

    const entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
    entries.forEach((entry, index) => {
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('entry');
        entryDiv.innerHTML = `
            <h3 class="entry-title">${entry.title}</h3>
            <p class="entry-content">${entry.content}</p>
            <small class="entry-timestamp">Written on: ${entry.timestamp}</small>
            <button onclick="deleteEntry(${index})" class="delete-btn">
                <i class="fas fa-trash-alt"></i>
            </button>
        `;
        entriesContainer.appendChild(entryDiv);
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
