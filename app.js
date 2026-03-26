// Bikin CV Gratis - Main Application Script

// Global variables
let currentTemplate = 'modern';
let formData = {
    personal: {},
    experiences: [],
    education: [],
    skills: [],
    languages: []
};

// DOM Elements
const cvForm = document.getElementById('cvForm');
const cvPreview = document.getElementById('cvPreview');
const templateOptions = document.querySelectorAll('.template-option');
const zoomLevel = document.getElementById('zoomLevel');
const resetBtn = document.getElementById('resetBtn');
const generateBtn = document.getElementById('generateBtn');
const printBtn = document.getElementById('printBtn');
const saveDraftBtn = document.getElementById('saveDraftBtn');

// Initialize the application
function init() {
    // Set up template selection
    templateOptions.forEach(option => {
        option.addEventListener('click', () => {
            templateOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            currentTemplate = option.dataset.template;
            updatePreview();
        });
    });
    
    // Set up form event listeners
    cvForm.addEventListener('input', debounce(updateFormData, 300));
    cvForm.addEventListener('submit', handleFormSubmit);
    
    // Set up button listeners
    resetBtn.addEventListener('click', resetForm);
    generateBtn.addEventListener('click', generatePDF);
    printBtn.addEventListener('click', printPreview);
    saveDraftBtn.addEventListener('click', saveDraft);
    
    // Set up zoom level
    zoomLevel.addEventListener('change', () => {
        const scale = parseFloat(zoomLevel.value);
        cvPreview.style.transform = `scale(${scale})`;
        cvPreview.style.transformOrigin = 'top left';
    });
    
    // Load saved draft if exists
    loadDraft();
    
    // Initial preview update
    updateFormData();
}

// Update form data from inputs
function updateFormData() {
    // Personal Information
    formData.personal = {
        fullName: getValue('fullName'),
        profession: getValue('profession'),
        email: getValue('email'),
        phone: getValue('phone'),
        location: getValue('location'),
        linkedin: getValue('linkedin'),
        summary: getValue('summary')
    };
    
    // Work Experiences
    formData.experiences = [];
    const expPositions = document.getElementsByName('expPosition[]');
    const expCompanies = document.getElementsByName('expCompany[]');
    const expStarts = document.getElementsByName('expStart[]');
    const expEnds = document.getElementsByName('expEnd[]');
    const expDescriptions = document.getElementsByName('expDescription[]');
    
    for (let i = 0; i < expPositions.length; i++) {
        formData.experiences.push({
            position: expPositions[i].value,
            company: expCompanies[i].value,
            start: expStarts[i].value ? formatDate(expStarts[i].value) : '',
            end: expEnds[i].value ? formatDate(expEnds[i].value) : '',
            description: expDescriptions[i].value
        });
    }
    
    // Education
    formData.education = [];
    const eduDegrees = document.getElementsByName('eduDegree[]');
    const eduInstitutions = document.getElementsByName('eduInstitution[]');
    const eduYears = document.getElementsByName('eduYear[]');
    const eduGpas = document.getElementsByName('eduGpa[]');
    
    for (let i = 0; i < eduDegrees.length; i++) {
        formData.education.push({
            degree: eduDegrees[i].value,
            institution: eduInstitutions[i].value,
            year: eduYears[i].value,
            gpa: eduGpas[i].value
        });
    }
    
    // Skills
    const skillsInput = getValue('skills');
    formData.skills = skillsInput ? skillsInput.split(',').map(s => s.trim()).filter(s => s) : [];
    
    // Languages
    const languagesInput = getValue('languages');
    formData.languages = languagesInput ? languagesInput.split(',').map(l => l.trim()).filter(l => l) : [];
    
    // Update preview
    updatePreview();
}

// Update CV preview
function updatePreview() {
    if (!formData.personal.fullName && !formData.personal.profession) {
        return; // Keep placeholder if no data
    }
    
    // Get template renderer
    const renderer = CVTemplates[currentTemplate];
    if (!renderer) {
        console.error('Template renderer not found:', currentTemplate);
        return;
    }
    
    // Render the CV preview
    cvPreview.innerHTML = renderer(formData);
    
    // Enable print button
    printBtn.disabled = false;
}

// Format date from YYYY-MM to Month YYYY
function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

