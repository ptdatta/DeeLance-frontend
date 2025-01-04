export type CertificateId = number | string | null;

export interface CertificateType {
  certificateName: string;
  issueBy: string;
  yearIssued: number;
  _id: CertificateId;
}

export interface CertificateCardProps extends CertificateType {
  onEditClick: (certificate: CertificateType) => void;
  onDeleteClick: (certificateId: any) => void;
}
