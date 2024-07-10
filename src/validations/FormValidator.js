class FormValidator {
  static isAdult(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      return age - 1 >= 18;
    }
    return age >= 18;
  }

  static validate(values) {
    const errors = {};

    // Check for required fields
    const requiredFields = [
      'firstName',
      'lastName',
      'address',
      'phone',
      'dob',
      'email',
      'consultationMethod',
      'diagnosis',
      'primaryReason',
      'referringPhysician',
    ];

    requiredFields.forEach((field) => {
      if (!values[field]) {
        errors[field] = 'Required';
      }
    });

    // Check for valid email format
    if (values.email && !/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    // Check if dob indicates the user is an adult
    if (values.dob && !this.isAdult(values.dob)) {
      errors.dob = 'Must be at least 18 years old';
    }

    return errors;
  }
}

export default FormValidator;
