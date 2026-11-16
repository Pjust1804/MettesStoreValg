const form = document.getElementById("dateForm");
const comment = document.getElementById("comment");
const submitButton = document.getElementById("submitButton");
const confirmation = document.getElementById("confirmation");
const selectedDate = document.getElementById("selectedDate");

function updateButton() {
    const selected = document.querySelector(
        'input[name="date"]:checked'
    );

    submitButton.disabled = !selected && !comment.value.trim();
}

form.addEventListener("change", updateButton);
comment.addEventListener("input", updateButton);

form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const data = new FormData(form);
    const selected = data.get("date");

    submitButton.disabled = true;
    submitButton.textContent = "Sender...";

    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: data,
            headers: {
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Submission failed");
        }

        if (selected) {
            selectedDate.textContent = "Du har valgt: " + selected;
        } else {
            selectedDate.textContent = "Dit eget forslag er modtaget.";
        }

        form.hidden = true;
        confirmation.hidden = false;

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } catch (error) {
        alert("Noget gik galt. Prøv igen.");
        submitButton.textContent = "Bekræft mit valg";
        updateButton();
    }
});