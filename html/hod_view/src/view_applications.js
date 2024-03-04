function expandApplication() {
    const acc = document.getElementsByClassName("application");
    let i;

    console.log("Number of elements = " + acc.length + "!")

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            let panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }
    
}

async function getStudentApplications() {
    // const universityName = document.getElementById("name").value;

    const url = `https://bursary-api-1709020026838.azurewebsites.net/studentapplication/students`;
    displayLoading()
    await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
    })
        .then((res) => res.json())
        .then((data) => {
            hideLoading()
            populateStudentApplicationsAccordion(data)
        })
        .then()
        
        // .then((data) => {
        //     console.log(data);
        //     return data;
        // })
        .catch((err) => console.log(err));
    
    
    
    expandApplication()
    
    return;
}

// selecting loading div
const loader = document.querySelector("#loading");
const loaderMessage = document.querySelector("#loading-message");

// showing loading
function displayLoading() {
    loader.classList.add("display");

    setTimeout(() => {
        loaderMessage.innerText = "It takes a while, thank you for your patience";
    }, 5000);
}


// hiding loading 
function hideLoading() {
    loader.classList.remove("display");
}



function populateStudentApplicationsAccordion(studentApplications) {
    const accordionContainer = document.getElementById("view-applications-accordion");
    // const studentApplications = getStudentApplications();
    // studentApplications.sort(compareStudentNames);
    
    
    // for (student in studentApplications) {
    //     const newButton = document.createElement('button');
    //     newButton.className = "application";
    
    //     const newSection = document.createElement('section');
    //     newSection.className = "grid-container";
    
    //     const newH3 = document.createElement('h3');
    //     const newParagraph = document.createElement('p');
    
    //     const newPanelSection = document.createElement('section');
    //     newSection.className = "application-info";
    //     newH3.innerText = student.studentName;
    //     newParagraph.innerText = "ID NUMBER";

    //     newSection.appendChild(newH3);
    //     newSection.appendChild(newParagraph);

    //     newButton.appendChild(newSection);

    //     accordionContainer.appendChild(newButton);

    //     newParagraph.innerText = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    //     newPanelSection.appendChild(newParagraph);

    //     accordionContainer.appendChild(newPanelSection);

    // }

    accordionContainer.innerHTML = studentApplications.map(
        (student) =>
            `<button class="application">
                <section class="grid-container">
                    <h3>${student.studentName}</h3>
                    <p>"ID NUMBER"</p>
                </section>
            </button>
            <section class="application-info">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </section>`
    )
    }
// async function populateStudentApplicationsAccordion() {
//     const accordionContainer = document.getElementById("view-applications-accordion");
//     const studentApplications = getStudentApplications();
//     // studentApplications.sort(compareStudentNames);

//     accordionContainer.innerHTML = studentApplications.map(
//         (student) =>
//             `<button class="application">
//                 <section class="grid-container">
//                     <h3>${user.studentName}</h3>
//                     <p>"ID NUMBER"</p>
//                 </section>
//             </button>
//             <section class="application-info">
//                 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
//             </section>`
//     )
//     }


//     document.getElementById("application").innerHTML = applicationDetail
//         .map(
//             (user) =>
//                 `<button class="accordion"><section class="grid-container"><p>${user.name}</p><p>${user.age}</p><p>${user.place}</p></section></button>
//       <div class="panel">
//         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
//       </div>`
//         )
//         .join("");
// }

document.addEventListener('DOMContentLoaded', async function () {
    await getStudentApplications();
    // expandApplication();



}, false);
