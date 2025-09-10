const API_URL = "/rooms";
const roomList = document.getElementById("roomList");
const roomForm = document.getElementById("roomForm");

const defaultImage =
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=300&h=200&fit=crop";

// Fetch rooms
async function fetchRooms() {
  const res = await fetch(API_URL);
  const rooms = await res.json();

  roomList.innerHTML = "";
  rooms.forEach((room) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>
      <a href="${room.imageURL}" target="_blank" rel="noopener noreferrer">
        <img src="${room.imageURL}" alt="${
      room.name
    }" class="room-image" onerror="this.src='${defaultImage}'">
      </a>
    </td>
    <td><strong>${room.name}</strong></td>
    <td>
    <span style="background: rgba(79, 172, 254, 0.2); color: #4facfe; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.85rem;">
    ${room.type}
    </span>
    </td>
    <td class="price">Rp ${room.price.toLocaleString("id-ID")}</td>
    <td>
    <button class="delete-btn" onclick="deleteRoom('${room._id}')">
    <i class="fas fa-trash"></i> Hapus
    </button>
    </td>
    `;
    roomList.appendChild(tr);
  });
}

// Add room
roomForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newRoom = {
    name: document.getElementById("name").value,
    type: document.getElementById("type").value,
    price: document.getElementById("price").value,
    imageURL: document.getElementById("imageURL").value,
  };

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newRoom),
  });

  roomForm.reset();
  fetchRooms();
});

// Delete room
async function deleteRoom(_id) {
  await fetch(`${API_URL}/${_id}`, { method: "DELETE" });
  fetchRooms();
}

// Initial load
fetchRooms();
