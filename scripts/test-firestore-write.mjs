import { initializeApp } from 'firebase/app';
import { initializeFirestore, collection, addDoc, getDocs, query, where, limit } from 'firebase/firestore';
import config from '../firebase-applet-config.json' with { type: 'json' };

const app = initializeApp(config);
const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
}, config.firestoreDatabaseId);

const payload = {
  name: 'CLI Test Business',
  category: 'FOOD_DRINK',
  address: '123 Test St, Toronto, ON',
  phone: '+1 416 000 0000',
  description: 'diagnostic write',
  imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
  rating: 0,
  reviews: [],
  viewCount: 0,
  verified: false,
  addedBy: 'user',
  ownerId: 'unauthenticated-test-owner',
  gallery: [],
};

try {
  const ref = await addDoc(collection(db, 'businesses'), payload);
  console.log('UNEXPECTED_SUCCESS', ref.id);
} catch (err) {
  console.log('WRITE_ERROR_CODE', err?.code || 'no-code');
  console.log('WRITE_ERROR_MSG', err?.message || String(err));
}

try {
  const snap = await getDocs(query(collection(db, 'businesses'), limit(1)));
  console.log('LIST_OK_COUNT', snap.size);
} catch (err) {
  console.log('LIST_ERROR_CODE', err?.code || 'no-code');
  console.log('LIST_ERROR_MSG', err?.message || String(err));
}

process.exit(0);
