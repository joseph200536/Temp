import React, { useState } from "react";

// mock data
const initialRequests = [
  {
    id: 1,
    name: "Sowmya R",
    age: 24,
    email: "sowmya@example.com",
    gender: "Female",
    phone: "9876543210",
    address: "123, MG Road, Bengaluru",
    certificateNo: "CERT123456",
    certificateUrl: "https://via.placeholder.com/300x200.png?text=Certificate",
    idProofUrl: "https://via.placeholder.com/300x200.png?text=ID+Proof",
    description: "I have 2 years selling handmade products.",

    status: "pending", // pending, accepted, declined
    appliedAt: "2025-07-17T13:45:00"
  },
   {
    id: 2,
    name: "Vishnu priya ",
    age: 24,
    email: "vish31@example.com",
    gender: "Female",
    phone: "9876543210",
    address: "123, cherry Road, Delhi",
    certificateNo: "CERT124456",
    certificateUrl: "https://via.placeholder.com/300x200.png?text=Certificate",
    idProofUrl: "https://via.placeholder.com/300x200.png?text=ID+Proof",
    description: "I have 2 years selling handmade products.",

    status: "pending", // pending, accepted, declined
    appliedAt: "2025-07-17T13:45:00"
  },
  {
    id: 3,
    name: "Arjun K",
    age: 30,
    email: "arjun.k@example.com",
    gender: "Male",
    phone: "9123456789",
    address: "45, Park Avenue, Chennai",
    certificateNo: "CERT987654",
    certificateUrl: "https://via.placeholder.com/300x200.png?text=Certificate",
    idProofUrl: "https://via.placeholder.com/300x200.png?text=ID+Proof",
    description: "I specialize in eco‑friendly handmade accessories.",
    status: "pending",
    appliedAt: "2025-07-15T09:30:00"
  },
    {
    id: 4,
    name: "Arjun K",
    age: 30,
    email: "arjun.k@example.com",
    gender: "Male",
    phone: "9123456789",
    address: "45, Park Avenue, Chennai",
    certificateNo: "CERT987654",
    certificateUrl: "https://via.placeholder.com/300x200.png?text=Certificate",
    idProofUrl: "https://via.placeholder.com/300x200.png?text=ID+Proof",
    description: "I specialize in eco‑friendly handmade accessories.",
    status: "pending",
    appliedAt: "2025-07-15T09:30:00"
  },
    {
    id: 5,
    name: "Kumar",
    age: 30,
    email: "kumark@example.com",
    gender: "Male",
    phone: "9123456789",
    address: "451,Periyar road, Chennai",
    certificateNo: "CERT987654",
    certificateUrl: "https://via.placeholder.com/300x200.png?text=Certificate",
    idProofUrl: "https://via.placeholder.com/300x200.png?text=ID+Proof",
    description: "I specialize in eco‑friendly handmade accessories.",
    status: "pending",
    appliedAt: "2025-07-15T09:30:00"
  },
  {
    id: 6,
    name: "Divya S",
    age: 27,
    email: "divya.s@example.com",
    gender: "Female",
    phone: "9988776655",
    address: "9, Lakeside Road, Kochi",
    certificateNo: "CERT654321",
    certificateUrl: "https://via.placeholder.com/300x200.png?text=Certificate",
    idProofUrl: "https://via.placeholder.com/300x200.png?text=ID+Proof",
    description: "Passionate about traditional art and crafts.",
    status: "pending",
    appliedAt: "2025-07-16T11:15:00"
  }
];

const ITEMS_PER_PAGE = 5;

export default function SellerRequest() {
  const [requests, setRequests] = useState(initialRequests);
  const [currentTab, setCurrentTab] = useState("pending"); // pending, accepted, declined
  const [selectedId, setSelectedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = requests.filter(req => req.status === currentTab);
  const pageCount = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const selected = requests.find(r => r.id === selectedId);

  async function handleAction(type) {
    if (!selected) return;
    // optimistic update
    setRequests(reqs =>
      reqs.map(r =>
        r.id === selected.id ? { ...r, status: type } : r
      )
    );
    setSelectedId(null);

    try {
      const res = await fetch("http://localhost:5000/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: selected.name,
          email: selected.email,
          status: type
        })
      });
      const data = await res.json();
      alert(data.message || `${type} email sent.`);
    } catch (err) {
      console.error(err);
      alert("Failed to send email.");
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Seller Requests</h2>
      <div className="flex gap-4">
        {["pending", "accepted", "declined"].map(tab => (
          <button
            key={tab}
            onClick={() => { setCurrentTab(tab); setCurrentPage(1); }}
            className={`px-4 py-2 rounded ${
              currentTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} (
            {requests.filter(r => r.status === tab).length})
          </button>
        ))}
      </div>

      {!selected ? (
        <>
          <ul className="space-y-1">
            {paged.map(req => (
              <li
                key={req.id}
                onClick={() => setSelectedId(req.id)}
                className="bg-white p-4 shadow-sm rounded cursor-pointer hover:bg-gray-50 flex justify-between"
              >
                <div>
                  <p className="font-semibold">{req.name}</p>
                  <p className="text-sm text-gray-600">{req.email}</p>
  
                </div>
                <div className="text-xs text-gray-400">
                  {new Date(req.appliedAt).toLocaleDateString()}
                </div>
              </li>
            ))}
          </ul>

          {pageCount > 1 && (
            <div className="flex gap-2 justify-center mt-4">
              {Array.from({ length: pageCount }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`px-3 py-1 rounded ${
                    p === currentPage
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="bg-white p-6 rounded shadow-md space-y-4">
          <button
            onClick={() => setSelectedId(null)}
            className="bg-gray-200 text-black px-3 py-1 rounded hover:bg-gray-300"
          >
            ← Back
          </button>

          <h3 className="text-xl font-bold">
            {selected.name} ({selected.status.toUpperCase()})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {["Name", "Age", "Email", "Phone", "Gender",  "Certificate No", "Applied At"].map((label, idx) => (
              <p key={idx}>
                <strong>{label}</strong>:{" "}
                {label === "Applied At"
                  ? new Date(selected.appliedAt).toLocaleString()
                  : selected[label.toLowerCase().replace(/ /g, "")]}
              </p>
            ))}
            <p>
              <strong>Address:</strong> {selected.address}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <strong>Certificate:</strong>
              <img
                src={selected.certificateUrl}
                alt="certificate"
                className="w-2/3 mt-2 border"
              />
            </div>
            <div>
              <strong>ID Proof:</strong>
              <img
                src={selected.idProofUrl}
                alt="ID proof"
                className="w-2/3 mt-2 border"
              />
            </div>
            <div>
              <strong>Description:</strong>
              <p className="bg-gray-100 p-3 rounded">
                {selected.description}
              </p>
            </div>
          </div>

          {selected.status === "pending" && (
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                onClick={() => handleAction("declined")}
              >
                Decline
              </button>
              <button
                className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
                onClick={() => handleAction("accepted")}
              >
                Approve
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
