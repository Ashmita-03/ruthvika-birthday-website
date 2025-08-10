export interface BirthdayResponse {
  timestamp: string;
  email: string;
  name: string;
  nickname_given?: string;
  nickname_for_ruthvika?: string;
  heartMessage?: string;
  memory?: string;
  song?: string;
  photo?: string;
  photo2?: string;
  personalMeaning?: string;
  futurePrediction?: string;
  lifeAdvice?: string;
  finalNote?: string;
}

export interface OrganizedData {
  heartMessages: Array<{ content: string; sender: string; nicknameGiven?: string; nicknameForRuthvika?: string }>;
  memoryLane: Array<{ content: string; sender: string; nicknameGiven?: string; nicknameForRuthvika?: string }>;
  musicVibes: Array<{ content: string; sender: string; nicknameGiven?: string; nicknameForRuthvika?: string }>;
  photoGallery: Array<{ content: string; sender: string; nicknameGiven?: string; nicknameForRuthvika?: string }>;
  personalMeaning: Array<{ content: string; sender: string; nicknameGiven?: string; nicknameForRuthvika?: string }>;
  futurePredictions: Array<{ content: string; sender: string; nicknameGiven?: string; nicknameForRuthvika?: string }>;
  lifeAdvice: Array<{ content: string; sender: string; nicknameGiven?: string; nicknameForRuthvika?: string }>;
  finalNotes: Array<{ content: string; sender: string; nicknameGiven?: string; nicknameForRuthvika?: string }>;
}

export interface GoogleSheetsResponse {
  values: string[][];
}
