import { useQuery } from '@tanstack/react-query';
import { BirthdayResponse, GoogleSheetsResponse, OrganizedData } from '@/types/birthday';

const API_ENDPOINT = `https://sheets.googleapis.com/v4/spreadsheets/10py4320SY5r09H1NvO6dy5nJmxNP1zUzwVULC_xU9lU/values/Form Responses 1?key=${import.meta.env.VITE_GOOGLE_SHEETS_API_KEY}`;

function parseSheetData(data: GoogleSheetsResponse): OrganizedData {
  const rows = data.values || [];
  const organized: OrganizedData = {
    heartMessages: [],
    memoryLane: [],
    musicVibes: [],
    photoGallery: [],
    personalMeaning: [],
    futurePredictions: [],
    lifeAdvice: [],
    finalNotes: []
  };

  // Skip header row and process data rows
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row || row.length < 4) continue;

    // Column mapping based on Google Sheets structure:
    // A: Timestamp (0)
    // B: Email (1) 
    // C: Name (2) - Use this as sender instead of email
    // D: Nickname given by Ruthvika (3)
    // E: Nickname for Ruthvika (4) 
    // F: Heart Message/Birthday wish (5)
    // G: Memory (6)
    // H: Song (7) 
    // I: Photo 1 (8)
    // J: Photo 2 (9)
    // K: Personal meaning (10)
    // L: Future prediction (11)
    // M: Life advice (12)
    // N: Final note (13)

    const sender = row[2] || 'Anonymous Friend'; // Use name from column C instead of email
    const nicknameGiven = row[3] || ''; // Column D - nickname given by Ruthvika
    const nicknameForRuthvika = row[4] || ''; // Column E - nickname for Ruthvika
    
    // Map columns to correct sections
    if (row[5]) organized.heartMessages.push({ content: row[5], sender, nicknameGiven, nicknameForRuthvika });
    if (row[6]) organized.memoryLane.push({ content: row[6], sender, nicknameGiven, nicknameForRuthvika });
    if (row[7]) organized.musicVibes.push({ content: row[7], sender, nicknameGiven, nicknameForRuthvika });
    
    // Handle both photo columns
    if (row[8]) organized.photoGallery.push({ content: row[8], sender, nicknameGiven, nicknameForRuthvika });
    if (row[9]) organized.photoGallery.push({ content: row[9], sender, nicknameGiven, nicknameForRuthvika });
    
    if (row[10]) organized.personalMeaning.push({ content: row[10], sender, nicknameGiven, nicknameForRuthvika });
    if (row[11]) organized.futurePredictions.push({ content: row[11], sender, nicknameGiven, nicknameForRuthvika });
    if (row[12]) organized.lifeAdvice.push({ content: row[12], sender, nicknameGiven, nicknameForRuthvika });
    if (row[13]) organized.finalNotes.push({ content: row[13], sender, nicknameGiven, nicknameForRuthvika });
  }

  return organized;
}

// Demo data for testing
function getDemoData(): OrganizedData {
  return {
    heartMessages: [
      { content: "Happy 18th birthday, Ruthvika! You're such an amazing friend and I'm so grateful to have you in my life. Here's to many more years of friendship and adventure!", sender: "Sarah", nicknameGiven: "Sunshine", nicknameForRuthvika: "Ruthy" },
      { content: "Wishing you the happiest of birthdays! You always know how to make everyone laugh and your positive energy is contagious. Have the best day ever!", sender: "Mike", nicknameGiven: "Comedian", nicknameForRuthvika: "R" },
      { content: "Happy birthday to one of the kindest people I know! Your friendship means the world to me. Can't wait to celebrate with you!", sender: "Emma", nicknameGiven: "Angel", nicknameForRuthvika: "Ruthie" }
    ],
    memoryLane: [
      { content: "Remember when we got lost during our road trip but ended up finding that amazing ice cream shop? That was such a fun day!", sender: "Sarah", nicknameGiven: "Sunshine", nicknameForRuthvika: "Ruthy" },
      { content: "That time you helped me practice for my presentation and we stayed up until 3 AM - you're such a good friend!", sender: "Mike", nicknameGiven: "Comedian", nicknameForRuthvika: "R" }
    ],
    musicVibes: [
      { content: "https://open.spotify.com/track/4iV5W9uYEdYUVa79Axb7Rh", sender: "Sarah", nicknameGiven: "Sunshine", nicknameForRuthvika: "Ruthy" },
      { content: "https://open.spotify.com/track/7qiZfU4dY1lWllzX7mPBI3", sender: "Emma", nicknameGiven: "Angel", nicknameForRuthvika: "Ruthie" }
    ],
    photoGallery: [
      { content: "https://example.com/photo1.jpg", sender: "Sarah", nicknameGiven: "Sunshine", nicknameForRuthvika: "Ruthy" },
      { content: "https://example.com/photo2.jpg", sender: "Mike", nicknameGiven: "Comedian", nicknameForRuthvika: "R" }
    ],
    personalMeaning: [
      { content: "You always know how to cheer me up when I'm having a bad day. Your friendship is one of my greatest treasures.", sender: "Emma", nicknameGiven: "Angel", nicknameForRuthvika: "Ruthie" },
      { content: "Your creativity and artistic talent inspire me every day. You see beauty in everything!", sender: "Sarah", nicknameGiven: "Sunshine", nicknameForRuthvika: "Ruthy" }
    ],
    futurePredictions: [
      { content: "I predict you'll become a famous artist and your work will be displayed in galleries around the world!", sender: "Emma", nicknameGiven: "Angel", nicknameForRuthvika: "Ruthie" },
      { content: "You're going to travel to every continent and have the most amazing adventures. I can't wait to see all your travel photos!", sender: "Sarah", nicknameGiven: "Sunshine", nicknameForRuthvika: "Ruthy" }
    ],
    lifeAdvice: [
      { content: "Never stop being your wonderful, authentic self. The world needs more people like you!", sender: "Mike", nicknameGiven: "Comedian", nicknameForRuthvika: "R" },
      { content: "Always trust your instincts and follow your dreams. You have so much potential!", sender: "Emma", nicknameGiven: "Angel", nicknameForRuthvika: "Ruthie" }
    ],
    finalNotes: [
      { content: "Hope your 18th birthday is as special as you are! Love you lots!", sender: "Sarah", nicknameGiven: "Sunshine", nicknameForRuthvika: "Ruthy" },
      { content: "Here's to adulthood and all the amazing things coming your way! Happy birthday!", sender: "Mike", nicknameGiven: "Comedian", nicknameForRuthvika: "R" }
    ]
  };
}

export function useBirthdayData() {
  return useQuery({
    queryKey: [API_ENDPOINT],
    queryFn: async (): Promise<OrganizedData> => {
      const response = await fetch(API_ENDPOINT);
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }
      const data: GoogleSheetsResponse = await response.json();
      return parseSheetData(data);
    },
    refetchInterval: 300000, // Auto-refresh every 5 minutes
    staleTime: 60000, // Consider data stale after 1 minute
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
