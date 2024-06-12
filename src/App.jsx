import "./App.css";

function App(props) {
  return (
    <>
      <header>
        <h1>Hello, {props.subject}!</h1>
        <button type="button" className="primary">
          Click Me!
        </button>
      </header>
    </>
  );
}

export default App;
