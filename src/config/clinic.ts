// Centralized Clinic Configuration System
// Edit this file to customize the site details.

export type Testimonial = {
  name: string;
  role: string;
  text: string;
  rating: number;
};

export type ClinicProfile = {
  id: string;
  name: string;          // E.g. "Ramaya"
  displayName: string;   // E.g. "Ramaya Dentals"
  tagline: string;       // Tagline under logo
  phone: string;         // Display format "+91 9896377906"
  phoneRaw: string;      // Raw format "9896377906" (for tel: links)
  whatsappNumber: string;// Country code + number without plus (for wa.me links)
  email: string;         // Contact email
  adminEmail: string;    // Auth admin email
  address: string;       // Full physical address
  shortAddress: string;  // Short city area
  state: string;         // E.g. "Haryana"
  operatingHours: {
    weekday: string;     // E.g. "Mon - Sat: 9:30 AM - 7:00 PM"
    weekdayShort: string;// E.g. "9:30 AM - 7:00 PM"
    sunday: string;      // E.g. "Sunday: Closed"
    sundayShort: string; // E.g. "Closed"
  };
  doctorName: string;
  doctorTitle: string;
  googleMapsEmbedUrl: string;
  googleMapsTitle: string;
  googleMapsDirectionUrl: string;
  socials: {
    instagram: string;   // Instagram URL or handle
    facebook: string;    // Facebook URL
    twitter?: string;    // Twitter URL
  };
  features: {
    parking: string;
    railwayDistance: string;
  };
  testimonials: Testimonial[];
};

