// ==========================================
// EMAIL VALIDATOR
// ==========================================
// email string leta hai
// error message return karta hai — ya null agar sahi hai

export const validateEmail = (email) => {
  // Empty check — kuch likha hai ya nahi
  if (!email || email.trim() === "") {
    return "Email is required";
  }

  // Email format check karne ke liye regex
  // @ hona chahiye, domain hona chahiye
  // extension kam az kam 2 characters ki honi chahiye — .com .io .pk etc
  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    return "Invalid email format";
  }

  // Sab theek — null return karo matlab koi error nahi
  return null;
};

// ==========================================
// PASSWORD VALIDATOR
// ==========================================
// password string leta hai
// error message return karta hai — ya null agar sahi hai

export const validatePassword = (password) => {
  // Empty check
  if (!password || password.trim() === "") {
    return "Password is required";
  }

  // Minimum 8 characters hone chahiye
  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }

  // Kam az kam ek uppercase letter hona chahiye
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter";
  }

  // Kam az kam ek number hona chahiye
  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number";
  }

  // Kam az kam ek special character hona chahiye
  if (!/[^a-zA-Z0-9]/.test(password)) {
    return "Password must contain at least one special character (!@#$%)";
  }

  // Sab theek — null return karo
  return null;
};

// ==========================================
// NAME VALIDATOR
// ==========================================
// name string leta hai
// error message return karta hai — ya null agar sahi hai

export const validateName = (name) => {
  // Empty check
  if (!name || name.trim() === "") {
    return "Name is required";
  }

  // Sirf spaces nahi hone chahiye — trim ke baad bhi kuch hona chahiye
  if (name.trim().length < 2) {
    return "Name must be at least 2 characters";
  }

  // Sab theek — null return karo
  return null;
};

// ==========================================
// CONFIRM PASSWORD VALIDATOR
// ==========================================
// password aur confirmPassword dono leta hai
// check karta hai dono same hain ya nahi

export const validateConfirmPassword = (password, confirmPassword) => {
  // Empty check
  if (!confirmPassword || confirmPassword.trim() === "") {
    return "Please confirm your password";
  }

  // Dono same hain ya nahi
  if (password !== confirmPassword) {
    return "Passwords do not match";
  }

  // Sab theek — null return karo
  return null;
};

// ==========================================
// SIGNUP FORM VALIDATOR
// ==========================================
// Signup ki poori form ek baar mein validate karta hai
// Sab fields ka object leta hai
// Errors ka object return karta hai

export const validateSignupForm = ({
  name,
  email,
  password,
  confirmPassword,
}) => {
  // Har field validate karo — upar wale functions use kar rahy hain
  const errors = {
    name: validateName(name),
    email: validateEmail(email),
    password: validatePassword(password),
    confirmPassword: validateConfirmPassword(password, confirmPassword),
  };

  // Koi bhi error hai ya nahi — true/false
  // Object ki values mein se null ke alawa kuch bhi hai toh error hai
  const hasErrors = Object.values(errors).some((error) => error !== null);

  return { errors, hasErrors };
};

// ==========================================
// LOGIN FORM VALIDATOR
// ==========================================
// Login ki form validate karta hai
// Sirf email aur password

export const validateLoginForm = ({ email, password }) => {
  const errors = {
    email: validateEmail(email),
    password: !password ? "Password is required" : null,
  };

  const hasErrors = Object.values(errors).some((error) => error !== null);

  return { errors, hasErrors };
};
