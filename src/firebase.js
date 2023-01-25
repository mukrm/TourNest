import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  // updateProfile,
  sendEmailVerification,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  // QuerySnapshot,
} from "firebase/firestore";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCa6t3-5AlKIbpDp536m_co3l-TgB5JayA",
  authDomain: "tournest-62f85.firebaseapp.com",
  projectId: "tournest-62f85",
  storageBucket: "tournest-62f85.appspot.com",
  messagingSenderId: "953860944621",
  appId: "1:953860944621:web:45d220afceb78f9c6f92e4",
  measurementId: "G-TGRVXYW7JT",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        age: 0,
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (
  name,
  email,
  password,
  image,
  confirmPassword,
  phone
) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((user) => {
      const storage = getStorage();
      const storageRef = ref(storage, "users/" + email);

      const uploadTask = uploadBytesResumable(storageRef, image[0]);
      let data = {
        email: email,
        name: name,
        phone: phone,
      };

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");

          /* eslint-disable */
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          alert(error);
          return false;
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            data.image = downloadURL;
            addDoc(collection(db, "users"), data)
              .then((QuerySnapshot) => {
                sendEmailVerification(auth.currentUser).then(() => {
                  alert(
                    "Signup Successful, please verify your email through the email link at : " +
                      email
                  );
                  return true;
                });
              })
              .catch((error) => {
                console.log(error);
                return false;
              });
          });
        }
      );
    })
    .catch((err) => {
      console.error(err);
      alert(err.message);
      return false;
    });
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

const authCheck = () => {
  onAuthStateChanged(auth).then((user) => {
    if (user) {
      return user.uid;
    } else {
      return null;
    }
  });
};

function getTours(destination) {
  getDocs(collection(db, "Tours"))
    .then((QuerySnapshot) => {
      let tours = [];
      QuerySnapshot.forEach((doc) => {
        if (
          doc.data().location.toLowerCase().trim() ===
          destination.toLowerCase().trim()
        ) {
          doc.data().id = doc.id;
          console.log("dest", destination);

          tours.push(doc.data);
        }
      });
      return tours;
    })
    .catch((error) => {
      console.log(error);
    });
}

const getHistory = async () => {
  try {
    if (!auth.currentUser) return;
    const historyList = [];

    const historyCol = collection(db, "History");
    const historyDocs = await getDocs(historyCol);

    historyDocs.forEach((doc) => {
      let item = doc.data();

      if (item.user === auth.currentUser.uid) historyList.push(item);
    });

    return historyList;
  } catch (err) {
    console.log("something went wrong");
  }
};

const addHistory = async (tour) => {
  try {
    if (!auth.currentUser) return;

    const docRef = await addDoc(collection(db, "History"), {
      tour_id: tour.id,
      title: tour.title,
      price: tour.price,
      location: tour.location,
      url: tour.url || tour.link,
      user: auth.currentUser.uid,
      timestamp: new Date().getTime(),
    });
    console.log(docRef);
  } catch (err) {
    console.log(err);
  }
};

export {
  auth,
  db,
  query,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  authCheck,
  getDocs,
  collection,
  getTours,
  getHistory,
  addHistory,
  where,
};