const profiles: Record<string, ClinicProfile> = {
  smilix: {
    id: "smilix",
    name: "Dental",
    displayName: "Smilix Premium Dental",
    tagline: "Premium Dental Care & Aesthetics",
    phone: "+91 9034010351",
    phoneRaw: "9034010351",
    whatsappNumber: "919034010351",
    email: "contact@smilix.com",
    adminEmail: "admin@smilix.com",
    address: "123 Smile Avenue, Medical Enclave, Rohtak, Haryana 124001",
    shortAddress: "Medical Enclave, Rohtak",
    state: "Haryana",
    operatingHours: {
      weekday: "Mon - Sat: 9:00 AM - 8:00 PM",
      weekdayShort: "9:00 AM - 8:00 PM",
      sunday: "Sunday: 10:00 AM - 2:00 PM",
      sundayShort: "10:00 AM - 2:00 PM",
    },
    doctorName: "Dr. Sachin Yadav",
    doctorTitle: "BDS, MDS (Orthodontics)",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3490.7237070104107!2d76.60946277626966!3d28.891461273934335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d853df05bf90f%3A0xe5a363db8805f25d!2sMedical%20Enclave%2C%20Rohtak%2C%20Haryana%20124001!5e0!3m2!1sen!2sin!4v1718710000000!5m2!1sen!2sin",
    googleMapsTitle: "Google Maps Location for Medical Enclave Rohtak",
    googleMapsDirectionUrl: "https://www.google.com/maps/dir/?api=1&destination=Medical+Enclave+Rohtak+Haryana+124001",
    socials: {
      instagram: "https://instagram.com/smilix",
      facebook: "https://facebook.com/smilix",
    },
    features: {
      parking: "Free Dedicated Patient Parking Available",
      railwayDistance: "4.5 km from Rohtak Junction (approx. 10 mins)",
    },
    testimonials: [
      {
        name: "Rahul Verma",
        role: "Local Resident",
        text: "The best dental experience I've ever had. Painless root canal and the staff is incredibly friendly. Highly recommend!",
        rating: 5
      },
      {
        name: "Priya Sharma",
        role: "Student",
        text: "Got my teeth whitening done here. The results are amazing and the process was so comfortable.",
        rating: 5
      },
      {
        name: "Amit Patel",
        role: "Business Owner",
        text: "Very professional and clean environment. They explain everything before proceeding with the treatment.",
        rating: 5
      },
      {
        name: "Sneha Gupta",
        role: "Teacher",
        text: "My kids used to fear the dentist, but the doctors here made them so comfortable. It's truly a family-friendly clinic.",
        rating: 5
      }
    ]
  },
  ramaya: {
    id: "ramaya",
    name: "Ramaya",
    displayName: "Ramaya Dentals",
    tagline: "Multi Speciality Dental Clinic & Implant Centre",
    phone: "+91 9896377906",
    phoneRaw: "9896377906",
    whatsappNumber: "919896377906",
    email: "info@ramayadentals.com",
    adminEmail: "admin@ramayadentals.com",
    address: "SCF-41, Ground Floor, HUDA Complex, Near SBI, Model Town, Rohtak, Haryana 124001",
    shortAddress: "Model Town, Rohtak",
    state: "Haryana",
    operatingHours: {
      weekday: "Mon - Sat: 9:00 AM - 7:00 PM",
      weekdayShort: "9:00 AM - 7:00 PM",
      sunday: "Sunday: 9:00 AM - 2:30 PM",
      sundayShort: "9:00 AM - 2:30 PM",
    },
    doctorName: "Dr. Madhur & Dr. Deepanshi",
    doctorTitle: "BDS, MDS (Dental Implant & RCT Specialists)",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3493.077860326446!2d76.5823616!3d28.8960343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d85521df6d8e9%3A0x828edba1d1020a7f!2sRamaya%20Dentals%20-%20Dental%20Care%20Clinic%20%7C%20Top%20Dentist%20in%20Rohtak%20%7C%20Dental%20Implant%20in%20Rohtak!5e0!3m2!1sen!2sin!4v1718710000000!5m2!1sen!2sin",
    googleMapsTitle: "Ramaya Dentals – SCF-41, HUDA Complex, Rohtak, Haryana 124001",
    googleMapsDirectionUrl: "https://www.google.com/maps/dir/?api=1&destination=Ramaya+Dentals+SCF-41+HUDA+Complex+Rohtak+Haryana+124001&destination_place_id=ChIJ6dg2UlKFDTkRf6DhtNtr6II",
    socials: {
      instagram: "https://www.instagram.com/ramayadentals",
      facebook: "https://www.facebook.com/ramayadentals",
    },
    features: {
      parking: "Patient Parking Available in HUDA Complex Market Area",
      railwayDistance: "3.8 km from Rohtak Junction (approx. 8 mins)",
    },
    testimonials: [
      {
        name: "Bhupender Saini",
        role: "Local Guide",
        text: "Excellent Dental Implant Experience at Ramaya Dentals. Smooth Multi-Seating Procedure: My wife's dental implants involved multiple stages and the doctors guided us with patience, skill, and care.",
        rating: 5
      },
      {
        name: "Siddharth Rehani",
        role: "Local Guide",
        text: "Main yahan apna tooth transplant karwane aaya tha, honestly thoda nervous tha. Lekin Dr. Madhur ne start se hi pura process clear samjhaya, recovery kaisi rahegi – sab practical tareeke se bataya.",
        rating: 5
      },
      {
        name: "Bhavesh Batra",
        role: "Local Guide",
        text: "I had a RCT from Ramaya Dental Clinic and I am fully satisfied with the treatment and results. Both Dr. Madhur and Dr. Deepanshi are humble and nice in nature. This clinic is highly recommended!",
        rating: 5
      },
      {
        name: "Simrat Kaur",
        role: "Patient",
        text: "I recently had root canal treatment at Ramaya Dental Clinic, and I am extremely satisfied with the results. The clinic is clean, hygienic, well-organised, and equipped with modern machinery.",
        rating: 5
      },
      {
        name: "Priyanka Lather",
        role: "International Patient (Australia)",
        text: "I came from Australia for my dental treatment and recently visited Ramaya Dental Care Clinic. I am satisfied with my treatment and highly recommend this clinic, it's very affordable.",
        rating: 5
      },
      {
        name: "Mansi Harjai",
        role: "Patient",
        text: "The best dental clinic I've visited. Very professional service and modern technology used for my implants. They did painless procedures and clear explanations of treatment plans. Fully satisfied!",
        rating: 5
      }
    ]
  },
  shaista: {
    id: "shaista",
    name: "Shaista",
    displayName: "Shaista Dental Clinic",
    tagline: "RCT, Smile Makeover & Fixed Implant Teeth Specialist",
    phone: "+91 9817977070",
    phoneRaw: "9817977070",
    whatsappNumber: "919817977070",
    email: "contact@shaistadental.com",
    adminEmail: "admin@shaistadental.com",
    address: "Subhash Rd, opp. Akashwani, near LIC, Company Bagh, Rohtak, Haryana 124001",
    shortAddress: "Company Bagh, Rohtak",
    state: "Haryana",
    operatingHours: {
      weekday: "Mon - Sat: 9:30 AM - 7:30 PM",
      weekdayShort: "9:30 AM - 7:30 PM",
      sunday: "Sunday: Closed",
      sundayShort: "Closed",
    },
    doctorName: "Dr. Avneet Yadav & Dr. R P Yadav",
    doctorTitle: "MDS (RCT & Smile Makeover Specialist) & Senior Dental Surgeon",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3529.392872912889!2d76.5900017!3d28.898128800000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d85a6991d8bbd%3A0x44cc544b650a07f2!2sDr%20Avneet%20Yadav%E2%80%99s%20Shaista%20Dental%20Clinic%20(%20RCT%20%2C%20Smile%20makeover%20and%20Fixed%20implant%20teeth%20Specialist!5e1!3m2!1sen!2sin!4v1781977103880!5m2!1sen!2sin",
    googleMapsTitle: "Dr Avneet Yadav’s Shaista Dental Clinic – Subhash Rd, opp. Akashwani, near LIC, Company Bagh, Rohtak, Haryana 124001",
    googleMapsDirectionUrl: "https://www.google.com/maps/dir/?api=1&destination=Dr+Avneet+Yadav’s+Shaista+Dental+Clinic+Rohtak",
    socials: {
      instagram: "https://www.instagram.com/shaistadental",
      facebook: "https://www.facebook.com/dravneetofficial",
    },
    features: {
      parking: "Patient Parking Available nearby Company Bagh area",
      railwayDistance: "2.5 km from Rohtak Junction (approx. 6 mins)",
    },
    testimonials: [
      {
        name: "Neha Sharma",
        role: "Patient",
        text: "I had a great experience at Shaista Dental Clinic. I recently got my teeth crowned here, and the entire process was smooth and professional. The doctor and staff were friendly, knowledgeable, and made me feel comfortable throughout.",
        rating: 5
      },
      {
        name: "Aryan Hooda",
        role: "Patient",
        text: "Dr. Avneet Yadav did perfect tooth extraction and RCT of my upper last tooth. Best dentist in Rohtak. Thank you doc!",
        rating: 5
      },
      {
        name: "Rishi Kumari",
        role: "Patient",
        text: "I had a wonderful experience at Dr. Avneet Yadav's dental clinic. Dr. Avneet is an excellent and very knowledgeable dentist who explains every procedure clearly and makes you feel completely comfortable. The clinic is clean.",
        rating: 5
      },
      {
        name: "Shaily Khatri",
        role: "Patient",
        text: "I am a kidney patient and was recommended Dr. Avneet. I must say the clinic is very neat and clean – 5 stars! He did my third molar extraction painless. Best dentist in Rohtak.",
        rating: 5
      },
      {
        name: "Riya Sharma",
        role: "Patient",
        text: "Undoubtedly the best dental clinic of Rohtak. Dr. Avneet is the best in his work and has great skills. I got my implant done from here and it was painless, and now I also have a crown on it. I highly recommend him.",
        rating: 5
      }
    ]
  }
};

// ==========================================
// TO REVERT OR SWITCH: CHANGE THIS VALUE
// Available options: 'smilix' | 'ramaya' | 'shaista'
// ==========================================
export const ACTIVE_CLINIC_ID: 'smilix' | 'ramaya' | 'shaista' = 'shaista';

export const CLINIC_CONFIG: ClinicProfile = profiles[ACTIVE_CLINIC_ID];
