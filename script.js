document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("resume-form");
    const resumeContent = document.getElementById("resume-content");
    const downloadBtn = document.getElementById("download-btn");
  
    const sections = {
      education: {
        container: document.getElementById("education-container"),
        addButton: document.getElementById("add-education"),
        template: () => `
          <div class="education-entry">
            <input type="text" class="degree" placeholder="Degree/Certificate" />
            <input type="text" class="school" placeholder="School/University" />
            <input type="number" class="grad-year" placeholder="Graduation Year" />
            <button type="button" class="remove-education">Remove</button>
          </div>
        `,
      },
      certificates: {
        container: document.getElementById("certificates-container"),
        addButton: document.getElementById("add-certificate"),
        template: () => `
          <div class="certificate-entry">
            <input type="text" class="cert-name" placeholder="Certificate Name" />
            <input type="text" class="cert-issuer" placeholder="Issuer" />
            <input type="date" class="cert-date" />
            <button type="button" class="remove-cert">Remove</button>
          </div>
        `,
      },
      experience: {
        container: document.getElementById("experience-container"),
        addButton: document.getElementById("add-experience"),
        template: () => `
          <div class="experience-entry">
            <input type="text" class="job-title" placeholder="Job Title" />
            <input type="text" class="company" placeholder="Company" />
            <input type="number" class="years" placeholder="Years" />
            <textarea class="job-description" placeholder="Description"></textarea>
            <button type="button" class="remove-experience">Remove</button>
          </div>
        `,
      },
    };
  
    Object.values(sections).forEach(({ container, addButton, template }) => {
      addButton.addEventListener("click", () => {
        const div = document.createElement("div");
        div.innerHTML = template();
        container.appendChild(div.firstElementChild);
      });
      container.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON" && e.target.textContent === "Remove") {
          e.target.parentElement.remove();
        }
      });
    });
  
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const skills = document.getElementById("skills").value.split(",").map((s) => s.trim());
  
      resumeContent.innerHTML = `
        <h2>${name}</h2>
        <p>${email}</p>
        <p>${phone}</p>
        <h3>Skills</h3>
        <ul>${skills.map((skill) => `<li>${skill}</li>`).join("")}</ul>
      `;
  
      downloadBtn.style.display = "block";
    });
  
    downloadBtn.addEventListener("click", () => {
      html2pdf().from(resumeContent).save("Resume.pdf");
    });
  });
  