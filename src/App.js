// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import StudentForm from './components/StudentForm';
import Loading from './components/Loading';
import StudentTable from './components/StudentTable';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [refetch, setRefetch] = useState(false);

  return (
      <div className="App">
          {isLoading && <Loading />}
          {isLogin === false && <LoginForm setIsLogin={setIsLogin} setIsLoading={setIsLoading} />}
          {isLogin === true && 
          <>
          <div className="main-content-student">
            <div className="student-form-card">
              <StudentForm setIsLoading={setIsLoading} setRefetch={setRefetch}/>
            </div>
            <div className="student-table-card">
              <StudentTable refetch={refetch}/>
            </div>
          </div>
          </>}
      </div>
  );
}

export default App;