-- init data

-- insert doctors
INSERT IGNORE INTO doctors (first_name, last_name, specialty, address, phone, email) VALUES
('John', 'Doe', 'Cardiology', '123 Main St, Cityville', '555-1234', 'john.d@email.com'),
('Jane', 'Smith', 'Dermatology', '456 Oak St, Townsville', '555-5678', 'j.smith@email.com'),
('Emily', 'Johnson', 'Pediatrics', '789 Pine St, Villageville', '555-8765', 'emily.johnson@email.com')

-- insert patients
INSERT IGNORE INTO patients (first_name, last_name, phone, email) VALUES
('Alice', 'Brown', '555-4321', 'alicebrown@email.com'),
('Bob', 'Davis', '555-6789', 'davis.b@email.com'),
('Charlie', 'Wilson', '555-9876', 'charlwil@email.com')

-- insert slots
INSERT IGNORE INTO slots (doctor_id, start_time, end_time, status) VALUES
(1, '2025-11-01 09:00:00', '2025-11-01 09:30:00', 'available'),
(1, '2025-11-01 10:00:00', '2025-11-01 10:30:00', 'available'),
(2, '2025-11-01 11:00:00', '2025-11-01 11:30:00', 'available'),
(2, '2025-11-01 12:00:00', '2025-11-01 12:30:00', 'available'),
(3, '2025-11-01 13:00:00', '2025-11-01 13:30:00', 'available'),
(3, '2025-11-01 14:00:00', '2025-11-01 14:30:00', 'available')

-- insert appointments
INSERT IGNORE INTO appointments (patient_id, slot_id) VALUES
(1, 1),
(2, 3),
(3, 5);
