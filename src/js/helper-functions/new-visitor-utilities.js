const validateFirstName = (name) => {
  const pattern = /^[A-Za-z]+$/;

  if (!pattern.test(name)) {
    throw new Error("First Name must only contain strings.");
  }
};

const validateLastName = (name) => {
  const pattern = /^[A-Za-z]+$/;

  if (!pattern.test(name)) {
    throw new Error("LastName must only contain strings.");
  }
};

const validateEmail = (emailAddress) => {
  const pattern = /[A-Za-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/i;

  if (!pattern.test(emailAddress)) {
    throw new Error(
      "Email format not correct. Must be in the following order: 'characters@characters.domain'"
    );
  }
  return true;
};

module.exports = { validateFirstName, validateLastName, validateEmail };
