export async function getTeachers() {
  try {
    const response = await fetch("http://localhost:4000/teachers");
    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function registerUser(data) {
  try {
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
}
