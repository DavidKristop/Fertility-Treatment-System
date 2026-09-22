# Fertility Treatment System

## Project Overview

Fertility Treatment System is a web-based platform designed to support fertility clinics in managing and monitoring infertility treatment processes, particularly Intrauterine Insemination (IUI) and In Vitro Fertilization (IVF).

The system provides a centralized workflow connecting patients, doctors, clinic staff, managers, and administrators. It helps manage consultation requests, medical appointments, treatment protocols, treatment phases, prescriptions, service payments, contracts, reminders, and treatment results.

The platform aims to reduce manual administrative work, prevent scheduling conflicts, improve treatment progress tracking, and provide patients with clear visibility into their treatment journey.

## Motivation

Infertility treatment is a long and complex process involving multiple consultations, medical services, medications, payments, and treatment phases. When this information is managed manually or across disconnected systems, clinics may face problems such as scheduling conflicts, missed appointments, incomplete payments, and difficulty tracking treatment progress.

This project was developed to digitalize and centralize that process, allowing clinics to manage treatment workflows more efficiently while improving communication between patients and medical staff.

## Core Workflow

1. A patient registers an account and submits a consultation appointment request.
2. A doctor reviews and accepts or rejects the request.
3. Once accepted, the system creates a consultation schedule and payment request.
4. After the consultation, the doctor selects an IUI or IVF protocol and creates a treatment plan.
5. The system generates a treatment contract for the patient.
6. After the patient signs the contract and completes the required payment, the treatment becomes active.
7. The doctor configures schedules, medical services, and medications for each treatment phase.
8. Clinic staff manage medication delivery and payment processing.
9. The patient follows the treatment schedule and receives reminders.
10. When all requirements of the current phase are completed, the treatment advances to the next phase.
11. The treatment is completed after all phases have been successfully processed.

## Key Features

- Role-based authentication and authorization using JWT
- Patient registration and email verification
- Consultation appointment request management
- Doctor and patient schedule conflict validation
- IUI and IVF treatment protocol management
- Multi-phase treatment plan tracking
- Digital treatment contract management
- Full-payment and phase-based payment support
- Medical service and drug management
- Medication assignment and delivery tracking
- Appointment and payment reminders
- Treatment result and medical image management
- Automated processing of expired contracts, payments, and appointment requests
- User, doctor, staff, and clinic resource management

## User Roles

- **Patient:** Requests consultations, signs contracts, makes payments, and monitors treatment progress.
- **Doctor:** Handles consultation requests, creates treatment plans, manages schedules, and records results.
- **Staff:** Processes payments, manages medication delivery, and supports clinic operations.
- **Manager:** Manages services, drugs, treatment protocols, contracts, doctors, and staff.
- **Administrator:** Manages system users and account access.

## Technology Stack

### Backend

- Java
- Spring Boot
- Spring Security
- Spring Data JPA
- PostgreSQL
- JWT Authentication
- Maven
- Cloudinary

### Frontend

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Material UI and Radix UI
