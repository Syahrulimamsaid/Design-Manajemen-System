import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Login from './pages/Authentication/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import PostingPekerjaan from './pages/Posting Job/PostJob';
import NotFound from './pages/404/404';
import FinallingJob from './pages/FinallingJob/FinallingJob';
import ReportDesigner from './pages/Report/Report';
import TakeJob from './pages/TakeJob/TakeJob';
import ListJob from './pages/ListJob/ListJob';
import CheckedJob from './pages/CheckedJob/CheckedJob';
import JobAssignment from './pages/JobAssignment/JobAssignment';
import JobRevision from './pages/JobRevision/JobRevision';
import GraphPrintLayout from './pages/Print/GraphPrintLayout';
import TimeLinesJob from './pages/TimeLines/TimeLines';
import DetailTimeLinesJob from './pages/TimeLines/DetailTimeLines';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  const handleNavigate = (to: string) => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
    navigate(to);
    // setLoading(false);
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      {token ? (
        <Routes>
          <Route
            index
            element={
              <>
                <PageTitle title="Pura Group | Dashboard" /> <Dashboard />
              </>
            }
          />
          {role == '2' ? (
            <Route
              path="/postingjob"
              element={
                <>
                  <PageTitle title="Pura Group | Posting Pekerjaan" />
                  <PostingPekerjaan />
                </>
              }
            />
          ) : (
            ''
          )}

          {role == '2' ? (
            <Route
              path="/finallingjob"
              element={
                <>
                  <PageTitle title="Pura Group | Penyelesaian Pekerjaan" />
                  <FinallingJob />
                </>
              }
            />
          ) : (
            ''
          )}
          {role == '1' || role == '2' ? (
            <Route
              path="/report"
              element={
                <>
                  <PageTitle title="Pura Group | Laporan" />
                  <ReportDesigner />
                </>
              }
            />
          ) : (
            ''
          )}
          {role == '4' ? (
            <Route
              path="/takejob"
              element={
                <>
                  <PageTitle title="Pura Group | Ambil Pekerjaan" />
                  <TakeJob />
                </>
              }
            />
          ) : (
            ''
          )}
          {role == '4' ? (
            <Route
              path="/listjob"
              element={
                <>
                  <PageTitle title="Pura Group | Daftar Pekerjaan" />
                  <ListJob />
                </>
              }
            />
          ) : (
            ''
          )}

          {role == '1' || role == '3' ? (
            <Route
              path="/checkjob"
              element={
                <>
                  <PageTitle title="Pura Group | Pemeriksaan Pekerjaan" />
                  <CheckedJob />
                </>
              }
            />
          ) : (
            ''
          )}
          {role == '1' ? (
            <Route
              path="/jobassignment"
              element={
                <>
                  <PageTitle title="Pura Group | Pemeriksaan Pekerjaan" />
                  <JobAssignment />
                </>
              }
            />
          ) : (
            ''
          )}

          {role == '1' ? (
            <Route
              path="/jobrevision"
              element={
                <>
                  <PageTitle title="Pura Group | Revisi Pekerjaan" />
                  <JobRevision />
                </>
              }
            />
          ) : (
            ''
          )}

          {role == '1' || role == '4' || role == '3' ? (
            <Route
              path="/timelines"
              element={
                <>
                  <PageTitle title="Pura Group | Garis Waktu Pekerjaan" />
                  <TimeLinesJob />
                </>
              }
            />
          ) : (
            ''
          )}

          {role == '1' || role == '4' || role == '3' ? (
            <Route
              path="/detailtimelines"
              element={
                <>
                  <PageTitle title="Pura Group | Detail Garis Waktu Pekerjaan" />
                  <DetailTimeLinesJob />
                </>
              }
            />
          ) : (
            ''
          )}

          <Route
            path="/graphlayout"
            element={
              <>
                <PageTitle title="Pura Group | Cetak Report Graph" />
                <GraphPrintLayout />
              </>
            }
          />

          <Route
            path="*"
            element={
              <>
                <PageTitle title="Pura Group | 404 Not Found" />
                <NotFound />
              </>
            }
          />
        </Routes>
      ) : (
        <Routes>
          {' '}
          <Route
            index
            element={
              <>
                <PageTitle title="Pura Group | Login" />
                <Login onNavigate={handleNavigate} />
              </>
            }
          />
          <Route
            path="*"
            element={
              <>
                <PageTitle title="Pura Group | 404 Not Found" />
                <NotFound />
              </>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
