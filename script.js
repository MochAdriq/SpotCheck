async function fetchData() {
    try {
        const response = await fetch("http://192.168.43.13:3000/api/data");
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        console.log("Received data:", data); // Periksa data yang diterima

        // Update parking slots with the received data
        updateParkingSlots(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function updateParkingSlots(data) {
    const distanceThreshold = 10; // Same as ESP32 threshold

    let slot1Img = document.getElementById("slot1-img");
    let slot2Img = document.getElementById("slot2-img");
    let slot3Img = document.getElementById("slot3-img");

    if (slot1Img && slot2Img && slot3Img) {
        console.log("Updating images...");

        console.log(
            "d1:",
            data[data.length - 1].d1,
            "d2:",
            data[data.length - 1].d2,
            "d3:",
            data[data.length - 1].d3
        ); // Periksa nilai d1, d2, d3

        slot1Img.src =
            data[data.length - 1].d1 > distanceThreshold
                ? "slot_empty.png"
                : "slot_occupied.png";
        slot2Img.src =
            data[data.length - 1].d2 > distanceThreshold
                ? "slot_empty.png"
                : "slot_occupied.png";
        slot3Img.src =
            data[data.length - 1].d3 > distanceThreshold
                ? "slot_empty.png"
                : "slot_occupied.png";
    } else {
        console.error("One or more HTML elements not found.");
    }
}

// Fetch data on page load and then every 5 seconds
fetchData();
setInterval(fetchData, 5000);
