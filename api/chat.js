export default async function handler(req, res) {

if (req.method !== "POST") {
return res.status(405).json({ error: "Method not allowed" });
}

try {

const message = req.body.message;

const response = await fetch("https://api.together.xyz/v1/chat/completions", {
method: "POST",
headers: {
"Authorization": "Bearer " + process.env.TOGETHER_API_KEY,
"Content-Type": "application/json"
},
body: JSON.stringify({
model: "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
messages: [
{ role: "user", content: message }
]
})
});

const data = await response.json();

res.status(200).json(data);

} catch (error) {

res.status(500).json({
error: "Server error",
details: error.message
});

}

}
