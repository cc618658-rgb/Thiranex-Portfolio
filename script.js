const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || message === "") {
        formMessage.textContent = "Please fill in all the fields.";
        return;
    }

    try {

        const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: message
            })
        });

        const data = await response.json();

        if (data.success) {
            formMessage.textContent = data.message;
            form.reset();
        } else {
            formMessage.textContent = "Something went wrong.";
        }

    } catch (error) {

        console.error("Connection failed:", error);
        formMessage.textContent = "Unable to connect to the server.";

    }

});


// Check Python API status
async function checkAPIStatus() {

    const apiStatus = document.getElementById("apiStatus");

    try {

        const response = await fetch("/api/python");

        if (response.ok) {
            apiStatus.textContent = "Python Backend Connected ✓";
        } else {
            apiStatus.textContent = "Python Backend Not Connected";
        }

    } catch (error) {

        apiStatus.textContent = "Python Backend Not Connected";

    }

}

checkAPIStatus();
async function loadProjects() {

    try {

        const response = await fetch("/api/projects");
        const projects = await response.json();

        const projectList = document.getElementById("project-list");

        if (projects.length > 0) {

            const project = projects[0];

            projectList.querySelector("h3").textContent = project.title;

            projectList.querySelector("p").textContent = project.description;

            projectList.querySelector(".project-tech").innerHTML = "";

            project.technologies.split(",").forEach((tech) => {

                const span = document.createElement("span");

                span.textContent = tech.trim();

                projectList.querySelector(".project-tech").appendChild(span);

            });

        }

    } catch (error) {

        console.error("Failed to load projects:", error);

    }

}

loadProjects();