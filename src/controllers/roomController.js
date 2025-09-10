import Room from "../models/Room.js";

// GET /rooms
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rooms" });
  }
};

// POST /rooms
export const createRoom = async (req, res) => {
  try {
    const { name, type, price, imageURL } = req.body;
    if (!name || !type || !price) {
      return res
        .status(400)
        .json({ message: "Name, type, and price are required" });
    }

    const newRoom = new Room({
      name,
      type,
      price,
      imageURL: imageURL || "https://via.placeholder.com/150",
    });

    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(400).json({ message: "Error creating room" });
  }
};

// DELETE /rooms/:id
export const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRoom = await Room.findByIdAndDelete(id);
    if (!deletedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting room" });
  }
};
