import { createContext, useContext, type SetStateAction } from 'react';
import type { TreatmentResponse } from '@/api/types';
import { type ReactNode } from 'react';

interface TreatmentDetailContextType {
  treatmentDetail: TreatmentResponse | null;
  setTreatmentDetail: (treatmentDetail: TreatmentResponse)=>void;
  isLoading: boolean;
}

const TreatmentDetailContext = createContext<TreatmentDetailContextType | undefined>(undefined);

export function TreatmentDetailProvider({
  children,
  treatmentDetail,
  isLoading,
  setTreatmentDetail,
}: {
  children: ReactNode;
  treatmentDetail: TreatmentResponse | null;
  setTreatmentDetail: (treatmentDetail: TreatmentResponse)=>void;
  isLoading: boolean;
}) {
  return (
    <TreatmentDetailContext.Provider value={{ treatmentDetail, isLoading, setTreatmentDetail }}>
      {children}
    </TreatmentDetailContext.Provider>
  );
}

export function useTreatmentDetail() {
  const context = useContext(TreatmentDetailContext);
  if (context === undefined) {
    throw new Error('useTreatmentDetail must be used within a TreatmentDetailProvider');
  }
  return context;
}
