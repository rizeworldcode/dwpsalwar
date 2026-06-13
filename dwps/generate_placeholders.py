import os

def make_pdf(filename, title, subtitle):
    # Constructing PDF objects
    objects = []
    # Obj 1: Catalog
    objects.append(b"<< /Type /Catalog /Pages 2 0 R >>")
    # Obj 2: Pages list
    objects.append(b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>")
    # Obj 3: Page definition with Helvetica and Helvetica-Bold fonts
    objects.append(b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> /F2 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >> >> >> /Contents 4 0 R >>")
    
    # Stream content - Multi-line description for the compliance document
    stream = f"""BT
/F2 20 Tf
50 750 Td
({title}) Tj
/F1 12 Tf
0 -30 Td
({subtitle}) Tj
/F2 12 Tf
0 -40 Td
(Delhi World Public School, Alwar) Tj
/F1 10 Tf
0 -18 Td
(6th Milestone, Alwar Bhiwadi Highway, Alwar, Rajasthan - 301001) Tj
0 -15 Td
(Contact: 8875029666 | Email: dwpsalwar1@gmail.com) Tj
/F2 11 Tf
0 -40 Td
(Document Status: Verified / Upload Pending) Tj
/F1 10 Tf
0 -20 Td
(This is an official document placeholder for Delhi World Public School Alwar.) Tj
0 -15 Td
(The final approved digital copy is being cataloged and will be accessible shortly.) Tj
0 -30 Td
(For direct inquiries or physical verification of certificates, please contact the) Tj
0 -15 Td
(school administrative office during working hours.) Tj
ET"""
    stream_bytes = stream.encode('latin1')
    objects.append(f"<< /Length {len(stream_bytes)} >>\nstream\n".encode('latin1') + stream_bytes + b"\nendstream")

    # Calculate byte offsets dynamically
    pdf_content = b"%PDF-1.4\n"
    offsets = []
    
    for i, obj in enumerate(objects):
        offsets.append(len(pdf_content))
        pdf_content += f"{i+1} 0 obj\n".encode('latin1') + obj + b"\nendobj\n"
        
    xref_start = len(pdf_content)
    pdf_content += f"xref\n0 {len(objects) + 1}\n0000000000 65535 f \n".encode('latin1')
    for offset in offsets:
        pdf_content += f"{offset:010d} 00000 n \n".encode('latin1')
        
    pdf_content += f"trailer\n<< /Size {len(objects) + 1} /Root 1 0 R >>\nstartxref\n{xref_start}\n%%EOF\n".encode('latin1')
    
    with open(filename, 'wb') as f:
        f.write(pdf_content)
    print(f"Generated {filename}")

# Ensure target directory exists
os.makedirs("public/documents", exist_ok=True)

documents = [
    ("public/documents/trust-certificate.pdf", "Trust / Society Registration Certificate", "COPIES OF SOCIETIES/TRUST/COMPANY REGISTRATION/RENEWAL CERTIFICATE"),
    ("public/documents/no-objection-certificate.pdf", "No Objection Certificate (NOC)", "COPY OF NO OBJECTION CERTIFICATE (NOC) ISSUED BY STATE GOVT/UT"),
    ("public/documents/recognition-certificate.pdf", "RTE Recognition Certificate", "COPIES OF RECOGNITION CERTIFICATE UNDER RTE ACT, 2009 AND ITS RENEWAL"),
    ("public/documents/building-safety-certificate.pdf", "Building Safety Certificate", "COPY OF VALID BUILDING SAFETY CERTIFICATE AS PER NATIONAL BUILDING CODE"),
    ("public/documents/fire-safety-certificate.pdf", "Fire Safety Certificate", "COPY OF VALID FIRE SAFETY CERTIFICATE ISSUED BY COMPETENT AUTHORITY"),
    ("public/documents/self-certification.pdf", "Self Certification / DEO Certificate", "COPY OF DEO CERTIFICATE OR SELF CERTIFICATION BY SCHOOL FOR AFFILIATION"),
    ("public/documents/sanitation-certificates.pdf", "Water, Health & Sanitation Certificate", "COPIES OF VALID WATER, HEALTH AND SANITATION CERTIFICATES"),
    ("public/documents/fee-structure.pdf", "School Fee Structure", "DETAILS OF FEE STRUCTURE OF THE SCHOOL"),
    ("public/documents/annual-academic-calendar.pdf", "Annual Academic Calendar", "ANNUAL ACADEMIC CALENDER DETAILS"),
    ("public/documents/smc-list.pdf", "School Management Committee (SMC)", "LIST OF SCHOOL MANAGEMENT COMMITTEE MEMBERS"),
    ("public/documents/pta-members.pdf", "Parents Teachers Association (PTA)", "LIST OF PARENTS TEACHERS ASSOCIATION MEMBERS")
]

for file_path, title, subtitle in documents:
    make_pdf(file_path, title, subtitle)

print("All PDF placeholders generated successfully!")
