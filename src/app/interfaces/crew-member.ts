export interface CrewMember {
  id: string;
  name: string;
  image: string | null;
  wikipedia: string;
  status: string;
  agency: string;
  launches: string[];
}
