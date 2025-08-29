const http = require("http");

// Test GET /users
console.log("Testing GET /users...");
const getReq = http.request(
  "http://localhost:3000/users",
  { method: "GET" },
  (res) => {
    let data = "";
    res.on("data", (chunk) => (data += chunk));
    res.on("end", () => {
      console.log("GET /users Response:", data);
      testPostUser();
    });
  }
);
getReq.on("error", (err) => console.error("GET Error:", err.message));
getReq.end();

function testPostUser() {
  console.log("\nTesting POST /users...");
  const postData = JSON.stringify({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    age: 30,
  });

  const postReq = http.request(
    "http://localhost:3000/users",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": postData.length,
      },
    },
    (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        console.log("POST /users Response:", data);
        console.log("\n✅ Critical-path testing completed!");
      });
    }
  );
  postReq.on("error", (err) => console.error("POST Error:", err.message));
  postReq.write(postData);
  postReq.end();
}
