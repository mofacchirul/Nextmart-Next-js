"use cliend"

import { useUser } from "@/context/UserContext";

const HomePage =  () => {
  const data = useUser()
  
  console.log(data);
  
  return (
    <div>
      Mahin
    </div>
  );
};

export default HomePage;