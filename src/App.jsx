import NestedComments from "./components/NestedComments";
import commentsData from "./data/comments.json";

function App() {
  return (
    <>
      <h1>Nested Comments</h1>

      <NestedComments
        comments={commentsData}
        onSubmit={() => {}}
        onEdit={() => {}}
        onDeleted={() => {}}
        // onUpvote={() => {}}
        // onDownvote={() => {}}
      />
    </>
  );
}

export default App;
