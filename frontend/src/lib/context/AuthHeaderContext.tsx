import type { BreadCrumb } from "@/api/types";
import { createContext, useContext, useState } from "react";
import { type ReactNode } from "react";

interface AuthHeaderContextType{
  breadCrumbs: BreadCrumb[];
  setBreadCrumbs: (breadCrumb: BreadCrumb[])=>void;
  title: string;
  setTitle: (title: string)=>void;
}

const AuthHeaderContext = createContext<AuthHeaderContextType | undefined>(undefined)

export function AuthHeaderProvider({children}: {children: ReactNode}) {
    const [breadCrumbs, setBreadCrumbs] = useState<BreadCrumb[]>([])
    const [title, setTitle] = useState<string>("")

  return (
    <AuthHeaderContext.Provider value={{breadCrumbs,setBreadCrumbs,title,setTitle}}>
      {children}
    </AuthHeaderContext.Provider>
  )
}

export function useAuthHeader() {
  const context = useContext(AuthHeaderContext);
  if (context === undefined) {
    throw new Error('useAuthHeader must be used within a AuthHeaderProvider');
  }
  return context;
}
