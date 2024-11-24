import toast from "react-hot-toast";
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
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    toast.success(response.message);
    return response.json();
  } catch (error) {
    console.error(error);
    toast.error(error.message);
  }
}

export async function loginUser(data) {
  try {
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
    toast.success(response.message);
    return response.json();
  } catch (error) {
    console.error(error);
    toast.error(error.message);
  }
}
