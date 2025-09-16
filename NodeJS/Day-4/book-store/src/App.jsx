import Login from "./components/Login";

function App() {
  return (
    <>
      <Login
        setIsAuthenticated={true}
        setUser={{ name: "test", password: "1234" }}
      />
    </>
  );
}

export default App;
