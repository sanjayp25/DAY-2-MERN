// Initialize records array from localStorage
let records = JSON.parse(localStorage.getItem('crudRecords')) || [];
let editingId = null;

// Show alert message
function showAlert(message, type = 'success') {
    const alertDiv = document.getElementById('alert');
    if (alertDiv) {
        alertDiv.textContent = message;
        alertDiv.className = `alert show alert-${type}`;
        setTimeout(() => {
            alertDiv.classList.remove('show');
        }, 3000);
    }
}

// Save records to localStorage
function saveRecords() {
    localStorage.setItem('crudRecords', JSON.stringify(records));
}

// Display all records
function displayRecords() {
    const recordsList = document.getElementById('recordsList');
    if (!recordsList) return;
    
    if (records.length === 0) {
        recordsList.innerHTML = '<div class="empty-message">No records yet. Add one to get started!</div>';
        return;
    }

    recordsList.innerHTML = records.map(record => `
        <div class="record-item">
            <div class="record-content">
                <h3>${escapeHtml(record.name)}</h3>
                <p><strong>Email:</strong> ${escapeHtml(record.email)}</p>
                <p><strong>Message:</strong> ${escapeHtml(record.message)}</p>
            </div>
            <div class="record-actions">
                <button class="btn-edit" onclick="editRecord(${record.id})">Edit</button>
                <button class="btn-delete" onclick="deleteRecord(${record.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

// Add or Update record
function setupFormListener() {
    const form = document.getElementById('crudForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (editingId !== null) {
            // Update existing record
            const recordIndex = records.findIndex(r => r.id === editingId);
            if (recordIndex !== -1) {
                records[recordIndex] = { id: editingId, name, email, message };
                showAlert('Record updated successfully!', 'success');
                editingId = null;
                document.querySelector('.btn-add').textContent = 'Add Record';
            }
        } else {
            // Create new record
            const newRecord = {
                id: Date.now(),
                name,
                email,
                message
            };
            records.push(newRecord);
            showAlert('Record added successfully!', 'success');
        }

        saveRecords();
        displayRecords();
        clearForm();
    });
}

// Edit record
function editRecord(id) {
    const record = records.find(r => r.id === id);
    if (record) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        if (nameInput) nameInput.value = record.name;
        if (emailInput) emailInput.value = record.email;
        if (messageInput) messageInput.value = record.message;
        
        editingId = id;
        const btnAdd = document.querySelector('.btn-add');
        if (btnAdd) btnAdd.textContent = 'Update Record';
        if (nameInput) nameInput.focus();
        showAlert('Edit mode activated', 'info');
    }
}

// Delete record
function deleteRecord(id) {
    if (confirm('Are you sure you want to delete this record?')) {
        records = records.filter(r => r.id !== id);
        saveRecords();
        displayRecords();
        showAlert('Record deleted successfully!', 'success');
    }
}

// Clear form
function clearForm() {
    const form = document.getElementById('crudForm');
    if (form) form.reset();
    editingId = null;
    const btnAdd = document.querySelector('.btn-add');
    if (btnAdd) btnAdd.textContent = 'Add Record';
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    displayRecords();
    setupFormListener();
});
