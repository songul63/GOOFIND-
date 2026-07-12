import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager, memoryLocalCache, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

// Safely obtain local cache settings by detecting environment or iframe storage restrictions
function getLocalCacheSetting() {
  try {
    if (typeof window === 'undefined') {
      return memoryLocalCache();
    }
    
    // In sandboxed frames or restricted third-party frames, IndexedDB access may be blocked
    if (!window.indexedDB) {
      console.warn("IndexedDB is not accessible or allowed. Falling back to memoryLocalCache.");
      return memoryLocalCache();
    }
    
    // BroadcastChannel is frequently blocked in sandboxed iframes
    if (typeof BroadcastChannel === 'undefined') {
      console.warn("BroadcastChannel is not available. Using standard single-tab persistent local cache.");
      return persistentLocalCache({});
    }
    
    return persistentLocalCache({
      tabManager: persistentMultipleTabManager()
    });
  } catch (error) {
    console.warn("Failed to configure offline persistent local cache. Falling back to memoryLocalCache.", error);
    return memoryLocalCache();
  }
}

// Initialize Firestore with robust persistent local cache (and safety fallbacks for sandbox constraints)
// and enable long polling auto-detection to bypass proxy/firewall streaming blocks in preview views.
export const db = initializeFirestore(app, {
  localCache: getLocalCacheSetting(),
  experimentalAutoDetectLongPolling: true
}, firebaseConfig.firestoreDatabaseId);

export const auth = getAuth(app);
export const storage = getStorage(app);

// Connectivity check as per instructions
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration or internet connection.");
    }
  }
}
testConnection();

export interface FirestoreErrorInfo {
  error: string;
  operationType: 'create' | 'update' | 'delete' | 'list' | 'get' | 'write';
  path: string | null;
  authInfo: {
    userId: string;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    providerInfo: { providerId: string; displayName: string; email: string; }[];
  }
}

export function handleFirestoreError(error: any, operationType: FirestoreErrorInfo['operationType'], path: string | null): never {
  const errMsg = (error?.message || String(error) || 'Unknown Firestore error');
  const lowerMsg = errMsg.toLowerCase();
  
  if (lowerMsg.includes('quota') || lowerMsg.includes('exceeded') || lowerMsg.includes('exhausted') || lowerMsg.includes('limit')) {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('firestore-quota-exceeded', { detail: { message: errMsg } }));
    }
  }

  const authInfo = auth.currentUser ? {
    userId: auth.currentUser.uid,
    email: auth.currentUser.email || '',
    emailVerified: auth.currentUser.emailVerified,
    isAnonymous: auth.currentUser.isAnonymous,
    providerInfo: auth.currentUser.providerData.map(p => ({
      providerId: p.providerId,
      displayName: p.displayName || '',
      email: p.email || ''
    }))
  } : {
    userId: 'unauthenticated',
    email: '',
    emailVerified: false,
    isAnonymous: false,
    providerInfo: []
  };

  const errorInfo: FirestoreErrorInfo = {
    error: errMsg,
    operationType,
    path,
    authInfo
  };

  throw new Error(JSON.stringify(errorInfo));
}
