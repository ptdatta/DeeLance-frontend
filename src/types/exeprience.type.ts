export interface ExperienceType {
  _id: string;
  title: string;
  companyName: string;
  location: string;
  locationType: string;
  employementType: string;
  startMonth: string;
  startYear: string;
  currentlyWorkingHere: boolean | undefined | null | any;
  endMonth: string;
  endYear: string;
}
