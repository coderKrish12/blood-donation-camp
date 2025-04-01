// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface RegistrationFormData {
  name: string;
  phone: string;
  age: string; // 🔁 changed from number to string
  gender: "male" | "female";
  blood_group: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  first_time: boolean;
  last_donation_date: string | null;
}
