import { useState, useEffect } from 'react';

interface MediaItem {
  type: 'image' | 'video';
  src: string;
  filename: string;
}

interface MediaFiles {
  [friendName: string]: MediaItem[];
}

export function useMediaFiles() {
  const [mediaFiles, setMediaFiles] = useState<MediaFiles>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAllMediaFiles = async () => {
      setIsLoading(true);
      
      // Complete files based on the actual directory structure
      const knownFiles = {
        'Ashmita': ['A1.jpeg', 'A2.jpeg', 'A3.jpeg', 'A4.jpeg', 'A5.jpeg', 'A6.jpeg', 'A7.jpeg', 'A8.jpeg', 'A9.jpeg', 'A10.jpeg', 'A11.jpeg', 'A12.jpeg', 'A13.jpeg', 'A14.jpeg', 'A15.jpeg', 'A16.jpeg', 'A17.jpeg', 'A18.jpeg', 'A19.jpeg', 'A20.jpeg', 'A21.jpeg', 'A22.jpeg', 'A23.jpeg'], // 23 photos found
        'Deetya': ['d1.jpeg', 'd2.jpeg', 'd3.jpeg', 'd4.jpeg', 'd5.jpeg', 'd6.jpeg', 'd7.jpeg', 'd8.jpeg', 'd9.jpeg', 'd10.jpeg', 'd11.jpeg', 'd12.jpeg', 'd13.jpeg', 'd14.jpeg', 'd15.jpeg', 'd16.jpeg', 'd18.jpeg'],
        'Gini': ['g1.jpg'],
        'Jason': ['j1.jpg', 'j2.jpg', 'j3.jpg'],
        'Krashanya': ['K1.jpg', 'K2.jpg'], // Actual files found
        'Kriish': ['k1.jpeg', 'k2.jpeg', 'k3.jpeg'],
        'Madhu': ['m1.jpg'],
        'Rishab': ['Rishab1.jpg'], // Actual file found
        'Rithikaa': ['R1.jpg', 'R2.jpg', 'R3.jpg', 'R4.jpg', 'R5.jpg', 'R6.jpg', 'R7.jpg', 'R8.jpg', 'R9.jpg'],
        'Roshini': ['r1.jpg', 'r2.jpg', 'r3.jpg', 'r4.jpg', 'r5.jpg', 'r6.jpg', 'r7.jpg'],
        'Sharvesh': ['sh1.jpg', 'sh11.jpg', 'Sh2.jpg', 'Sh3.jpg', 'Sh4.jpg', 'Sh6.jpg', 'Sh7.jpg', 'Sh8.jpg', 'Sh9.jpg', 'Sh10.mp4'],
        'Shirly': ['S1.jpg', 'S2.jpg'],
        'Suhas': ['s1.jpg', 's2.jpg', 's3.jpg', 'S3.jpg', 's4.jpg', 's5.jpg', 's6.jpg', 's7.mp4', 's8.mp4', 's9.mp4'],
        'Yashwanth': ['yv1.jpg'],
        'Yuvan': ['y1.jpg']
      };
      
      const allMedia: MediaFiles = {};
      
      // Directory name mapping for cases where display name differs from folder name
      const directoryMapping: { [key: string]: string } = {
        'Ashmita': 'Ashmita',
        'Deetya': 'deetyaa',
        'Gini': 'Gini',
        'Jason': 'jason',
        'Krashanya': 'Krashanya',
        'Kriish': 'kriish',
        'Madhu': 'madhu',
        'Rishab': 'rishab',
        'Rithikaa': 'rithikaa',
        'Roshini': 'roshini',
        'Sharvesh': 'sharvesh',
        'Shirly': 'shirly',
        'Suhas': 'suhas',
        'Yashwanth': 'yashwanth',
        'Yuvan': 'yuvan'
      };

      for (const [friendName, files] of Object.entries(knownFiles)) {
        const media: MediaItem[] = [];
        
        // Try to load known files for this friend
        for (const filename of files) {
          try {
            const isVideo = filename.endsWith('.mp4');
            const folder = isVideo ? 'videos' : 'images';
            const friendFolder = directoryMapping[friendName] || friendName.toLowerCase();
            // For now, use local media files in production until object storage is populated
            const src = `/media/${folder}/${friendFolder}/${filename}`;
            
            // Check if file exists
            const response = await fetch(src, { method: 'HEAD' });
            if (response.ok) {
              media.push({
                type: isVideo ? 'video' : 'image',
                src,
                filename
              });
            }
          } catch {
            // File doesn't exist, continue
          }
        }
        
        // Store media for this friend
        if (media.length > 0) {
          allMedia[friendName] = media;
        }
      }
      
      setMediaFiles(allMedia);
      setIsLoading(false);
    };

    loadAllMediaFiles();
  }, []);

  return { mediaFiles, isLoading };
}