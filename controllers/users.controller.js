
import { getUsers,saveUsers } from "../models/users.model.js"
export async function getAllUsers(req, res,next) {
  try {
   // throw new Error("🔥 Manual test error"); // ⛔️ force an error
    const users = await getUsers(); // ✅ wait for data
    if(users.length>0)
    {
      // //sending a dummy cookie
      // res.cookie("token", "abc123", { httpOnly: true, maxAge:5000 });
      //max age 5 seconds
      res.json(users); // ✅ send actual users
    }
    else{
      res.send("no users exist!");
    }

  } catch (err)
  {
    next(err); // sending it to global error handler
  }

}

export async function deleteUserById(req, res,next) {
  const userId=req.params.id;// getting user id

  //reading user and deleting it
  try {
    // throw new Error("🔥 Manual test error"); // ⛔️ force an error
    let users = await getUsers(); // ✅ wait for data
    const index = users.findIndex((u) => u.id === userId);

    if (index === -1) {
      res.send("user not found");
    }
    else
    {
      users = users.filter((u) => u.id !== userId);

      await saveUsers(users);

      res.json({ message: "user deleted with id ", userId }); // ✅ send actual users
    }


  } catch (err) {
    next(err); // sending it to global error handler
  }

}

export async function getUserbyId(req, res,next) {
  const userId=req.params.id;// getting user id
  // console.log("received cookie : ",req.cookies);

  //reading user and deleting it
  try
  {
    // throw new Error("🔥 Manual test error"); // ⛔️ force an error
    let users = await getUsers(); // ✅ wait for data
    const user= users.find((u) => u.id ===userId);
    if(user){
      res.json(user);
    }
    else
    {
      res.send("user not found!");
    }

  }
  catch (err)
  {
    next(err); // sending it to global error handler
  }

}

export async function patchUser(req, res,next) {
 const newUser=req.body;
  // fetch old data
  try {
    const users = await getUsers();
    const index = users.findIndex((u) => u.id === req.params.id);
    if(index===-1)
    {
      res.send("user not found");
    }
    else
    {
      //patching according to json body
      //again double check
      if(newUser.age!==undefined) users[index].age=newUser.age;
      if (newUser.name !== undefined) users[index].name = newUser.name;



    //save new data
    await saveUsers(users);
    res.json({ message: "user patched", newUser });

    }




    //add new data

  } catch (err) {
    next(err);
  }
}

export async function putUser(req, res,next ) {
  const newUser = req.body;
  // fetch old data
  try {
    const users = await getUsers();
    const index = users.findIndex((u) => u.id === req.params.id);
    if (index === -1) {
      res.send("user not found");
    } else {
      //patching according to json body
      if(newUser.name!==undefined&&newUser.age!==undefined)
      {
        users[index] = {
          id: users[index].id, // keep ID
          name: newUser.name, // required
          age: newUser.age, // required
          // only include what was sent — it's a replacement
        };
        await saveUsers(users);
        res.json({ message: "user updated", newUser });
      }
      else
      {
        res.status(400).send("bad request!");
      }


      //save new data

    }

    //add new data
  } catch (err) {
    next(err);
  }

}

export async function createUser(req, res, next) {
  try {
    const newUser = req.body;

    // Fetch existing users
    const users = await getUsers();

    let newId;

    if (users && users.length > 0) {
      const lastUser = users[users.length - 1];
      newId = Number(lastUser.id) + 1;
    } else {
      newId = 1;
    }

    const userToAdd = {
      id: String(newId),
      name: newUser.name,
      age: newUser.age,
    };

    // Add new user to the array
    users.push(userToAdd);

    // Save updated users
    await saveUsers(users);

    res.status(201).json({ message: "User created", user: userToAdd });
  } catch (err) {
    next(err);
  }
}

