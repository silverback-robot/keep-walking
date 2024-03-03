import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../firebase';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [stepCount, setStepCount] = useState(0);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchStepCount(user.uid);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchStepCount = (userId) => {
    firestore.collection('users').doc(userId).get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          setStepCount(data.stepCount || 0);
        }
      })
      .catch((error) => {
        console.error('Error fetching step count:', error);
      });
  };

  const handleLogout = () => {
    auth().signOut();
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}</p>
          <p>Step Count: {stepCount}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Please login to view your dashboard</p>
      )}
    </div>
  );
}

export default Dashboard;