// Get form field value
function getValue(id) {
    const element = document.getElementById(id);
    return element ? element.value.trim() : '';
}

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    generatePDF();
}

// Generate PDF
function generatePDF() {
    if (!formData.personal.fullName) {
        alert('Silakan isi nama lengkap terlebih dahulu.');
        document.getElementById('fullName').focus();
        return;
    }
    
    // Show loading state
    const originalText = generateBtn.innerHTML;
    generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Membuat PDF...';
    generateBtn.disabled = true;
    
    // Use html2canvas to capture the preview
    html2canvas(cvPreview, {
        scale: 2, // Higher quality
        useCORS: true,
        backgroundColor: '#ffffff'
    }).then(canvas => {
        // Create PDF
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });
        
        // Add image to PDF
        const imgData = canvas.toDataURL('image/png');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 10; // Margin top
        
        pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        
        // Save the PDF
        const fileName = `CV_${formData.personal.fullName.replace(/\s+/g, '_')}.pdf`;
        pdf.save(fileName);
        
        // Reset button state
        generateBtn.innerHTML = originalText;
        generateBtn.disabled = false;
        
        // Show success message
        showNotification('PDF berhasil diunduh!', 'success');
    }).catch(error => {
        console.error('PDF generation error:', error);
        
        // Reset button state
        generateBtn.innerHTML = originalText;
        generateBtn.disabled = false;
        
        // Show error message
        showNotification('Gagal membuat PDF. Silakan coba lagi.', 'error');
    });
}

