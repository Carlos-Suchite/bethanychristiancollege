document.addEventListener("DOMContentLoaded", function (){;
      //Handle Registration
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;

            if (localStorage.getItem(username)) {
                alert("User already exists!");
            } else {
                localStorage.setItem(username, JSON.stringify({ password, courses: [] }));
                alert("Registration successful! Please log in.");
                window.location.href = "login.html";
            }
        });
    }

    // Handle Login
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let username = document.getElementById("loginUsername").value;
            let password = document.getElementById("loginPassword").value;

            let userData = JSON.parse(localStorage.getItem(username));

            if (userData && userData.password === password) {
                sessionStorage.setItem("loggedInUser", username);
                alert("Login successful!");
                window.location.href = "dashboard.html";
            } else {
                alert("Invalid username or password");
            }
        });
    }

    // Handle Dashboard
    const userDisplay = document.getElementById("userDisplay");
    if (userDisplay) {
        let loggedInUser = sessionStorage.getItem("loggedInUser");
        if (!loggedInUser) {
            alert("You must log in first!");
            window.location.href = "login.html";
        } else {
            userDisplay.innerText = loggedInUser;
            displayEnrolledCourses(loggedInUser);
        }
    }

    // Logout
    const logout = document.getElementById("logout");
    if (logout) {
        logout.addEventListener("click", function () {
            sessionStorage.removeItem("loggedInUser");
            alert("Logged out!");
            window.location.href = "index.html";
        });
    }
});

// Enroll in Courses
function enrollCourse(courseName) {
    let loggedInUser = sessionStorage.getItem("loggedInUser");
    if (!loggedInUser) return;

    let userData = JSON.parse(localStorage.getItem(loggedInUser));
    if (!userData.courses.includes(courseName)) {
        userData.courses.push(courseName);
        localStorage.setItem(loggedInUser, JSON.stringify(userData));
        alert(`Enrolled in ${courseName}!`);
        displayEnrolledCourses(loggedInUser);
    } else {
        alert("Already enrolled!");
    }
}

// Display Enrolled Courses
function displayEnrolledCourses(username) {
    let userData = JSON.parse(localStorage.getItem(username));
    let enrolledCoursesList = document.getElementById("enrolledCourses");
    if (enrolledCoursesList) {
        enrolledCoursesList.innerHTML = "";
        userData.courses.forEach(course => {
            let li = document.createElement("li");
            li.innerText = course;
            enrolledCoursesList.appendChild(li);
        });
    }
}
