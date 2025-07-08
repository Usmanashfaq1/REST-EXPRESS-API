
import { getUsers,saveUsers } from "../models/users.model.js"
export async function getAllUsers(req, res,next) {
  try {
   // throw new Error("🔥 Manual test error"); // ⛔️ force an error
    const users = await getUsers(); // ✅ wait for data
    res.json(users); // ✅ send actual users
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
  const newUser = req.body;
  // fetch old data
  try {
    const users = await getUsers();
    const index = users.findIndex((u) => u.id === newUser.id);
    if(index===-1)
    {
      res.send("user not found");
    }
    else
    {
      //patching according to json body
      if(newUser.age!==undefined) users[index].age=newUser.age;
      if (newUser.name !== undefined) users[index].name = newUser.name;
      if (newUser.id !== undefined) users[index].id = newUser.id;


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
    const index = users.findIndex((u) => u.id === newUser.id);
    if (index === -1) {
      res.send("user not found");
    } else {
      //patching according to json body
      if(newUser.id!==undefined &&newUser.name!==undefined&&newUser.age!==undefined)
      {
        users[index]=newUser;
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

export async function createUser(req, res,next ) {
  const newUser=req.body;
  // fetch old data
  try{
    const users = await getUsers();

    //add new data
    users.push(newUser);


    //save new data
    await saveUsers(users);
    res.json({ message: "user created", newUser });
  }
  catch(err)
  {
    next(err);
  }




}
