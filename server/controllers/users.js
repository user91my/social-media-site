import User from "../models/User.js";

// READ
// -----
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    // Promise.all() documentation :-
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
    // '.map()' goes through 'user.friends' array (consisting of IDs of friends) to create a new array of promises.
    // Each promise (in the new array) represents an asynchronous operation to find a user by ID ('User.findById(id)').
    // The 'await' keyword is used with 'Promise.all()' to ensure that if any individual promise within the new array
    // is rejected, it won't cause the entire 'Promise.all()' to immediately reject.
    // Instead it waits for all promises within the new array to settle (either resolve or reject).
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// UPDATE
// -------
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    // Updating the "friends" array of both the user and his friend
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      // This 'if' conditioning is to prevent the user from adding himself as a friend.
      if (id !== friendId) {
        user.friends.push(friendId);
        friend.friends.push(id);
      }
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
