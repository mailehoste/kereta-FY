import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export interface APIKeys {
  openai?: string;
  anthropic?: string;
  grok?: string;
}

export const getAPIKeys = async (): Promise<APIKeys> => {
  try {
    const docRef = doc(db, 'api-keys', 'default');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as APIKeys;
    }
    return {};
  } catch (error) {
    console.error('Error fetching API keys:', error);
    return {};
  }
};

export const setAPIKeys = async (keys: APIKeys): Promise<void> => {
  try {
    const docRef = doc(db, 'api-keys', 'default');
    await setDoc(docRef, keys);
  } catch (error) {
    console.error('Error setting API keys:', error);
    throw error;
  }
}; 