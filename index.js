document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("matchButton");
    button.addEventListener("click", () => {
        const enteredName = document.getElementById("userName").value;
        fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then(users => {
                const user = users.find(user => user.firstName.toLowerCase() === enteredName.toLowerCase());
                if (user) {
                    const matches = users.filter(u =>
                        (u.location === user.location || u.university === user.university) && u.firstName !== user.firstName
                    );
                    if (matches.length > 0) {
                        const match = matches[0]; // Just taking the first match for demonstration
                        document.getElementById("matchName").textContent = `Name: ${match.firstName}`;
                        document.getElementById("matchUniversity").textContent = `University: ${match.university}`;
                        document.getElementById("matchLocation").textContent = `Location: ${match.location}`;
                    } else {
                        document.getElementById("matchName").textContent = "No match found.";
                        document.getElementById("matchUniversity").textContent = "";
                        document.getElementById("matchLocation").textContent = "";
                    }
                } else {
                    document.getElementById("matchName").textContent = "User not found.";
                    document.getElementById("matchUniversity").textContent = "";
                    document.getElementById("matchLocation").textContent = "";
                }
            })
            .catch(error => console.log('Error fetching users:', error));
    });
});
const updateUser = (userId, updatedUser) => {
    fetch(`http://localhost:3000/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
    })
    .then(response => response.json())
    .then(data => console.log('Updated:', data))
    .catch(error => console.error('Error updating user:', error));
};

document.getElementById('updateButton').addEventListener('click', () => {
    const updatedUser = {
        firstName: "Alice",
        lastName: "Johnson",
        university: "Updated University",
        location: "Updated Location"
    };
    const userId = 1; // This should be dynamically set based on user selection or similar
    updateUser(userId, updatedUser);
});
