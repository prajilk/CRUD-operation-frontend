// Import required modules from the 'react-router-dom' library.
import { Routes, Route } from "react-router-dom";

// Import components for different routes.
import CreateUser from "./pages/CreateUser"; // Component for creating a new user.
import ViewUsers from "./pages/ViewUsers";   // Component for viewing all users.
import UpdateUser from "./pages/UpdateUser"; // Component for updating an existing user.

// App component responsible for handling routing and rendering different components based on the current URL.
function App() {

  // The return statement defines the structure of the application's UI based on the URL route.
  // The 'Routes' component is used to define individual routes and their corresponding components.
  return (
    <>
      <Routes>
        {/* Route for the home page, displaying the 'ViewUsers' component. */}
        <Route path="/" exact element={<ViewUsers />} />

        {/* Route for the 'CreateUser' page, displaying the 'CreateUser' component. */}
        <Route path="/create-user" element={<CreateUser />} />

        {/* Route for updating a user, displaying the 'UpdateUser' component with a dynamic 'id' parameter. */}
        <Route path="/update-user/:id" element={<UpdateUser />} />
      </Routes>
    </>
  );
}

// Export the 'App' component to make it available for use in other parts of the application.
export default App;
