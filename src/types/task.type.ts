export interface TaskType {
  _id?: string;
  userId: string; // ID reference to the User who created the task
  title: string; // Title of the task
  keywords?: string[]; // Optional array of keywords
  pricingTitle?: string; // Optional pricing title
  description: string; // Description of the task
  deliveryDays?: number; // Number of days for delivery
  price: number; // Price of the task
  packageDescription?: string; // Optional package description
  images?: { url: string }[]; // Optional array of image URLs
  isPublish?: boolean; // Indicates if the task is published
  faqs?: { question: string; answer: string }[]; // Optional array of FAQs
  subCategory?: string; // Optional sub-category of the task
  category?: string; // Optional category of the task
  revision?: string; // Optional revision notes
  blockchainCreationStatus?: "init" | "success" | "failed"; // Status of blockchain creation
}
