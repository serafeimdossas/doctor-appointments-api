const validateDoctor = (req, res, next) => {
  try {
    const { first_name, last_name, specialty, address, phone, email } =
      req.body;

    if (!first_name || first_name.length === 0 || first_name.length > 100) {
      return res.status(400).json({
        message:
          "First name must be provided and have a value not greater than 100 chars",
      });
    }

    if (!last_name || last_name.length === 0 || last_name.length > 100) {
      return res.status(400).json({
        message:
          "Last name must be provided and have a value not greater than 100 chars",
      });
    }

    if (!specialty || specialty.length === 0 || specialty.length > 100) {
      return res.status(400).json({
        message:
          "Specialty must be provided and have a value not greater than 100 chars",
      });
    }

    if (!address || address.length === 0 || address.length > 255) {
      return res.status(400).json({
        message:
          "Address must be provided and have a value not greater than 255 chars",
      });
    }

    if (!phone || phone.length === 0 || phone.length > 15) {
      return res.status(400).json({
        message:
          "Phone must be provided and have a value not greater than 15 chars",
      });
    }

    if (!email || email.length === 0 || email.length > 100) {
      return res.status(400).json({
        message:
          "Email must be provided and have a value not greater than 100 chars",
      });
    }

    // all checks not triggered move on
    next();
  } catch (error) {
    console.error("Failed to validate doctor schema:", error);
    return res.status(500).json({ message: "Failed to create doctor" });
  }
};

const validatePatient = (req, res, next) => {
  try {
    const { first_name, last_name, phone, email } = req.body;

    if (!first_name || first_name.length === 0 || first_name.length > 100) {
      return res.status(400).json({
        message:
          "First name must be provided and have a value not greater than 100 chars",
      });
    }

    if (!last_name || last_name.length === 0 || last_name.length > 100) {
      return res.status(400).json({
        message:
          "Last name must be provided and have a value not greater than 100 chars",
      });
    }

    if (!phone || phone.length === 0 || phone.length > 15) {
      return res.status(400).json({
        message:
          "Phone must be provided and have a value not greater than 15 chars",
      });
    }

    if (!email || email.length === 0 || email.length > 100) {
      return res.status(400).json({
        message:
          "Email must be provided and have a value not greater than 100 chars",
      });
    }

    // all checks not triggered move on
    next();
  } catch (error) {
    console.error("Failed to validate patient schema:", error);
    return res.status(500).json({ message: "Failed to create patient" });
  }
};

module.exports = {
  validateDoctor,
  validatePatient,
};
