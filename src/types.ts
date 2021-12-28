export interface ItemType {
  category: string;
  city: string;
  contact: string;
  degree: string;
  departament: string;
  description: string;
  id: string;
  maxPeople: string;
  minPoints: minPoints;
  name: string[];
  recruitment: recruitment[];
  requiredSubjects: requiredSubjects[];
  subjects: subjects[];
  tags: string[];
  type: string;
  university: string;
  website: string;
  willStudy: any[];
  willStudyCount: number;
}

interface minPoints {
  year: string;
  value: string;
}

interface recruitment {
  from: string;
  to: string;
  text: string;
}
interface requiredSubjects {
  name: string;
  level: string;
}
interface subjects {
  description: string;
  ects: string;
  hours: string;
  name: string;
  year: string;
}
