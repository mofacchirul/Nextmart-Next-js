'use client'
import { AppStore, makeStore } from '@/redux/store'
import { ReactNode, useRef } from 'react'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'



export default function StoreProvider({
  children
}: {
  children:ReactNode
}) {
 const storeRef= useRef<AppStore>(undefined)

 if(!storeRef.current)
 {
    storeRef.current= makeStore()
 }
  const persiststore= persistStore(storeRef.current)

  return <Provider store={storeRef.current} >
    <PersistGate loading={"Loading"} persistor={persiststore} >
  {children}
    </PersistGate>
  
    </Provider>
}