// Print preview
function printPreview() {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>CV ${formData.personal.fullName || ''}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    @media print {
                        body { margin: 0; }
                    }
                </style>
            </head>
            <body>
                ${cvPreview.innerHTML}
                <script>
                    window.onload = function() {
                        window.print();
                        setTimeout(function() {
                            window.close();
                        }, 100);
                    };
                </script>
            </body>
        </html>
    `);
    printWindow.document.close();
}

// Save draft to localStorage
function saveDraft() {
    try {
        localStorage.setItem('cvDraft', JSON.stringify(formData));
        localStorage.setItem('cvTemplate', currentTemplate);
        showNotification('Draft berhasil disimpan!', 'success');
    } catch (error) {
        console.error('Error saving draft:', error);
        showNotification('Gagal menyimpan draft. Storage mungkin penuh.', 'error');
    }
}

// Load draft from localStorage
function loadDraft() {
    try {
        const savedDraft = localStorage.getItem('cvDraft');
        const savedTemplate = localStorage.getItem('cvTemplate');
        
        if (savedDraft) {
            formData = JSON.parse(savedDraft);
            
            // Restore personal information
            setValue('fullName', formData.personal.fullName || '');
            setValue('profession', formData.personal.profession || '');
            setValue('email', formData.personal.email || '');
            setValue('phone', formData.personal.phone || '');
            setValue('location', formData.personal.location || '');
            setValue('linkedin', formData.personal.linkedin || '');
            setValue('summary', formData.personal.summary || '');
            
            // Restore skills and languages
            setValue('skills', formData.skills.join(', ') || '');
            setValue('languages', formData.languages.join(', ') || '');
            
            // Restore template
            if (savedTemplate) {
                currentTemplate = savedTemplate;
                templateOptions.forEach(opt => {
                    opt.classList.toggle('active', opt.dataset.template === currentTemplate);
                });
            }
            
            // Note: Dynamic sections (experiences, education) would need more complex restoration
            // For MVP, we'll just update preview with loaded data
            updatePreview();
            
            showNotification('Draft berhasil dimuat!', 'success');
        }
    } catch (error) {
        console.error('Error loading draft:', error);
    }
}

// Set form field value
function setValue(id, value) {
    const element = document.getElementById(id);
    if (element) element.value = value;
}

// Reset form
function resetForm() {
    if (confirm('Apakah Anda yakin ingin mereset form? Semua data akan hilang.')) {
        cvForm.reset();
        
        // Clear dynamic sections (keep first entry)
        const experienceSection = document.getElementById('experienceSection');
        const educationSection = document.getElementById('educationSection');
        
        while (experienceSection.children.length > 1) {
            experienceSection.removeChild(experienceSection.lastChild);
        }
        
        while (educationSection.children.length > 1) {
            educationSection.removeChild(educationSection.lastChild);
        }
        
        // Reset form data
        formData = {
            personal: {},
            experiences: [],
            education: [],
            skills: [],
            languages: []
        };
        
        // Reset template to default
        currentTemplate = 'modern';
        templateOptions.forEach(opt => {
            opt.classList.toggle('active', opt.dataset.template === 'modern');
        });
        
        // Reset zoom
        zoomLevel.value = '1';
        cvPreview.style.transform = 'scale(1)';
        
        // Show placeholder
        cvPreview.innerHTML = `
            <div class="preview-placeholder">
                <i class="fas fa-file-alt"></i>
                <p>Isi formulir di sebelah kiri untuk melihat preview CV Anda.</p>
            </div>
        `;
        
        // Disable print button
        printBtn.disabled = true;
        
        // Clear localStorage
        localStorage.removeItem('cvDraft');
        localStorage.removeItem('cvTemplate');
        
        showNotification('Form berhasil direset!', 'success');
    }
}

// Add experience entry
function addExperience() {
    const experienceSection = document.getElementById('experienceSection');
    const newEntry = document.createElement('div');
    newEntry.className = 'experience-entry form-entry';
    newEntry.innerHTML = `
        <div class="form-row">
            <div class="form-group">
                <label>Posisi</label>
                <input type="text" name="expPosition[]" placeholder="Contoh: Frontend Developer">
            </div>
            <div class="form-group">
                <label>Perusahaan</label>
                <input type="text" name="expCompany[]" placeholder="Nama perusahaan">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Periode (Mulai)</label>
                <input type="month" name="expStart[]">
            </div>
            <div class="form-group">
                <label>Periode (Selesai)</label>
                <input type="month" name="expEnd[]" placeholder="Sekarang">
            </div>
        </div>
        <div class="form-group">
            <label>Deskripsi Pekerjaan</label>
            <textarea name="expDescription[]" rows="2" placeholder="Jelaskan tanggung jawab dan pencapaian utama."></textarea>
        </div>
        <button type="button" class="btn-remove" onclick="removeExperience(this)"><i class="fas fa-times"></i> Hapus</button>
    `;
    
    // Add input listener to the new entry
    const inputs = newEntry.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', debounce(updateFormData, 300));
    });
    
    experienceSection.appendChild(newEntry);
}

// Remove experience entry
function removeExperience(button) {
    const entry = button.closest('.form-entry');
    if (entry && entry.parentNode.children.length > 1) {
        entry.parentNode.removeChild(entry);
        updateFormData();
    }
}

// Add education entry
function addEducation() {
    const educationSection = document.getElementById('educationSection');
    const newEntry = document.createElement('div');
    newEntry.className = 'education-entry form-entry';
    newEntry.innerHTML = `
        <div class="form-row">
            <div class="form-group">
                <label>Jurusan / Gelar</label>
                <input type="text" name="eduDegree[]" placeholder="Contoh: S1 Teknik Informatika">
            </div>
            <div class="form-group">
                <label>Institusi</label>
                <input type="text" name="eduInstitution[]" placeholder="Nama universitas/sekolah">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Tahun Lulus</label>
                <input type="number" name="eduYear[]" min="1970" max="2030" placeholder="2020">
            </div>
            <div class="form-group">
                <label>IPK/Nilai (opsional)</label>
                <input type="text" name="eduGpa[]" placeholder="Contoh: 3.75">
            </div>
        </div>
        <button type="button" class="btn-remove" onclick="removeEducation(this)"><i class="fas fa-times"></i> Hapus</button>
    `;
    
    // Add input listener to the new entry
    const inputs = newEntry.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', debounce(updateFormData, 300));
    });
    
    educationSection.appendChild(newEntry);
}

// Remove education entry
function removeEducation(button) {
    const entry = button.closest('.form-entry');
    if (entry && entry.parentNode.children.length > 1) {
        entry.parentNode.removeChild(entry);
        updateFormData();
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        max-width: 400px;
    `;
    
    // Set color based on type
    if (type === 'success') {
        notification.style.backgroundColor = '#10b981';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#ef4444';
    } else {
        notification.style.backgroundColor = '#3b82f6';
    }
    
    // Add close button styles
    notification.querySelector('button').style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        font-size: 14px;
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Make functions available globally for inline onclick handlers
window.addExperience = addExperience;
window.removeExperience = removeExperience;
window.addEducation = addEducation;
window.removeEducation = removeEducation;

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}