export type EducationId = number | string | null;

export interface EducationType {
  degree: string;
  school: string;
  graduation_year: number;
  _id: EducationId;
}

export interface EducationCardProps extends EducationType {
  onEditClick: (certificate: EducationType) => void;
}
