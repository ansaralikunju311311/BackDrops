async function testProd() {
  const url = "https://backdrops.onrender.com/api/contact";
  console.log(`Sending POST to ${url}`);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fullName: "John Doe",
        companyName: "Acme Inc",
        email: "john@example.com",
        phoneNumber: "+1234567890",
        message: "This is a test message of 10+ characters"
      })
    });
    console.log(`Status: ${response.status} ${response.statusText}`);
    const text = await response.text();
    console.log(`Body: ${text}`);
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

testProd();
