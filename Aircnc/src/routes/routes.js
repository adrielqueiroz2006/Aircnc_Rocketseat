import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Login from "../pages/Login"
import List from "../pages/List"
import Book from "../pages/Book"

const Stack = createNativeStackNavigator()

export default function AppRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="List" component={List} />
      <Stack.Screen name="Book" component={Book} />
    </Stack.Navigator>
  )
}
