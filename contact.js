document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contactForm");
    const submitButton = form.querySelector("button[type='submit']");
    const clearButton = document.getElementById("clearButton");

    // Create and style the loading spinner
    const loadingSpinner = document.createElement("div");
    loadingSpinner.classList.add("spinner");
    loadingSpinner.style.display = "none"; // Initially hidden
    form.appendChild(loadingSpinner); // Append spinner to the form

    const googleScriptURL = "https://script.google.com/macros/s/AKfycbzYsKxGLmpJtzLvp5odfcZssZ8Jbq2LyX0vPxuxarV1hK7acpxrnx0js51f4rLBTQ1k/exec";

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission

        // Disable submit button, show loading spinner
        submitButton.disabled = true;
        loadingSpinner.style.display = "block";

        // Create FormData and submit data to Google Apps Script
        const formData = new FormData(form);

        fetch(googleScriptURL, {
            method: "POST",
            body: formData,
        })
        .then(response => response.text())
        .then(data => {
            // Clear form and hide spinner after successful submission
            form.reset();
            loadingSpinner.style.display = "none";

            // Redirect to confirmation page
            window.location.href = "confirmation.html";
        })
        .catch(error => {
            console.error("Error:", error);
            loadingSpinner.style.display = "none"; // Hide spinner on error
            alert("There was an error submitting your message. Please try again.");
        })
        .finally(() => {
            // Re-enable submit button after process completion
            submitButton.disabled = false;
        });
    });

    // Clear form functionality
    clearButton.addEventListener("click", function() {
        form.reset();
        loadingSpinner.style.display = "none"; // Hide spinner if visible
    });
});
