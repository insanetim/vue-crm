import { initializeApp } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import {
  child,
  get,
  getDatabase,
  push,
  ref,
  set,
  update,
} from 'firebase/database'

import type {
  CallbackFunction,
  CategoryPersistent,
  Credentials,
  UserCategory,
  UserInfo,
  UserRecord,
} from '@/types'

initializeApp({
  apiKey: 'AIzaSyC2DiliMxVbxN5OsYUwc5d9Pos7A2yH9mw',
  appId: '1:207435020724:web:96e6c441679d83cc6adae1',
  authDomain: 'vue-crm-93feb.firebaseapp.com',
  databaseURL:
    'https://vue-crm-93feb-default-rtdb.europe-west1.firebasedatabase.app/',
  messagingSenderId: '207435020724',
  projectId: 'vue-crm-93feb',
  storageBucket: 'vue-crm-93feb.appspot.com',
})

export const auth = getAuth()
const getUid = () => {
  const user = auth.currentUser
  return user ? user.uid : null
}
const db = getDatabase()

export const onAuthStateChangedListener = (callback: CallbackFunction) => {
  if (!callback) return

  return onAuthStateChanged(auth, callback)
}

export const loginUser = async ({
  email,
  password,
}: Omit<Credentials, 'name'>) => {
  return await signInWithEmailAndPassword(auth, email, password)
}

export const logoutUser = async () => {
  return await signOut(auth)
}

export const registerUser = async ({ email, name, password }: Credentials) => {
  await createUserWithEmailAndPassword(auth, email, password)

  const uid = getUid()
  const userInfoRef = ref(db, `/users/${uid}/info`)

  return await set(userInfoRef, {
    bill: 100000,
    locale: 'ru-RU',
    name,
  })
}

export const getUserInfo = async () => {
  const uid = getUid()
  const userInfoRef = ref(db, `/users/${uid}/info`)

  return (await get(userInfoRef)).val()
}

export const updateUserInfo = async (toUpdate: Partial<UserInfo>) => {
  const uid = getUid()
  const userInfoRef = ref(db, `/users/${uid}/info`)

  return await update(userInfoRef, toUpdate)
}

export const createUserCategory = async (categoryInfo: UserCategory) => {
  const uid = getUid()
  const categoriesRef = ref(db, `/users/${uid}/categories`)

  return await push(categoriesRef, categoryInfo)
}

export const getUserCategories = async () => {
  const uid = getUid()
  const categoriesRef = ref(db, `/users/${uid}/categories`)

  return (await get(categoriesRef)).val()
}

export const getUserCategoryById = async (id: string) => {
  const uid = getUid()
  const categoriesRef = ref(db, `/users/${uid}/categories`)

  const category = await get(child(categoriesRef, id))

  return { id, ...category.val() }
}

export const updateUserCategory = async ({
  id,
  limit,
  title,
}: CategoryPersistent) => {
  const uid = getUid()
  const categoriesRef = ref(db, `/users/${uid}/categories`)

  return await update(child(categoriesRef, id), { limit, title })
}

export const createUserRecord = async (record: UserRecord) => {
  const uid = getUid()
  const recordsRef = ref(db, `/users/${uid}/records`)

  return await push(recordsRef, record)
}

export const getUserRecords = async () => {
  const uid = getUid()
  const recordsRef = ref(db, `/users/${uid}/records`)

  return (await get(recordsRef)).val()
}

export const getUserRecordById = async (id: string) => {
  const uid = getUid()
  const recordsRef = ref(db, `/users/${uid}/records`)

  const record = await get(child(recordsRef, id))

  return { id, ...record.val() }
}
