



function PasswordStrength({ password }) {

  let strength = "Weak";

  if (password.length > 8)
    strength = "Medium";

  if (
    password.length > 10 &&
    /[A-Z]/.test(password) &&
    /\d/.test(password)
  ) {
    strength = "Strong";
  }

  return (
    <p className="mt-2">
      Strength: {strength}
    </p>
  );
}

export default PasswordStrength;
