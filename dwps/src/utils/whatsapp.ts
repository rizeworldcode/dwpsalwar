export const ADMIN_WHATSAPP_NUMBER = "919660472404"; // Replace with actual number

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject?: string;
  message: string;
  source: string;
}

export interface AdmissionFormData {
  parentName: string;
  childName: string;
  grade: string;
  email: string;
  phone: string;
  message?: string;
}

export const submitContactFormToWhatsApp = (data: ContactFormData) => {
  const text = `--------------------------------
New Contact Inquiry - DWPS Website

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Subject: ${data.subject || 'N/A'}
Message: ${data.message}

Submitted From:
${data.source}
--------------------------------`;

  const encodedText = encodeURIComponent(text);
  const url = `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodedText}`;
  window.open(url, '_blank');
};

export const submitAdmissionFormToWhatsApp = (data: AdmissionFormData) => {
  const text = `--------------------------------
New Admission Inquiry - DWPS Website

Student Name: ${data.childName}
Parent Name: ${data.parentName}
Phone: ${data.phone}
Email: ${data.email}
Class Applying For: ${data.grade}
Previous School: N/A
Address: N/A
Message: ${data.message || 'N/A'}

Submitted From:
Admissions Page
--------------------------------`;

  const encodedText = encodeURIComponent(text);
  const url = `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodedText}`;
  window.open(url, '_blank');
};
