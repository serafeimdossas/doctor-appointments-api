const { Sequelize, DataTypes, NOW } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "mysql",
  logging: false,
  define: { timestamps: false },
  pool: { max: 5, min: 0, idle: 10000 },
});

// Entities

const Doctor = sequelize.define(
  "Doctor",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: { type: DataTypes.STRING(100), allowNull: false },
    last_name: { type: DataTypes.STRING(100), allowNull: false },
    specialty: { type: DataTypes.STRING(100), allowNull: false },
    address: { type: DataTypes.STRING(255), allowNull: false },
    phone: { type: DataTypes.STRING(15), allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  },
  { tableName: "doctor" }
);

const Patient = sequelize.define(
  "Patient",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: { type: DataTypes.STRING(100), allowNull: false },
    last_name: { type: DataTypes.STRING(100), allowNull: false },
    phone: { type: DataTypes.STRING(15), allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  },
  { tableName: "patient" }
);

const Slot = sequelize.define(
  "Slot",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    doctor_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    start_time: { type: DataTypes.DATE, allowNull: false },
    end_time: { type: DataTypes.DATE, allowNull: false },
    status: {
      type: DataTypes.ENUM("available", "booked"),
      allowNull: false,
      defaultValue: "available",
    },
  },
  { tableName: "slot" }
);

const Appointment = sequelize.define(
  "Appointment",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    patient_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    slot_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    book_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  { tableName: "appointment" }
);

// Constraints

// Doctor - Slot
Doctor.hasMany(Slot, { foreignKey: "doctor_id", as: "slots" });
Slot.belongsTo(Doctor, { foreignKey: "doctor_id", as: "doctor" });

// Appointment - Patient
Patient.hasMany(Appointment, { foreignKey: "patient_id", as: "appointment" });
Appointment.belongsTo(Patient, { foreignKey: "patient_id", as: "patient" });

// Appointment - Slot
Slot.hasOne(Appointment, { foreignKey: "slot_id", as: "appointment" });
Appointment.belongsTo(Slot, { foreignKey: "slot_id", as: "slot" });

module.exports = {
  sequelize,
  Doctor,
  Patient,
  Slot,
  Appointment,
};
