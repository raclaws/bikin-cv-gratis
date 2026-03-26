// CV Template Renderer for Bikin CV Gratis

const CVTemplates = {
    // Modern Template (default)
    modern: function(data) {
        const { personal, experiences, education, skills, languages } = data;
        
        return `
            <div class="cv-preview cv-modern">
                <!-- Header -->
                <div class="cv-header">
                    <h1 class="cv-name">${personal.fullName || 'Nama Lengkap'}</h1>
                    <h2 class="cv-profession">${personal.profession || 'Profesi'}</h2>
                    
                    <div class="cv-contact">
                        ${personal.email ? `<div class="cv-contact-item"><i class="fas fa-envelope"></i> ${personal.email}</div>` : ''}
                        ${personal.phone ? `<div class="cv-contact-item"><i class="fas fa-phone"></i> ${personal.phone}</div>` : ''}
                        ${personal.location ? `<div class="cv-contact-item"><i class="fas fa-map-marker-alt"></i> ${personal.location}</div>` : ''}
                        ${personal.linkedin ? `<div class="cv-contact-item"><i class="fab fa-linkedin"></i> ${personal.linkedin}</div>` : ''}
                    </div>
                </div>
                
                <!-- Summary -->
                ${personal.summary ? `
                <div class="cv-section">
                    <h3 class="cv-section-title">Profil Singkat</h3>
                    <p>${personal.summary}</p>
                </div>
                ` : ''}
                
                <!-- Work Experience -->
                ${experiences.length > 0 ? `
                <div class="cv-section">
                    <h3 class="cv-section-title">Pengalaman Kerja</h3>
                    ${experiences.map(exp => `
                    <div class="cv-experience-item">
                        <div class="cv-item-header">
                            <div>
                                <h4 class="cv-item-title">${exp.position || 'Posisi'}</h4>
                                <div class="cv-item-subtitle">${exp.company || 'Perusahaan'}</div>
                            </div>
                            <div class="cv-item-period">
                                ${exp.start || ''} ${exp.end ? ` - ${exp.end}` : ' - Sekarang'}
                            </div>
                        </div>
                        ${exp.description ? `<p class="cv-item-description">${exp.description}</p>` : ''}
                    </div>
                    `).join('')}
                </div>
                ` : ''}
                
                <!-- Education -->
                ${education.length > 0 ? `
                <div class="cv-section">
                    <h3 class="cv-section-title">Pendidikan</h3>
                    ${education.map(edu => `
                    <div class="cv-education-item">
                        <div class="cv-item-header">
                            <div>
                                <h4 class="cv-item-title">${edu.degree || 'Jurusan'}</h4>
                                <div class="cv-item-subtitle">${edu.institution || 'Institusi'}</div>
                            </div>
                            <div class="cv-item-period">
                                ${edu.year ? `Lulus: ${edu.year}` : ''}
                                ${edu.gpa ? ` | IPK: ${edu.gpa}` : ''}
                            </div>
                        </div>
                    </div>
                    `).join('')}
                </div>
                ` : ''}
                
                <!-- Skills -->
                ${skills.length > 0 ? `
                <div class="cv-section">
                    <h3 class="cv-section-title">Keahlian Teknis</h3>
                    <div class="cv-skills-list">
                        ${skills.map(skill => `<span class="cv-skill-tag">${skill}</span>`).join('')}
                    </div>
                </div>
                ` : ''}
                
                <!-- Languages -->
                ${languages.length > 0 ? `
                <div class="cv-section">
                    <h3 class="cv-section-title">Bahasa</h3>
                    <div class="cv-skills-list">
                        ${languages.map(lang => `<span class="cv-skill-tag">${lang}</span>`).join('')}
                    </div>
                </div>
                ` : ''}
            </div>
        `;
    },
    
    // Classic Template (more traditional layout)
    classic: function(data) {
        const { personal, experiences, education, skills, languages } = data;
        
        return `
            <div class="cv-preview cv-classic" style="font-family: 'Times New Roman', serif;">
                <!-- Header -->
                <div class="cv-header" style="text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px;">
                    <h1 class="cv-name" style="font-size: 28px; margin-bottom: 5px;">${personal.fullName || 'Nama Lengkap'}</h1>
                    <h2 class="cv-profession" style="font-size: 18px; color: #555; margin-bottom: 15px;">${personal.profession || 'Profesi'}</h2>
                    
                    <div class="cv-contact" style="font-size: 14px; color: #666;">
                        ${personal.email ? `<span style="margin: 0 10px;"><i class="fas fa-envelope"></i> ${personal.email}</span>` : ''}
                        ${personal.phone ? `<span style="margin: 0 10px;"><i class="fas fa-phone"></i> ${personal.phone}</span>` : ''}
                        ${personal.location ? `<span style="margin: 0 10px;"><i class="fas fa-map-marker-alt"></i> ${personal.location}</span>` : ''}
                    </div>
                </div>
                
                <!-- Summary -->
                ${personal.summary ? `
                <div class="cv-section" style="margin: 20px 0;">
                    <h3 class="cv-section-title" style="font-size: 16px; border-bottom: 1px solid #ccc; padding-bottom: 5px;">PROFIL</h3>
                    <p style="font-size: 14px; text-align: justify;">${personal.summary}</p>
                </div>
                ` : ''}
                
                <!-- Work Experience -->
                ${experiences.length > 0 ? `
                <div class="cv-section" style="margin: 20px 0;">
                    <h3 class="cv-section-title" style="font-size: 16px; border-bottom: 1px solid #ccc; padding-bottom: 5px;">PENGALAMAN KERJA</h3>
                    ${experiences.map(exp => `
                    <div class="cv-experience-item" style="margin-bottom: 15px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                            <div>
                                <h4 style="font-size: 15px; font-weight: bold; margin: 0;">${exp.position || 'Posisi'}</h4>
                                <div style="font-size: 14px; color: #555;">${exp.company || 'Perusahaan'}</div>
                            </div>
                            <div style="font-size: 13px; color: #777;">
                                ${exp.start || ''} ${exp.end ? ` - ${exp.end}` : ' - Sekarang'}
                            </div>
                        </div>
                        ${exp.description ? `<p style="font-size: 14px; margin: 5px 0 0 0;">${exp.description}</p>` : ''}
                    </div>
                    `).join('')}
                </div>
                ` : ''}
                
                <!-- Education -->
                ${education.length > 0 ? `
                <div class="cv-section" style="margin: 20px 0;">
                    <h3 class="cv-section-title" style="font-size: 16px; border-bottom: 1px solid #ccc; padding-bottom: 5px;">PENDIDIKAN</h3>
                    ${education.map(edu => `
                    <div class="cv-education-item" style="margin-bottom: 10px;">
                        <div style="display: flex; justify-content: space-between;">
                            <div>
                                <h4 style="font-size: 15px; font-weight: bold; margin: 0;">${edu.degree || 'Jurusan'}</h4>
                                <div style="font-size: 14px; color: #555;">${edu.institution || 'Institusi'}</div>
                            </div>
                            <div style="font-size: 13px; color: #777;">
                                ${edu.year || ''} ${edu.gpa ? ` | IPK: ${edu.gpa}` : ''}
                            </div>
                        </div>
                    </div>
                    `).join('')}
                </div>
                ` : ''}
                
                <!-- Skills & Languages -->
                <div style="display: flex; margin: 20px 0; gap: 30px;">
                    ${skills.length > 0 ? `
                    <div style="flex: 1;">
                        <h3 style="font-size: 16px; border-bottom: 1px solid #ccc; padding-bottom: 5px;">KEAHLIAN</h3>
                        <p style="font-size: 14px;">${skills.join(', ')}</p>
                    </div>
                    ` : ''}
                    
                    ${languages.length > 0 ? `
                    <div style="flex: 1;">
                        <h3 style="font-size: 16px; border-bottom: 1px solid #ccc; padding-bottom: 5px;">BAHASA</h3>
                        <p style="font-size: 14px;">${languages.join(', ')}</p>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
    },
    
    // Minimal Template (clean, spaced out)
    minimal: function(data) {
        const { personal, experiences, education, skills, languages } = data;
        
        return `
            <div class="cv-preview cv-minimal" style="font-family: 'Helvetica Neue', Arial, sans-serif; color: #333;">
                <!-- Header -->
                <div class="cv-header" style="border-bottom: 1px solid #eee; padding-bottom: 30px; margin-bottom: 30px;">
                    <h1 class="cv-name" style="font-size: 32px; font-weight: 300; letter-spacing: -0.5px; margin-bottom: 5px;">${personal.fullName || 'Nama Lengkap'}</h1>
                    <h2 class="cv-profession" style="font-size: 18px; font-weight: 400; color: #666; margin-bottom: 20px;">${personal.profession || 'Profesi'}</h2>
                    
                    <div class="cv-contact" style="font-size: 14px; color: #888;">
                        ${personal.email ? `<span style="margin-right: 20px;">${personal.email}</span>` : ''}
                        ${personal.phone ? `<span style="margin-right: 20px;">${personal.phone}</span>` : ''}
                        ${personal.location ? `<span style="margin-right: 20px;">${personal.location}</span>` : ''}
                    </div>
                </div>
                
                <!-- Summary -->
                ${personal.summary ? `
                <div class="cv-section" style="margin-bottom: 30px;">
                    <p style="font-size: 15px; line-height: 1.7; color: #444;">${personal.summary}</p>
                </div>
                ` : ''}
                
                <!-- Work Experience -->
                ${experiences.length > 0 ? `
                <div class="cv-section" style="margin-bottom: 30px;">
                    ${experiences.map(exp => `
                    <div class="cv-experience-item" style="margin-bottom: 25px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <h3 style="font-size: 16px; font-weight: 500; margin: 0;">${exp.position || 'Posisi'}</h3>
                            <div style="font-size: 14px; color: #999;">
                                ${exp.start || ''} ${exp.end ? ` - ${exp.end}` : ' - Sekarang'}
                            </div>
                        </div>
                        <div style="font-size: 15px; color: #777; margin-bottom: 8px;">${exp.company || 'Perusahaan'}</div>
                        ${exp.description ? `<p style="font-size: 14px; color: #555; line-height: 1.6;">${exp.description}</p>` : ''}
                    </div>
                    `).join('')}
                </div>
                ` : ''}
                
                <!-- Education -->
                ${education.length > 0 ? `
                <div class="cv-section" style="margin-bottom: 30px;">
                    ${education.map(edu => `
                    <div class="cv-education-item" style="margin-bottom: 20px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                            <h3 style="font-size: 16px; font-weight: 500; margin: 0;">${edu.degree || 'Jurusan'}</h3>
                            <div style="font-size: 14px; color: #999;">${edu.year || ''}</div>
                        </div>
                        <div style="font-size: 15px; color: #777;">${edu.institution || 'Institusi'} ${edu.gpa ? ` • IPK: ${edu.gpa}` : ''}</div>
                    </div>
                    `).join('')}
                </div>
                ` : ''}
                
                <!-- Skills & Languages -->
                <div style="display: flex; margin-top: 40px; gap: 40px;">
                    ${skills.length > 0 ? `
                    <div style="flex: 1;">
                        <h4 style="font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #999; margin-bottom: 15px;">Keahlian</h4>
                        <p style="font-size: 14px; color: #444;">${skills.join(' • ')}</p>
                    </div>
                    ` : ''}
                    
                    ${languages.length > 0 ? `
                    <div style="flex: 1;">
                        <h4 style="font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #999; margin-bottom: 15px;">Bahasa</h4>
                        <p style="font-size: 14px; color: #444;">${languages.join(' • ')}</p>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
    },
    
    // Executive Template (professional, compact)
    executive: function(data) {
        const { personal, experiences, education, skills, languages } = data;
        
        return `
            <div class="cv-preview cv-executive" style="font-family: 'Georgia', serif; color: #222;">
                <!-- Header -->
                <div class="cv-header" style="background: #1a1a1a; color: white; padding: 25px; margin: -20px -20px 20px -20px;">
                    <h1 class="cv-name" style="font-size: 28px; font-weight: normal; margin-bottom: 5px;">${personal.fullName || 'Nama Lengkap'}</h1>
                    <h2 class="cv-profession" style="font-size: 16px; font-weight: 300; color: #ccc; margin-bottom: 15px;">${personal.profession || 'Profesi'}</h2>
                    
                    <div class="cv-contact" style="font-size: 13px; color: #aaa;">
                        ${personal.email ? `<span style="margin-right: 25px;"><i class="fas fa-envelope"></i> ${personal.email}</span>` : ''}
                        ${personal.phone ? `<span style="margin-right: 25px;"><i class="fas fa-phone"></i> ${personal.phone}</span>` : ''}
                        ${personal.location ? `<span style="margin-right: 25px;"><i class="fas fa-map-marker-alt"></i> ${personal.location}</span>` : ''}
                    </div>
                </div>
                
                <!-- Two-column layout -->
                <div style="display: flex; gap: 40px;">
                    <!-- Left Column: Summary & Skills -->
                    <div style="flex: 1;">
                        <!-- Summary -->
                        ${personal.summary ? `
                        <div class="cv-section" style="margin-bottom: 25px;">
                            <h3 style="font-size: 16px; font-weight: 600; border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-bottom: 10px;">PROFIL</h3>
                            <p style="font-size: 13px; line-height: 1.6; color: #444;">${personal.summary}</p>
                        </div>
                        ` : ''}
                        
                        <!-- Skills -->
                        ${skills.length > 0 ? `
                        <div class="cv-section" style="margin-bottom: 25px;">
                            <h3 style="font-size: 16px; font-weight: 600; border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-bottom: 10px;">KEAHLIAN</h3>
                            <div style="font-size: 13px; color: #444;">
                                ${skills.map(skill => `<div style="margin-bottom: 5px;">• ${skill}</div>`).join('')}
                            </div>
                        </div>
                        ` : ''}
                        
                        <!-- Languages -->
                        ${languages.length > 0 ? `
                        <div class="cv-section" style="margin-bottom: 25px;">
                            <h3 style="font-size: 16px; font-weight: 600; border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-bottom: 10px;">BAHASA</h3>
                            <div style="font-size: 13px; color: #444;">
                                ${languages.map(lang => `<div style="margin-bottom: 5px;">• ${lang}</div>`).join('')}
                            </div>
                        </div>
                        ` : ''}
                    </div>
                    
                    <!-- Right Column: Experience & Education -->
                    <div style="flex: 2;">
                        <!-- Work Experience -->
                        ${experiences.length > 0 ? `
                        <div class="cv-section" style="margin-bottom: 25px;">
                            <h3 style="font-size: 16px; font-weight: 600; border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-bottom: 10px;">PENGALAMAN KERJA</h3>
                            ${experiences.map(exp => `
                            <div class="cv-experience-item" style="margin-bottom: 20px;">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                                    <h4 style="font-size: 14px; font-weight: 600; margin: 0;">${exp.position || 'Posisi'}</h4>
                                    <div style="font-size: 12px; color: #777;">${exp.start || ''} ${exp.end ? ` - ${exp.end}` : ' - Sekarang'}</div>
                                </div>
                                <div style="font-size: 13px; font-weight: 500; color: #555; margin-bottom: 8px;">${exp.company || 'Perusahaan'}</div>
                                ${exp.description ? `<p style="font-size: 13px; color: #444; line-height: 1.5;">${exp.description}</p>` : ''}
                            </div>
                            `).join('')}
                        </div>
                        ` : ''}
                        
                        <!-- Education -->
                        ${education.length > 0 ? `
                        <div class="cv-section">
                            <h3 style="font-size: 16px; font-weight: 600; border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-bottom: 10px;">PENDIDIKAN</h3>
                            ${education.map(edu => `
                            <div class="cv-education-item" style="margin-bottom: 15px;">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                                    <h4 style="font-size: 14px; font-weight: 600; margin: 0;">${edu.degree || 'Jurusan'}</h4>
                                    <div style="font-size: 12px; color: #777;">${edu.year || ''}</div>
                                </div>
                                <div style="font-size: 13px; color: #555;">${edu.institution || 'Institusi'} ${edu.gpa ? ` | IPK: ${edu.gpa}` : ''}</div>
                            </div>
                            `).join('')}
                        </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }
};

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CVTemplates;
}