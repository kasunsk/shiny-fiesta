const API_BASE_URL = 'http://localhost:8080/api/students';

// DOM Elements
const studentForm = document.getElementById('student-form');
const studentsList = document.getElementById('students-list');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('error-message');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const refreshBtn = document.getElementById('refresh-btn');

let editingStudentId = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadStudents();
    
    studentForm.addEventListener('submit', handleFormSubmit);
    cancelBtn.addEventListener('click', resetForm);
    refreshBtn.addEventListener('click', loadStudents);
});

// Load all students
async function loadStudents() {
    showLoading(true);
    hideError();
    
    try {
        const response = await fetch(API_BASE_URL);
        
        if (!response.ok) {
            throw new Error('Failed to load students');
        }
        
        const students = await response.json();
        displayStudents(students);
    } catch (error) {
        showError('Error loading students: ' + error.message);
        studentsList.innerHTML = '<div class="empty-state"><p>Failed to load students</p></div>';
    } finally {
        showLoading(false);
    }
}

// Display students in the list
function displayStudents(students) {
    if (students.length === 0) {
        studentsList.innerHTML = '<div class="empty-state"><p>📚 No students found. Add your first student!</p></div>';
        return;
    }
    
    studentsList.innerHTML = students.map(student => `
        <div class="student-card" data-id="${student.id}">
            <div class="student-info">
                <h3>${student.firstName} ${student.lastName}</h3>
                <p><strong>Email:</strong> ${student.email || 'N/A'}</p>
                <p><strong>Age:</strong> ${student.age || 'N/A'}</p>
                <p><strong>Course:</strong> ${student.course || 'Not specified'}</p>
            </div>
            <div class="student-actions">
                <button class="btn btn-edit" onclick="editStudent(${student.id})">✏️ Edit</button>
                <button class="btn btn-danger" onclick="deleteStudent(${student.id})">🗑️ Delete</button>
            </div>
        </div>
    `).join('');
}

// Handle form submission
async function handleFormSubmit(e) {
    e.preventDefault();
    hideError();
    
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        age: parseInt(document.getElementById('age').value),
        course: document.getElementById('course').value
    };
    
    try {
        let response;
        
        if (editingStudentId) {
            // Update existing student
            response = await fetch(`${API_BASE_URL}/${editingStudentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
        } else {
            // Create new student
            response = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
        }
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data || 'Operation failed');
        }
        
        // Success
        showSuccessMessage(editingStudentId ? 'Student updated successfully!' : 'Student added successfully!');
        resetForm();
        loadStudents();
    } catch (error) {
        showError('Error: ' + error.message);
    }
}

// Edit student
async function editStudent(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        
        if (!response.ok) {
            throw new Error('Failed to load student');
        }
        
        const student = await response.json();
        
        // Populate form
        document.getElementById('student-id').value = student.id;
        document.getElementById('firstName').value = student.firstName;
        document.getElementById('lastName').value = student.lastName;
        document.getElementById('email').value = student.email || '';
        document.getElementById('age').value = student.age || '';
        document.getElementById('course').value = student.course || '';
        
        // Update UI
        editingStudentId = student.id;
        formTitle.textContent = 'Edit Student';
        submitBtn.textContent = 'Update Student';
        cancelBtn.style.display = 'inline-block';
        
        // Scroll to form
        document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        showError('Error loading student: ' + error.message);
    }
}

// Delete student
async function deleteStudent(id) {
    if (!confirm('Are you sure you want to delete this student?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data || 'Failed to delete student');
        }
        
        showSuccessMessage('Student deleted successfully!');
        loadStudents();
    } catch (error) {
        showError('Error deleting student: ' + error.message);
    }
}

// Reset form
function resetForm() {
    studentForm.reset();
    document.getElementById('student-id').value = '';
    editingStudentId = null;
    formTitle.textContent = 'Add New Student';
    submitBtn.textContent = 'Add Student';
    cancelBtn.style.display = 'none';
    hideError();
}

// Show/hide loading
function showLoading(show) {
    loading.style.display = show ? 'block' : 'none';
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

// Hide error message
function hideError() {
    errorMessage.style.display = 'none';
}

// Show success message
function showSuccessMessage(message) {
    // Create or get success message element
    let successMsg = document.getElementById('success-message');
    if (!successMsg) {
        successMsg = document.createElement('div');
        successMsg.id = 'success-message';
        successMsg.className = 'success-message';
        document.querySelector('.list-section').insertBefore(successMsg, studentsList);
    }
    
    successMsg.textContent = message;
    successMsg.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(() => {
        successMsg.classList.remove('show');
    }, 3000);
}



