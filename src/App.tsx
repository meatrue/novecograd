import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useUnit } from 'effector-react';

import { Layout } from '@/components/Layout';
import { 
  HomePage,
  ActivitiesPage,
  ProposalsPage,
  ProposalsVotesPage,
  MeetingsPage,
  SurveysPage,
  PersonalAccountPage,
  DocumentsPage,
} from '@/pages';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { appLoaded } from '@/store/app';

export const App: React.FC = () => {
  const [
    loadApp,
  ] = useUnit([
    appLoaded,
  ]);
  
  React.useLayoutEffect(() => {
    loadApp();
  }, [loadApp]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/activities" element={<ProtectedRoute element={<ActivitiesPage />} />} />
        <Route path="/proposals" element={<ProtectedRoute element={<ProposalsPage />} />} />
        <Route path="/proposals-votes" element={<ProtectedRoute element={<ProposalsVotesPage />} />} />
        <Route path="/surveys" element={<ProtectedRoute element={<SurveysPage />} />} />
        <Route path="/meetings" element={<ProtectedRoute element={<MeetingsPage />} />} />
        <Route path="/documents" element={<ProtectedRoute element={<DocumentsPage />} />} />
        <Route path="/personal-account" element={<ProtectedRoute element={<PersonalAccountPage />} />} />
      </Route>
    </Routes>
  );
};
