export function validateSignup(form, options = {}) {
  const { phoneRequired = false } = options;

  if (!form.name || form.name.trim().length < 2) {
    return "Name must be at least 2 characters";
  }

  if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    return "Please enter a valid email address";
  }

  if (!form.password || form.password.length < 8) {
    return "Password must be at least 8 characters";
  }

  if (!/[0-9]/.test(form.password)) {
    return "Password must contain at least one number";
  }

  if (phoneRequired && !/^\d{10}$/.test(form.phone || "")) {
    return "Phone number must be 10 digits";
  }

  if (form.phone && !/^\d{10}$/.test(form.phone)) {
    return "Phone number must be 10 digits";
  }

  return null;
}
