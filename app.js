async function addExpense() {
    //1.Get values from your input boxes using their IDS
    const expenseName = document.getElementById("expense").value;
    const amountValue = document.getElementById("amount").value;

    //Stop if the user leaves boxes blank
    if(!expenseName || !amountValue) {
        alert("Please fill out both fields!");
        return;
    }
//2. Send the data  to your backend server database
try{
    const response = await fetch("http://localhost:3000/api/expenses", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: expenseName,
            amount: Number(amountValue)
        })
    });
    const savedData = await response.json();
    console.log("Saved to database:", savedData);

    //3. Create and show the new list item on your screen
    const li = document.createElement("li");
    li.textContent = `${expenseName} - $${amountValue}`;
    document.getElementById("list").appendChild(li);

    //Clear the input boxes for the next entry
    document.getElementById("expense").value ="";
    document.getElementById("amount").value ="";
} catch (error) {
    console.error("Connection error:", error);
    alert("Could not save to the database. Is your server running?");
}
}