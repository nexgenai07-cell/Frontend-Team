// ==========================================
// PASSWORD STRENGTH CHECKER
// ==========================================
// password string leta hai
// strength object return karta hai
// score, label, aur color return karta hai

export const checkPasswordStrength = (password) => {
  // Score 0 se shuru hoga — har condition pe badhega
  let score = 0;

  // Agar password empty hai — seedha very weak return karo
  if (!password) {
    return { score: 0, label: "Very Weak", color: "bg-red-500", width: "w-0" };
  }

  // 8 se zyada characters hain — score badha
  if (password.length >= 8) score++;

  // 12 se zyada characters hain — score aur badha
  if (password.length >= 12) score++;

  // Koi bhi lowercase letter hai — a to z
  if (/[a-z]/.test(password)) score++;

  // Koi bhi uppercase letter hai — A to Z
  if (/[A-Z]/.test(password)) score++;

  // Koi bhi number hai — 0 to 9
  if (/[0-9]/.test(password)) score++;

  // Koi bhi special character hai — !@#$% etc
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  // Score ke hisaab se label aur color decide karo
  if (score <= 1)
    return { score, label: "Very Weak", color: "bg-red-500", width: "w-1/5" };
  if (score <= 2)
    return { score, label: "Weak", color: "bg-orange-500", width: "w-2/5" };
  if (score <= 3)
    return { score, label: "Fair", color: "bg-yellow-500", width: "w-3/5" };
  if (score <= 4)
    return { score, label: "Strong", color: "bg-blue-500", width: "w-4/5" };
  return {
    score,
    label: "Very Strong",
    color: "bg-green-500",
    width: "w-full",
  };
};

// ==========================================
// PASSWORD GENERATOR
// ==========================================
// koi argument nahi leta
// ek strong random password return karta hai
// jaise: A7#mQ9!KxP2@

export const generateStrongPassword = () => {
  // Har category ke characters define kar rahy hain
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const special = "!@#$%^&*";

  // Sab characters ek jagah
  const allChars = uppercase + lowercase + numbers + special;

  // Password yahan store hoga
  let password = "";

  // Pehle har category se ek ek character lao
  // Taake password mein sab types zaroor hon
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += special[Math.floor(Math.random() * special.length)];

  // Baaki 8 characters random lao — total 12 characters
  for (let i = 0; i < 8; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Password ke characters shuffle karo
  // Taake pehle 4 characters predictable na hon
  const shuffled = password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  return shuffled;
};
