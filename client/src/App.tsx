import { useQuery, gql } from "@apollo/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const query = gql`
  query getTodoWithUser {
    getTodos {
      id
      title
      completed
      user {
        name
      }
    }
  }
`;
interface Todo {
  id: number;
  title: string;
  completed: boolean;
  user: {
    name: string;
  };
}
const App = () => {
  const { loading, data, error } = useQuery(query);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <Table className="border">
      <TableHeader className="">
        <TableRow>
          <TableHead className="w-[100px]">Todo</TableHead>
          <TableHead>Created by</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.getTodos.map((todo: Todo) => (
          <TableRow key={todo.id}>
            <TableCell className="font-medium">{todo.title}</TableCell>
            <TableCell>{todo.user.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
  // return data.getTodos.map((d: Todo) => (
  //   <div key={d.id}>
  //     <p>Title:{d.title}</p>
  //     <p>Created By:{d.user.name}</p>
  //   </div>
  // ));
};

export default App;
