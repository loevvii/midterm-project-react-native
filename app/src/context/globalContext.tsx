import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import uuid from 'react-native-uuid';
interface Theme {
  background: string;
  cardBackground: string;
  text: string;
  dominant: string;
  accent: string;
}

interface Job {
  id: string;
  title: string;
  description?: string;
  mainCategory: string;
  applicationLink: string;
  pubDate: string;
  expiryDate: string;
  companyName: string;
  companyLogo: string;
  jobType: string;
  workModel: string;
  seniorityLevel: string;
  minSalary: number;
  maxSalary: number;
  locations: string[];
  tags: string[];
}

interface GlobalContextProps {
  isDarkMode: boolean;
  theme: Theme;
  toggleDarkMode: () => void;
  jobs: Job[];
  fetchJobs: () => void;
  loading: boolean;
  bookmarkedJobs: string[]; // Array of job IDs that are bookmarked
  addToBookmarks: (jobId: string) => void; // Function to add a job to bookmarks
  removeFromBookmarks: (jobId: string) => void; // Function to remove a job from bookmarks
}

const lightTheme: Theme = {
  background: '#f7f7f7', // Light gray background
  cardBackground: '#fff', // White cards
  text: '#333', // Dark text
  dominant: '#007AFF', // iOS blue
  accent: '#FFD700', // Gold for accents
};

const darkTheme: Theme = {
  background: '#121212', // Dark background
  cardBackground: '#1c1c1c', // Slightly lighter cards
  text: '#e0e0e0', // Light text
  dominant: '#007AFF', // iOS blue
  accent: '#FFD700', // Gold for accents
};

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    await AsyncStorage.setItem('isDarkMode', JSON.stringify(newMode)); // Persist theme preference
  };

  // Load persisted theme preference on app startup
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const storedMode = await AsyncStorage.getItem('isDarkMode');
        if (storedMode !== null) {
          setIsDarkMode(JSON.parse(storedMode));
        }
      } catch (error) {
        console.error('Error loading theme preference:', error);
      }
    };
    loadThemePreference();
  }, []);

  const theme = isDarkMode ? darkTheme : lightTheme;

  // Job State and Fetching
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchJobs = async () => {
    try {
      const response = await fetch('https://empllo.com/api/v1');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log("Fetched success");
      // Check if data is an array or if the jobs are in data.jobs
      const jobsArray = Array.isArray(data) ? data : data.jobs;
      if (!jobsArray) {
        throw new Error("No jobs array found in the response");
      }
      const jobsWithId = jobsArray.map((job: any) => ({
        id: job.id ? job.id.toString() : uuid.v4(),
        title: job.title || "",
        description: job.description || "",
        mainCategory: job.mainCategory || "",
        applicationLink: job.applicationLink || "",
        pubDate: job.pubDate || "",
        expiryDate: job.expiryDate || "",
        companyName: job.companyName || "",
        companyLogo: job.companyLogo || "",
        jobType: job.jobType || "",
        workModel: job.workModel || "",
        seniorityLevel: job.seniorityLevel || "",
        minSalary: Number(job.minSalary) || 0,
        maxSalary: Number(job.maxSalary) || 0,
        locations: Array.isArray(job.locations) ? job.locations : [],
        tags: Array.isArray(job.tags) ? job.tags : [],
      }));
      setJobs(jobsWithId);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Bookmark State and Actions
  const [bookmarkedJobs, setBookmarkedJobs] = useState<string[]>([]);

  const addToBookmarks = (jobId: string) => {
    setBookmarkedJobs(prevBookmarks => [...prevBookmarks, jobId]);
  };

  const removeFromBookmarks = (jobId: string) => {
    setBookmarkedJobs(prevBookmarks => prevBookmarks.filter(id => id !== jobId));
  };

  return (
    <GlobalContext.Provider value={{ 
      isDarkMode, 
      theme, 
      toggleDarkMode, 
      jobs, 
      fetchJobs, 
      loading, 
      bookmarkedJobs, 
      addToBookmarks, 
      removeFromBookmarks 
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};